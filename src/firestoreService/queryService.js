import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase-config";

export const addContactQuery = async (payload) => {
  const contactCollection = collection(db, "contact-us");
  const emd = await addDoc(contactCollection, payload);
  try {
    console.log("emd", emd);
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};
