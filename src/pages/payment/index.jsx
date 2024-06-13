import Layout from "@/components/Layout";
import styles from './payment.module.css'
import { useState, useEffect } from "react";

export default function Payment({charge, setCharge, openCart}) {
    const [user, setUser] = useState(null);
    const [loggedError, setLoggedError] = useState('');

    useEffect(() => {
        const logged = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_URL + 'cart', {
                  withCredentials: true,
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                if (response.status === 200) {
                  setUser(response.data);
                  setLoggedError(false);
                } else if (response.status === 404) {
                  setUser(response.data)
                  setLoggedError(true);
                } else if (response.status === 401) {
                  setLoggedError(true);
                } else {
                  setLoggedError(true);
                }
              } catch (loggedError) {
                setLoggedError(true);
                console.error('Error fetching user data:', loggedError);
              }
           }  
           logged()
           
       }, [charge])


       const handleAdd = async (key) => {
        console.log(key)
        try {
          if(key.quantita > 1){
            const response = await axios.put(process.env.NEXT_PUBLIC_URL + `cart/${key.carrello_id}`, {...key, quantita: key.quantita - 1}, { withCredentials: true });
            if(response.status === 200){
              setCharge(charge + 1);
              console.log('aumentato')
            } else{
              console.log('errore')
          }
        } else {
          const response = await axios.delete(process.env.NEXT_PUBLIC_URL + `cart/${key.carrello_id}`, { withCredentials: true });
          if(response.status === 200){
            setCharge(charge + 1);
            console.log('eliminato')
          } else{
            alter('errore')
        }
        }
        }
        catch(error) {
          console.log(error.response.message);
        }
      }





      
    return (
        <Layout>
            <div>ciao</div>
        </Layout>
        
    )
}