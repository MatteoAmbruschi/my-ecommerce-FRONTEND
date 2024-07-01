import Title from "@/components/title/Title"
import Image from "next/image"
import FirstWrite from "@/components/firstWrite/FirstWrite";
import Layout from "@/components/Layout";
import styles from '../contact.module.css'

export default function ThankYou() {

    return (
        <Layout>
                <Title><h1>Thank-you<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
                <div className={styles.containerWrite}>
                    <FirstWrite 
                    h22={'Thank You for Contacting Us'}
                    p1={'We appreciate you reaching out to us. Your message has been received, and we will get back to you as soon as possible. Our team is dedicated to providing excellent customer service and will respond to your inquiry with the utmost care and attention.'} 
                    h23={'What Happens Next'}
                    p2={'Our customer support team will review your message and respond within 1-2 business days. In the meantime, feel free to explore our latest collections and discover the minimalist, modern designs that define our brand. Thank you for your interest and support.'}
                    />
                </div>
        </Layout>
    )
}