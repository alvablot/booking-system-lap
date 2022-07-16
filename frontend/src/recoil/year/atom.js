import { atom } from "recoil";
const now = new Date();
const year = now.getYear();

export const yearState = atom({
  key: "year",
  default: [year + 1900],
});
