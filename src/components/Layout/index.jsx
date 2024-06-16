import { motion } from 'framer-motion'
import styles from './layout.module.css'
import { useEffect } from 'react'
import Router from 'next/router'


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
                    document.head.removeChild(copy);
                }
            }, timeout);
        };

        Router.events.on('routeChangeComplete', handler);
    });
};



export default function Layout({children}) {

    const anim = (variants) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            variants
        }
    }

    const opacity = {
        initial : {
            opacity: 0
        },
        enter: {
            opacity: 1,
        },
        exit: {
            opacity: 1
        }
    }

    const slide = {
        initial: {
            top: '100vh'
        },
        enter: {
            top: '100vh'
        },
        exit: {
            top: '0',
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    }

    const prospective = {
        initial: {
            y: 0,
            scale: 1,
            opacity: 1
        },
        enter: {
            y: 0,
            scale: 1,
            opacity: 1
        },
        exit: {
            y: -100,
            scale: 0.9,
            opacity: 0.5,
            transition: {
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    }

    useEffect(() => {
        const loadGrained = async () => {
            const grained = (await import('../grained/grained')).default;
            window.grained('#divContainer', {
                animate: true,
                patternWidth: 100,
                patternHeight: 100,
                grainOpacity: 0.08,
                grainDensity: 1,
                grainWidth: 1,
                grainHeight: 1
            });
        };
        loadGrained();

        window.scrollTo(0, 0);

        fixTimeoutTransition(1000);
    }, [])

    return (
    <div className={styles.inner}>
        <motion.div {...anim(slide)} className={styles.slide} />
            <motion.div {...anim(prospective)} className={styles.page} id='divContainer'>
                <motion.div {...anim(opacity)} className={styles.paddingPage}>
                        {children}
                        <div style={{paddingBottom:100}}></div>
                </motion.div>
            </motion.div>
    </div>
    )
}