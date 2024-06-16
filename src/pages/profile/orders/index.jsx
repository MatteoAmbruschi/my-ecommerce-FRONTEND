import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './orders.module.css'
import PopUpOrder from '@/components/popUpOrder/PopUpOrder';
import Title from '@/components/title/Title';

const OrdersComponent = () => {
  const [ship, setShip] = useState(null);
  const [popUp, setPopUp] = useState(false)
  const [error, setError] = useState(null);
  const [idClicked, setIdClicked] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios.get(process.env.NEXT_PUBLIC_URL + 'orders', {
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
  }, []);

  return (
    <Layout>
    <Title><h1>Orders<Image src='/asterisco-black2.png' width={50} height={50} alt='asterisco usato come logo' /></h1></Title>
      {error ? (
        <div className={styles.error}><h2><i>{error}<Image src='/asterisco-black2.png' width={20} height={20} alt='asterisco usato come logo' /></i></h2></div>
      ) : !ship ? (
        <div>Loading...</div>
      ) : (
        <>
        <div className={styles.container}>
          {ship.map((item, index) => (
              <ul key={item.id} className={styles.itemContainer} onClick={() => {setPopUp(!popUp), setIdClicked(index)}} >
                <div style={{ position: 'relative', height: '300px', width: '270px' }}>
                  <div className={styles.stato}><p>{new Date(item.data_ordine).toLocaleDateString()}</p></div>
                  <Image src={`/uploads/${item.image_urls[0]}`} fill style={{objectFit: 'cover'}} alt={`Image of ${item.categoria}`}></Image>
                </div>
                <div className={styles.listInfo}>
                  <div className={styles.containerInfo}>
                    <li><p>{item.nome}</p></li>
                    <li><p>{item.prezzo}€</p></li>
                  </div>
                </div>
              </ul>
          ))}
        </div>
        {popUp ? <PopUpOrder ship={ship} setPopUp={setPopUp} idClicked={idClicked} /> : ''}
        </>
      )}
    </Layout>
  );
};

export default OrdersComponent;
