import axios from "axios";
import { ANS_CONTRACT_ADDRESS } from "./constants.js";

export async function readContract() {
  try {
    const state = (
      await axios.get(`https://api.exm.dev/read/${ANS_CONTRACT_ADDRESS}`)
    )?.data;
    return state?.balances;
  } catch (error) {
    return {};
  }
}
