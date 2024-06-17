import Layout from "@/components/Layout";
import styles from './product.module.css'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "@/components/title/Title";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from "axios";

import '@splidejs/react-splide/css';


export default function Product({charge, setCharge, openCart, setOpenCart}) {
  const [product, setProduct] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [random, setRandom] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [products, setProducts] = useState()

  const [error, setError] = useState(null)

  useEffect(() => {
    if (!router.isReady || isNaN(id)) return;

    async function handleProduct() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}products/${id}`);
        const json = await response.json();
        setProduct(json[0]);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }

    handleProduct();
    setRandom(Math.floor(Math.random() * 5));
  }, [router.isReady, id]);

  const stories = [
    `Presentiamo il nostro esclusivo <strong>${product?.nome}</strong>, un prodotto di punta nella categoria <strong>${product?.categoria}</strong>. Fabbricato con materiali eccellenti come <strong>${product?.materiali}</strong>, disponibile in diverse taglie, tra cui <strong>${product?.taglie?.join(', ')}</strong>, per assicurare il massimo comfort. Al prezzo di <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> offre un equilibrio ideale tra eleganza e funzionalità. ${product?.descrizione}`,
    `Esplora la qualità del <strong>${product?.nome}</strong>, un gioiello nella categoria <strong>${product?.categoria}</strong>. Costruito con materiali di alta gamma come <strong>${product?.materiali}</strong>, e disponibile in taglie come <strong>${product?.taglie?.join(', ')}</strong> per una vestibilità su misura. Con un prezzo di <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> rappresenta la perfetta combinazione di estetica e utilità. ${product?.descrizione}`,
    `Scopri l'innovazione del <strong>${product?.nome}</strong>, un prodotto leader nella categoria <strong>${product?.categoria}</strong>. Realizzato con materiali di pregio come <strong>${product?.materiali}</strong>, disponibile in taglie tra cui <strong>${product?.taglie?.join(', ')}</strong> per un comfort eccezionale. Con un prezzo di <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> unisce design sofisticato e praticità. ${product?.descrizione}`,
    `Vivi l'esperienza del nostro <strong>${product?.nome}</strong>, un elemento straordinario nella categoria <strong>${product?.categoria}</strong>. Creato con materiali superiori come <strong>${product?.materiali}</strong>, è disponibile in varie taglie, incluso <strong>${product?.taglie?.join(', ')}</strong>, per una vestibilità perfetta. Al prezzo di <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> offre un mix imbattibile di stile e funzionalità. ${product?.descrizione}`,
    `Scopri il nostro eccezionale <strong>${product?.nome}</strong>, un prodotto unico nella categoria <strong>${product?.categoria}</strong>. Realizzato con materiali di alta qualità come <strong>${product?.materiali}</strong>, è disponibile in diverse taglie, tra cui <strong>${product?.taglie?.join(', ')}</strong>, per garantirti una vestibilità perfetta. Offerto a un prezzo di <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> combina stile e funzionalità, ed è ideale per ogni occasione. ${product?.descrizione}`
  ];
  


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(process.env.NEXT_PUBLIC_URL + 'cart', {
          headers: { Authorization: token },
          withCredentials: true
        });
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('Error fetching cart data');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCart();
  }, [charge]);


  const handleCart = () => {
    if (!products) {
      setOpenCart(openCart + 1);
      return;
    }
    else if (sizeSelected === false || sizeSelected === null) {
      setError(true);
      setOpenMenu(true);
      return;
    } 

    const data = { id: product.id, sizeSelected };
    const find = products?.find((item) => item.prodotto_id === data.id && item.taglia_selezionata === data.sizeSelected);
    console.log(find);

    if (find) {
      const handleAdd = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.put(process.env.NEXT_PUBLIC_URL + `cart/${find.carrello_id}`, {...find, quantita: find.quantita + 1}, {
            headers: { Authorization: token },
            withCredentials: true
          });
          if(response.status === 200){
            setCharge(charge + 1);
            setOpenCart(openCart + 1);
            console.log('aumentato')
          } else{
            console.log('errore')
          }
        }
        catch(error) {
          console.log(error);
        }
      }
      handleAdd()
      return;
    }
    else {
      const handleSubmit = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}cart`, data, {
            headers: { Authorization: token },
            withCredentials: true
          });
    
          if (response.status === 200) {
            setError(false);
            setCharge(charge + 1);
            setOpenCart(openCart + 1);
          } else if (response.status === 401) {
            setOpenCart(openCart + 1);
          } else {
            setError(true);
          }
        } catch (error) {
          if(error.status === 401){
            setOpenCart(openCart + 1);
          }
          else if(error.status === 500){
            alert(error.message);
          }
          else if(error.status === 404){
            alert(error.message);
          } 
          else {
            console.error("Failed to add product to cart:", error);
            setError(true);
          }
        }
      };
      handleSubmit();
    }
  }

  
  return (
    <Layout>
      <Title><h1 style={{textTransform: 'capitalize'}}>{!product ? 'Product' : product.categoria}<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>

      {
        !product ? 
        <h2>Loading...</h2>
        :
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            <p dangerouslySetInnerHTML={{ __html: stories[random] }}></p>
            <hr className={styles.dividers}></hr>
            <div className={styles.containerButtons}>

              <button className={`${styles.cart}`} onClick={handleCart}>ADD TO CART</button>

          
            <div className={styles.wrapperSizes}>
              <div onClick={() => { setOpenMenu(!openMenu) }} className={`${styles.size} ${openMenu ? styles.arrowRotate : ''} ${error ? styles.error : ''} `}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                    <polygon points="12 17.414 3.293 8.707 4.707 7.293 12 14.586 19.293 7.293 20.707 8.707 12 17.414"/>
                  </svg>
              </div>
            <div className={`${openMenu ? styles.sizeBlock : ''} ${styles.hidden}`}>
              <div className={`${styles.containerSize}`} >
                    {product.taglie.map((taglia, i) => (
                      <div key={i} className={`${styles.sizes} ${sizeSelected === taglia ? styles.sizeSelected : ''}`} onClick={() => { setSizeSelected((prev) => prev === taglia ? false : taglia ); setError(false); }}> 
                        <p>{taglia}</p>
                      </div>
                    )
                      )}
                </div>
            </div>
          </div> 

            </div>
          </div> 
          <div
            className={`${styles.containerRight} ${isGrabbing ? styles.grabbing : ''}`}
            onMouseDown={() => setIsGrabbing(true)}
            onMouseUp={() => setIsGrabbing(false)}
            onMouseLeave={() => setIsGrabbing(false)}
          >
          <Splide
            options={ {
            type   : 'loop',
            gap   : '1rem',
            } }
            aria-label={`Images of ${product.nome}`}
          >
            <SplideSlide>
              <Image src={`/uploads/${product.image_urls[0]}`} width={700} height={1200} alt={`Image of ${product.categoria}`}/>
            </SplideSlide>
            <SplideSlide>
              <Image src={`/uploads/${product.image_urls[1]}`} width={1000} height={1500} alt={`Image of ${product.categoria}`}/>
            </SplideSlide>
          </Splide>
          </div>
        </div>
      }
    </Layout>
  );
}
