import axios from "axios";
import { useRouter } from "next/router";
import styles from './payButton.module.css'

const PayButton = ({ cartItems, setIsLoading }) => {
    const router = useRouter();

    const handleCheckout = async () => {
        setIsLoading(true)
        if(cartItems && cartItems[0].total_elements > 0){
            axios.post(`${process.env.NEXT_PUBLIC_URL}stripe/create-checkout-session`, {
                cartItems,
            }).then((res) => {
                if(res.data.url){
                    router.push(res.data.url, undefined, { scroll: false })
                } else {
                    setIsLoading(false)
                }
            }).catch((err) => {
                console.log(err.message)
                setIsLoading(false)
            })


        console.log(cartItems)  
      } else {
        console.log('user or cartItems not founded')
      }
    };
  
    return (
        <>
        <button type="submit" className={styles.styleButton} onClick={handleCheckout}>Check Out</button>
        </>
    );
  };

  export default PayButton