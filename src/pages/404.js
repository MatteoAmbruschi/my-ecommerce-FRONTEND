import Layout from '@/components/Layout'
import styles from '../styles/404.module.css'
import Title from '@/components/title/Title'
import Image from 'next/image'

export default function Custom404() {

    return (
        <Layout>
        <div className={styles.container}>
            <Title><h1>404<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
            <h2>Page Not Found</h2>
        </div>
        </Layout>
        
    )
    
  }