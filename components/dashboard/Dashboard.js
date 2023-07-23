import styles from './dashboard.module.scss'
import React, { useState } from 'react';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/dist/rsuite.min.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSession, signOut } from 'next-auth/react';
import Loader from '../Loader/loader';
import QRCode from 'qrcode.react';
import { useRef } from 'react';
import { getCustomers, updateUser } from '../../services/service';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { HexColorPicker } from 'react-colorful';

Chart.register(CategoryScale);

const Dashboard = () => {
    const { data: session } = useSession();
    const [profileCreateStep, setProfileCreateStep] = useState(0);
    const [wheelItems, setWheelItems] = useState([]);
    const [item, setItem] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddProfile, setShowAddProfile] = useState(false);
    const [wheelItemsSaved, setWheelItemsSaved] = useState(false);
    const [customerArr, setCustomerArr] = useState([]);
    const [color, setColor] = useState("#aabbcc");
    const router = useRouter();
 
    function countOccurrences(arr) {
        return arr.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});
    }

    const mapChartData = () => {
        const mappedArray = customerArr.map(obj => {
            let date = new Date(obj.cretedAt);
            return date.getMonth() + 1;
        });

        const frequencyMap = countOccurrences(mappedArray);
        var countArray = [];

        for (let month = 1; month <= 12; month++) {
            const count = frequencyMap[month] || 0;
            countArray.push(count);
        }

        return countArray;
    }

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Customer review Count',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: mapChartData()
            }
        ]
    };

    useEffect(() => {
        if (session) {
            if (session.user.wheelItems) {
                setWheelItems(session.user.wheelItems);
                if (session.user.wheelItems.length > 0) {
                    setWheelItemsSaved(true);
                }else{
                    setShowAddProfile(true);
                }
                featchCustomers(session.user._id);

            }
        }
    }, [session])


    const addItem = () => {
        var w_item ={item:item,color:color}
        setWheelItems([...wheelItems, w_item]);
        console.log(">",wheelItems);
        setItem("");
        setWheelItemsSaved(false);
    }

    const removeItem = (index) => {
        const updatedWheelItems = wheelItems.filter((_, i) => i !== index);
        setWheelItems(updatedWheelItems);
    }

    const downloadQRCode = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const saveWheelItems = () => {
        var userData = session.user;
        userData['wheelItems'] = wheelItems;
        setLoading(true);
        updateUser(userData).then(res => {
            if (res) {
                setWheelItemsSaved(true)
                setLoading(false);
                session.user = userData;
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });

    }

    const logout = (e) => {
        e.preventDefault();
        setLoading(true)
        signOut().then(res=>{
            if(res){
                router.push("/login");
                setLoading(false)
            }
        });
        
    }

    const featchCustomers = (id) => {
        getCustomers(id).then(res => {
            if (res) {
                setCustomerArr(res.customers);
                setLoading(false)

            }

        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <>
            {session ? <div>
                <div className={styles.sidebarIcon}>
                    <i className="fa fa-bars"></i>
                </div>
                <div className={`vertical-nav bg-white ${styles.sideBar}`} id="sidebar">
                    <div className="py-4 px-3 mb-4 bg-warning shadow">
                        <div className="media d-flex align-items-center">
                            <img decoding="async" onClick={mapChartData} loading="lazy" src="logo.png" alt="..." width="80" height="80" className="mr-3  img-thumbnail shadow-sm"></img>
                            <div className="media-body m-2">
                                <h4 className="m-0">{session.user.shopName}</h4>
                                <p className="font-weight-normal text-light mb-0">@{session.user.userName}</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Dashboard</p>

                    <ul className="nav flex-column bg-white mb-0">
                        <li className="nav-item">
                            <span  className="nav-link text-dark bg-light cursor-pointer" onClick={()=>session.user.wheelItems.length==0? setShowAddProfile(true):setShowAddProfile(false)}>
                                <i className="fa fa-th-large m-2 text-warning fa-fw"></i>
                                home
                            </span>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link text-dark">
                                <i className="fa fa-address-card m-2 text-warning fa-fw"></i>
                                about
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link text-dark">
                                <i className="fa fa-cubes m-2 text-warning fa-fw"></i>
                                services
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link text-dark">
                                <i className="fa fa-picture-o m-2 text-warning fa-fw"></i>
                                Gallery
                            </a>
                        </li>
                    </ul>

                    <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>

                    <ul className="nav flex-column bg-white mb-0">
                        <li className="nav-item">
                            <span href="#" className="nav-link text-dark cursor-pointer" onClick={()=>{setShowAddProfile(true); setProfileCreateStep(1);}}>
                                <i className="fa fa-pie-chart m-2 text-warning fa-fw"></i>
                                Add Wheel items
                            </span>
                        </li>
                        <li className="nav-item ">
                            <span href="#" className="nav-link text-dark cursor-pointer" onClick={()=>{setShowAddProfile(true); setProfileCreateStep(1);}}>
                                <i className="fa fa-download m-2 text-warning fa-fw"></i>
                                Download QR
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link text-danger cursor-pointer" onClick={logout}>
                                <i className="fa fa-sign-out m-2 text-danger fa-fw"></i>
                                Log Out
                            </span>
                        </li>
                    </ul>
                </div>
                {showAddProfile &&
                    <div className={styles.profileCreateWrapper}>
                        {profileCreateStep === 0 &&
                            <>
                                <p>click here for create profile for your shop and craete a QR code {session.user.custermers.length}</p>
                                <button className='btn btn-warning mt-4' onClick={() => setProfileCreateStep(1)}> Create</button>
                            </>

                        }
                        {
                            profileCreateStep === 1 && <div>
                                <h2>Add Spin wheel items</h2>
                                <p className='my-2'>Pick color :</p>
                                <HexColorPicker color={color} onChange={setColor} />
                                <div className={`d-flex flex-row mt-4 ${styles.addWheelItemsWrapper}`}>
                                    <input className="form-control" value={item} onChange={(e) => setItem(e.target.value)} placeholder='Add wheel item' maxLength={15}></input>
                                    <button className='btn btn-primary mx-2' onClick={addItem}>Add <i className=" fa fa-plus"></i></button>
                                </div>
                                <div className='d-flex flex-wrap m-4'>
                                    {wheelItems.map((item, index) => {
                                        return (
                                            <span key={index} style={{ borderColor: item.color }}  className={`${styles.wheelItem} m-2`}>{item.item} <i className='fa fa-times-circle pointer' onClick={() => removeItem(index)}></i></span>
                                        )

                                    })}

                                </div>
                                <button className='btn btn-success mx-1' onClick={saveWheelItems}>Save wheel items  <i className="fa fa-save mx-2"></i></button>
                                 <button className='btn btn-warning mx-1' onClick={downloadQRCode}>Download QR code <i className="fa fa-download mx-2"></i></button>
                                <QRCode
                                    size={290}
                                    level={"H"}
                                    includeMargin={true}
                                    name='shop_QR_code'
                                    className={styles.qrCode}
                                    id='qrcode'
                                    value={`https://wind-project.vercel.app/scan?id=${session.user.uid}`}
                                />

                            </div>
                        }


                    </div>
                }
                {!showAddProfile &&
                    <div className={`p-4 d-flex shadow ${styles.mainTopContent}`}>
                        <h4>Lorem ipsum dolor sit amet</h4>
                        <h5>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
                        <div className={`d-flex align-items-center justify-content-center ${styles.filterWrapper} ${styles.flexResponsive}`}>
                            <p className='mx-2 h6'><strong>Date filter :</strong></p>
                            <DateRangePicker />
                            <p className='mx-2 h6 bold ms-5 marginZeroMobile'><strong>Location :</strong></p>
                            <select className="form-select" >
                                <option >Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>

                        </div>
                    </div>
                }
                {!showAddProfile &&
                    <div className={`main-content d-flex flex-wrap p-4 ${styles.mainContent}`}>
                        <div className={`card rounded  m-3 d-flex justify-content-center ${styles.dataCard}`} style={{ flexBasis: '30%' }}>
                            <div className='d-flex flex-row'>
                                <i className=" display-4 fa fa-users m-2 text-warning fa-fw"></i>
                                <div className='m-2'>
                                    <h4 className="card-title text-warning">Number of Customers</h4>
                                    <p className={styles.cardNumber}>{customerArr.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`card rounded  m-3 d-flex justify-content-center ${styles.dataCard}`} style={{ flexBasis: '30%' }}>
                            <div className='d-flex flex-row'>
                                <i className=" display-4 fa  fa-trophy m-2 text-warning fa-fw"></i>
                                <div className='m-2'>
                                    <h4 className="card-title text-warning">Number of Winners</h4>
                                    <p className={styles.cardNumber}>10,45</p>
                                </div>
                            </div>
                        </div>
                        <div className={`card rounded  m-3 d-flex justify-content-center ${styles.dataCard}`} style={{ flexBasis: '30%' }}>
                            <div className='d-flex flex-row'>
                                <i className=" display-4 fa fa-line-chart m-2 text-warning fa-fw"></i>
                                <div className='m-2'>
                                    <h4 className="card-title text-warning">Revenue</h4>
                                    <p className={styles.cardNumber}>$10,345</p>
                                </div>
                            </div>
                        </div>
                        <div className={`card rounded  m-3 d-flex justify-content-center ${styles.dataCard}`} style={{ flexBasis: '30%' }}>
                            <div className='d-flex flex-row'>
                                <i className=" display-4 fa fa-line-chart m-2 text-warning fa-fw"></i>
                                <div className='m-2'>
                                    <h4 className="card-title text-warning">Revenue</h4>
                                    <p className={styles.cardNumber}>$10,345</p>
                                </div>
                            </div>
                        </div>
                        <div className={`card rounded  m-3 d-flex justify-content-center ${styles.dataCard}`} style={{ flexBasis: '30%' }}>
                            <div className='d-flex flex-row'>
                                <i className=" display-4 fa fa-line-chart m-2 text-warning fa-fw"></i>
                                <div className='m-2'>
                                    <h4 className="card-title text-warning">Revenue</h4>
                                    <p className={styles.cardNumber}>$10,345</p>
                                </div>
                            </div>
                        </div>
                        <div className={`card rounded  m-3 d-flex justify-content-center ${styles.dataCard}`} style={{ flexBasis: '30%' }}>
                            <div className='d-flex flex-row'>
                                <i className=" display-4 fa fa-line-chart m-2 text-warning fa-fw"></i>
                                <div className='m-2'>
                                    <h4 className="card-title text-warning">Revenue</h4>
                                    <p className={styles.cardNumber}>$10,345</p>
                                </div>
                            </div>
                        </div>

                    </div>
                }
                {!showAddProfile &&
                    <div className={`d-flex ${styles.bottomWrapper} ${styles.flexResponsive}`} >
                        <div className={`d-flex ${styles.chartContent}`}>
                            <h3>Lorem Ipsum has been the industry</h3>
                            <Line
                                data={data}
                                width={"auto"}
                                height={"auto"}

                            />
                        </div>
                        <div className={`d-flex ${styles.chartContent}`}>
                            <h3 className={""}>Customer List</h3>
                            <table className={`table table-warning ${styles.table}`}>
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Mobile No.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerArr.map((obj, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{obj.name}</td>
                                                <td>{obj.email}</td>
                                                <td>{obj.phoneNumber}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>


                    </div>
                }

            </div> : <Loader />}
            {loading && <Loader />}
        </>

    );
};

export default Dashboard;

