import Layout from "@/components/Layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "@/components/title/Title";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from "axios";

import '@splidejs/react-splide/css';
import styles from './product.module.css';


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
    `Introducing our exclusive <strong>${product?.nome}</strong>, a flagship product in the <strong>${product?.categoria}</strong> category. Made with excellent materials such as <strong>${product?.materiali}</strong>, available in various sizes including <strong>${product?.taglie?.join(', ')}</strong>, to ensure maximum comfort. Priced at <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> offers an ideal balance of elegance and functionality. ${product?.descrizione}`,
    `Explore the quality of the <strong>${product?.nome}</strong>, a jewel in the <strong>${product?.categoria}</strong> category. Built with high-end materials like <strong>${product?.materiali}</strong>, and available in sizes like <strong>${product?.taglie?.join(', ')}</strong> for a tailored fit. With a price of <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> represents the perfect combination of aesthetics and utility. ${product?.descrizione}`,
    `Discover the innovation of the <strong>${product?.nome}</strong>, a leading product in the <strong>${product?.categoria}</strong> category. Made with premium materials like <strong>${product?.materiali}</strong>, available in sizes including <strong>${product?.taglie?.join(', ')}</strong> for exceptional comfort. Priced at <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> combines sophisticated design and practicality. ${product?.descrizione}`,
    `Experience our <strong>${product?.nome}</strong>, an extraordinary item in the <strong>${product?.categoria}</strong> category. Created with superior materials like <strong>${product?.materiali}</strong>, it is available in various sizes, including <strong>${product?.taglie?.join(', ')}</strong>, for a perfect fit. Priced at <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> offers an unbeatable mix of style and functionality. ${product?.descrizione}`,
    `Discover our exceptional <strong>${product?.nome}</strong>, a unique product in the <strong>${product?.categoria}</strong> category. Made with high-quality materials like <strong>${product?.materiali}</strong>, it is available in various sizes, including <strong>${product?.taglie?.join(', ')}</strong>, to ensure a perfect fit. Offered at a price of <strong>€${product?.prezzo}</strong>, <strong>${product?.nome}</strong> combines style and functionality, making it ideal for any occasion. ${product?.descrizione}`
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
          const response = await axios.put(process.env.NEXT_PUBLIC_URL + `cart/${find.carrello_id}`, {quantita: find.quantita + 1}, {
            headers: { Authorization: token },
            withCredentials: true
          });
          if(response.status === 200){
            await setCharge(prevCharge => prevCharge + 1);
            await setOpenCart(openCart + 1);
            console.log('aumentato')
          } else{
            console.log(response.data.message)
          }
        }
        catch(error) {
          console.log(error.response.data.message);
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
            await setCharge(prevCharge => prevCharge + 1);
            await setOpenCart(openCart + 1);
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
              <Image src={`/uploads/${product.image_urls[1]}`} width={700} height={1200} alt={`Image of ${product.categoria}`}/>
            </SplideSlide>
          </Splide>
          </div>
        </div>
      }
    </Layout>
  );
}