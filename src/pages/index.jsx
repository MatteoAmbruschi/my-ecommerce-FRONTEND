import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/Layout";
import FirstWrite from "@/components/firstWrite/FirstWrite";
import styles from '../styles/home.module.css'
import Link from 'next/link'
import Title from "@/components/title/Title";


export default function Home() {
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

        <Link scroll={false} href='/products'>
          <div className={styles.containerImg}>
          <Image src='/hero4.jpg' width={2000} height={1000} alt='tappeto turco' quality={100}></Image>
          </div>
        </Link>

        <FirstWrite 
          p1={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet nibh sit amet velit dignissim, non tempus nisl pellentesque. Praesent sagittis magna sit amet ex blandit, id pharetra lectus feugiat. Praesent sit amet congue ipsum, in ultrices neque. In dapibus in purus vitae dignissim. Quisque molestie ullamcorper elementum. Sed sodales erat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet quis lectus vitae venenatis. Aliquam erat volutpat. Nulla maximus sodales nibh dapibus congue. Integer nec pharetra felis, quis commodo elit. Fusce et aliquet neque. Vivamus leo diam, pharetra ut lorem eu, suscipit egestas ipsum. Aenean mauris ligula, laoreet ut volutpat sit amet, convallis et turpis.'} 
          p2={'Quisque molestie ullamcorper elementum. Sed sodales erat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet quis lectus vitae venenatis. Aliquam erat volutpat. Nulla maximus sodales nibh dapibus congue. Integer nec pharetra felis, quis commodo elit. Fusce et aliquet neque. Vivamus leo diam, pharetra ut lorem eu, suscipit egestas ipsum. Aenean mauris ligula, laoreet ut volutpat sit amet, convallis et turpis.'}
        />
      </Layout>
    </>
  );
}
