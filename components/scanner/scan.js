
import { useState } from 'react';
import styles from './scan.module.scss';
import React from 'react';
import WheelComponent from '../wheel/spinWheel';
import { useEffect } from 'react';
import { createCustomer, getUser } from '../../services/service';
import { useRouter } from 'next/router';
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';

const Scan = () => {
    const router = useRouter();
    const [user,setUser]=useState({});
    const [loading, setLoading] = useState(true);
    const [segments, setSegments] = useState([]);
    const [segmentColors, setSegmentColors] = useState([]);
    const [formData, setFormData] = useState({ email: '', phoneNumber: '', name:'',user:'',termsCheck:false});
    const { id } = router.query;


    useEffect(() => {
        if (id) {   
            getUser(id).then(res=>{
                if(res){
                    setLoading(false)
                    setUser(res.user);
                    setSegments(res.user.wheelItems);
                    setSegmentColors(pushColorsWithDynamicItems(segColors,res.user.wheelItems.length));
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
        var isValid =validateForm();
        
        if(isValid){
            setLoading(true);
            formData.user=user._id;
            createCustomer(formData).then(res => {
                if(res){
                    setLoading(false);
                    setStep(2)
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

    
    const segColors = [
        "#EE4040",
        "#F0CF50",
        "#815CD1",
        "#3DA5E0",
        "#FF9000",
        "#3DA5E0",
    ];

    function pushColorsWithDynamicItems(colorsArray, numItems) {
        const colorsLength = colorsArray.length;
        if (numItems <= colorsLength) {
          // If the number of items is less than or equal to the existing colors, no need to push more.
          return colorsArray;
        }
      
        const newColorsArray = [...colorsArray];
        const colorsToAdd = numItems - colorsLength;
        const startIndex = colorsLength % colorsLength; // To ensure the index wraps around if numItems is greater than colorsLength
      
        for (let i = 0; i < colorsToAdd; i++) {
          const nextColorIndex = (startIndex + i) % colorsLength;
          newColorsArray.push(colorsArray[nextColorIndex]);
        }
      
        return newColorsArray;
      }

    const onFinished = (winner) => {
        console.log(winner);
        setTimeout(() => {
            if (winner === "Try again") {
                alert("try again")
            } else {
                setStep(3);
                setPrice(winner)
            }
        }, 3000)


    };

    const formSubmit = () => {
        setStep(2)
    }




    return (

        <div className={` d-flex ${styles.backgroundContainer}`} >
            {!loading?
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
                    step === 2 &&
                    <div className='d-flex '>
                        <img src="/logo.png" className={styles.spinLogo}></img>
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
                {
                    step === 3 &&
                    <div>
                        <img className={styles.fireImage} src="fire.gif"></img>
                        <h2 className='text-warning'>Congratulations !!</h2>
                        <h1 className='text-success'>You won {price}</h1>
                        <p className='text-info'>Lorem Ipsum is simply dummy text of the printing</p>
                    </div>
                }
            </div>:
             <Loader />
            }
        </div>
    );
};

export default Scan;