import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./firebaseconfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Register user
const signUpUser = (obj) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then(async (res) => {
        delete obj.password; // Remove password from the object
        obj.id = res.user.uid; // Set user ID

        await addDoc(collection(db, "users"), obj)
          .then(() => {
            console.log("User added to database successfully");
            resolve(obj.id);
          })
          .catch((err) => {
            console.log(err);
            reject("Failed to add user to database");
          });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

// Login user
const loginUser = (obj) => {
  return new Promise(async (resolve, reject) => {
    signInWithEmailAndPassword(auth, obj.email, obj.password)
      .then(async () => {
        const q = query(
          collection(db, "users"),
          where("id", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          reject("No user data found");
        } else {
          querySnapshot.forEach((doc) => {
            resolve(doc.data());
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Sign out user
const signOutUser = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve("User signed out successfully");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Send data to Firestore
const sendData = (obj, colName) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, colName), obj)
      .then(() => {
        resolve("Data sent to DB successfully");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Get data with UID from Firestore
const getData = async (colName, uid) => {
  try {
    const dataArr = [];
    const q = query(collection(db, colName), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });

    return dataArr; // Return fetched data
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};

// Get all data
const getAllData = async (colName) => {
  try {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, colName));
    
    querySnapshot.forEach((doc) => {
      const obj = { ...doc.data(), documentId: doc.id };
      dataArr.push(obj);
    });

    return dataArr; // Return fetched data
  } catch (error) {
    throw new Error("Error fetching all data: " + error.message);
  }
};

// Delete document by ID
const deleteDocument = async (id, name) => {
  try {
    await deleteDoc(doc(db, name, id));
    return "Document deleted";
  } catch (error) {
    throw new Error("Error deleting document: " + error.message);
  }
};

// Update document by ID
const updateDocument = async (obj, id, name) => {
  try {
    const updateRef = doc(db, name, id);
    await updateDoc(updateRef, obj);
    return "Document updated";
  } catch (error) {
    throw new Error("Error updating document: " + error.message);
  }
};

// Upload image
const uploadImage = async (files, email) => {
  const storageRef = ref(storage, email);
  try {
    await uploadBytes(storageRef, files);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url; // Return the download URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image: " + error.message);
  }
};

export { 
  auth, 
  db, 
  signUpUser, 
  loginUser, 
  signOutUser, 
  sendData, 
  getData, 
  getAllData, 
  deleteDocument, 
  updateDocument, 
  uploadImage 
};
