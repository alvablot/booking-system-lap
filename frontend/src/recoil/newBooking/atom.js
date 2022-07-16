import { atom } from "recoil";

export const newBookingState = atom({
  key: "booking",
  default: [
    {
      headline: "Bajs",
    },
  ],
});
