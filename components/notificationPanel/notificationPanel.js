import { useEffect, useState } from 'react';
import styles from './notificationPanel.module.scss'
import { useSession } from 'next-auth/react';
import { deleteANotification, getAllNotifications, getUser, updateNotification } from '../../services/service';
import Loader from '../Loader/loader';
import { DotLoader } from 'react-spinners';

const NotificationPanel = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [notifiArr, setNotifiArr] = useState([]);


    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                fetchNotifications(res.user._id)
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const fetchNotifications = (id) => {
        getAllNotifications(id).then(res => {
            if (res) {
                console.log(res.notifications);
                setNotifiArr(res.notifications);
                markAsReadAllNotifis(id);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const onRemoveNotifi = (id) => {
        var tempArr = notifiArr.filter((obj) => obj._id != id);
        deleteANotification(id).then((res) => {
            if (res) {
                setNotifiArr(tempArr);
            }
        }).catch(err => {
            console.log(err);

        });


    }

    const markAsReadAllNotifis = (id) => {
        updateNotification(id).then(() => {

        }).catch(err => {
            console.log(err);

        });
    }



    return (
        <div className={`p-2 d-flex flex-column align-items-center  ${styles.mainContent}`}>
            <p className='align-self-start mb-3'>Avec icône</p>
            {!isLoading && notifiArr.map((obj, index) => {
                return (
                    <div key={index} className={`d-flex flex-row align-items-center justify-content-between alert ${obj.backColor} m-1 ${styles.notificationItem}`}>
                        <div className='d-flex flex-row align-items-center'>
                            <i className={`fa ${obj.icon} ${styles.notifiIcon}`} aria-hidden="true"></i>
                            <p className='m-0'>{`${obj.customer.name} ${obj.body}`}</p>
                        </div>
                        <i className="fa fa-times cursor-pointer" aria-hidden="true" onClick={() => onRemoveNotifi(obj._id)}></i>
                    </div>
                )
            })}
            {(notifiArr.length === 0 && !isLoading) && <h6 className='align-self-center mt-5'>Empty</h6>}
            {isLoading && <DotLoader color="#36d7b7" className='align-self-center mt-5' />}
        </div>

    );
};

export default NotificationPanel;