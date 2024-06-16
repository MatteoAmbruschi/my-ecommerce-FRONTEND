import Head from "next/head";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import styles from './sign-in.module.css'
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import Title from "@/components/title/Title";

export default function SignIn({charge, setCharge}) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState('')
  const router = useRouter();

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if(token) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}login`, {
            headers: { Authorization: token },
            withCredentials: true
          });
          console.log(response.status)
          if (response.status === 200) {
            console.log(response.data)
            router.push('/profile', undefined, { scroll: false });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    checkAuth();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_URL + 'login', formData , { withCredentials: true });
    if (response.status === 200) {
      const token = response.data.token;
      if (token) {
        console.log('Token:', token);
        localStorage.setItem('authToken', token);

        router.push('/profile', undefined, { scroll: false });
        setErrors('');
        setCharge(charge + 1)
      } else {
        console.log('Token non trovato nella risposta.');
      }
    } 
    else if(response.status === 401 || response.status === 500) {
      const result = response.data;
      setErrors(result.message || 'Sign-in Failed');
    }
  } 
  catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 500) {
        const result = error.response.data;
        setErrors(result.message || 'Sign-in Failed');
      } else {
        console.error('Response error:', error.response.data);
        alert('Error in the request');
      }
    } else if (error.request) {
      console.error('Network error:', error.request);
      alert('Network error');
    } else {
      console.error('Error:', error.message);
      alert('Error in the request');
    }
  }
};
  


  return (
      <Layout>

        <Title><h1>Sign-in<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2>Enter your details below</h2>

                <label htmlFor="email"><i>Email:</i></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                
                <label htmlFor="password"><i>Password:</i></label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" minLength={6} maxLength={12} required />
                
                <button type="submit">NEXT</button>

                <p className={styles.err}>{errors}</p>
            </form>
        
          <Link href='/register' scroll={false} className={styles.account}>CREATE AN ACCOUNT</Link>
        </div>
      </Layout>
  );
}