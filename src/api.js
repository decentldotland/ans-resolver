import express from "express";
import cors from "cors";
import { readContract } from "./utils/readContract.js";
import { isArweaveAddress, normalizeDomain } from "./utils/validations.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/resolve/:query/:full?", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { query, full } = req.params;
    const balances = await readContract();
    if (isArweaveAddress(query)) {
      const user = balances.find((usr) => usr.address === query);
      const domain = user?.primary_domain
        ? `${user.primary_domain}.ar`
        : undefined;

      if (full) {
        res.send(user);
        return;
      }
      res.send({
        domain,
      });
      return;
    }
    const normalizedDomain = normalizeDomain(query);
    const user = balances.find(
      (usr) => usr.primary_domain === normalizedDomain
    );
    const address = user?.address ? user.address : undefined;
    if (full) {
      res.send(user);
      return;
    }
    res.send({ address });
    return;
  } catch (error) {
    console.log(error);
    res.send({
      error:
        "invalid query paramater. Provide a valid ANS domain or Arweave address",
    });
    return;
  }
});

app.get("/resolve-subdomain/:parent_domain/:query", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { query, parent_domain } = req.params;
    const normalizedDomain = normalizeDomain(parent_domain);
    const balances = await readContract();
    const domains = balances
      .map((usr) => usr.ownedDomains)
      .flat()
      .filter((domain) => domain.subdomains.length);
    const parent = domains.find((domain) => domain.domain === normalizedDomain);

    const subdomains = parent.subdomains.filter((subdomain) => subdomain.owner);

    if (isArweaveAddress(query)) {
      const user = subdomains.find((sub) => sub.owner === query);
      const subdomain = user?.subdomain
        ? `${normalizedDomain}.${user.subdomain}.ar`
        : undefined;
      res.send({
        subdomain,
      });
      return;
    }
    const normalizedSubdomain = normalizeDomain(query);
    const user = subdomains.find(
      (sub) => sub.subdomain === normalizedSubdomain
    );
    const address = user?.owner ? user.owner : undefined;

    res.send({ address });
    return;
  } catch (error) {
    console.log(error);
    res.send({
      error:
        "invalid query paramater. Provide a valid ANS subdomain or Arweave address",
    });
    return;
  }
});

app.listen(port, async () => {
  console.log(`listening at PORT: ${port}`);
});
