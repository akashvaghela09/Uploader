import React from 'react';
import styles from "../Styles/Loader.module.css"

const LoadingSpiner = () => {
    return (
        <div className={styles.loaderDiv}>
            <div className={styles.loaderBar}>
                <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
            </div>
        </div>
    )
}

export { LoadingSpiner }