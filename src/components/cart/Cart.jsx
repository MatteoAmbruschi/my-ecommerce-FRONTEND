import Image from "next/image"
import Link from "next/link"
import stylesForms from '../../pages/sign-in/sign-in.module.css'
import styles from './cart.module.css'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from "axios"

export default function Cart ({charge, setCharge, openCart}) {
    const [cartMenuOpen, setCartMenuOpen] = useState()
    const [errorsPassword, setErrorsPassword] = useState('')
    const [formData, setFormData] = useState({ email: '', password: '' });
    const pathName = usePathname()
    const [user, setUser] = useState(null);
    const [loggedError, setLoggedError] = useState('');

    useEffect(() => {
     setCartMenuOpen(pathName === pathName ? false : true)
    }, [pathName])  


    useEffect(() => {
      if(openCart !== 0){
      setCartMenuOpen(true)
    }
    }, [openCart])


    useEffect(() => {
        const logged = async () => {
            try {
              const token = localStorage.getItem('authToken');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}cart`, {
                  headers: { Authorization: token },
                  withCredentials: true
                });
                if (response.status === 200) {
                  setUser(response.data);
                  setLoggedError(false);
                } else if (response.status === 404) {
                  setUser(response.data)
                  setLoggedError(true);
                } else if (response.status === 401) {
                  setLoggedError(true);
                } else {
                  setLoggedError(true);
                }
              } catch (loggedError) {
                setLoggedError(true);
                console.error('Error fetching user data:', loggedError);
              }
           }  
           logged()
           
       }, [charge])


       const handleAdd = async (key) => {
        console.log(key)
        try {
          const token = localStorage.getItem('authToken');
          if(key.quantita > 1){
            const response = await axios.put(process.env.NEXT_PUBLIC_URL + `cart/${key.carrello_id}`, {quantita: key.quantita - 1}, {
              headers: { Authorization: token },
              withCredentials: true
            });
            if(response.status === 200){
              await setCharge(charge + 1);
              console.log(response.data.message)
            } else{
              console.log('errore')
          }
        } else {
          const response = await axios.delete(process.env.NEXT_PUBLIC_URL + `cart/${key.carrello_id}`, {
            headers: { Authorization: token },
            withCredentials: true
          });
          if(response.status === 200){
            await setCharge(charge + 1);
            console.log(response.data.message)
          } else{
            alter('errore')
        }
        }
        }
        catch(error) {
          console.log(error.response.message);
        }
      }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
       const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(process.env.NEXT_PUBLIC_URL + 'login', formData , { withCredentials: true });
          if (response.status === 200) {
            const token = response.data.token;
            if (token) {
            console.log('Token:', token);
            localStorage.setItem('authToken', token);
            
            setErrorsPassword('');
            setCharge(charge + 1)
            }
            else {
              console.log('Token non trovato nella risposta.');
            }
          } 
          else if(response.status === 401 || response.status === 500) {
            const result = response.data;
            setErrorsPassword(result.message || 'Sign-in Failed');
          }
        } 
        catch (error) {
          if (error.response) {
            if (error.response.status === 401 || error.response.status === 500) {
              const result = error.response.data;
              setErrorsPassword(result.message || 'Sign-in Failed');
            } else {
              console.error('Response error:', error.response.data);
              alert('Error in the request');
            }
          } else if (error.request) {
            console.error('Network error:', error.request);
            alert('Network error');
          } else {
            console.error('Error:', error.message);
            alert('Error in the request');
          }
        }
      };
      

return (
    <div onClick={() => {cartMenuOpen === false ? setCartMenuOpen(true) : null; setCharge(charge + 1)}} className={`${styles.cartContainer} ${cartMenuOpen ? styles.expanded : ''}`}>
    <div className={styles.containerWrite}>
        <div className={styles.textCart}><p>cart:&nbsp;</p>{loggedError ? <Image  src='/asterisco-black2.png' width={17} height={17} alt='asterisco usato come 0' /> : user && user[0].total_elements > 0 ? user.reduce((accumulator, curr) => accumulator + curr.quantita, 0) : 0}</div>
        {cartMenuOpen ? <button className={styles.buttonClose} onClick={() => setCartMenuOpen(false)}>CLOSE</button> : ''}
   </div>
    {
        loggedError && cartMenuOpen ?
        <div className={`${cartMenuOpen ? styles.containerLogging : ''}`}>
            <p className={styles.writeLogged}>It looks like you are not logged in</p>
            <form onSubmit={handleSubmit} className={stylesForms.formContainer} style={{width:'100%', marginTop:'15px'}}>
             <h2>Enter your details below</h2>

            <label htmlFor="email"><i>Email:</i></label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            
            <label htmlFor="password"><i>Password:</i></label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" minLength={6} maxLength={12} required />
            
            <button type="submit">NEXT</button>

            <p className={stylesForms.err}>{errorsPassword}</p>
        </form>

            <Link scroll={false} className={styles.linkSign} href='/register'>CREATE AN ACCOUNT</Link>
        </div>
        :
        !loggedError && cartMenuOpen ?
        <div>
            {user[0].total_elements > 0 ? 
            <> 
            <hr style={{marginTop:20}} />
              {user.map((key) => (
                <>
                  <div key={key.id} className={styles.containerProduct}>
                      <Link scroll={false} href={`/products/${key.prodotto_id}`}><Image src={`/uploads/${key.image_urls[0]}`} width={130} height={300} alt={`Image of ${key.categoria}`}></Image></Link>
                      <div className={styles.descriptionsProducts}>
                        <div className={styles.categoria}>
                          <p>{key.nome}&nbsp;</p> - <p>&nbsp;{key.categoria}</p>
                        </div>           
                        <div className={styles.price}>
                          <p>Price: {key.prezzo}€</p>
                        </div>
                        <div className={styles.taglie}>
                          <p>Size: {key.taglia_selezionata}</p>
                        </div>        
                        <div className={styles.quantita}>
                          <p>Quantity: {key.quantita}</p>
                        </div>       
                      </div>
                      <button className={styles.eliminate} onClick={() => handleAdd(key)}>
                        <svg viewBox="0 0 24 24" width="25px" height="25px" fill="currentColor" aria-labelledby="delete-the-item-:rq:" focusable="false" aria-hidden="false" role="img"><title id="elimina-l’articolo-:rq:">Delete the item</title>
                          <path d="m13.057 11.996 7.723-7.723a.75.75 0 1 0-1.06-1.06l-7.724 7.723-7.723-7.724a.75.75 0 1 0-1.06 1.061l7.723 7.723-7.716 7.717a.75.75 0 1 0 1.06 1.06l7.716-7.716 7.717 7.716a.747.747 0 0 0 1.06 0 .75.75 0 0 0 0-1.06l-7.716-7.717z"></path>
                        </svg>
                      </button>
                  </div>

                  <hr />
                </>
              ))}
              <div className={styles.containerBottom}>
                <div className={styles.shipping}><p>Shipping:</p> <p>Free</p></div>
                <div className={styles.totalPrice}><p>Total Price:</p> <p>{user.reduce((accumulator, currentUser) => accumulator + (Number(currentUser.prezzo_tot) || 0), 0).toFixed(2)}€</p></div>
                <Link scroll={false} href={'/payment'} className={styles.buttonCart}>CART</Link>
              </div>
            </> 
            : 
            <div className={styles.emptyCart}>
              <p>You don&apos;t have any products in your cart</p>
            </div>
            }
        </div>
        : 
        ''
    }
</div>
)
}