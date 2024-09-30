// src/api.js

import { db } from './firebase'; // firebase ayarlarınıza göre import edin
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Görev ekleme
export const addTask = async (task) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            name: task.name,
            completed: false,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Görev güncelleme
export const editTask = async (taskId, updatedTask) => {
    const taskRef = doc(db, "tasks", taskId);
    try {
        await updateDoc(taskRef, updatedTask);
        console.log("Document updated");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

// Görev silme
export const deleteTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    try {
        await deleteDoc(taskRef);
        console.log("Document deleted");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};
