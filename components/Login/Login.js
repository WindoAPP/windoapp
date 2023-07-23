import { useState } from 'react';
import styles from './Login.module.css'
import { loginUser } from '../../services/service';
import Loader from '../Loader/loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const fromSubmit = (e) => {
        e.preventDefault();
        var isValid = validateForm();

        if (isValid) {
            setLoading(true);
            loginUser(formData).then(res => {
                if (res.ok) {
                    router.push("/dashboard");
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }).catch((err) => {
                setLoading(false);
            })
        } else {
            return
        }


    }

    const validateForm = () => {

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

        return true;
    };
    return (
        <div className={styles.loginWrapper}>
            <form>
                <div className={`d-flex flex-column p-4  ${styles.loginBox}`}>
                    <h2 className={styles.headingLogin}>Login</h2>
                    <div className="d-flex flex-column">
                        <label><strong>Email</strong></label>
                        <input type="email" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={handleChange}></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Password</strong></label>
                        <input type="password" name="password" placeholder="Password" className="form-control" value={formData.password} onChange={handleChange}></input>
                    </div>
                    <small><a href="#">Forget Password</a></small>
                    <button className={`btn btn-success ${styles.loginBTN}`} onClick={fromSubmit}>Login</button>
                    <span className='align-self-center'>Don't have an account? <a href="/register">Register</a></span>
                </div>
            </form>
            {loading && <Loader />}
        </div>
    );
};

export default Login;