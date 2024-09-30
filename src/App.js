import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { auth, db } from './firebase'; // Firebase Auth ve Firestore import

const App = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null); // Kullanıcı verileri için state

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user); // Kullanıcı oturum açtıysa, kullanıcıyı state'e kaydedin

                // Firestore'dan kullanıcı verilerini almak
                const userRef = db.collection('users').doc(user.uid); // db yerine kullanın
                const doc = await userRef.get();
                if (doc.exists) {
                    console.log("Kullanıcı Verileri:", doc.data());
                    setUserData(doc.data()); // Kullanıcı verilerini state'e kaydedin
                } else {
                    console.log("Kullanıcı verisi bulunamadı");
                }
            } else {
                setUser(null); // Kullanıcı çıkış yaptıysa, state'i temizleyin
                setUserData(null); // Kullanıcı verilerini de temizleyin
            }
        });

        return () => unsubscribe(); // Bileşen unmount olduğunda dinleyiciyi kaldırın
    }, []);

    const updateUserData = async (newData) => {
        if (user) {
            const userRef = db.collection('users').doc(user.uid); // db yerine kullanın
            await userRef.set(newData, { merge: true }); // Kullanıcı verilerini güncelle
            setUserData((prevData) => ({ ...prevData, ...newData })); // State'i güncelle
        }
    };

    return (
        <Router>
            <Routes>
                {/* Eğer kullanıcı oturum açtıysa Home sayfasına, açmadıysa Login sayfasına yönlendir */}
                <Route path="/" element={user ? <Home userData={userData} updateUserData={updateUserData} /> : <Navigate to="/login" />} />
                {/* Eğer kullanıcı oturum açtıysa Signup ve Login sayfalarına gitmesine izin verme */}
                <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            </Routes>
        </Router>
    );
};

export default App;
