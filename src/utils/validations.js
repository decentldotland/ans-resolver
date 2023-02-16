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

function validateAnsDomainSyntax(domain) {
  try {
    assert.equal(/^[a-z0-9]{2,15}$/.test(domain), true);
  } catch (error) {
    throw error;
  }
}
