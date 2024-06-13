import styles from './firstWrite.module.css'

export default function FirstWrite ({p1, p2}){

    return (
    <div className={styles.container}>
        <p>{p1}</p>
        <p>{p2}</p>
    </div>
    )
}