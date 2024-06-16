import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import styles from './register.module.css';
import { useState } from "react";
import { useRouter } from 'next/router';
import Title from "@/components/title/Title";

export default function Register() {
  const [formData, setFormData] = useState({ nome: '', cognome: '', email: '', password: '' });
  const [errors, setErrors] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
   const { name, value } = e.target
   setFormData({...formData, [name]: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_URL + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok) {
        router.push('/sign-in', undefined, { scroll: false });
        setErrors('');
      }
      else if(res.status === 400){
        const result = await res.json();
        setErrors(result.error || 'Failed');
      }
      else if(res.status === 401){
        const result = await res.json();
        setErrors(result.error || 'Failed');
      }
      else if(res.status === 406){
        const result = await res.json();
        setErrors(result.error || 'Failed');
      }
      else if(res.status === 500){
        const result = await res.json();
        setErrors(result.error || 'Failed');
      }
    }
    catch(e) {
      console.error('Errore:', e);
      alert('Error during registration');
    }
  }

  return (
      <Layout>
      <Title><h1>OH, HI<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2>Enter your details below</h2>

              <div className={styles.names}>
                <div>
                  <label htmlFor="nome"><i>Name:</i></label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Name" required />
                </div>
                <div>
                  <label htmlFor="cognome"><i>Last name:</i></label>
                  <input type="text" id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} placeholder="Last name" required />
                </div>
              </div>

                <label htmlFor="email"><i>Email:</i></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                
                <label htmlFor="password"><i>Password:</i></label>
                <input type="password" id="password" name="password" minLength={6} maxLength={12} value={formData.password} onChange={handleChange} placeholder="Password" required />
                
                <button type="submit">CREATE ACCOUNT</button>

                <p className={styles.err}>{errors}</p>
            </form>
      </Layout>
  );
}