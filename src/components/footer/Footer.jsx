import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link';
import Clock from 'react-live-clock';
import { useEffect, useRef, useState } from 'react';


export default function Footer() {
    const footerRef = useRef(null);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const setFooterHeight = () => {
            const footerChildren = footerRef.current.children;
            let totalHeight = 0;

            for (let i = 0; i < footerChildren.length; i++) {
                totalHeight += footerChildren[i].clientHeight;
            }
            
            setTotal(totalHeight)
        };

        setFooterHeight(); 
        window.addEventListener('resize', setFooterHeight); 
        return () => window.removeEventListener('resize', setFooterHeight);
    }, []);


    return (
        <div className={styles.wrap1} ref={footerRef} style={{height:total}}>
            <div className={styles.wrap2} >

                <footer className={styles.footerContainer}>
                    <section className={styles.containerTop}>
                        <Link href='/register' scroll={false} className={styles.newsLetter}><p>Subscribe to MORE newsletters</p></Link>
                        <div className={styles.containerClock}>
                            <p>Local Time: </p>
                            <Clock format={'HH:mm:ss'} ticking={true} noSsr={true} timezone={'Europe/Rome'} className={styles.clock} />
                            <p style={{fontWeight: 500}}>Europe</p>
                        </div>
                        <div className={styles.containerImg}>
                            <Image src='/asterisco-black2.png' width={80} height={80} alt='asterisco usato come logo' />
                        </div>
                    </section>
                    <section className={styles.containerCenter}>
                        <p>matteoambruschi10@gmail.com</p>
                        <p>+39 *** *** ****</p>
                        <p>BERGAMO, BG</p>
                        <p>ITALY, IT</p>
                    </section>

                    <p>Discover the essence of creativity through simplicity. In our minimalist emporium, every detail tells a story of inspiration and authenticity. Welcome to the place where minimalism meets the magic of creativity, turning every purchase into a timeless experience.</p>
                </footer>

             
            </div>
        </div>
    )
}
