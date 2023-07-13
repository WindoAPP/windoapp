import { useState } from 'react';
import styles from './scan.module.scss';
import { QrReader } from 'react-qr-reader';
const ScanPage = () => {
    const [data, setData] = useState('No result');
    return (
        <div className={styles.backgroundContainer} >
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100%' }}
            />
            <h1 className={styles.headding}>{data}</h1>
        </div>
    );
};

export default ScanPage;