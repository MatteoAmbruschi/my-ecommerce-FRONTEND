import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PayButton = ({ cartItems }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(process.env.NEXT_PUBLIC_URL + 'dashboard', {
              headers: { Authorization: token },
              withCredentials: true
            });
            if (response.status === 200) {;
              setUser(response.data);
            } else {
              router.push('/sign-in', undefined, { scroll: false })
            }
          } catch (error) {
            router.push('/sign-in', undefined, { scroll: false })
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);


    const handleCheckout = async () => {
        if(user && cartItems && cartItems[0].total_elements > 0){
            axios.post(`${process.env.NEXT_PUBLIC_URL}stripe/create-checkout-session`, {
                cartItems,
                userId: user.email
            }).then((res) => {
                if(res.data.url){
                    router.push(res.data.url, undefined, { scroll: false })
                }
            }).catch((err) => console.log(err.message))


        console.log(cartItems)  
      } else {
        console.log('user or cartItems not founded')
      }
    };
  
    return (
        <>
        <button type="submit" onClick={handleCheckout}>Check Out</button>
        </>
    );
  };

  export default PayButton