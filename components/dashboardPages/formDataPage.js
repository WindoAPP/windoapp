import { useEffect, useState } from 'react';
import styles from './formDataPage.module.scss'
import { useSession } from 'next-auth/react';
import { getUser, updateUser } from '../../services/service';
import Loader from '../Loader/loader';
import showNotification from '../showNotifications/showNotifications';

const FormDataPage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ facebook: '',address:'', tiktok: '', instagram: '', email: '', password: '', c_password: '', userName: '', phoneNumber: '', shopName: '', shopId: '' })

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
                setFormData(
                    { facebook: res.user.facebook || "",address: res.user.address || "", tiktok: res.user.tiktok || "", instagram: res.user.instagram || "", email: res.user.email, password: '', c_password: '', userName: res.user.userName, phoneNumber: res.user.phoneNumber, shopName: res.user.shopName, shopId: res.user.shopId }
                )
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerFromSubmit = (e) => {
        e.preventDefault();
        var userData = user;

        if (formData.password != "" || formData.c_password != "") {
            if (formData.password === formData.c_password) {
                userData.password = formData.password;
            } else {
                return showNotification(true, "le mot de passe ne correspond pas")
            }
        }

        userData.email = formData.email;
        userData.userName = formData.userName
        userData.phoneNumber = formData.phoneNumber
        userData.shopName = formData.shopName
        userData.shopId = formData.shopId
        userData['facebook'] = urlRemake(formData.facebook)? formData.facebook:`https://${formData.facebook}`;
        userData['instagram'] = urlRemake(formData.instagram)? formData.instagram:`https://${formData.instagram}`;
        userData['tiktok'] = urlRemake(formData.tiktok)? formData.tiktok:`https://${formData.tiktok}`;
        userData['address'] = formData.address;
  
        updateUser(userData).then(res => {
            if (res) {
                setUser(userData);
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

    return (
        <>
            {
                !isLoading ? <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContent}`}>
                    <div className={`${styles.formWrapper}`}>
                        <h1 onClick={()=>urlRemake(formData.facebook)} >Profil</h1>
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
                                    <label><strong>Mot de passe</strong></label>
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

                            <div className='card p-3 mt-5'>
                                <h5 className={styles.socialLinkTitle}>Mes liens sociaux</h5>
                                <hr className={`${styles.hr} mb-3`}></hr>
                                <div className="d-flex flex-column mt-3">
                                    <div className='d-flex flex-column mb-1'>
                                        <label><strong>Identifiant de la boutique</strong></label>
                                        <label className=''><a target="_blank" href='https://veryeasyagency.com/id-google/'>click here</a> to get your shop ID </label>
                                    </div>

                                    <input type="text" name="shopId" placeholder="shop ID" className="form-control regi-input " onChange={handleChange} value={formData.shopId}></input>
                                </div>
                                <div className="form-group my-2">
                                    <label><strong>Facebook lien</strong></label>
                                    <input type="text" className="form-control" name="facebook" placeholder="Entrez votre lien Facebook" value={formData.facebook} onChange={handleChange}></input>
                                </div>
                                <div className="form-group my-2">
                                    <label><strong>Instagram lien</strong></label>
                                    <input type="text" className="form-control" name="instagram" placeholder="Entrez votre lien Instagram" value={formData.instagram} onChange={handleChange}></input>
                                </div>
                                <div className="form-group my-2">
                                    <label><strong>Tiktok lien</strong></label>
                                    <input type="text" className="form-control" name="tiktok" placeholder="Entrez votre lien tiktok" value={formData.tiktok} onChange={handleChange}></input>
                                </div>
                            </div>

                            <button onClick={registerFromSubmit} className="commonBtnWindo mt-2 align-self-center w-100">Sauvegarder</button>
                        </form>

                    </div>

                </div> : <Loader />
            }
        </>

    );
};

export default FormDataPage;