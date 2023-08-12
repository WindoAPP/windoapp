import { useEffect, useState } from 'react';
import styles from './notificationPanel.module.scss'
import { useSession } from 'next-auth/react';
import { getUser } from '../../services/service';
import Loader from '../Loader/loader';

const NotificationPanel = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [notifiArr, setNotifiArr] = useState([
        { _id: 1, type: "alert-primary", body: "Avec icône", icon: "fa-american-sign-language-interpreting" },
        { _id: 2, type: "alert-success", body: "Une simple alerte primaire vérifiez-la !", icon: "fa-american-sign-language-interpreting" },
        { _id: 3, type: "alert-secondary", body: "Une simple alerte primaire vérifiez-la !", icon: "fa-american-sign-language-interpreting" },
        { _id: 4, type: "alert-danger", body: "Avec icône", icon: "fa-american-sign-language-interpreting" },
        { _id: 5, type: "alert-info", body: "Une simple alerte primaire vérifiez-la !", icon: "fa-american-sign-language-interpreting" },
        { _id: 6, type: "alert-secondary", body: "Une simple alerte primaire vérifiez-la !", icon: "fa-american-sign-language-interpreting" },
        { _id: 7, type: "alert-success", body: "Une simple alerte primaire vérifiez-la !", icon: "fa-american-sign-language-interpreting" },
    ])


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

    const onRemoveNotifi =(id)=>{
        var tempArr= notifiArr.filter((obj)=>obj._id!=id);
        setNotifiArr(tempArr);
    }



    return (
        <div className={`p-2 d-flex flex-column align-items-center  ${styles.mainContent}`}>
            <p className='align-self-start mb-3'>Avec icône</p>
            {notifiArr.map((obj, index) => {
                return (
                    <div key={index} className={`d-flex flex-row align-items-center justify-content-between alert ${obj.type} m-1 ${styles.notificationItem}`}>
                        <div className='d-flex flex-row align-items-center'>
                            <i className={`fa ${obj.icon} mx-2`} aria-hidden="true"></i>
                            <p className='m-0'>{obj.body}</p>
                        </div>
                        <i className="fa fa-times cursor-pointer" aria-hidden="true" onClick={()=>onRemoveNotifi(obj._id)}></i>
                    </div>
                )
            })}
            {notifiArr.length===0 && <h6 className='align-self-center mt-5'>Empty</h6>}
        </div>

    );
};

export default NotificationPanel;