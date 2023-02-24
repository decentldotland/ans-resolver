import assert from "node:assert";

export function isArweaveAddress(address) {
  return /[a-z0-9_-]{43}/i.test(address);
}

export function normalizeDomain(domain) {
  try {
    const caseFolded = domain.toLowerCase();
    const normalizedDomain = caseFolded.normalize("NFKC");
    validateAnsDomainSyntax(normalizedDomain);
    return normalizedDomain;
  } catch (error) {
    throw error;
  }
}

export async function arPageUser(user) {
  try {
    const delKeys = ["address", "primary_domain", "ownedDomains", "color"];
    user.user = user.address;
    user.currentLabel = user.primary_domain;
    user.ownedLabels = user.ownedDomains;
    for (const domain of user.ownedLabels) {
      domain.label = domain.domain;
    }

    user.nickname = `${user.primary_domain}.ar`;
    user.bio = `an Arweaver from the permaweb`;
    user.address_color = user.ownedLabels[0].color;
    user.avatar = "";
    user.links = {};

    for (const key of delKeys) {
      delete user[key];
    }

    return user;
  } catch (error) {
    console.log(error);
    return user;
  }
}
function validateAnsDomainSyntax(domain) {
  try {
    assert.equal(/^[a-z0-9]{2,15}$/.test(domain), true);
  } catch (error) {
    throw error;
  }
}
