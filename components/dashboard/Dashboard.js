import styles from './dashboard.module.scss'
import React, { useState } from 'react';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/dist/rsuite.min.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
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
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};


const Dashboard = () => {

    return (
        <div>
            <div className={styles.sidebarIcon}>
                <i className="fa fa-bars"></i>
            </div>
            <div className={`vertical-nav bg-white ${styles.sideBar}`} id="sidebar">
                <div className="py-4 px-3 mb-4 bg-warning shadow">
                    <div className="media d-flex align-items-center">
                        <img decoding="async" loading="lazy" src="logo.png" alt="..." width="80" height="80" className="mr-3  img-thumbnail shadow-sm"></img>
                        <div className="media-body m-2">
                            <h4 className="m-0">Windo</h4>
                            <p className="font-weight-normal text-light mb-0">User name</p>
                        </div>
                    </div>
                </div>

                <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Dashboard</p>

                <ul className="nav flex-column bg-white mb-0">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark bg-light">
                            <i className="fa fa-th-large m-2 text-warning fa-fw"></i>
                            home
                        </a>
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
                        <a href="#" className="nav-link text-dark">
                            <i className="fa fa-area-chart m-2 text-warning fa-fw"></i>
                            area charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark">
                            <i className="fa fa-bar-chart m-2 text-warning fa-fw"></i>
                            bar charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark">
                            <i className="fa fa-pie-chart m-2 text-warning fa-fw"></i>
                            pie charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark">
                            <i className="fa fa-line-chart m-2 text-warning fa-fw"></i>
                            line charts
                        </a>
                    </li>
                </ul>
            </div>
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
            <div className={`main-content d-flex flex-wrap p-4 ${styles.mainContent}`}>
                <div className={`card rounded  m-3 d-flex justify-content-center ${styles.dataCard}`} style={{ flexBasis: '30%' }}>
                    <div className='d-flex flex-row'>
                        <i className=" display-4 fa fa-users m-2 text-warning fa-fw"></i>
                        <div className='m-2'>
                            <h4 className="card-title text-warning">Number of players</h4>
                            <p className={styles.cardNumber}>10,345</p>
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
                <h3 className={""}>Lorem Ipsum has been the industry</h3>
                    <table className={`table table-warning ${styles.table}`}>
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                

            </div>

        </div>
    );
};

export default Dashboard;

