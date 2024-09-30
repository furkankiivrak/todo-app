import React, { useState } from 'react';
import { auth } from '../firebase'; // Firebase ayarlarınızı doğru dosyadan import edin
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Yönlendirme için useNavigate kullanıyoruz

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Firebase ile kullanıcı kaydı
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.'); // Başarılı kayıt mesajı

            // Kayıt başarılı olduktan sonra login sayfasına yönlendir
            navigate('/login'); 

            // Formu temizle
            setFirstName('');
            setLastName('');
            setPhone('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message); // Hata mesajını göster
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Kayıt Ol</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="İsim"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="signup-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Soy İsim"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="signup-input"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Telefon Numarası"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="signup-input"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="signup-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="signup-input"
                        required
                    />
                    <button type="submit" className="signup-button">Kayıt Ol</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
