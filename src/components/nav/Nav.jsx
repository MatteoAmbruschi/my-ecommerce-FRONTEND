import Link from 'next/link'
import styles from './nav.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function Nav (){
   const [toggle, setToggle] = useState(false)
   const pathName = usePathname()

   useEffect(() => {
    setToggle(pathName === pathName ? false : true)
   }, [pathName])  


return(
<>
    <div className={`${styles.navContainer} ${toggle ? styles.menuOpen : ''}`} onClick={() => setToggle(!toggle)}>

       {
       toggle ? '' 
       : <Image src='/asterisco.png' width={20} height={20} alt='asterisco usato come logo cliccabile' />
        }
        
        <Link scroll={false} href='/'><Image src='/asterisco.png' width={20} height={20} alt='asterisco usato come logo cliccabile' /></Link>
        <Link scroll={false} href='/products'>Products</Link>
        <Link scroll={false} href='/profile'>Profile</Link>
        <Link scroll={false} href='/contact'>Contact</Link>
    </div>    
</>
)
}

export default Nav