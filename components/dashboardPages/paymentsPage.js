import { useEffect, useState } from 'react';
import styles from './paymentsPage.module.scss'
import { useSession } from 'next-auth/react';
import { env_data } from '../../config/config';
import { getPayments, getUser } from '../../services/service';
import dayjs from 'dayjs';
import Loader from '../Loader/loader';

const PaymentsPage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [paymentsArr, setPaymentsArr] = useState([]);

    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                fetchPayments(res.user._id)
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const fetchPayments = (id) => {
        getPayments(id).then(res => {
            if (res) {
                setPaymentsArr(res.payments);
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const dateFormater = (date) => {
        const f_date = dayjs(date);
        return f_date.format('YYYY-MM-DD HH:mm:ss');
    }


    return (
        <div className={`p-4 d-flex flex-column align-items-center  ${styles.mainContent}`}>
            {!isLoading ?
                <>
                    <h1 className='my-4'>FCTURES</h1>
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                            {paymentsArr.map((obj, index) => {
                                return (
                                    <div className="col" key={index}>
                                        {obj.success ?
                                            <div className="card radius-10 border-start border-0 border-3 border-success">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <p className="mb-0 text-secondary">Payment Success</p>
                                                            <h4 className="my-1 text-success">{obj.amount_total}<h4>{obj.currency}</h4></h4>
                                                            <p className="mb-0 font-13">Payment Created : <p>{dateFormater(obj.cretedAt)}</p></p>
                                                        </div>
                                                        <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto"><i className="fa fa-check-square-o"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                            <div className="card radius-10 border-start border-0 border-3 border-danger">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <p className="mb-0 text-secondary">Payment Failed</p>
                                                            <h4 className="my-1 text-danger">{obj.amount_total}<h4>{obj.currency}</h4></h4>
                                                            <p className="mb-0 font-13">Payment Created : <p>{dateFormater(obj.cretedAt)}</p></p>
                                                        </div>
                                                        <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto"><i className="fa fa-times"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                            }
                            {paymentsArr.length==0  && <h3 className='text-muted' >No any Subscribes</h3>}
                        </div>
                    </div>
                </> : <Loader />
            }
        </div>
    );
};

export default PaymentsPage;