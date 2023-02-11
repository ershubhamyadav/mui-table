import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase-config";

export const fetchSweetList = async () => {
  const clientCollection = collection(db, "sweetList");
  const res = await getDocs(clientCollection);
  try {
    return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    return { ...error, status: false };
  }
};

export const addSweetItem = async (payload) => {
  const contactCollection = collection(db, "sweetList");

  const emd = await addDoc(contactCollection, payload);
  try {
    console.log("emd", emd);
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};

export const deleteSweet = async (_id) => {
  const emd = doc(db, "sweetList", _id);
  await deleteDoc(emd);
  try {
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};

export const updateSweet = async (_id, payload) => {
  const emd = doc(db, "sweetList", _id);
  await updateDoc(emd, payload);
  try {
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};
const sweetPro = ["name", "price", "image", "stock"];
const offerPro = [
  "title",
  "discription",
  "sweet",
  "offer",
  "experience",
  "effective"
];
{
  /**\
sweet,
offer,
cart,
order,
dispatch,
delivered
user,
payment,

*/
}
