import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import { useState } from "react";
import Cart from "@/components/cart/Cart";
import Router from 'next/router'
import { useEffect } from "react/cjs/react.production.min";


export const fixTimeoutTransition = (timeout) => {
    Router.events.on('beforeHistoryChange', () => {
        // Create a clone of every <style> and <link> that currently affects the page.
        const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
        const copies = [...nodes].map((el) => el.cloneNode(true));

        for (let copy of copies) {
            // Remove Next.js' data attributes so the copies are not removed from the DOM in the route change process.
            copy.removeAttribute('data-n-p');
            copy.removeAttribute('data-n-href');

            // Add duplicated nodes to the DOM.
            document.head.appendChild(copy);
        }

        const handler = () => {
            // Emulate a `.once` method using `.on` and `.off`
            Router.events.off('routeChangeComplete', handler);

            window.setTimeout(() => {
                for (let copy of copies) {
                    // Remove previous page's styles after the transition has finalized.
                    if (document.head.contains(copy)) {
                        document.head.removeChild(copy);
                    }
                }
            }, timeout);
        };

        Router.events.on('routeChangeComplete', handler);
    });
};


export default function App({ Component, pageProps, router }) {
  const [charge, setCharge] = useState(0);
  const [openCart, setOpenCart] = useState(0)

  useEffect(() => {
    fixTimeoutTransition(1000);
  } [])

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
