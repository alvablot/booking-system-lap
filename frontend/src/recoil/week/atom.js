import { atom } from "recoil";

const now = new Date();
const date = now.getDate();

export const weekState = atom({
  key: "week",
  default: [date],
});
