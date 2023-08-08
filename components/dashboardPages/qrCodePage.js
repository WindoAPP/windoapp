import { useEffect, useState } from 'react';
import styles from './profilePage.module.scss'
import { useSession } from 'next-auth/react';
import { getUser } from '../../services/service';
import { env_data } from '../../config/config';
import QRCode from 'qrcode.react';

const QRCodePage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
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

    return (
        <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContent}`}>
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
            <button className='btn btn-warning mx-1 my-2' onClick={downloadQRCode}>Download QR code <i className="fa fa-download mx-2"></i></button>
        </div>
    );
};

export default QRCodePage;