import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styles from './payment.module.css';
import PayButton from "@/components/payButton/PayButton";
import Image from "next/image";


export default function Payment({ charge, setCharge, openCart }) {
  const [user, setUser] = useState(null);
  const [loggedError, setLoggedError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}cart`, {
          headers: { Authorization: token },
          withCredentials: true
        });
        if (response.status === 200) {
          setUser(response.data);
          setLoggedError(false);
        } else {
          setLoggedError(true);
        }
      } catch (error) {
        setLoggedError(true);
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [charge]);

  const stripePromise = loadStripe(`${process.env.PK_TEST}`);

  return (
    <Layout>
      <h1>Payment<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1>

        <Elements stripe={stripePromise}>
          <PayButton cartItems={user} />
        </Elements>

    </Layout>
  );
}