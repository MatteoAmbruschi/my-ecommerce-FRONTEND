import Layout from '@/components/Layout'
import styles from './changeDetails.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Lottie from 'react-lottie';
import confetti from '../../../components/lotties/confetti.json'
import Title from '@/components/title/Title'

export default function ChangeDetails() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ nome: '', cognome: '', password: '' });
    const [oldPass, setOldPass] = useState('');
    const [lottie, setLottie] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_URL + 'dashboard', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    setUser(response.data);
                } else if (response.status === 401) {
                    setError(response.message);
                    router.push('/sign-in', undefined, { scroll: false });
                } else {
                    router.push('/sign-in', undefined, { scroll: false });
                    setError(response.message);
                }
            } catch (error) {
                router.push('/sign-in', undefined, { scroll: false });
                console.error('Error fetching user data:', error);
                setError('You are not logged in');
            }
        };
      
        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({ nome: user.nome, cognome: user.cognome, password: '' });
        }
    }, [user]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_URL + 'users', formData, { withCredentials: true });
            if (response.status === 200) {
                setLottie(true)
                setError('');
                setOldPass('')
                setFormData({ ...formData, password: '' })
            } else if (response.status === 401) {
                const result = response.data;
                setError(result.message || 'Sign-in Failed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const checkPassword = (e) => {
        setOldPass(e.target.value);
    };

    const checkLogin = async (e) => {
        e.preventDefault();
        const loginData = { email: user.email, password: oldPass };

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_URL + 'login', loginData, { withCredentials: true });

            if (response.status === 200) {
                setError('');
                await handleSubmit(e); 
            } else if (response.status === 401 || response.status === 500) {
                const result = error.response.data;
                setError(result.message || 'Sign-in Failed');
            }
        } catch (error) {

            if (error.response.status === 401 || error.response.status === 500) {
                const result = error.response.data;
                setError(result.message || 'Sign-in Failed');
            }
            console.log('Login error:', error);
        }
    };


    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: confetti,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const eventListeners = [
        {
            eventName: 'complete',
            callback: () => setLottie(false),
        },
    ];

    return (
        <Layout>
            <Title><h1>Change Data<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
            {!user ? 'Loading...' : 
            <>
                <form onSubmit={handleSubmit} className={styles.containerForm}>
                    <div className={styles.containerName}>
                        <Image src='/account.svg' width={50} height={50} alt='icon account' />
                        <section>
                            <label htmlFor="nome">Your Name</label>
                            <input type="text" id="nome" name="nome" placeholder={user.nome} value={formData.nome} onChange={handleChange} />
                        </section>
                        <section>
                            <label htmlFor="cognome">Your Last Name</label>
                            <input type="text" id="cognome" name="cognome" placeholder={user.cognome} value={formData.cognome} onChange={handleChange} />
                        </section>
                        <button type="submit">MODIFY</button>
                    </div>
                </form>

                <form onSubmit={checkLogin} className={styles.containerForm}>
                    <div className={styles.containerName}>
                        <Image src='/password.svg' width={50} height={50} alt='icon of password' />
                        <section>
                            <label htmlFor="oldPassword" className={error === 'Incorrect password' ? styles.errorPassword : ''}>Your Current Password</label>
                            <input type="password" id="oldPassword" name="oldPassword" placeholder='********' value={oldPass} onChange={checkPassword} minLength={6} maxLength={12} required />
                        </section>
                        <section>
                            <label htmlFor="password">New Password</label>
                            <input type="password" id="password" name="password" placeholder='********' value={formData.password} onChange={handleChange} minLength={6} maxLength={12} required />
                        </section>
                        <button type="submit">MODIFY</button>
                    </div>
                    {error && <div className={styles.errors}>Error: {error}</div>}
                </form>

                {lottie ? <div className={styles.lottie}><Lottie options={defaultOptions} eventListeners={eventListeners} /></div> : ''}
            </>
            }
        </Layout>
    );
}
