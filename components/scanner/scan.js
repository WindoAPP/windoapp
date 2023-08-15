
import { useState } from 'react';
import styles from './scan.module.scss';
import React from 'react';
import WheelComponent from '../wheel/spinWheel';
import { useEffect } from 'react';
import { createCustomer, createNotification, getUser, updateCustomer } from '../../services/service';
import { useRouter } from 'next/router';
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';
import { useRef } from 'react';

const Scan = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [segments, setSegments] = useState([]);
    const [segmentColors, setSegmentColors] = useState([]);
    const [formData, setFormData] = useState({ email: '', phoneNumber: '', name: '', user: '', facebook: '', instagram: '', termsCheck: false, spins: [] });
    const [step, setStep] = useState(0);
    const [price, setPrice] = useState();
    const [screenHeight, setScreenHeight] = useState();
    const [spinCount, setSpinCount] = useState(0);
    const [wheelItemsArr,setWheelItemsArr] = useState([]);
    const [isWin,setIsWin] = useState(false);

    const { id } = router.query;


    useEffect(() => {
        setScreenHeight(window.innerHeight);
        const savedValue = localStorage.getItem('spin_count');
        if(savedValue){
            setSpinCount(savedValue);
        }
        if (id) {
            getUser(id).then(res => {
                if (res) {
                    setLoading(false)
                    setUser(res.user);

                    var segmentsTemp = res.user.wheelItems.map(obj => { return obj.item });
                    var segmentsColorTemp = res.user.wheelItems.map(obj => { return obj.color });

                    setSegments(segmentsTemp);
                    setSegmentColors(segmentsColorTemp);
                    setWheelItemsArr(res.user.wheelItems);
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
    const openNewWindow = (e) => {
        e.preventDefault();
        var url;
        if(spinCount==0){
            url = `https://search.google.com/local/writereview?placeid=${user.shopId}`; // Replace with your desired URL
        }else if(spinCount==1){
            url=user.facebook
        }else if(spinCount==2){
            url=user.instagram
        }else{
            url=user.tiktok
        }
         
        const width = "80%";
        const height = "auto";
        const windowFeatures = `width=${width},height=${height}`;

        const newWindow = window.open(url, '_blank', windowFeatures);

        newWindow.addEventListener('beforeunload', handleWindowClose);
        setStep(1);
        localStorage.setItem('spin_count', spinCount+1);

        // Retrieve the value from local storage
        

    };

    const handleWindowClose = () => {
        // Perform any actions when the newly opened window is closed
        console.log('Newly opened window closed');
    };

    const onFinished = (winner) => {
        setTimeout(() => {
            

            var index = segments.indexOf(winner);
            var selectedItm=wheelItemsArr[index];


            var custimerData = customer;

            if(custimerData){
                if (selectedItm.isWinningItem) {
                    setIsWin(true);
                    setStep(3);
                    setPrice(winner);
                } else {
                    setStep(3);
                    setIsWin(false);     
                }
            }

            if (customer.spins) {
                custimerData.spins.push({
                    isWin: selectedItm.isWinningItem,
                    price: winner,
                    created_at: new Date()
                })
            } else {
                custimerData['spins'] = [];
                custimerData.spins.push({
                    isWin: selectedItm.isWinningItem,
                    price: winner,
                    created_at: new Date()
                })
            }
            updateCustomerFn(custimerData);
            var notificationData ={
                backColor: !selectedItm.isWinningItem? "alert-secondary":"alert-success",
                user: user._id,
                body: !selectedItm.isWinningItem? "perdu le jeu tourner la roue": "a gagné le prix en jouant à faire tourner la roue",
                icon: !selectedItm.isWinningItem? "fa-certificate" : "fa-trophy",
                customer: customer._id
        
            }
            createNotifi(notificationData);
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

    const createNotifi=(data)=>{
        createNotification(data).then(res => {
            if (res) {
                console.log("notfifi created!",res);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const childRef = useRef(null);

  const handleCallChildFunction = () => {
    if (childRef.current) {
      childRef.current.spin(); // Call the child function using the ref
    }
  };

    return (

        <div className={` d-flex ${styles.backgroundContainer} ${step !== 2 && "align-items-center justify-content-center"}`} >
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
                            {isWin?<img className={styles.fireImage} src="fire.gif"></img>:<img className={styles.fireImage} src="sadimage.gif"></img>}
                            <h2 className='text-warning'>{isWin?"Congratulations !!":"Sorry !!"}</h2>
                            <h1 className='text-success'>{isWin?`You won ${price}`:"Try Again with next time"}</h1>
                            <p className='text-info'>Lorem Ipsum is simply dummy text of the printing</p>
                        </div>
                    }
                </div> 
}
                {
                        step === 2 &&
                        <div className={`d-flex ${styles.wheelWrapperc}`} >
                            <div className={`d-flex flex-column p-3 ${styles.spinTopWrapper}`}>
                                <img src={user.profileImage ? user.profileImage : "/shop.png"} className={`my-4 ${styles.spinLogo}`}></img>
                                <p className='align-self-center text-center '>{user.shopSlogan && user.shopSlogan } </p>
                                <button onClick={handleCallChildFunction} type="button" className="btn btn-success btn-lg align-self-end shadow">Spin Now! </button>
                            </div>

                            <div className={styles.wheelWrapper}>
                                <WheelComponent
                                    segments={segments}
                                    segColors={segmentColors}
                                    winningSegment="red"
                                    onFinished={(winner) => onFinished(winner)}
                                    primaryColor="black"
                                    primaryColoraround="#0E4502"
                                    contrastColor="white"
                                    buttonText=""
                                    isOnlyOnce={false}
                                    size={screenHeight>782?250:200}
                                    width={200}
                                    height={2000}
                                    upDuration={50}
                                    downDuration={2000}
                                   
                                    ref={childRef}
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