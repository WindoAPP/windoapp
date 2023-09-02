import { useEffect, useState } from 'react';
import styles from './adminUsersPage.module.scss'
import { useSession } from 'next-auth/react';
import { deleteAUser, getAllUsers, getUser, updateCustomer, updateUser } from '../../services/service';
import Loader from '../Loader/loader';
import showNotification from '../showNotifications/showNotifications';
import BalnktCard from '../blankCard/blankCard';

const AdminUsersPage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accState,setAccState]=useState('created')
    const [formData, setFormData] = useState({ trialPeriod: 3,accStatus:'', facebook: '', address: '', tiktok: '', instagram: '', email: '', password: '', c_password: '', userName: '', phoneNumber: '', shopName: '', shopId: '' });

    useEffect(() => {
        if (session) {
            fetchUsers();
        }
    }, [session]);

    const fetchUsers = () => {
        getAllUsers().then(res => {
            if (res) {
                var userarr = res.userList.filter(u => u._id !== session.user._id)
                setUser(userarr);
                setIsLoading(false);

            }
        }).catch(err => {
            console.log(err);

        });
    }

    const onRemoveUser = (id) => {
        deleteAUser(id).then((res) => {
            if (res) {
                var userArr = user.filter((u) => u._id !== id);
                setUser(userArr);
                showNotification(false, "User deleted !")
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const registerFromSubmit = (e) => {
        e.preventDefault();
        var userData = formData;

        if (formData.password != "" || formData.c_password != "") {
            if (formData.password === formData.c_password) {
                userData.password = formData.password;
            } else {
                return showNotification(true, "password not matched")
            }
        }

        userData.email = formData.email;
        userData.userName = formData.userName
        userData.phoneNumber = formData.phoneNumber
        userData.shopName = formData.shopName
        userData.shopId = formData.shopId;
        userData.accStatus = accState;
        userData.trialPeriod = formData.trialPeriod
        userData['facebook'] = urlRemake(formData.facebook) ? formData.facebook : `https://${formData.facebook}`;
        userData['instagram'] = urlRemake(formData.instagram) ? formData.instagram : `https://${formData.instagram}`;
        userData['tiktok'] = urlRemake(formData.tiktok) ? formData.tiktok : `https://${formData.tiktok}`;
        userData['address'] = formData.address;

        updateUser(userData).then(res => {
            if (res) {
                setIsModalOpen(false)
            }
        }).catch(err => {
            console.log(err);
        });

    }

    const urlRemake = (link) => {

        const httpsPattern = /^https:\/\//;

        if (httpsPattern.test(link)) {
            return true;
        } else {
            return false
        }
    }

    const onUserEdit = (u) => {
        setFormData(u);
        if(u.accStatus){
            setAccState(u.accStatus);
        }
        setAccState()
        setIsModalOpen(true);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getAccStatus =(user)=>{
        if(user.accStatus){
            if(user.accStatus=="subscribed"){
                return "Abonnée"
            }else if(user.accStatus=="trial"){
                return "Procès"
            }else if(user.accStatus=="created"){
                return "Créé"
            }
        }else{
            return 'Créé'
        }
    }

    const userUpdateCardContent = () => (
        <div className={`d-flex flex-column align-items-center justify-content-center `}>
            <div className={`${styles.formWrapper}`}>
                <h1 >Profil</h1>
                <hr className={styles.hr}></hr>
                {/* <p className='text-muted'>By including this you can increase your number of followers </p>  */}
                <form className='d-flex flex-column'>
                    <div className="d-flex flex-column">
                        <label><strong>Nom d'utilisateur</strong></label>
                        <input type="text" name="userName" placeholder="Nom d'utilisateur" className="form-control regi-input" onChange={handleChange} value={formData.userName}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Email</strong></label>
                        <input required type="email" name="email" placeholder="Email" className="form-control regi-input" onChange={handleChange} value={formData.email}></input>
                    </div>
                    <div className='d-flex flex-row w-100'>
                        <div className="d-flex flex-column w-100 mr-2" >
                            <label><strong>Password</strong></label>
                            <input required type="password" name="password" placeholder="••••••••••" className="form-control regi-input" onChange={handleChange} value={formData.password}></input>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <label><strong>Confirmez le mot de passe</strong></label>
                            <input type="password" name="c_password" placeholder="••••••••••" className="form-control regi-input" onChange={handleChange} value={formData.c_password}></input>
                        </div>
                    </div>
                    <div className='d-flex flex-row w-100'>
                        <div className="d-flex flex-column w-100 mr-2">
                            <label><strong>Nom de la boutique</strong></label>
                            <input type="text" name="shopName" placeholder="Nom de la boutique" className="form-control regi-input" onChange={handleChange} value={formData.shopName}></input>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <label><strong>Numéro de portable</strong></label>
                            <input type="text" name="phoneNumber" placeholder="Numéro de portable" className="form-control regi-input" onChange={handleChange} value={formData.phoneNumber}></input>
                        </div>
                    </div>
                    <div className="d-flex flex-column w-100">
                        <label><strong>Adresse de facturation</strong></label>
                        <input type="text" name="address" placeholder="Adresse de facturation" className="form-control regi-input" onChange={handleChange} value={formData.address}></input>
                    </div>
                    <div className='d-flex flex-row w-100'>
                        <div className="d-flex flex-column w-100 mr-2">
                            <label><strong>Période d'essai</strong></label>
                            <input type="number" name="trialPeriod" placeholder="période d'essai (en mois)" className="form-control regi-input" onChange={handleChange} value={formData.trialPeriod}></input>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <label><strong>Statut du compte</strong></label>
                            <select className="form-select form-control regi-input" onChange={(e)=>setAccState(e.target.value)} value={accState}>    
                                <option selected value="trial">Procès</option>
                                <option value="created">Créé</option>
                                <option value="subscribed">Abonnée</option>
                            </select>
                        </div>
                    </div>

                    <div className='card p-3 mt-5'>
                        <h5 className={styles.socialLinkTitle}>Mes liens sociaux</h5>
                        <hr className={`${styles.hr} mb-3`}></hr>
                        <div className="d-flex flex-column mt-3">
                            <div className='d-flex flex-row'>
                                <label><strong>Shop ID</strong></label>
                                <label className='mx-2'><a target="_blank" href='https://veryeasyagency.com/id-google/'>click here</a> to get your shop ID </label>
                            </div>

                            <input type="text" name="shopId" placeholder="shop ID" className="form-control regi-input " onChange={handleChange} value={formData.shopId}></input>
                        </div>
                        <div className="form-group my-2">
                            <label><strong>Facebook link</strong></label>
                            <input type="text" className="form-control" name="facebook" placeholder="Enter your facebook link" value={formData.facebook} onChange={handleChange}></input>
                        </div>
                        <div className="form-group my-2">
                            <label><strong>Instagram link</strong></label>
                            <input type="text" className="form-control" name="instagram" placeholder="Enter your instagram link" value={formData.instagram} onChange={handleChange}></input>
                        </div>
                        <div className="form-group my-2">
                            <label><strong>Tiktok link</strong></label>
                            <input type="text" className="form-control" name="tiktok" placeholder="Enter your tiktok link" value={formData.tiktok} onChange={handleChange}></input>
                        </div>
                    </div>

                    <button onClick={registerFromSubmit} className="commonBtnWindo mt-2 align-self-center w-100">Save</button>
                </form>

            </div>
        </div>
    )


    return (
        <>
            {!isLoading ?
                <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContent}`}>
                    <div className={`d-flex flex-column ${styles.chartContent}`}>
                        <h3 className={"mb-5"}>Liste de tous les utilisateurs</h3>
                        <table className={`table  ${styles.table}`}>
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">Image de la boutique</th>
                                    <th scope="col">Nom de la boutique</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Nombre de clients</th>
                                    <th scope="col">Statut du compte</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((obj, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row"><img className={styles.userImage} src={obj.profileImage ? obj.profileImage : "/shop.png"}></img></th>
                                            <td>{obj.shopName}</td>
                                            <td>{obj.phoneNumber}</td>
                                            <td>{obj.custermers ? obj.custermers.length : '-'}</td>
                                            <td>{getAccStatus(obj) }</td>
                                            <td><button className='btn btn-warnning' onClick={() => onRemoveUser(obj._id)}><i className="fa fa-trash" aria-hidden="true"></i></button><button className='btn ' onClick={() => onUserEdit(obj)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> </button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {isModalOpen &&
                            <div className={styles.modalOverlay1}>
                                <div className={styles.modal1}>
                                    <i onClick={() => closeModal()} className={`fa fa-times-circle cursor-pointer ${styles.closeIcon}`} aria-hidden="true"></i>
                                    {userUpdateCardContent()}
                                </div>
                            </div>}
                        {/* <BalnktCard isOpen={isModalOpen} onClose={closeModal} data={userUpdateCardContent} /> */}
                    </div>

                </div> : <Loader />
            }
        </>

    );
};

export default AdminUsersPage;