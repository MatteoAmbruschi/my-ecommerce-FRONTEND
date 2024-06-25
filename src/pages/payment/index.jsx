import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styles from './payment.module.css';
import PayButton from "@/components/payButton/PayButton";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/title/Title";


export default function Payment({ charge, setCharge, openCart }) {
  const [user, setUser] = useState(null);
  const [loggedError, setLoggedError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [charge]);




  const handleLess = async (key) => {
    console.log(key)
    try {
      const token = localStorage.getItem('authToken');
      if(key.quantita > 1){
        const response = await axios.put(process.env.NEXT_PUBLIC_URL + `cart/${key.carrello_id}`, {quantita: key.quantita - 1}, {
          headers: { Authorization: token },
          withCredentials: true
        });
        if(response.status === 200){
          await setCharge(prevCharge => prevCharge + 1);
          console.log(response.data.message)
        } else{
          console.log('errore')
      }
    } else {
      const response = await axios.delete(process.env.NEXT_PUBLIC_URL + `cart/${key.carrello_id}`, {
        headers: { Authorization: token },
        withCredentials: true
      });
      if(response.status === 200){
        setCharge(prevCharge => prevCharge + 1);
        console.log(response.data.message)
      } else{
        alter('errore')
    }
    }
    }
    catch(error) {
      console.log(error.response.message);
    }
  }



  const handleAdd = async (key) => {
    console.log(key)
    try {
      const token = localStorage.getItem('authToken');
        const response = await axios.put(process.env.NEXT_PUBLIC_URL + `cart/${key.carrello_id}`, {quantita: key.quantita + 1}, {
          headers: { Authorization: token },
          withCredentials: true
        });
        if(response.status === 200){
          await setCharge(prevCharge => prevCharge + 1);
          console.log(response.data.message)
        } else{
          console.log('errore')
      }
    }
    catch(error) {
      console.log(error.response.message);
    }
  }



  const stripePromise = loadStripe(`${process.env.PK_TEST}`);

  return (
    <Layout>
      <Title><h1>Payment<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>

     { isLoading ? 
        <div className={styles.loading}>
          <h2>Loading...</h2>
        </div>
       : 
            user && !loggedError && user[0].total_elements > 0 ?  
          <div className={styles.container}>
            <div className={styles.containerProductOut}>
              <hr style={{marginTop:20}} />
                {user.map((key) => (
                  <>
                    <div key={key.id} className={styles.containerProduct}>
                        <Link scroll={false} href={`/products/${key.prodotto_id}`}><Image src={`/uploads/${key.image_urls[0]}`} width={180} height={300} alt={`Image of ${key.categoria}`}></Image></Link>
                        <div className={styles.descriptionsProducts}>
                          <div className={styles.categoria}>
                            <p>{key.nome}&nbsp;</p> - <p>&nbsp;{key.categoria}</p>
                          </div>           
                          <div className={styles.price}>
                            <p>Price: {key.prezzo}€</p>
                          </div>
                          <div className={styles.taglie}>
                            <p>Size: {key.taglia_selezionata}</p>
                          </div>        
                          <div className={styles.quantita}>
                            <p>Quantity: {key.quantita}</p>
                          </div>       
                        </div>

                        <div className={styles.buttons}>
                          <button className={styles.eliminate} onClick={() => handleAdd(key)}>
                            <svg viewBox="0 0 24 24" width="25px" height="25px" fill="currentColor" aria-labelledby="delete-the-item-:rq:" focusable="false" aria-hidden="false" role="img"><title id="elimina-l’articolo-:rq:">Delete the item</title>
                              <path d="m13.057 11.996 7.723-7.723a.75.75 0 1 0-1.06-1.06l-7.724 7.723-7.723-7.724a.75.75 0 1 0-1.06 1.061l7.723 7.723-7.716 7.717a.75.75 0 1 0 1.06 1.06l7.716-7.716 7.717 7.716a.747.747 0 0 0 1.06 0 .75.75 0 0 0 0-1.06l-7.716-7.717z"></path>
                            </svg>
                          </button>
                          <button className={styles.eliminate} onClick={() => handleLess(key)}>
                            <svg viewBox="0 0 24 24" width="25px" height="25px" fill="currentColor" aria-labelledby="delete-the-item-:rq:" focusable="false" aria-hidden="false" role="img"><title id="elimina-l’articolo-:rq:">Delete the item</title>
                              <path d="m13.057 11.996 7.723-7.723a.75.75 0 1 0-1.06-1.06l-7.724 7.723-7.723-7.724a.75.75 0 1 0-1.06 1.061l7.723 7.723-7.716 7.717a.75.75 0 1 0 1.06 1.06l7.716-7.716 7.717 7.716a.747.747 0 0 0 1.06 0 .75.75 0 0 0 0-1.06l-7.716-7.717z"></path>
                            </svg>
                          </button>
                        </div>

                    </div>

                    <hr />
                  </>
                ))}
            </div>
              
              <div className={styles.containerBottom}>
                <div className={styles.shipping}><p>Shipping:</p> <p>Free</p></div>
                <div className={styles.totalPrice}><p>Total Price:</p> <p>{user.reduce((accumulator, currentUser) => accumulator + (Number(currentUser.prezzo_tot) || 0), 0).toFixed(2)}€</p></div>
          
              <Elements stripe={stripePromise}>
                <PayButton cartItems={user} />
              </Elements>
              </div>
              
          </div>
            : 
            <div className={styles.emptyCart}>
              <p>You don&apos;t have any products in your cart</p>
            </div>
            }
    </Layout>
  );
}