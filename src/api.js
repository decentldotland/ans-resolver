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

app.get("/resolve/:query", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { query } = req.params;
    const balances = await readContract();
    if (isArweaveAddress(query)) {
      const user = balances.find((usr) => usr.address === query);
      const domain = user?.primary_domain
        ? `${user.primary_domain}.ar`
        : undefined;
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

app.listen(port, async () => {
  console.log(`listening at PORT: ${port}`);
});
