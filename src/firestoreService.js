import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "./firebase-config";

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
    console.log("emd", emd);
    return { status: true };
  } catch (error) {
    //   console.log("sdasd", res);
    return { ...error, status: false };
  }
};

/////////////////////////// collection contact-us //////////////////////////

export const addContactQuery = async (payload) => {
  const contactCollection = collection(db, "contact-us");
  const emd = await addDoc(contactCollection, payload);
  try {
    console.log("emd", emd);
    return { status: true };
  } catch (error) {
    //   console.log("sdasd", res);
    return { ...error, status: false };
  }
};
///////////////////////////////////////////////////////////////////////////////

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
    //   console.log("sdasd", res);
    return { ...error, status: false };
  }
};
////////////////////////////////////// cart item //////////////////////////////////////////

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
    console.log("emd", emd);
    return { status: true };
  } catch (error) {
    //   console.log("sdasd", res);
    return { ...error, status: false };
  }
};
