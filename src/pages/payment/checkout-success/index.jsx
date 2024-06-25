import Layout from "@/components/Layout";
import Title from "@/components/title/Title";
import Image from "next/image";
import Link from 'next/link';
import styles from './checkout.module.css'
import { useRouter } from 'next/router';


export default function CheckoutSuccess () {
    const router = useRouter();
    const { email, total } = router.query;

    return (
        <Layout>
            <Title><h1>Thank You<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>

            <div className={styles.containerTop}>
                <p>Thank you for the purchase, the email of the account used is: <strong>{email ? email : 'Not Available'}</strong></p>
                <p>The total payment amount to: <strong>{total ? `${total}€` : 'Not Available'}</strong></p>
            </div>

            <div className={styles.containerButtons}>
                <Link scroll={false} className={styles.button} href='/profile'>Profile<Image src='/arrow3.png' width={20} height={20} alt='arrow' /></Link>
                <Link scroll={false} className={styles.button} href='/products'>Products<Image src='/arrow3.png' width={20} height={20} alt='arrow' /></Link>
            </div>
        </Layout>
    )
}