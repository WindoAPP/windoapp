import { useEffect, useState } from 'react';
import styles from './dashboardHomePage.module.scss'
import { useSession } from 'next-auth/react';
import { getUser } from '../../services/service';
import Loader from '../Loader/loader';

import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

var options = {
    chart: {
        toolbar: {
            show: false,
        }
    },
    stroke: {
        width: [0, 3],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '20%',
        },
    },
    dataLabels: {
        enabled: false,
    },

    legend: {
        show: false,
    },
    colors: ['#5664d2', '#1cbb8c'],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

const DashboardHomePage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    function countOccurrences(arr) {
        return arr.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});
    }

    const mapChartData = () => {
        if (user.custermers) {
            const mappedArray = user.custermers.map(obj => {
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
        } else {
            return [];
        }
    }

    var series = [{
        name: '2020',
        type: 'column',
        data: mapChartData()
    }, {
        name: '2019',
        type: 'line',
        data: [23, 32, 27, 38, 27, 32, 27, 38, 22, 31, 21, 16]
    }]


    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                console.log(res.user.custermers);
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const getNoOfWinners = (type) => {
        var n_of_winners = 0;
        var n_of_plays = 0;
        var n_of_reap = 0;

        if (type === "win") {
            for (let i = 0; i < user.custermers.length; i++) {
                for (let j = 0; j < user.custermers[i].spins.length; j++) {
                    if (user.custermers[i].spins[j].isWin) {
                        n_of_winners++
                    }
                }
            }
            return n_of_winners;
        } else if (type === "play") {
            for (let i = 0; i < user.custermers.length; i++) {
                for (let j = 0; j < user.custermers[i].spins.length; j++) {
                    n_of_plays++;
                }
            }
            return n_of_plays;
        } else if (type === "reap") {
            for (let i = 0; i < user.custermers.length; i++) {
                if (user.custermers[i].spins.length > 1) {
                    n_of_reap++
                }

            }
            return n_of_reap;
        }
    }

    return (
        <>
            {!isLoading ?
                <div className={`p-4 d-flex flex-column align-items-center justify-content-center ${styles.mainContent}`}>

                    <div className='d-flex flex-wrap align-items-center justify-content-center'>
                        <div className="card card-margin m-4 card-width-dash">
                            <div className="card-body p-4">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <h6>Number of Customers</h6>
                                            <h1>{user.custermers.length}</h1>
                                        </div>
                                        <div>
                                            <i className="display-4 fa fa-users m-2 text-info fa-fw"></i>
                                        </div>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <div className={`d-flex flex-row align-items-center mt-2 ${styles.cardTopWrapper}`}>
                                        <div className='d-flex flex-row align-items-center justify-content-center'>
                                            2.4 %
                                        </div>
                                        <p className='text-muted'>From previous period</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-margin m-4 card-width-dash">
                            <div className="card-body p-4">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <h6>Number of Winners</h6>
                                            <h1>{getNoOfWinners("win")}</h1>
                                        </div>
                                        <div>
                                            <i className="display-4 fa  fa-trophy m-2 text-info fa-fw"></i>
                                        </div>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <div className={`d-flex flex-row align-items-center mt-2 ${styles.cardTopWrapper}`}>
                                        <div className='d-flex flex-row align-items-center justify-content-center'>
                                            2.4 %
                                        </div>
                                        <p className='text-muted'>From previous period</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-margin m-4 card-width-dash">
                            <div className="card-body p-4">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <h6>Number of Play</h6>
                                            <h1>{getNoOfWinners("play")}</h1>
                                        </div>
                                        <div>
                                            <i className="display-4 fa fa-line-chart m-2 text-info fa-fw"></i>
                                        </div>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <div className={`d-flex flex-row align-items-center mt-2 ${styles.cardTopWrapper}`}>
                                        <div className='d-flex flex-row align-items-center justify-content-center'>
                                            2.4 %
                                        </div>
                                        <p className='text-muted'>From previous period</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-margin m-4 card-width-dash">
                            <div className="card-body p-4">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <h6>Repeaters</h6>
                                            <h1>{getNoOfWinners("reap")}</h1>
                                        </div>
                                        <div>
                                            <i className="display-4 fa fa-users m-2 text-info fa-fw"></i>
                                        </div>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <div className={`d-flex flex-row align-items-center mt-2 ${styles.cardTopWrapper}`}>
                                        <div className='d-flex flex-row align-items-center justify-content-center'>
                                            2.4 %
                                        </div>
                                        <p className='text-muted'>From previous period</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-margin m-4 card-width-dash">
                            <div className="card-body p-4">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <h6>Gift Given</h6>
                                            <h1>{getNoOfWinners("win")}</h1>
                                        </div>
                                        <div>
                                            <i className="display-4 fa fa-users m-2 text-info fa-fw"></i>
                                        </div>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <div className={`d-flex flex-row align-items-center mt-2 ${styles.cardTopWrapper}`}>
                                        <div className='d-flex flex-row align-items-center justify-content-center'>
                                            2.4 %
                                        </div>
                                        <p className='text-muted'>From previous period</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-margin m-4 card-width-dash">
                            <div className="card-body p-4">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <h6>Checked for personal info</h6>
                                            <h1>{user.custermers.length}</h1>
                                        </div>
                                        <div>
                                            <i className="display-4 fa fa-users m-2 text-info fa-fw"></i>
                                        </div>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <div className={`d-flex flex-row align-items-center mt-2 ${styles.cardTopWrapper}`}>
                                        <div className='d-flex flex-row align-items-center justify-content-center'>
                                            2.4 %
                                        </div>
                                        <p className='text-muted'>From previous period</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-margin m-4 card-width-dash w-100">
                        <div className="card-body p-4">
                            {/* <div className="float-end d-none d-md-inline-block">
                                <div className="btn-group">
                                    <button type="button" className='btn btn-secondary'>Today</button>
                                    <button type="button" className='btn btn-secondary'>Weekly</button>
                                    <button type="button" className='btn btn-secondary'>Monthly</button>
                                </div>
                            </div> */}
                            <h4 className="card-title mb-4">Usage Analytics</h4>
                            <div>
                                <div id="line-column-chart" className="apex-charts" dir="ltr">
                                    <ReactApexChart options={options} series={series} type="line" height="280" />
                                </div>
                            </div>
                        </div>

                        {/* <div className="card-body p-4">
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column'>
                                    <div className="d-inline-flex">
                                        <h5 className="me-2">$12,253</h5>
                                        <div className="text-success">
                                            <i className="mdi mdi-menu-up font-size-14"> </i>2.2 %
                                        </div>
                                    </div>
                                    <p className="text-muted text-truncate mb-0">This month</p>
                                </div>

                                <div className='d-flex flex-column'>
                                    <div className="mt-4 mt-sm-0">
                                        <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1"></i> This Year :</p>
                                        <div className="d-inline-flex">
                                            <h5 className="mb-0 me-2">$ 34,254</h5>
                                            <div className="text-success">
                                                <i className="mdi mdi-menu-up font-size-14"> </i>2.1 %
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex flex-column'>
                                    <div className="mt-4 mt-sm-0">
                                        <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-success font-size-10 me-1"></i> Previous Year :</p>
                                        <div className="d-inline-flex">
                                            <h5 className="mb-0">$ 32,695</h5>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </div>

                </div>
                : <Loader />
            }
        </>
    );
};

export default DashboardHomePage;