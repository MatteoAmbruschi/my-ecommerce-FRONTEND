import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import { useState } from "react";
import Cart from "@/components/cart/Cart";

export default function App({ Component, pageProps, router }) {
  const [charge, setCharge] = useState(0);
  const [openCart, setOpenCart] = useState(0)

  return (
    <main>
      <Nav />
      <Cart charge={charge} setCharge={setCharge} openCart={openCart} />
      <AnimatePresence mode='wait'>
        <Component 
          key={router.route} 
          charge={charge} 
          setCharge={setCharge}
          openCart={openCart}
          setOpenCart={setOpenCart}
          {...pageProps} 
        />
      </AnimatePresence>
      <Footer />
    </main>
  );
}
