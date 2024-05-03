import { atom } from "jotai";

const authAtom = atom({
  email: "",
  nickName: "",
  uid: "",
});

export default authAtom;
