import { useEffect, useState } from 'react';
import styles from './profilePage.module.scss'
import { useSession } from 'next-auth/react';
import { getUser, updateUser } from '../../services/service';
import Loader from '../Loader/loader';

const FormDataPage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ facebook: '', instagram: '' })

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerFromSubmit = (e) => {
        e.preventDefault();

        var userData = user;

        userData['facebook'] = formData.facebook;
        userData['instagram'] = formData.instagram;

        updateUser(userData).then(res => {
            if (res) {
                setUser(userData);
            }
        }).catch(err => {
            console.log(err);
        });

    }

    return (
        <>
            {
                !isLoading ? <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContent}`}>
                    <div>
                        <h1 >Add your social network links</h1>
                        <p className='text-muted'>By including this you can increase your number of followers </p>
                        <form className='d-flex flex-column'>
                            <div className="form-group my-2">
                                <input type="text" className="form-control" name="facebook" placeholder="Enter your facebook link" value={formData.facebook} onChange={handleChange}></input>
                            </div>
                            <div className="form-group my-2">
                                <input type="text" className="form-control" name="instagram" placeholder="Enter your instagram link" value={formData.instagram} onChange={handleChange}></input>
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