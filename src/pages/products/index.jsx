import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";

const Layout  = dynamic(() =>import("@/components/Layout"));
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from './products.module.css'
const Title  = dynamic(() =>import("@/components/title/Title"));


export default function Products() {
  const [products, setProducts] = useState()

  useEffect(() => {
    async function handleProducts() {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + 'allProducts');
      const json = await response.json();
      setProducts(json)
    }
    handleProducts()
  }, [])

  return (
    <>
      <Layout>
        <Title><h1>Products<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
        {
          !products ?
            <h2>Loading...</h2>
            :
            <div className={styles.wrap}>
              {products.map((product) => (
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
              )
              )}
            </div>
        }
      </Layout>
    </>
  );
}