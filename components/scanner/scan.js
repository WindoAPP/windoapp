
import { useState } from 'react';
import styles from './scan.module.scss';
import React from 'react';
import WheelComponent from '../wheel/spinWheel';
import { useEffect } from 'react';

const Scan = () => {

       // Open a new window when the button is clicked
       const openNewWindow = () => {
        const url = 'https://search.google.com/local/writereview?placeid=ChIJqdd1GdKggiERZTLkuAP6k8Q'; // Replace with your desired URL
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

    const segments = ["100$", "50$", "10$", "1$", "Try again", "20$"];
    const segColors = [
        "#EE4040",
        "#F0CF50",
        "#815CD1",
        "#3DA5E0",
        "#FF9000",
        "#3DA5E0",
    ];

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
            { }
            <div className={`card shadow  p-4 ${styles.card} ${step==1?styles.addMarginBottom:''}`}>
                {
                    step === 0 &&

                    <div>
                        <img src='/trophy.png' className={styles.cardImage}></img>
                        <h1>Congratulations !!</h1>
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
                            <div class="form-group my-2">
                                <input type="text" class="form-control" id="name" placeholder="Enter your name"></input>
                            </div>
                            <div class="form-group my-2">
                                <input type="email" class="form-control" id="email" placeholder="Enter your email"></input>
                            </div>
                            <div class="form-group my-2">
                                <input type="tel" class="form-control" id="mobile" placeholder="Enter your mobile number"></input>
                            </div>
                            <div class="form-check my-3">
                                <input type="checkbox" class="form-check-input" id="termsCheck"></input>
                                <label class="form-check-label" for="termsCheck">I agree to the terms and conditions</label>
                            </div>
                            <button onClick={formSubmit} class="btn btn-warning">Submit & Spin</button>
                        </form>
                        <div className={`${styles.wheelWrapper}` }>
                        <WheelComponent
                            segments={segments}
                            segColors={segColors}
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
                    step === 2 &&
                    <div className={styles.wheelWrapper}>
                        <WheelComponent
                            segments={segments}
                            segColors={segColors}
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
        </div>
    );
};

export default Scan;