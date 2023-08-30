import { useEffect, useState } from 'react';
import styles from './winnersPage.module.scss'
import { useSession } from 'next-auth/react';
import { getUser, updateCustomer } from '../../services/service';
import Loader from '../Loader/loader';

const WinnersPage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                var tempCusArr=res.user.custermers.filter(obj=>{
                    if(checkWinners(obj)){
                        return obj
                    }
                })
                setCustomers(tempCusArr);
                setIsLoading(false);
                
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const checkWinners = (cus)=>{
        var checker=false;
        for (let i = 0; i < cus.spins.length; i++) {
            if(cus.spins[i].isWin){
                checker=true;
            }
        }
        return checker;
    }
 
    const getWinCount =(spins)=>{
        var count=0;
        for (let i = 0; i < spins.length; i++) {
            if(spins){
                if(spins[i].isWin){
                    count++;
                }
            }
        }
        
        return count;
    }

    const getPrizes =(spins)=>{
        var prizes="";
        for (let i = 0; i < spins.length; i++) {
            if(spins){
                if(spins[i].isWin){
                    if(prizes==""){
                        prizes=spins[i].price;
                    }else{
                        prizes= `${prizes} , ${spins[i].price}`;
                    }      
                }
            }
        }
        
        return prizes;
    }


    const onClickGiftGiven = (e, customer) => {
        const updatedCustomers = customers.map((c) => {
            if (c === customer) {
                return { ...c, giftGiven: e.target.checked };
            }
            return c;
        });
        setCustomers(updatedCustomers);
        
        customer['giftsGiven']=e.target.checked;
            updateCustomer(customer).then(res => {
            if (res) {
                fetchUser(session.user.uid);
            }
        }).catch(err => {
            console.log(err);
        });

        
    };


    return (
        <>
            {!isLoading ?
                <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContent}`}>
                     <div className={`d-flex flex-column ${styles.chartContent}`}>
                            <h3 className={"mb-5"}>Liste des gagnants</h3>
                            <table className={`table  ${styles.table}`}>
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Téléphone</th>
                                        <th scope="col">Tours</th>
                                        <th scope="col">Gagne</th>
                                        <th scope="col">Prix</th>
                                        <th scope="col">Prix décernés</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((obj, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{obj.name}</td>
                                                <td>{obj.phoneNumber}</td>
                                                <td>{obj.spins ? obj.spins.length : "-"}</td>
                                                <td>{obj.spins ? getWinCount(obj.spins) : "-"}</td>
                                                <td>{obj.spins ? getPrizes(obj.spins) : "-"}</td>
                                                <td><input checked={obj.giftsGiven || false}   onChange={(e) => onClickGiftGiven(e, obj)} type="checkbox" className="form-check-input" ></input></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                </div> : <Loader />
            }
        </>

    );
};

export default WinnersPage;