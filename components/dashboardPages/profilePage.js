import styles from './profilePage.module.scss'
import React, { useEffect, useRef, useState } from 'react';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/dist/rsuite.min.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSession, signOut } from 'next-auth/react';
import QRCode from 'qrcode.react';

import { HexColorPicker } from 'react-colorful';

import { ScaleLoader } from 'react-spinners';
import { env_data } from '../../config/config';
import dayjs from 'dayjs';
import { getUser, profileImageUpload, updateUser } from '../../services/service';
import WheelComponent from '../wheel/spinWheel';
import showNotification from '../showNotifications/showNotifications';
import Loader from '../Loader/loader';


Chart.register(CategoryScale);

const ProfilePage = () => {
    const { data: session } = useSession();
    const [colorPickNo, setColorPickNo] = useState(1);
    const [selectedImage, setSelectedImage] = useState('/shop.png');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUploading, setImageUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#00df20");
    const [color2, setColor2] = useState("#000");
    const [sloganColor, setSloganColor] = useState("#000");
    const [spinBtnColor, setSpinBtnColor] = useState("#2ebb77");
    const [primaryColor, setPrimaryColor] = useState("#000");
    const [secondaryColor, setSecondaryColor] = useState("#fff");
    const [item, setItem] = useState("");
    const [itemLost, setItemLost] = useState("");
    const [user, setUser] = useState({});
    const [wheelItems, setWheelItems] = useState([]);
    const [file, setFile] = useState(null);
    const [screenHeight, setScreenHeight] = useState();
    const [segments, setSegments] = useState([]);
    const [segmentColors, setSegmentColors] = useState([]);
    const [wheelUpdated, setWheelUpdated] = useState(false);
    const [colorPallate01Opend, setColorPallate01Opend] = useState(false);
    const [colorPallate02Opend, setColorPallate02Opend] = useState(false);
    const [sloganColorPallateOpend, setSloganColorPallateOpend] = useState(false);
    const [spinBtnColorPallateOpend, setSpinBtnColorPallateOpend] = useState(false);
    const [primaryColorPallateOpend, setPrimaryColorPallateOpend] = useState(false);
    const [secondaryColorPallateOpend, setSecondaryColorPallateOpend] = useState(false);
    const [wheelItemsTouched, setWheelItemsTouched] = useState(false);
    const [slogan, setSlogan] = useState("Ajoutez votre texte");
    const [winningProbability, setWinningProbability] = useState(0);
    const [spinBtnText, setSpinBtnText] = useState('Rotation !');
    const [wheelItemontSize, setWheelItemontSize] = useState(25);


    useEffect(() => {
        setScreenHeight(window.innerHeight);
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };


    const uploadFile = () => {
        if (!file) {
            return alert("Veuillez sélectionner une image")
        }
        setImageUploading(true)
        profileImageUpload({ onProgress: setUploadProgress, file: file, userData: user }).then(imageurl => {
            if (imageurl) {
                var userData = user;
                userData.profileImage = imageurl;
                updateUser(userData).then(res => {
                    if (res) {
                        setUser(userData);
                    }
                }).catch(err => {
                    console.log(err);
                });

                setImageUploading(false);

            }
        }).catch(err => {
            console.log(err);
        });
    }

    const addItem = (isWin) => {
        if (isWin) {
            if (item == "") {
                return showNotification(true, "Veuillez ajouter le nom du cadeau")
            }
        } else {
            if (itemLost == "") {
                return showNotification(true, "Veuillez ajouter le nom du cadeau")
            }
        }

        var w_item = { item: isWin ? item : itemLost, color: colorPickNo == 1 ? color : color2, isWinningItem: isWin }
        setWheelItems([...wheelItems, w_item]);
        setItem("");
        setItemLost("");
        setSegments([...segments, isWin ? item : itemLost]);
        setSegmentColors([...segmentColors, colorPickNo == 1 ? color : color2]);
        setWheelUpdated(false);
        setWheelItemsTouched(true);

        var colorNo;
        if (colorPickNo === 1) {
            colorNo = 2;
        } else if (colorPickNo === 2) {
            colorNo = 1;
        }
        setColorPickNo(colorNo);

        setTimeout(() => {
            setWheelUpdated(true);
        }, 100)
    }

    const removeItem = (index) => {
        const updatedWheelItems = wheelItems.filter((_, i) => i !== index);
        setWheelItems(updatedWheelItems);
        const updatedsegmets = segments.filter((_, i) => i !== index);
        setSegments(updatedsegmets);
        const updatedcolors = segmentColors.filter((_, i) => i !== index);
        setSegmentColors(updatedcolors);
        setWheelUpdated(false);
        setWheelItemsTouched(true);
        setTimeout(() => {
            setWheelUpdated(true);
        }, 500)
    }

    const saveWheelItems = () => {
        var userData = user;
        userData['wheelItems'] = wheelItems;
        userData['shopSlogan'] = slogan;
        userData['winningProbability'] = winningProbability;
        userData['dashboardConfig'] = {
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
            sloganColor: sloganColor,
            wheelItemTextSize: wheelItemontSize,
            spinBtnColor: spinBtnColor,
            spinBtnText: spinBtnText
        }
        setLoading(true);
        updateUser(userData).then(res => {
            if (res) {
                setWheelItemsSaved(true)
                setLoading(false);
                setUser(userData);
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });

    }

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                if (res.user.profileImage) {
                    setSelectedImage(res.user.profileImage);
                }
                setWheelItems(res.user.wheelItems);

                if (res.user.dashboardConfig) {
                    res.user.dashboardConfig.primaryColor && setPrimaryColor(res.user.dashboardConfig.primaryColor);
                    res.user.dashboardConfig.secondaryColor && setSecondaryColor(res.user.dashboardConfig.secondaryColor);
                    res.user.dashboardConfig.sloganColor && setSloganColor(res.user.dashboardConfig.sloganColor);
                    res.user.dashboardConfig.wheelItemTextSize && setWheelItemontSize(res.user.dashboardConfig.wheelItemTextSize);
                    res.user.dashboardConfig.spinBtnColor && setSpinBtnColor(res.user.dashboardConfig.spinBtnColor);
                    res.user.dashboardConfig.spinBtnText && setSpinBtnText(res.user.dashboardConfig.spinBtnText);
                }

                var segmentsTemp = res.user.wheelItems.map(obj => { return obj.item });
                var segmentsColorTemp = res.user.wheelItems.map(obj => { return obj.color });
                setSegments(segmentsTemp);
                setSegmentColors(segmentsColorTemp);
                setWheelUpdated(true);
                setLoading(false);
                if (res.user.winningProbability) {
                    setWinningProbability(res.user.winningProbability)
                }
                if (res.user.shopSlogan) {
                    setSlogan(res.user.shopSlogan);
                }

            }
        }).catch(err => {
            console.log(err);

        });
    }

    const onSloganChange = (e) => {
        setSlogan(e.target.value);
        setWheelItemsTouched(true);
    }

    const onWinningProbabilityChange = (e) => {
        setWinningProbability(e.target.value)
        setWheelItemsTouched(true);
    }

    const childRef = useRef(null);

    const handleCallChildFunction = () => {
        if (childRef.current) {
            childRef.current.spin(); // Call the child function using the ref
        }
    };

    const onChangeColor1 = (e) => {
        setColor(e);
    }

    const onChangeColor2 = (e) => {
        setColor2(e);
    }

    const onChangeSloanColor = (e) => {
        setSloganColor(e);
    }

    const onChangeSpinBtnColor = (e) => {
        setSpinBtnColor(e);
    }

    const onChangePrimaryColor = (e) => {
        setPrimaryColor(e);
    }

    const onChangeSecondaryColor = (e) => {
        setSecondaryColor(e);
    }

    const setColor1 = (e) => {
        setTimeout(() => {
            setColorPallate01Opend(false);
            setColorPallate02Opend(false);
            setSloganColorPallateOpend(false);
            setSpinBtnColorPallateOpend(false);
            setPrimaryColorPallateOpend(false);
            setSecondaryColorPallateOpend(false)
        }, 500);
    }

    const handleInputChange = (index, value) => {
        const updatedItems = [...wheelItems];
        updatedItems[index].item = value;
        setWheelItems(updatedItems);
        setWheelItemsTouched(true);
    };

    const closeColorPlate=()=>{
        setColorPallate01Opend(false);
        setColorPallate02Opend(false);
        setSloganColorPallateOpend(false);
        setSpinBtnColorPallateOpend(false);
        setPrimaryColorPallateOpend(false);
        setSecondaryColorPallateOpend(false)
    }

    return (
        <>
            {!loading ?
                <div className={`p-4 d-flex flex-column align-items-center ${styles.mainContent}`}>
                    <div className={`d-flex flex-column align-items-center ${styles.imageUploadWrapper}`}>
                        <h3><center>Télécharger l'image du profil de la boutique</center></h3>
                        <div className='mt-3'>
                            <img src={selectedImage} className={`rounded-circle shadow-4-stron ${styles.imagePreview}`} />

                        </div>

                        <div className='d-flex flex-column rounded bg-light p-2 mt-3'>
                            <input type="file" onChange={handleFileChange} className="form-control border-0 "></input>
                        </div>
                        <button className="btn btn-success  mt-3 w-50" onClick={uploadFile}>Télécharger {imageUploading && `${uploadProgress}%`}</button>
                    </div>
                    <div className='d-flex flex-column align-items-center mt-5'>
                        <h3><center>Ajouter des éléments de roue de rotation</center></h3>
                        <div className={`d-flex justify-content-between  ${styles.flexResponsive}`}>

                            <div className='d-flex flex-column'>
                                <h5 className='mb-2'>Texte du slogan</h5>
                                <div className='d-flex flex-row align-items-center'>
                                    <p className='my-2'>Texte du slogan :</p>
                                    <textarea type='textarea' className="form-control  mx-2" value={slogan} onChange={onSloganChange}  ></textarea>
                                </div>
                                <div className='d-flex flex-row align-items-center'>
                                    <div onClick={() => setSloganColor("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${sloganColor === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                    <div onClick={() => setSloganColor("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${sloganColor === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                    <div onClick={() => setSloganColor("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${sloganColor === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                    <div onClick={() => setSloganColor("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${sloganColor === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                    <div onClick={() => setSloganColor("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${sloganColor === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                    <div onClick={() => setSloganColor("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${sloganColor === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                    <div onClick={() => setSloganColor("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${sloganColor === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                    <span className='m-1'>|</span>
                                    <span className='m-1'>Couleur personnalisée : </span>
                                    <div style={{ backgroundColor: sloganColor }} className={`m-1 cursor-pointer ${styles.colorPlateItem}`} onClick={() => { setSloganColorPallateOpend(true); setColorPallate02Opend(false); }}></div>
                                    <div className={styles.colorPicker}>
                                        {
                                            sloganColorPallateOpend && <div className={`d-flex flex-column p-3 ${styles.colorPickerWrapper}`}>
                                                <i className={`fa fa-times-circle ${styles.closeIcon}`} onClick={closeColorPlate}></i>
                                                <HexColorPicker color={sloganColor} onChange={onChangeSloanColor} />
                                                <div className='d-flex flex-row align-items-center'>
                                                    <input className="form-control m-2 w-75" value={sloganColor} onChange={(e) => onChangeSloanColor(e.target.value)}></input>
                                                    <i className='fa fa-eyedropper' onClick={setColor1}></i>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <hr className='hr'></hr>
                                <h5 className='my-2'> Pourcentage de victoire</h5>
                                <div className='d-flex flex-row align-items-center'>
                                    <p className='my-2'>Probabilité de gagner :</p>
                                    <input className="form-control  mx-2" value={winningProbability} onChange={onWinningProbabilityChange} type='number'></input><p>%</p>
                                </div>
                                <hr className='hr'></hr>
                                <h5 className='my-2'>Section primaire</h5>
                                <div className='d-flex flex-column'>
                                    <p className='my-2'>Changer la couleur primaire :</p>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div onClick={() => setPrimaryColor("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${primaryColor === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setPrimaryColor("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${primaryColor === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setPrimaryColor("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${primaryColor === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setPrimaryColor("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${primaryColor === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setPrimaryColor("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${primaryColor === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setPrimaryColor("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${primaryColor === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setPrimaryColor("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${primaryColor === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <span className='m-1'>|</span>
                                        <span className='m-1'>Couleur personnalisée : </span>
                                        <div style={{ backgroundColor: primaryColor }} className={`m-1 cursor-pointer ${styles.colorPlateItem}`} onClick={() => { setPrimaryColorPallateOpend(true); }}></div>
                                        <div className={styles.colorPicker}>
                                            {
                                                primaryColorPallateOpend && <div className={`d-flex flex-column p-3 ${styles.colorPickerWrapper}`}>
                                                    <i className={`fa fa-times-circle ${styles.closeIcon}`} onClick={closeColorPlate}></i>
                                                    <HexColorPicker color={primaryColor} onChange={onChangePrimaryColor} />
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <input className="form-control m-2 w-75" value={primaryColor} onChange={(e) => onChangePrimaryColor(e.target.value)}></input>
                                                        <i className='fa fa-eyedropper' onClick={setColor1}></i>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <hr className='hr'></hr>
                                <h5 className='my-2'>Bouton de roue</h5>
                                <div className='d-flex flex-column'>
                                    <p className='my-2'>Changer la couleur du bouton :</p>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div onClick={() => setSpinBtnColor("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${spinBtnColor === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSpinBtnColor("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${spinBtnColor === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSpinBtnColor("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${spinBtnColor === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSpinBtnColor("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${spinBtnColor === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSpinBtnColor("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${spinBtnColor === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSpinBtnColor("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${spinBtnColor === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSpinBtnColor("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${spinBtnColor === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <span className='m-1'>|</span>
                                        <span className='m-1'>Couleur personnalisée : </span>
                                        <div style={{ backgroundColor: spinBtnColor }} className={`m-1 cursor-pointer ${styles.colorPlateItem}`} onClick={() => { setSpinBtnColorPallateOpend(true); }}></div>
                                        <div className={styles.colorPicker}>
                                            {
                                                spinBtnColorPallateOpend && <div className={`d-flex flex-column p-3 ${styles.colorPickerWrapper}`}>
                                                    <i className={`fa fa-times-circle ${styles.closeIcon}`} onClick={closeColorPlate}></i>
                                                    <HexColorPicker color={spinBtnColor} onChange={onChangeSpinBtnColor} />
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <input className="form-control m-2 w-75" value={spinBtnColor} onChange={(e) => onChangeSpinBtnColor(e.target.value)}></input>
                                                        <i className='fa fa-eyedropper' onClick={setColor1}></i>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row align-items-center mt-3'>
                                        <p className='my-2'>Texte du bouton :</p>
                                        <input type='textarea' className="form-control w-50 mx-2" value={spinBtnText} onChange={(e) => setSpinBtnText(e.target.value)}  ></input>
                                    </div>
                                </div>
                                <hr className='hr'></hr>
                                <h5 className='my-2'> De la roue</h5>
                                <div className='d-flex flex-column mb-4'>
                                    <p className='my-2'>Couleur de base 01 :</p>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div onClick={() => setColor("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${color === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${color === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${color === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${color === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${color === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${color === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${color === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <span className='m-1'>|</span>
                                        <span className='m-1'>Couleur personnalisée : </span>
                                        <div style={{ backgroundColor: color }} className={`m-1 cursor-pointer ${styles.colorPlateItem}`} onClick={() => { setColorPallate01Opend(true); setColorPallate02Opend(false) }}></div>
                                        <div className={styles.colorPicker}>
                                            {
                                                colorPallate01Opend && <div className={`d-flex flex-column p-3 ${styles.colorPickerWrapper}`}>
                                                    <i className={`fa fa-times-circle ${styles.closeIcon}`} onClick={closeColorPlate}></i>
                                                    <HexColorPicker color={color} onChange={onChangeColor1} />
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <input className="form-control m-2 w-75" value={color} onChange={(e) => onChangeColor1(e.target.value)}></input>
                                                        <i className='fa fa-eyedropper' onClick={setColor1}></i>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <p className='my-2'>Couleur de base 02 :</p>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div onClick={() => setColor2("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${color2 === "#000" && styles.colorPlateItemSeleted} ${color2 === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${color2 === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${color2 === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${color2 === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${color2 === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${color2 === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${color2 === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <span className='m-1'>|</span>
                                        <span className='m-1'>Couleur personnalisée : </span>
                                        <div style={{ backgroundColor: color2 }} className={`m-1 cursor-pointer  ${styles.colorPlateItem}`} onClick={() => { setColorPallate02Opend(true); setColorPallate01Opend(false) }}></div>
                                        <div className={styles.colorPicker}>
                                            {
                                                colorPallate02Opend &&
                                                <div className={`d-flex flex-column p-3 ${styles.colorPickerWrapper}`}>
                                                    <i className={`fa fa-times-circle ${styles.closeIcon}`} onClick={closeColorPlate}></i>
                                                    <HexColorPicker color={color2} onChange={onChangeColor2} />
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <input className="form-control m-2 w-75" value={color2} onChange={(e) => onChangeColor2(e.target.value)}></input>
                                                        <i className='fa fa-eyedropper' onClick={setColor1}></i>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row align-items-center'>
                                        <p className='my-2'>Taille de la police de l'élément de roue :</p>
                                        <input className="form-control  mx-2 w-25" value={wheelItemontSize} onChange={(e) => setWheelItemontSize(e.target.value)} type='number'></input><p>px</p>
                                    </div>
                                    <p className='my-2'>Changer la couleur du texte de la roue :</p>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div onClick={() => setSecondaryColor("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${secondaryColor === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSecondaryColor("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${secondaryColor === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSecondaryColor("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${secondaryColor === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSecondaryColor("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${secondaryColor === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSecondaryColor("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${secondaryColor === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSecondaryColor("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${secondaryColor === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setSecondaryColor("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${secondaryColor === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <span className='m-1'>|</span>
                                        <span className='m-1'>Couleur personnalisée : </span>
                                        <div style={{ backgroundColor: secondaryColor }} className={`m-1 cursor-pointer ${styles.colorPlateItem}`} onClick={() => { setSpinBtnColorPallateOpend(true); }}></div>
                                        <div className={styles.colorPicker}>
                                            {
                                                secondaryColorPallateOpend && <div className={`d-flex flex-column p-3 ${styles.colorPickerWrapper}`}>
                                                    <i className={`fa fa-times-circle ${styles.closeIcon}`} onClick={closeColorPlate}></i>
                                                    <HexColorPicker color={secondaryColor} onChange={onChangeSecondaryColor} />
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <input className="form-control m-2 w-75" value={secondaryColor} onChange={(e) => onChangeSecondaryColor(e.target.value)}></input>
                                                        <i className='fa fa-eyedropper' onClick={setColor1}></i>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={`d-flex flex-column mt-4`}>
                                    <div className='d-flex flex-row mb-4'>
                                        <input className="form-control bg-color-green" value={item} onChange={(e) => setItem(e.target.value)} placeholder={`Ajouter l'article gagnant`} maxLength={15}></input>
                                        <button className='btn btn-success mx-2 w-50 d-flex felx-row align-items-center justify-content-center' onClick={() => addItem(true)}>Ajouter <i className=" fa fa-plus mx-1"></i></button>
                                    </div>
                                    <div className='d-flex flex-row mb-4'>
                                        <input className="form-control bg-color-orange" value={itemLost} onChange={(e) => setItemLost(e.target.value)} placeholder='Ajouter un objet perdu' maxLength={15}></input>
                                        <button className='btn btn-warning mx-2 w-50 d-flex felx-row align-items-center justify-content-center' onClick={() => addItem(false)}>Ajouter <i className=" fa fa-plus mx-1"></i></button>
                                    </div>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Couleur</th>
                                                <th scope="col">Nom du cadeau</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {wheelItems.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td style={{ backgroundColor: item.color }}></td>
                                                        <td><input className={`form-control ${item.isWinningItem ? "bg-color-green" : "bg-color-orange"}`} onChange={(e) => handleInputChange(index, e.target.value)} style={{ backgroundColor: "#fff" }} value={item.item}></input></td>
                                                        <td><button className='btn btn-danger' style={{ width: "3rem" }} onClick={() => removeItem(index)}><i className="fa fa-trash-o"></i></button></td>
                                                    </tr>
                                                )

                                            })}

                                        </tbody>
                                    </table>
                                    <button  className={`btn mx-1 mb-5 btn-success`} onClick={saveWheelItems}>Sauvegarder<i className="fa fa-save mx-2"></i></button>
                                </div>
                            </div>
                            <div className={styles.wheelwrp}>
                                <div className={`d-flex flex-column p-3 ${styles.spinTopWrapper}`}>
                                    <img style={{ borderColor: primaryColor }} src={user.profileImage ? user.profileImage : "/shop.png"} className={`my-4 ${styles.spinLogo}`}></img>
                                    <p style={{ color: sloganColor }} className='align-self-center text-center '>{slogan}</p>
                                    <button style={{ backgroundColor: spinBtnColor }} onClick={handleCallChildFunction} type="button" className="btn btn-success btn-lg align-self-end shadow">{spinBtnText}</button>
                                </div>
                                <div className={styles.wheelWrapper}>
                                    {wheelUpdated &&
                                        <WheelComponent
                                            segments={segments}
                                            segColors={segmentColors}
                                            winningSegment="red"
                                            onFinished={(winner) => { }}
                                            primaryColor={primaryColor}
                                            contrastColor={secondaryColor}
                                            primaryColoraround="#0E4502"
                                            buttonText=""
                                            isOnlyOnce={false}
                                            size={screenHeight > 782 ? 250 : 200}
                                            width={200}
                                            height={2000}
                                            upDuration={50}
                                            downDuration={2000}
                                            fontSize={wheelItemontSize}
                                            ref={childRef}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <Loader />}
        </>
    );
};

export default ProfilePage;

