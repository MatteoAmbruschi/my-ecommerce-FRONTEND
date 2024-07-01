import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import FirstWrite from "@/components/firstWrite/FirstWrite";
import Title from "@/components/title/Title";
import { useState } from "react";
import { useRouter } from 'next/router';

import stylesForm from '../register/register.module.css'
import styles from './contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({ nome: '', cognome: '', email: '', message: '' });
  const [errors, setErrors] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
   };

   const handleSubmit = async (e) => {
    e.preventDefault()
   }
   

  return (
    <>
      <Layout>
        <Title><h1>Contact<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
        <FirstWrite 
        h22={'Our Story'}
        p1={'Welcome to our online store, where simplicity meets sophistication. Our journey began in the heart of Milan, Italy, a city known for its rich fashion heritage and cutting-edge style. Inspired by the timeless elegance and clean lines of modern design, we founded our store with a vision to create high-quality, minimalist clothing that embodies both functionality and beauty.'} 
        h23={'The Founders'}
        
        p2={'Our store was established in 2015 by two lifelong friends, Matteo Rossi and Luca Bianchi, who shared a passion for fashion and a dream of creating their own brand. With backgrounds in fashion design and business management, they combined their skills and vision to bring this project to life. Their goal was to create a store that not only offered stylish, contemporary clothing but also promoted sustainable and ethical practices in the fashion industry.'}
        />

            <form onSubmit={handleSubmit} className={stylesForm.formContainer}>
              <h2>Write Us Below</h2>

              <div className={stylesForm.names}>
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
                
                <label htmlFor="message"><i>Message:</i></label>
                <textarea type="text" id="message" name="message" minLength={6} maxLength={12} value={formData.message} onChange={handleChange} placeholder="Message" required />
                
                <button type="submit">SEND EMAIL</button>

                <p className={stylesForm.err}>{errors}</p>
            </form>

        <FirstWrite 
        h22={'Our Philosophy'}
        p1={"We believe that less is more. Our designs are characterized by clean lines, neutral colors, and a focus on quality over quantity. Each piece in our collection is thoughtfully designed to be versatile and timeless, allowing our customers to create a wardrobe that transcends trends and seasons. We are committed to sustainability and ethical production. From sourcing eco-friendly materials to ensuring fair wages and safe working conditions for our workers, we strive to make a positive impact on both the fashion industry and the environment."} 
        h23={'Join Our Community'}
        p2={"Our store is more than just a clothing brand; it's a community of like-minded individuals who appreciate the beauty of simplicity and the importance of sustainability. We invite you to join us on our journey by following us on social media, subscribing to our newsletter, and sharing your looks with us using the hashtag #YourEcommerce. Thank you for being a part of our story. We look forward to helping you build a wardrobe that reflects your unique style and values."}
        />
      </Layout>
    </>
  );
}