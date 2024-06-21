import axios from "axios";
import { useRouter } from "next/router";

const PayButton = ({ cartItems }) => {
    const router = useRouter();
  
    const handleCheckout = async () => {
        axios.post(`${process.env.NEXT_PUBLIC_URL}create-checkout-session`, {
            cartItems,
        }).then((res) => {
            if(res.data.url){
                router.push(res.data.url, undefined, { scroll: false })
            }
        }).catch((err) => console.log(err.message))


      console.log(cartItems)  
      
    };
  
    return (
        <button type="submit" onClick={handleCheckout}>Check Out</button>
    );
  };

  export default PayButton