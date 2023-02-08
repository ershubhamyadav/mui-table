import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase-config";

export const deleteCart = async (client_id) => {
  const emd = doc(db, "cart-list", client_id);
  await deleteDoc(emd);
  try {
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};

export const fetchCartList = async () => {
  const clientCollection = collection(db, "cart-list");
  try {
    const res = await getDocs(clientCollection);
    return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    return { ...error, status: false };
  }
};

export const addCart = async (payload) => {
  const contactCollection = collection(db, "cart-list");

  const emd = await addDoc(contactCollection, payload);
  try {
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};
