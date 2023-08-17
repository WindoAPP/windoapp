
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
import BalnktCard from '../blankCard/blankCard';
import ContentCard from '../contentCard/contentCard';

const Scan = () => {
    const modalData= [
        {
            heading:`Article 1 - Collecte et Utilisation des Données Personnelles `,
            des:`1.1 Nous collectons les données personnelles suivantes lorsque vous utilisez
            l'application "Windo" :
            • Votre nom complet
            • Votre adresse e-mail
            • Votre numéro de téléphone
            • Les informations liées à votre participation au jeu de roue
            • Votre avis sur la fiche Google de notre magasin dans les résultats de
            recherche Google
            1.2 Ces données sont exclusivement réservées aux utilisateurs de
            l'application "Windo" et sont collectées dans le but de fournir une expérience
            de jeu personnalisée et améliorée.`
        },
        {
            heading:`Article 2 - Utilisation des Données Personnelles`,
            des:`2.1 Nous utilisons les données personnelles que nous collectons pour les
            finalités suivantes :
            • Gérer et administrer votre participation au jeu de roue
            • Vous contacter par e-mail, téléphone ou SMS pour vous informer des
            offres spéciales, promotions et nouvelles de notre société, avec votre
            consentement
            • Améliorer l'expérience utilisateur de l'application
            • Répondre à vos demandes et préoccupations
            2.2 En utilisant l'application "Windo", vous consentez à ce que vos données
            personnelles soient utilisées pour vous envoyer des offres promotionnelles de
            notre société.`
        },
        {
            heading:`Article 3 - Consentement`,
            des:`3.1 En utilisant notre application, vous consentez à ce que nous collections,
            utilisions et stockions vos données personnelles conformément à cette
            politique de confidentialité. Vous consentez également à ce que votre avis sur
            la fiche Google de notre magasin soit collecté et utilisé comme condition
            préalable à votre participation au jeu.`
        },
        {
            heading:`Article 4 - Responsabilité du Prestataire`,
            des:`4.1 Le prestataire qui a créé l'application "Windo" n'est plus responsable et
            se décharge de toutes accusations ou mal utilisations résultant de l'utilisation
            de l'application. Toute responsabilité liée à l'application, y compris la collecte
            et l'utilisation des données personnelles des utilisateurs, incombe à l'entité
            qui exploite l'application.`
        },
        {
            heading:`Article 5 - Résiliation de l'Engagement de l'Utilisateur`,
            des:`5.1 Si un utilisateur ne respecte pas les termes et conditions énoncés dans
            cette politique de confidentialité ou s'engage dans une utilisation abusive de
            l'application, nous nous réservons le droit d'interrompre son engagement et
            de mettre fin à son utilisation de l'application "Windo" à tout moment et sans
            préavis.`
        },
        {
            heading:`Article 6 - Sécurité des Données`,
            des:`6.1 Nous prenons des mesures techniques et organisationnelles pour garantir
            la sécurité de vos données personnelles et protéger vos informations contre
            tout accès non autorisé, perte, altération ou divulgation. Notre hébergeur
            LWS France assure un serveur sécurisé pour le stockage de vos données.`
        },
        {
            heading:`Article 7 - Partage des Données Personnelles`,
            des:`7.1 Nous ne partageons pas vos données personnelles avec des tiers sans
            votre consentement explicite, sauf dans les cas suivants :
            • Lorsque cela est nécessaire pour remplir nos obligations envers vous (par
            exemple, pour vous envoyer des offres de la société)
            • Lorsque nous sommes tenus de le faire par la loi
            `
        },
        {
            heading:`Article 8 - Vos Droits`,
            des:`8.1 Conformément aux lois applicables, vous avez le droit d'accéder à vos
            données personnelles, de les rectifier, de les effacer ou de limiter leur
            traitement. Vous pouvez également vous opposer au traitement de vos
            données à des fins de marketing direct. Pour exercer ces droits ou pour toute
            question concernant vos données personnelles, veuillez nous contacter à
            contact@veryeasyagency.com.`
        },
        {
            heading:`Article 9 - Modifications de la Politique de Confidentialité`,
            des:`Nous pouvons mettre à jour cette politique de confidentialité périodiquement
            pour refléter les changements dans nos pratiques de collecte et de traitement
            des données. Nous vous encourageons à consulter cette page régulièrement
            pour être informé des modifications éventuelles.
            Merci d'utiliser l'application web "Windo". Si vous avez des questions
            concernant cette politique de confidentialité, veuillez nous contacter à
            contact@veryeasyagency.com.`
        }
    ]

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
    const [wheelItemsArr, setWheelItemsArr] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const { id } = router.query;


    useEffect(() => {
        setScreenHeight(window.innerHeight);
        const savedValue = localStorage.getItem('spin_count');
        if (savedValue) {
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
        if (spinCount == 0) {
            url = `https://search.google.com/local/writereview?placeid=${user.shopId}`; // Replace with your desired URL
        } else if (spinCount == 1) {
            url = user.facebook
        } else if (spinCount == 2) {
            url = user.instagram
        } else {
            url = user.tiktok
        }

        const width = "80%";
        const height = "auto";
        const windowFeatures = `width=${width},height=${height}`;

        const newWindow = window.open(url, '_blank', windowFeatures);

        newWindow.addEventListener('beforeunload', handleWindowClose);
        setStep(1);
        localStorage.setItem('spin_count', spinCount + 1);

        // Retrieve the value from local storage


    };

    const handleWindowClose = () => {
        // Perform any actions when the newly opened window is closed
        console.log('Newly opened window closed');
    };

    const onFinished = (winner) => {
        setTimeout(() => {


            var index = segments.indexOf(winner);
            var selectedItm = wheelItemsArr[index];


            var custimerData = customer;

            if (custimerData) {
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
            var notificationData = {
                backColor: !selectedItm.isWinningItem ? "alert-secondary" : "alert-success",
                user: user._id,
                body: !selectedItm.isWinningItem ? "perdu le jeu tourner la roue" : "a gagné le prix en jouant à faire tourner la roue",
                icon: !selectedItm.isWinningItem ? "fa-certificate" : "fa-trophy",
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

    const createNotifi = (data) => {
        createNotification(data).then(res => {
            if (res) {
                console.log("notfifi created!", res);
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

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeModal1 = () => {
        setIsModalOpen1(false);
    };

    const openModal1 = () =>{
        setIsModalOpen1(true)
    }

    const wheelCardContent = () => (
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.wheelCardContentWrapper}`}>
            <h1 className='mb-4'>Laissez nous un avis ou abonnez-vous</h1>
            <div className=' d-flex flex-column align-items-start mb-4'>
                <div className={`d-flex flex-row align-items-center justify-content-center ${styles.cardListItem}`}>
                    <div className='d-flex flex-row align-items-center justify-content-center m-1'>1</div>
                    <p>Laissez nous un avis</p>
                </div>
                <div className={`d-flex flex-row align-items-center justify-content-center ${styles.cardListItem}`}>
                    <div className='d-flex flex-row align-items-center justify-content-center m-1'>2</div>
                    <p>Confirmer votre avis</p>
                </div>
                <div className={`d-flex flex-row align-items-center justify-content-center ${styles.cardListItem}`}>
                    <div className='d-flex flex-row align-items-center justify-content-center m-1'>3</div>
                    <p>Revenez tourner la roue!</p>
                </div>      
            </div>
            <button className='commonBtnWindo w-50' onClick={closeModal}>Let's go !</button>
            <div className={`d-flex ${styles.imageArr}`}>
                <img className={styles.google} src='/google.png'></img>
                <img className={styles.insta} src='/insta.png'></img>
                <img className={styles.tiktok} src='/tiktok.png'></img>
                <img className={styles.fb} src='/fb.png'></img>
            </div>
        </div>
    )





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
                                <h3 className='text-dark mb-4'>Please fill this form</h3>
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
                                        <label className="form-check-label text-start" for="termsCheck">I agree to the terms and conditions <span className='text-primary cursor-pointer' onClick={openModal1}>Click here</span></label>
                                    </div>
                                    <button onClick={registerFromSubmit} className="commonBtnWindo w-75">Submit & Spin</button>
                                </form>
                                <ContentCard isOpen={isModalOpen1} onClose={closeModal1} title={`Politique de Confidentialité de l'Application Web Windo`} data={modalData}/>
                            </div>

                        }
                        {
                            step === 3 &&
                            <div>
                                {isWin ? <img className={styles.fireImage} src="fire.gif"></img> : <img className={styles.fireImage} src="sadimage.gif"></img>}
                                <h2 className='text-warning'>{isWin ? "Congratulations !!" : "Sorry !!"}</h2>
                                <h1 className='text-success'>{isWin ? `You won ${price}` : "Try Again with next time"}</h1>
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
                                <p className='align-self-center text-center '>{user.shopSlogan && user.shopSlogan} </p>
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
                                    size={screenHeight > 782 ? 250 : 200}
                                    width={200}
                                    height={2000}
                                    upDuration={50}
                                    downDuration={2000}

                                    ref={childRef}
                                />
                            </div>
                            <BalnktCard isOpen={isModalOpen} onClose={closeModal} data={wheelCardContent} />
                            
                        </div>
                    }
                </div> :
                <Loader />
            }
        </div>
    );
};

export default Scan;