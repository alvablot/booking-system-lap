import { atom } from "recoil";

let timeArray = [];
for(let i = 0; i < 24; i++) {
 if(i < 10) timeArray[i] = `0${i}:00`;
 else timeArray[i] = `${i}:00`;
}
export const allTimeState = atom({
  key: "time",
  default: [...timeArray],
});
