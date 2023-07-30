
import { useState } from 'react';
import styles from './scan.module.scss';
import React from 'react';
import WheelComponent from '../wheel/spinWheel';
import { useEffect } from 'react';
import { createCustomer, getUser, updateCustomer } from '../../services/service';
import { useRouter } from 'next/router';
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';

const Scan = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [segments, setSegments] = useState([]);
    const [segmentColors, setSegmentColors] = useState([]);
    const [formData, setFormData] = useState({ email: '', phoneNumber: '', name: '', user: '', facebook: '', instagram: '', termsCheck: false, spins: [] });
    const { id } = router.query;


    useEffect(() => {
        if (id) {
            getUser(id).then(res => {
                if (res) {
                    setLoading(false)
                    setUser(res.user);

                    var segmentsTemp = res.user.wheelItems.map(obj => { return obj.item });
                    var segmentsColorTemp = res.user.wheelItems.map(obj => { return obj.color });

                    setSegments(segmentsTemp);
                    setSegmentColors(segmentsColorTemp);
                }

            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
        }
    }, [id]);




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerFromSubmit = (e) => {
        e.preventDefault();
        var isValid = validateForm();

        if (isValid) {
            setLoading(true);
            formData.user = user._id;
            createCustomer(formData).then(res => {
                if (res) {
                    setLoading(false);
                    setStep(2);
                    setCustomer(res.gust);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        } else {
            return
        }
    }

    const validateForm = () => {

        if (formData.email == "") {
            showNotifications(true, "email required")
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showNotifications(true, "Invalid email address")
            return false;
        }
        if (formData.name == "") {
            showNotifications(true, "Name required")
            return false;
        }
        if (formData.phoneNumber == "") {
            showNotifications(true, "Mobile Number required")
            return false;
        }
        if (formData.phoneNumber == "") {
            showNotifications(true, "Mobile Number")
            return false;
        }
        if (!formData.termsCheck) {
            showNotifications(true, "Please check terms and conditions")
            return false;
        }

        return true;
    };

    // Open a new window when the button is clicked
    const openNewWindow = () => {
        const url = `https://search.google.com/local/writereview?placeid=${user.shopId}`; // Replace with your desired URL
        const width = "80%";
        const height = "auto";
        const windowFeatures = `width=${width},height=${height}`;

        const newWindow = window.open(url, '_blank', windowFeatures);

        newWindow.addEventListener('beforeunload', handleWindowClose);
        setStep(1);

    };

    const handleWindowClose = () => {
        // Perform any actions when the newly opened window is closed
        console.log('Newly opened window closed');
    };


    const [step, setStep] = useState(0);
    const [price, setPrice] = useState();

    const onFinished = (winner) => {
        setTimeout(() => {
            if (winner === "Try again") {
                alert("try again")
            } else {
                setStep(3);
                setPrice(winner)
            }

            var custimerData = customer;

            if (customer.spins) {
                custimerData.spins.push({
                    isWin: false,
                    price: winner,
                    created_at: new Date()
                })
            } else {
                custimerData['spins'] = [];
                custimerData.spins.push({
                    isWin: true,
                    price: winner,
                    created_at: new Date()
                })
            }
            updateCustomerFn(custimerData);
        }, 3000)


    };

    const updateCustomerFn = (data) => {
        updateCustomer(data).then(res => {
            if (res) {
                setCustomer(data);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (

        <div className={` d-flex ${styles.backgroundContainer}`} >
            {!loading ?
            <div>{step !== 2 &&
                <div className={`card shadow  p-4 ${styles.card} ${step == 2 ? styles.addMarginBottom : ''}`}>
                    {
                        step === 0 &&

                        <div>
                            <img src='/trophy.png' className={styles.cardImage}></img>
                            <h1>Congratulations !! </h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a</p>
                            <button onClick={openNewWindow} className='btn btn-warning'>Review product</button>
                        </div>
                    }
                    {
                        step === 1 &&

                        <div>
                            <h4 className='text-primary'>Please fill this form</h4>
                            <p className='text-info'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting <i className='fa fa-hand-o-down text-warning'> </i>
                            </p>
                            <form>
                                <div className="form-group my-2">
                                    <input type="text" className="form-control" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange}></input>
                                </div>
                                <div className="form-group my-2">
                                    <input type="email" className="form-control" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}></input>
                                </div>
                                <div className="form-group my-2">
                                    <input type="text" className="form-control" name="facebook" placeholder="Enter your facebook ID" value={formData.facebook} onChange={handleChange}></input>
                                </div>
                                <div className="form-group my-2">
                                    <input type="text" className="form-control" name="instagram" placeholder="Enter your instagram ID" value={formData.instagram} onChange={handleChange}></input>
                                </div>
                                <div className="form-group my-2">
                                    <input type="tel" className="form-control" name="phoneNumber" placeholder="Enter your mobile number" value={formData.phoneNumber} onChange={handleChange}></input>
                                </div>
                                <div className="form-check my-3">
                                    <input type="checkbox" className="form-check-input" name="termsCheck" value={formData.termsCheck} onChange={handleChange}></input>
                                    <label className="form-check-label" for="termsCheck">I agree to the terms and conditions</label>
                                </div>
                                <button onClick={registerFromSubmit} className="btn btn-warning">Submit & Spin</button>
                            </form>

                        </div>

                    }
                    {
                        step === 3 &&
                        <div>
                            <img className={styles.fireImage} src="fire.gif"></img>
                            <h2 className='text-warning'>Congratulations !!</h2>
                            <h1 className='text-success'>You won {price}</h1>
                            <p className='text-info'>Lorem Ipsum is simply dummy text of the printing</p>
                        </div>
                    }
                </div> 
}
                {
                        step === 2 &&
                        <div className={`d-flex ${styles.wheelWrapperc}`} >
                            <div className={`d-flex flex-row p-3 align-items-center ${styles.spinTopWrapper}`}>
                                <img src={user.profileImage ? user.profileImage : "/shop.png"} className={styles.spinLogo}></img>
                                <div className='d-flex flex-column ms-4'>
                                    <h4 className='align-self-start'>{user.shopName}</h4>
                                    <p className='align-self-start text-left'>Lorem Ipsum is simply dummy</p>
                                </div>
                            </div>

                            <div className={styles.wheelWrapper}>
                                <WheelComponent
                                    segments={segments}
                                    segColors={segmentColors}
                                    winningSegment=""
                                    onFinished={(winner) => onFinished(winner)}
                                    primaryColor="black"
                                    primaryColoraround="#ffffffb4"
                                    contrastColor="white"
                                    buttonText="Spin"
                                    isOnlyOnce={false}
                                    size={150}
                                    upDuration={50}
                                    downDuration={2000}
                                />
                            </div>
                        </div>


                    }
                </div> :
                <Loader />
            }
        </div>
    );
};

export default Scan;