import { useEffect, useState } from 'react';
import styles from './winnersPage.module.scss'
import { useSession } from 'next-auth/react';
import { getUser } from '../../services/service';
import Loader from '../Loader/loader';
import { CSVLink } from "react-csv";

const OptInPage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [csvData, setCsvData] = useState([])

    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                setCustomers(res.user.custermers);
                setIsLoading(false);

                const csvData = [
                    ["name", "email", "phoneNumber"],
                    ...res.user.custermers.map(item => [item.name, item.email, item.phoneNumber])
                  ];
                  console.log(csvData);
                  setCsvData(csvData);
                
            }
        }).catch(err => {
            console.log(err);

        });
    }


    return (
        <>
            {!isLoading ?
                <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContent}`}>
                     <div className={`d-flex flex-column ${styles.chartContent}`}>
                            <h3 className={"mb-5"}>All players List</h3>
                            <table className={`table  ${styles.table}`}>
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((obj, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{obj.name}</td>
                                                <td>{obj.phoneNumber}</td>
                                                <td>{obj.email}</td>
                    
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <CSVLink className='commonBtnWindo w-75 align-self-center' filename='all_players_list' data={csvData}> Download CSV</CSVLink>
                        </div>

                </div> : <Loader />
            }
        </>

    );
};

export default OptInPage;