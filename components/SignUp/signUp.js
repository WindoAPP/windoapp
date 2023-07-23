import { useState } from 'react';
import styles from './signUp.module.scss'
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';
import { createUser } from '../../services/service';


const SignUp = () => {
    const [formData, setFormData] = useState({ email: '', password: '', c_password: '', userName: '', phoneNumber: '', shopName: '', shopId: '' });
    const [loading, setLoading] =useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerFromSubmit = (e) => {
        e.preventDefault();
        var isValid =validateForm();
        
        if(isValid){
            setLoading(true);
            createUser(formData).then(res => {
                if(res){
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        }else{
            return
        }

    }

    const validateForm = () => {

        if (formData.userName == "") {
            showNotifications(true, "User Name required")
            return false;
        }
        if (formData.password == "") {
            showNotifications(true, "Password required")
            return false;
        }
        if (formData.email == "") {
            showNotifications(true, "email required")
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showNotifications(true, "Invalid email address")
            return false;
        }
        if (formData.c_password == "") {
            showNotifications(true, "Confirm Password required")
            return false;
        }
        if (formData.shopName == "") {
            showNotifications(true, "Shop Name required")
            return false;
        }
        if (formData.shopId == "") {
            showNotifications(true, "Shop ID required")
            return false;
        }
        if (formData.phoneNumber == "") {
            showNotifications(true, "Mobile Number")
            return false;
        }
        if (formData.password !== formData.c_password) {
            showNotifications(true, "Password mismathed")
            return false;
        }

        return true;
    };

    return (
        <div className={styles.loginWrapper}>
            <form>
                <div className={`d-flex flex-column p-4  ${styles.loginBox}`}>
                    <h2 className={styles.headingLogin}>Register</h2>
                    <div className="d-flex flex-column">
                        <label><strong>User Name</strong></label>
                        <input type="text" name="userName" placeholder="User Name" className="form-control" onChange={handleChange} value={formData.userName}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Email</strong></label>
                        <input required type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} value={formData.email}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Password</strong></label>
                        <input required type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} value={formData.password}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Confirm Password</strong></label>
                        <input type="password" name="c_password" placeholder="Confirm Password" className="form-control" onChange={handleChange} value={formData.c_password}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Shop Name</strong></label>
                        <input type="text" name="shopName" placeholder="Shop Name" className="form-control" onChange={handleChange} value={formData.shopName}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Mobile Number</strong></label>
                        <input type="text" name="phoneNumber" placeholder="Mobile Number" className="form-control" onChange={handleChange} value={formData.phoneNumber}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>shop ID</strong></label>
                        <input type="text" name="shopId" placeholder="shop ID" className="form-control" onChange={handleChange} value={formData.shopId}></input>
                    </div>
                    <button className={`btn btn-success mt-4 ${styles.loginBTN}`} onClick={registerFromSubmit}>Register</button>
                    <span className='align-self-center'>Already have an account? <a href="/login">Login</a></span>
                </div>
            </form>
            {loading && <Loader/>}
        </div>
    );
};

export default SignUp;