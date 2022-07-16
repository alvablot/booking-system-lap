import { atom } from "recoil";
const now = new Date();
const month = now.getMonth();

export const monthState = atom({
  key: "month",
  default: [month + 1],
});
