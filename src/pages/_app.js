import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import { useState, useEffect } from "react";
import Cart from "@/components/cart/Cart";
import { fixTimeoutTransition } from "@/components/fixTimeoutTransition/fixTimeoutTransition";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps, router }) {
  const [charge, setCharge] = useState(0);
  const [openCart, setOpenCart] = useState(0)

  useEffect(() => {
    fixTimeoutTransition(800);
  }, [])


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

      <GoogleAnalytics gaId="G-5FSHPDDV7Y" />
    </main>
  );
}
