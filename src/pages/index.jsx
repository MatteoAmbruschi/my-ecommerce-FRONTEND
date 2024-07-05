import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import FirstWrite from "@/components/firstWrite/FirstWrite";
import styles from '../styles/home.module.css';
import Link from 'next/link';
import Title from "@/components/title/Title";
import { useState, useEffect } from "react";


export default function Home() {
  const [shuffle, setShuffle] = useState(0)

  const [maglie, setMaglie] = useState()
  const [pantolini, setPantaloni] = useState()
  const [scarpe, setScarpe] = useState()

  useEffect(() => {
    async function handleProducts() {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + 'allProducts');
      const json = await response.json();

      setMaglie(() => json.filter((maglie) => maglie.categoria === 'maglietta' ||  maglie.categoria === 'camicia' ||  maglie.categoria === 'giacca'))
      setPantaloni(() => json.filter((pantalone) => pantalone.categoria === 'pantalone'))
      setScarpe(() => json.filter((scarpe) => scarpe.categoria === 'scarpe'))
    }
    handleProducts()
  }, [shuffle])

  const getRandomItems = (array, num) => {
    return array.sort(() => 0.5 - Math.random()).slice(0, num);
  }

  const handleShuffle = () => {
    setShuffle((prevShuffle) => prevShuffle + 1)
  }

  return (
    <>
      <Head>
        <title>MY E-COMMERCE</title>
        <meta name="description" content="My full stack e-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Title><h1>Home<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>

        <FirstWrite 
          h22={"A Creative Collective"}
          p1={'Our online store is a creative collective of artists and designers from around the world. With our disruptive, graphic-led approach, we draw inspiration from post-punk culture, underground comics, skateboarding, and the spirit of subcultures. We are not one person nor one idea. We exist in the space between minds and ideas.'} 
          h23={"Creativity and Quality"}
          p2={'We believe in the union of creativity and quality. Every product we offer is the result of the passion and dedication of our designers. Our mission is to bring unique and original products to those who seek to express their individuality through style and art. Explore our collection and join our community of enthusiasts.'}
        />


        <Link scroll={false} href='/products'>
          <div className={styles.containerImgHome}>
          <Image src='/hero4.jpg' fill={true} alt='tappeto turco' quality={100}></Image>
          </div>
        </Link>

        
        {
          !pantolini || !maglie || !scarpe ?
            <h2 style={{marginTop: 150}}>Loading...</h2>
            :
            <>
            <h2 className={styles.h2Choice}>Take Your Choice<Image src='/asterisco-black2.png' width={40} height={40} alt='asterisco usato come logo' /></h2>
            <button className={styles.buttonShuffle} onClick={handleShuffle}>SHUFFLE</button>
            <div className={styles.wrap}>

              {getRandomItems(maglie, 3).map((product) => (
                <Link scroll={false} key={product.id} href={`/products/${product.id}`} className={styles.container} >
                  <div className={styles.containerImg}>
                    <Image src={`/uploads/${product.image_urls[0]}`} fill style={{ objectFit: 'cover' }} alt={`Image of ${product.categoria}`} ></Image>
                  </div>
                  <div className={styles.containerText}>
                    <p>{product.categoria}</p>
                    <h2>{product.nome}</h2>
                  </div>
                  <div href={`/products/${product.id}`} className={styles.button}><p>more details</p> <p>🡪</p></div>
                </Link>
              ))}

              {getRandomItems(pantolini, 3).map((product) => (
                <Link scroll={false} key={product.id} href={`/products/${product.id}`} className={styles.container} >
                  <div className={styles.containerImg}>
                    <Image src={`/uploads/${product.image_urls[0]}`} fill style={{ objectFit: 'cover' }} alt={`Image of ${product.categoria}`} ></Image>
                  </div>
                  <div className={styles.containerText}>
                    <p>{product.categoria}</p>
                    <h2>{product.nome}</h2>
                  </div>
                  <div href={`/products/${product.id}`} className={styles.button}><p>more details</p> <p>🡪</p></div>
                </Link>
              ))}

              {getRandomItems(scarpe, 3).map((product) => (
                <Link scroll={false} key={product.id} href={`/products/${product.id}`} className={styles.container} >
                  <div className={styles.containerImg}>
                    <Image src={`/uploads/${product.image_urls[0]}`} fill style={{ objectFit: 'cover' }} alt={`Image of ${product.categoria}`} ></Image>
                  </div>
                  <div className={styles.containerText}>
                    <p>{product.categoria}</p>
                    <h2>{product.nome}</h2>
                  </div>
                  <div href={`/products/${product.id}`} className={styles.button}><p>more details</p> <p>🡪</p></div>
                </Link>
              ))}

            </div>
          </>
        }

      </Layout>
    </>
  );
}
