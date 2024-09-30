import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Home.css';

const categories = [
    'Genel', 'İş', 'Okul', 'Kişisel', 'Alışveriş', 'Spor', 'Sağlık', 'Eğlence', 'Seyahat', 'Teknoloji',
    // Diğer kategoriler...
];

const Home = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [category, setCategory] = useState('');

    const navigate = useNavigate();

    // Çıkış yapma fonksiyonu
    const handleLogout = async () => {
        try {
            await auth.signOut();  // Firebase oturum kapatma
            navigate('/login');  // Çıkış yaptıktan sonra giriş sayfasına yönlendir
        } catch (error) {
            console.log('Çıkış yaparken bir hata oluştu:', error);
        }
    };

    const addTask = (e) => {
        e.preventDefault();
        if (task) {
            const newTask = { text: task, completed: false, category: category || 'Genel' };
            if (editingIndex >= 0) {
                const updatedTasks = tasks.map((t, index) => (index === editingIndex ? newTask : t));
                setTasks(updatedTasks);
                setEditingIndex(-1);
            } else {
                setTasks([...tasks, newTask]);
            }
            setTask('');
            setCategory('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((t, i) => {
            if (i === index) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const editTask = (index) => {
        setTask(tasks[index].text);
        setCategory(tasks[index].category);
        setEditingIndex(index);
    };

    return (
        <div className="home-container">
            <h1>Todo List Uygulaması</h1>

            {/* Çıkış yap butonu */}
            <button onClick={handleLogout} className="logout-button">
                Çıkış Yap
            </button>

            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    placeholder="Yeni görev ekle..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="task-input"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="task-select"
                >
                    <option value="">Kategori Seçin...</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
                <button type="submit" className="task-button">
                    {editingIndex >= 0 ? 'Düzenle' : 'Ekle'}
                </button>
            </form>

            <ul className="task-list">
                {tasks.map((t, index) => (
                    <li key={index} className={`task-item ${t.completed ? 'completed' : ''}`}>
                        <span onClick={() => toggleTaskCompletion(index)} className="task-text">
                            {t.text} <span className="task-category">({t.category})</span>
                            {t.completed && <span className="completed-text"> - Tamamlandı</span>}
                        </span>
                        <div className="task-actions">
                            <button onClick={() => editTask(index)} className="edit-button">Düzenle</button>
                            <button onClick={() => deleteTask(index)} className="delete-button">Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
