import { useEffect, useState } from 'react';
import styles from './profilePage.module.scss'
import { useSession } from 'next-auth/react';
import { getUser } from '../../services/service';
import { env_data } from '../../config/config';
import QRCode from 'qrcode.react';
import Loader from '../Loader/loader';

const QRCodePage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const downloadQRCode = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const routeToLink = ()=>{
        const url="https://veryeasyagency.com/categorie-produit/imprimerie/"
         window.open(url, '_blank');
    }

    return (
        <>
            {
                !isLoading ? <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContentForQR}`}>
                    <div className={styles.qrCodeWrapper}>
                        <QRCode
                            size={290}
                            level={"H"}
                            includeMargin={true}
                            name='shop_QR_code'
                            className={styles.qrCode}
                            id='qrcode'
                            value={`${env_data.base_url}scan?id=${user.uid}`}
                        />
                    </div>
                    <button className='commonBtnWindo px-4 mx-1 my-2 d-flex felx-row align-items-center justify-content-center' onClick={downloadQRCode}>Download QR code <i className="fa fa-download mx-2"></i></button>
                    <button className={`commonBtnWindo mx-1 my-2 px-4 d-flex felx-row align-items-center justify-content-center ${styles.qrpageBtn}`} onClick={routeToLink}>Commander mon support<i className="fa fa-question-circle mx-2"></i></button>
                </div> : <Loader />
            }
        </>

    );
};

export default QRCodePage;