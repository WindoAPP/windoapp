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
                return showNotification(true, "password not matched")
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
                                <label><strong>User name</strong></label>
                                <input type="text" name="userName" placeholder="User Name" className="form-control regi-input" onChange={handleChange} value={formData.userName}></input>
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
                                    <label><strong>Confirm Password</strong></label>
                                    <input type="password" name="c_password" placeholder="••••••••••" className="form-control regi-input" onChange={handleChange} value={formData.c_password}></input>
                                </div>
                            </div>
                            <div className='d-flex flex-row w-100'>
                                <div className="d-flex flex-column w-100 mr-2">
                                    <label><strong>Shop Name</strong></label>
                                    <input type="text" name="shopName" placeholder="Shop Name" className="form-control regi-input" onChange={handleChange} value={formData.shopName}></input>
                                </div>
                                <div className="d-flex flex-column w-100">
                                    <label><strong>Mobile Number</strong></label>
                                    <input type="text" name="phoneNumber" placeholder="Mobile Number" className="form-control regi-input" onChange={handleChange} value={formData.phoneNumber}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-column w-100">
                                    <label><strong>Billing address</strong></label>
                                    <input type="text" name="address" placeholder="Billing address" className="form-control regi-input" onChange={handleChange} value={formData.address}></input>
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

                            <button onClick={registerFromSubmit} className="btn btn-success mt-2">Save</button>
                        </form>

                    </div>

                </div> : <Loader />
            }
        </>

    );
};

export default FormDataPage;