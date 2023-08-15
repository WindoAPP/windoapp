import { useEffect, useState } from 'react';
import styles from './paymentsPage.module.scss'
import { useSession } from 'next-auth/react';
import { env_data } from '../../config/config';
import { getPayments, getUser } from '../../services/service';
import dayjs from 'dayjs';
import Loader from '../Loader/loader';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';

const PaymentsPage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [paymentsArr, setPaymentsArr] = useState([]);
    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                fetchPayments(res.user._id)
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const fetchPayments = (id) => {
        getPayments(id).then(res => {
            if (res) {
                setPaymentsArr(res.payments);
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const dateFormater = (date) => {
        const f_date = dayjs(date);
        return f_date.format('YYYY-MM-DD HH:mm:ss');
    }

    const invoiceStyles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFF',
            padding: 20
        },
        section: {
            border: '2px solid black',
            marginBottom: 5
        },
        headerIamge: {
            height: 60,
            width: 150
        },
        addressText: {
            fontSize: '15px',
            color: 'gray'
        },
        title: {
            fontSize: "35px",
            fontWeight: 600,
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: '50px'
        },
        middleSection: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 25

        },
        midddleText: {
            fontSize: '12px',
            color: 'gray',

        },
        midddleText2: {
            fontSize: '12px',
            color: 'black',
            marginTop: 2.5,
            marginBottom: 2.5
        },
        middleText1: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        rightMiddle: {
            marginRight: 50
        },
        middleline: {
            border: '1px solid gray',
        },
        bottomWrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
        },
        tableHeader: {
            fontSize: '15px',
            color: 'black',
            fontWeight: 600,
            width: 70,
            textAlign: 'center'
        },
        tableData: {
            fontSize: '12px',
            color: 'gray',
            width: 70,
            textAlign: 'center'
        },
        bottomWrapperm: {
            marginBottom: 10
        },
        totalWrapper: {
            alignSelf: 'flex-end',
            width: 200,
            display: 'flex',
            flexDirection: 'column'
        }



    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={invoiceStyles.page}>
                <View style={invoiceStyles.section}>
                </View>
                <Image style={invoiceStyles.headerIamge} src="/logo.png"></Image>
                <Text style={invoiceStyles.addressText}> Company Name pvt .Ltd</Text>
                <Text style={invoiceStyles.addressText}> 12/2,</Text>
                <Text style={invoiceStyles.addressText}> address line 01,</Text>
                <Text style={invoiceStyles.addressText}> address line 02,</Text>
                <Text style={invoiceStyles.addressText}> country</Text>
                <Text style={invoiceStyles.addressText}> +94 74 51214 8</Text>
                <Text style={invoiceStyles.title} > INVOICE</Text>
                <View style={invoiceStyles.middleSection}>
                    <View>
                        <View style={invoiceStyles.middleText1}>
                            <Text style={invoiceStyles.midddleText}>Issue Date: </Text>
                            <Text style={invoiceStyles.midddleText}>12 / 41 / 2022</Text>
                        </View>
                        <View style={invoiceStyles.middleText1}>
                            <Text style={invoiceStyles.midddleText}>Currency:</Text>
                            <Text style={invoiceStyles.midddleText}>USD</Text>
                        </View>
                        <View style={invoiceStyles.middleText1}>
                            <Text style={invoiceStyles.midddleText}>Invioce No: </Text>
                            <Text style={invoiceStyles.midddleText}>#01</Text>
                        </View>

                    </View>
                    <View style={invoiceStyles.rightMiddle}>
                        <Text style={invoiceStyles.addressText}> Bill to:</Text>
                        <Text style={invoiceStyles.midddleText}> 12/2,</Text>
                        <Text style={invoiceStyles.midddleText}> address line 01,</Text>
                        <Text style={invoiceStyles.midddleText}> address line 02,</Text>
                        <Text style={invoiceStyles.midddleText}> country</Text>
                        <Text style={invoiceStyles.midddleText}> +94 74 51214 8</Text>
                    </View>
                </View>
                <View style={invoiceStyles.middleline} />
                <View style={invoiceStyles.bottomWrapper}>
                    <Text style={invoiceStyles.tableHeader}> Item </Text>
                    <Text style={invoiceStyles.tableHeader}> Quantity</Text>
                    <Text style={invoiceStyles.tableHeader}> Price</Text>
                    <Text style={invoiceStyles.tableHeader}> Discount</Text>
                    <Text style={invoiceStyles.tableHeader}> Tax</Text>
                </View>
                <View style={[invoiceStyles.bottomWrapper, invoiceStyles.bottomWrapperm]}>
                    <Text style={invoiceStyles.tableData}> subscription </Text>
                    <Text style={invoiceStyles.tableData}> 1</Text>
                    <Text style={invoiceStyles.tableData}> 3USD</Text>
                    <Text style={invoiceStyles.tableData}> -</Text>
                    <Text style={invoiceStyles.tableData}> -</Text>
                </View>
                <View style={invoiceStyles.middleline} />
                <View style={invoiceStyles.totalWrapper}>
                    <View style={invoiceStyles.middleText1}>
                        <Text style={invoiceStyles.midddleText2}>Subtotal: </Text>
                        <Text style={invoiceStyles.midddleText2}>30 USD</Text>
                    </View>
                    <View style={invoiceStyles.middleText1}>
                        <Text style={invoiceStyles.midddleText2}>Tax:</Text>
                        <Text style={invoiceStyles.midddleText2}>0</Text>
                    </View>
                    <View style={invoiceStyles.middleline} />
                    <View style={invoiceStyles.middleText1}>
                        <Text style={invoiceStyles.midddleText2}>Total:</Text>
                        <Text style={invoiceStyles.midddleText2}>30 USD</Text>
                    </View>
                    <View style={invoiceStyles.middleline} />
                    <View style={invoiceStyles.middleline} />
                </View>
            </Page>
        </Document>
    );


    return (
        <div className={`p-4 d-flex flex-column align-items-center  ${styles.mainContent}`}>
            {!isLoading ?
                <>
                    <h1 className='my-4'>FACTURES</h1>
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                            {paymentsArr.map((obj, index) => {
                                return (
                                    <div className="col" key={index}>
                                        {obj.success ?
                                            <div className="card radius-10 border-start border-0 border-3 border-success">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <p className="mb-0 text-secondary">Payment Success</p>
                                                            <h4 className="my-1 text-success">{obj.amount_total}<h4>{obj.currency}</h4></h4>
                                                            <p className="mb-0 font-13">Payment Created : <p>{dateFormater(obj.cretedAt)}</p></p>
                                                            <PDFDownloadLink document={<MyDocument />} fileName={"invoice"}>
                                                                <button className={styles.invoiceDownBtn}> Download Invoice </button>
                                                            </PDFDownloadLink>
                                                        </div>
                                                        <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto"><i className="fa fa-check-square-o"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                            <div className="card radius-10 border-start border-0 border-3 border-danger">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <p className="mb-0 text-secondary">Payment Failed</p>
                                                            <h4 className="my-1 text-danger">{obj.amount_total}<h4>{obj.currency}</h4></h4>
                                                            <p className="mb-0 font-13">Payment Created : <p>{dateFormater(obj.cretedAt)}</p></p>
                                                        </div>
                                                        <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto"><i className="fa fa-times"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                            }
                            {paymentsArr.length === 0 && <h3 className='text-muted' >No any Subscribes</h3>}
                        </div>
                    </div>
                </> : <Loader />
            }
        </div>
    );
};

export default PaymentsPage;