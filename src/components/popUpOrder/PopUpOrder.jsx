import styles from './popUpOrder.module.css'
import Image from 'next/image'

export default function PopUpOrder ({ ship, setPopUp, idClicked }) {
    const selected = Array(ship[idClicked])
    {console.log(selected)}

    return (
    <>
    <div className={styles.container} onClick={() => setPopUp(false)} />
       <div className={styles.focus}>
        <p className={styles.close} onClick={() => setPopUp(false)}>CLOSE</p>
            {selected.map((item) => (
                <ul key={item.id} className={styles.itemContainer}>
                <div className={styles.containerImg}>
                    <Image src={`/uploads/${item.image_urls[0]}`} fill style={{objectFit: 'cover'}} alt={`Image of ${item.categoria}`}></Image>
                </div>
                <div className={styles.containerList}>
                    <div>
                        <li>{item.categoria}: <p>{item.nome}</p></li>
                        <li>Description: <p>{item.descrizione}</p></li>
                        <li>Material: <p>{item.materiali}</p></li>
                        <li>Size: <p>{item.taglia_selezionata}</p></li>
                        <li>Price: <p>{item.prezzo}€</p></li>
                        <li>Quantity: <p>{item.quantita}</p></li>
                    </div>
                    <div className={styles.containerFooter}>
                        <li>{new Date(item.data_ordine).toLocaleDateString()}</li>
                        <li>{item.stato ? item.stato : 'Arrived'}</li>
                        <li>Id: {item.prodotto_id}</li>
                    </div>
                </div>
                </ul>
            ))}
        </div>
    </>
    )
}