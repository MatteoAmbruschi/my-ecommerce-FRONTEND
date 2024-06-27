import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './shipments.module.css'
import Title from '@/components/title/Title';

const ShipUserComponent = () => {
  const [ship, setShip] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter()
  const [refresh, setRefresh] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios.get(process.env.NEXT_PUBLIC_URL + 'shipUser', {
      headers: { Authorization: token },
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 200) {
          setShip(response.data);
        }
        else if (response.status === 401) {
          router.push('/sign-in', undefined, { scroll: false })
        }
        else if (response.status === 404) {
          setError(response.data.message)
        }
        else{ 
          setError(response.data.message);
        }
      })
      .catch((error) => {
        if(error.response.status === 401) {
          router.push('/sign-in', undefined, { scroll: false })
        }
        else if (error.response.status === 404) {
          setError(error.response.data.message)
        }
        else {
          console.error('Error fetching data:', error);
          setError('Error fetching data');
        }
      });
  }, [refresh]);

  const handleDeleteShip = async (id) => {
    try {
    setShip(null)
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}orders/` + id, {
      headers: { Authorization: token },
      withCredentials: true
    })
    if(response.status === 200) {
       console.log('deleted ', id)
       console.log(response.data.message)
       setRefresh(prevRefresh => prevRefresh + 1)
    } else {
      console.log(response.status)
      setRefresh(prevRefresh => prevRefresh + 1)
    }
    } catch (err) {
      if (err.response) {
        console.error('Server responded with an error:', err.response.status, err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error in setting up the request:', err.message);
        setRefresh(prevRefresh => prevRefresh + 1);
      }
    }
  }
  return (
    <Layout>
    <Title><h1>Shipments<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
      {error ? (
        <div className={styles.error}><h2><i>{error}<Image src='/asterisco-black2.png' width={20} height={20} alt='asterisco usato come logo' /></i></h2></div>
      ) : !ship ? (
        <h2>Loading...</h2>
      ) : (

        <div className={styles.container}>
          {ship.map((item) => (
              <ul key={item.id} className={styles.itemContainer}>
                <div style={{ position: 'relative', height: '300px', width: '270px' }}>
                  <div className={styles.stato}><p>{item.stato}</p></div>

                  <button className={styles.eliminate} onClick={() => handleDeleteShip(item.carrello_id)}>
                    <svg viewBox="0 0 24 24" width="25px" height="25px" fill="currentColor" aria-labelledby="delete-the-item-:rq:" focusable="false" aria-hidden="false" role="img"><title id="elimina-l’articolo-:rq:">Delete the item</title>
                       <path d="m13.057 11.996 7.723-7.723a.75.75 0 1 0-1.06-1.06l-7.724 7.723-7.723-7.724a.75.75 0 1 0-1.06 1.061l7.723 7.723-7.716 7.717a.75.75 0 1 0 1.06 1.06l7.716-7.716 7.717 7.716a.747.747 0 0 0 1.06 0 .75.75 0 0 0 0-1.06l-7.716-7.717z"></path>
                    </svg>
                  </button>

                  <Image src={`/uploads/${item.image_urls[0]}`} fill style={{objectFit: 'cover'}} alt={`Image of ${item.categoria}`}></Image>
                </div>
                <div className={styles.listInfo}>
                  <div className={styles.containerInfo}>
                    <li><p>{item.categoria}</p></li>
                    <li><p>{item.prezzo}€</p></li>
                  </div>
                  <li>Name: <p>{item.nome}</p></li>
                  <li>Order date: <p>{new Date(item.data_ordine).toLocaleDateString()}</p></li> 
                  <li>Quantity : <p>{item.quantita}</p></li>
                </div>
              </ul>
          ))}
        </div>

      )}
    </Layout>
  );
};

export default ShipUserComponent;
