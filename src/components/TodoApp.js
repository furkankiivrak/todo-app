import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';  // Firestore ve Auth import et

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  // Görevleri Firestore'dan çek
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;

      try {
        const snapshot = await db.collection('tasks')
          .where('userId', '==', userId)  // Sadece oturum açan kullanıcının görevlerini getir
          .orderBy('createdAt', 'desc')
          .get();

        const fetchedTasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTasks(fetchedTasks);  // Görevleri state'e kaydet
      } catch (error) {
        console.error("Görevleri getirme hatası: ", error);
      }
    };

    fetchTasks();
  }, [userId]);

  // Görev ekleme fonksiyonu
  const addTask = async (taskName) => {
    try {
      await db.collection('tasks').add({
        name: taskName,
        completed: false,
        userId: userId,  // Kullanıcı ID'sini ekle
        createdAt: new Date() // veya firebase.firestore.FieldValue.serverTimestamp()
      });
      setTask('');  // Formu temizle
    } catch (error) {
      console.error("Görev ekleme hatası: ", error);
    }
  };

  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== '') {
      addTask(task);
    }
  };

  // Görev güncelleme fonksiyonu
  const updateTask = async (taskId, updatedData) => {
    try {
      await db.collection('tasks').doc(taskId).update(updatedData);
    } catch (error) {
      console.error("Görev güncelleme hatası: ", error);
    }
  };

  // Görev tamamlama işlemi
  const handleComplete = (taskId) => {
    updateTask(taskId, { completed: true });
  };

  // Görev silme fonksiyonu
  const deleteTask = async (taskId) => {
    try {
      await db.collection('tasks').doc(taskId).delete();
    } catch (error) {
      console.error("Görev silme hatası: ", error);
    }
  };

  return (
    <div>
      <h1>Görev Listesi</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Görev ekleyin" 
        />
        <button type="submit">Ekle</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name} - {task.completed ? 'Tamamlandı' : 'Tamamlanmadı'}
            <button onClick={() => handleComplete(task.id)}>Tamamla</button>
            <button onClick={() => deleteTask(task.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
