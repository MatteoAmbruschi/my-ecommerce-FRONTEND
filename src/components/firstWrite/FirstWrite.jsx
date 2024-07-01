import styles from './firstWrite.module.css'

export default function FirstWrite ({p1, p2, h22, h23}){

    return (
    <div className={styles.container}>
        <div>
            <h2>{h22}</h2>
            <p>{p1}</p>
        </div>
        <div>
            <h2>{h23}</h2>
            <p>{p2}</p>
        </div>
    </div>
    )
}