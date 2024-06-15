import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import axios from 'axios';
import Image from "next/image";
import styles from './profile.module.css'
import Link from 'next/link';
import Title from '@/components/title/Title';


export default function Profile({ charge, setCharge}) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(process.env.NEXT_PUBLIC_URL + 'dashboard', { 
          headers: { 
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
         });
        if (response.status === 200) {
          setUser(response.data);
        } else if (response.status === 401) {
          setError(response.message);
          router.push('/sign-in', undefined, { scroll: false })
        } else {
          router.push('/sign-in', undefined, { scroll: false })
          setError(response.message);
        }
      } catch (error) {
        router.push('/sign-in', undefined, { scroll: false })
        console.error('Error fetching user data:', error);
        setError('You are not logged in');
      }
    };

    fetchUserData();
  }, []);

  
  async function logOut() {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_URL + 'logout', {}, { withCredentials: true });
      if (response.status === 200) {
        console.log(response);
        router.push('/sign-in', undefined, { scroll: false });
        setCharge(charge + 1)
      } else {
        alert('Error in the Logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error in the Logout');
    }
  }

  
  return (
    <Layout>
      {!user ? (
        <div className={styles.error}>
          <h2>{error}<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h2>
        </div>
      ) : (
        
      <div className={styles.container}>
        <Title><h1>Hi, {user.nome}<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>

        <section className={styles.parent}>
         <Link scroll={false} className={styles.selection} href={'/profile/shipments'}>shipments<Image src='/arrow3.png' width={20} height={20} alt='asterisco usato come logo' /></Link>
         <Link scroll={false} className={styles.selection} href={'/profile/orders'}>Orders<Image src='/arrow3.png' width={20} height={20} alt='asterisco usato come logo' /></Link>
         <Link scroll={false} className={styles.selection} href={'/profile/details'}>Change details<Image src='/arrow3.png' width={20} height={20} alt='asterisco usato come logo' /></Link>
         <div className={`${styles.selection} ${styles.logout}`} onClick={logOut}>Log-Out<Image src='/arrow3.png' width={20} height={20} alt='asterisco usato come logo' /></div>
        </section>
        
      </div>
      )}
    </Layout>
  );
}
