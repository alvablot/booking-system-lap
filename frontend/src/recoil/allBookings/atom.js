
import { atom } from "recoil";

export const allBookingsState = atom({
  key: "bookings",
  default: [],
});