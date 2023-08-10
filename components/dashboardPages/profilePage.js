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
    const [item, setItem] = useState("");
    const [user, setUser] = useState({});
    const [wheelItems, setWheelItems] = useState([]);
    const [file, setFile] = useState(null);
    const [screenHeight, setScreenHeight] = useState();
    const [segments, setSegments] = useState([]);
    const [segmentColors, setSegmentColors] = useState([]);
    const [wheelUpdated, setWheelUpdated] = useState(false);
    const [colorPallate01Opend, setColorPallate01Opend] = useState(false);
    const [colorPallate02Opend, setColorPallate02Opend] = useState(false);
    const [wheelItemsTouched, setWheelItemsTouched] = useState(false);
    const [slogan, setSlogan] = useState("Add your text");


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
            return alert("Please select an Image")
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

    const addItem = () => {
        if (item == "") {
            return showNotification(true, "Please add the gift name")
        }
        var w_item = { item: item, color: colorPickNo == 1 ? color : color2 }
        setWheelItems([...wheelItems, w_item]);
        setItem("");
        setSegments([...segments, item]);
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

                var segmentsTemp = res.user.wheelItems.map(obj => { return obj.item });
                var segmentsColorTemp = res.user.wheelItems.map(obj => { return obj.color });
                setSegments(segmentsTemp);
                setSegmentColors(segmentsColorTemp);
                setWheelUpdated(true);
                setLoading(false);
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

    const childRef = useRef(null);

    const handleCallChildFunction = () => {
        if (childRef.current) {
            childRef.current.spin(); // Call the child function using the ref
        }
    };

    const onChangeColor1 = (e) => {
        setColor(e);
        setTimeout(() => {
            setColorPallate01Opend(false);
        }, 500)

    }

    const onChangeColor2 = (e) => {
        setColor2(e);
        setTimeout(() => {
            setColorPallate02Opend(false);
        }, 500)

    }

    const handleInputChange = (index, value) => {
        const updatedItems = [...wheelItems];
        updatedItems[index].item = value;
        setWheelItems(updatedItems);
        setWheelItemsTouched(true);
    };

    return (
        <>
            {!loading ?
                <div className={`p-4 d-flex flex-column align-items-center ${styles.mainContent}`}>
                    <div className={`d-flex flex-column align-items-center ${styles.imageUploadWrapper}`}>
                        <h3><center>Upload Shop Profile Image</center></h3>
                        <div className='mt-3'>
                            <img src={selectedImage} className={`rounded-circle shadow-4-stron ${styles.imagePreview}`} />

                        </div>

                        <div className='d-flex flex-column rounded bg-light p-2 mt-3'>
                            <input type="file" onChange={handleFileChange} className="form-control border-0 "></input>
                        </div>
                        <button className="btn btn-success  mt-3 w-50" onClick={uploadFile}>Upload {imageUploading && `${uploadProgress}%`}</button>
                    </div>
                    <div className='d-flex flex-column align-items-center mt-5'>
                        <h3><center>Add Spin wheel items</center></h3>
                        <div className={`d-flex justify-content-between  ${styles.flexResponsive}`}>

                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row align-items-center'>
                                    <p className='my-2'>Slogan text :</p>
                                    <textarea type='textarea' className="form-control  mx-2" value={slogan} onChange={onSloganChange}  ></textarea>
                                </div>
                                <div className='d-flex flex-column mb-4'>
                                    <p className='my-2'>Base color 01 :</p>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div onClick={() => setColor("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${color === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${color === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${color === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${color === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${color === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${color === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${color === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <span className='m-1'>|</span>
                                        <span className='m-1'>custom color : </span>
                                        <div style={{ backgroundColor: color }} className={`m-1 cursor-pointer ${styles.colorPlateItem}`} onClick={() => { setColorPallate01Opend(true); setColorPallate02Opend(false) }}></div>
                                        <div className={styles.colorPicker}>
                                            {
                                                colorPallate01Opend && <HexColorPicker color={color} onChange={onChangeColor1} />
                                            }
                                        </div>
                                    </div>
                                    <p className='my-2'>Base color 02 :</p>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div onClick={() => setColor2("#000")} style={{ backgroundColor: "#000" }} className={`m-1 cursor-pointer ${color2 === "#000" && styles.colorPlateItemSeleted} ${color2 === "#000" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#9288F8")} style={{ backgroundColor: "#9288F8" }} className={`m-1 cursor-pointer ${color2 === "#9288F8" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#F8DE22")} style={{ backgroundColor: "#F8DE22" }} className={`m-1 cursor-pointer ${color2 === "#F8DE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#FF8551")} style={{ backgroundColor: "#FF8551" }} className={`m-1 cursor-pointer ${color2 === "#FF8551" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#9575DE")} style={{ backgroundColor: "#9575DE" }} className={`m-1 cursor-pointer ${color2 === "#9575DE" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#F2BE22")} style={{ backgroundColor: "#F2BE22" }} className={`m-1 cursor-pointer ${color2 === "#F2BE22" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <div onClick={() => setColor2("#00df20")} style={{ backgroundColor: "#00df20" }} className={`m-1 cursor-pointer ${color2 === "#00df20" && styles.colorPlateItemSeleted} ${styles.colorPlateItem}`}></div>
                                        <span className='m-1'>|</span>
                                        <span className='m-1'>custom color : </span>
                                        <div style={{ backgroundColor: color2 }} className={`m-1 cursor-pointer  ${styles.colorPlateItem}`} onClick={() => { setColorPallate02Opend(true); setColorPallate01Opend(false) }}></div>
                                        <div className={styles.colorPicker}>
                                            {
                                                colorPallate02Opend && <HexColorPicker color={color2} onChange={onChangeColor2} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={`d-flex flex-column mt-4`}>
                                    <div className='d-flex flex-row mb-4'>
                                        <input className="form-control" value={item} onChange={(e) => setItem(e.target.value)} placeholder='Add wheel item' maxLength={15}></input>
                                        <button className='btn btn-primary mx-2 w-50' onClick={addItem}>Add <i className=" fa fa-plus"></i></button>

                                    </div>
                                    <div className='d-flex flex-row align-items-center'>
                                        <p className='my-2'>Winning probability :</p>
                                        <input className="form-control  mx-2" maxLength={2} type='number'></input><p>%</p>
                                    </div>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Colour</th>
                                                <th scope="col">Gift name</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {wheelItems.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td style={{ backgroundColor: item.color }}></td>
                                                        <td><input className="form-control" onChange={(e) => handleInputChange(index, e.target.value)} style={{ backgroundColor: "#fff" }} value={item.item}></input></td>
                                                        <td><button className='btn btn-danger' style={{ width: "3rem" }} onClick={() => removeItem(index)}><i className="fa fa-trash-o"></i></button></td>
                                                    </tr>
                                                )

                                            })}

                                        </tbody>
                                    </table>
                                    <button disabled={!wheelItemsTouched} className={`btn mx-1 mb-5 btn-success`} onClick={saveWheelItems}>Save wheel items  <i className="fa fa-save mx-2"></i></button>
                                </div>
                            </div>
                            <div className={styles.wheelwrp}>
                                <div className={`d-flex flex-column p-3 ${styles.spinTopWrapper}`}>
                                    <img src={user.profileImage ? user.profileImage : "/shop.png"} className={`my-4 ${styles.spinLogo}`}></img>
                                    <p className='align-self-center text-center '>{slogan}</p>
                                    <button onClick={handleCallChildFunction} type="button" className="btn btn-success btn-lg align-self-end shadow">Spin Now! </button>
                                </div>
                                <div className={styles.wheelWrapper}>
                                    {wheelUpdated &&
                                        <WheelComponent
                                            segments={segments}
                                            segColors={segmentColors}
                                            winningSegment="red"
                                            onFinished={(winner) => { }}
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

