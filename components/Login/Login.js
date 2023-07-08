import styles from './Login.module.css'

const Login = () => {
    return (
        <div className={styles.loginWrapper}>
            <form>
                <div className={`d-flex flex-column p-4  ${styles.loginBox}`}>
                    <h2 className={styles.headingLogin}>Login</h2>
                    <div className="d-flex flex-column">
                        <label><strong>Email</strong></label>
                        <input type="email" name="email" placeholder="Email" className="form-control"></input>
                    </div>
                    <div className="d-flex flex-column">
                        <label><strong>Password</strong></label>
                        <input type="password" name="password" placeholder="Password" className="form-control"></input>
                    </div>
                    <small><a href="#">Forget Password</a></small>
                    <button className={`btn btn-success ${styles.loginBTN}`}>Login</button>
                    <span className='align-self-center'>Don't have an account? <a href="#">Register</a></span>
                </div>
            </form>
        </div>
    );
};

export default Login;