import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase-config";

export const deleteClient = async (client_id) => {
  const emd = doc(db, "client", client_id);
  await deleteDoc(emd);
  try {
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};

export const fetchClient = async () => {
  const clientCollection = collection(db, "client");
  try {
    const res = await getDocs(clientCollection);
    return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    return { ...error, status: false };
  }
};

export const addClient = async (payload) => {
  const contactCollection = collection(db, "client");

  const emd = await addDoc(contactCollection, payload);
  try {
    return { status: true };
  } catch (error) {
    return { ...error, status: false };
  }
};
