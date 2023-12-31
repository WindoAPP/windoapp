import { useState } from 'react';
import styles from './Login.module.scss';
import {
  loginUser,
  sendContactForm,
  updateUserPassword,
} from '../../services/service';
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import BalnktCard from '../blankCard/blankCard';
import { DotLoader } from 'react-spinners';
import { env_data } from '../../config/config';
import { postData } from '../../src/utils/helpers';
import { getStripe } from '../../src/utils/stripe-client';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordData, setPasswordData] = useState({
    password_c: '',
    password: '',
  });
  const [recoverEmail, setRecoverEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keycode, setKeycode] = useState('');
  const [enteredKeycode, setEnteredKeycode] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [keyCodeVeried, setKeyCodeVeried] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const fromSubmit = (e) => {
    e.preventDefault();
    var isValid = validateForm();

    if (isValid) {
      setLoading(true);
      loginUser(formData)
        .then(async (res) => {
          if (res.error) {
            console.log(res.error);
            console.log(res.error.split('|'));
            if (res.error.split('|')[0] == 'need_payment') {
              showNotifications(
                true,
                "Votre période d'essai est terminée, veuillez effectuer un paiement"
              );

              try {
                const { sessionId } = await postData({
                  url: '/api/payment',
                  data: {
                    price: process.env.NEXT_PUBLIC_PRODUCT,
                    user: {
                      id: res.error.split('|')[1],
                      email: formData.email,
                    },
                    callback: '/login',
                  },
                });
                const stripe = await getStripe();
                setLoading(false);
                stripe?.redirectToCheckout({ sessionId });
              } catch (error) {
                setLoading(false);
                console.error(error);
              }
              //   subscribe({
              //     priceId: env_data.mainProduct,
              //     userId: res.error.split('|')[1],
              //     total: '39.9',
              //     currency: 'EUR',
              //   })
              //     .then((res) => {
              //       if (res) {
              //         setLoading(false);
              //         redirectToExternalURL(res.url);
              //       }
              //     })
              // .catch((err) => {
              //   console.log(err);
              //   setLoading(false);
              // });
            } else if (res.error.split('|')[0] == 'need_trial') {
              showNotifications(
                true,
                "Période d'essai expirée. Payez pour continuer a profiter de nos services"
              );
              try {
                const { sessionId } = await postData({
                  url: '/api/payment',
                  data: {
                    price: process.env.NEXT_PUBLIC_PRODUCT,
                    user: {
                      id: res.error.split('|')[1],
                      email: formData.email,
                    },
                    callback: '/login',
                  },
                });
                const stripe = await getStripe();
                setLoading(false);
                stripe?.redirectToCheckout({ sessionId });
              } catch (error) {
                setLoading(false);
                console.error(error);
              }
              //   subscribe({
              //     priceId: env_data.mainProduct,
              //     userId: res.error.split('|')[1],
              //     total: '39.9',
              //     currency: 'EUR',
              //   })
              //     .then((res) => {
              //       if (res) {
              //         setLoading(false);
              //         redirectToExternalURL(res.url);
              //       }
              //     })
              //     .catch((err) => {
              //       console.log(err);
              //       setLoading(false);
              //     });
            }
          }
          if (res.ok) {
            let sessonss = await session;

            if (sessonss.user) {
              if (sessonss.user.isAdmin) {
                router.push('/dashboard/admindashboard');
              } else {
                router.push('/dashboard');
              }
            }

            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      return;
    }
  };

  const redirectToExternalURL = (url) => {
    window.location.href = url;
  };

  const validateForm = () => {
    if (formData.password == '') {
      showNotifications(true, 'Mot de passe requis');
      return false;
    }
    if (formData.email == '') {
      showNotifications(true, 'Email requis');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showNotifications(true, 'Adresse e-mail invalide');
      return false;
    }

    return true;
  };

  const forgotPassword = () => {
    setIsModalOpen(true);
  };

  const recoverPassword = () => {
    var key = generateRandomCode();
    setKeycode(key);
    var emailData = {
      name: 'dear user',
      email: recoverEmail,
      subject: 'Revover code',
      message: `code : ${key}`,
    };
    sendEmail(emailData);
  };

  const sendEmail = async (mailData) => {
    setEmailSending(true);
    try {
      await sendContactForm(mailData);
      setEmailSent(true);
      setEmailSending(false);
      showNotifications(
        false,
        'Le code clé a été envoyé à votre adresse e-mail'
      );
    } catch (error) {
      console.log(error);
    }
  };

  function generateRandomCode() {
    const min = 100000; // Minimum value for a 6-digit number
    const max = 999999; // Maximum value for a 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const verifyAndPasswordChange = () => {
    if (keycode == enteredKeycode) {
      setKeyCodeVeried(true);
    } else {
      showNotifications(true, 'Erreur de code clé, réessayez');
    }
  };

  const changePassword = () => {
    if (passwordData.password == '' || passwordData.password_c == '') {
      showNotifications(true, 'Entrez un mot de passe valide');
    } else if (passwordData.password != passwordData.password_c) {
      showNotifications(true, 'non concordance des mots de passe');
    } else {
      var data = {
        email: recoverEmail,
        password: passwordData.password,
      };
      updateUserPassword(data)
        .then((res) => {
          if (res) {
            setIsModalOpen(false);
            setEnteredKeycode('');
            setEmailSending(false);
            setEmailSent(false);
            setKeyCodeVeried(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsModalOpen(false);
          setEnteredKeycode('');
          setEmailSending(false);
          setEmailSent(false);
          setKeyCodeVeried(false);
        });
    }
  };

  const forgetPasswordView = () => (
    <div
      className={`d-flex align-items-center justify-content-center ${styles.forgetPasswordWrapper}`}
    >
      {!emailSent && !emailSending && (
        <div>
          <h3 className="text-dark mb-4">
            S'il vous plaît entrez votre adresse mail
          </h3>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={recoverEmail}
              onChange={(e) => setRecoverEmail(e.target.value)}
            ></input>
            <div className="d-flex flex-row mt-4">
              <button
                className="commonBtnWindo w-100"
                onClick={() => recoverPassword()}
              >
                Envoyer le code
              </button>
              <button
                className="btn btn-light mx-4"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {emailSending && <DotLoader color="#36d7b7" size={100} />}
      {emailSent && !emailSending && !keyCodeVeried && (
        <div>
          <h3 className="text-dark mb-4">
            Vérifiez votre courrier électronique et entrez le code clé
          </h3>
          <div>
            <input
              type="number"
              name="keycode"
              placeholder="Key code"
              className="form-control"
              value={enteredKeycode}
              onChange={(e) => setEnteredKeycode(e.target.value)}
            ></input>
            <div className="d-flex flex-row mt-4">
              <button
                className="commonBtnWindo w-100"
                onClick={() => verifyAndPasswordChange()}
              >
                Vérifier le code
              </button>
              <button
                className="btn btn-light mx-4"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {emailSent && !emailSending && keyCodeVeried && (
        <div>
          <h3 className="text-dark mb-4">Ajouter un nouveau mot de passe</h3>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={passwordData.password}
              onChange={handleChangePassword}
            ></input>
            <input
              type="password"
              name="password_c"
              placeholder="Confirm password"
              className="form-control mt-2"
              value={passwordData.password_c}
              onChange={handleChangePassword}
            ></input>
            <div className="d-flex flex-row mt-4">
              <button
                className="commonBtnWindo w-100"
                onClick={() => changePassword()}
              >
                Changer le mot de passe
              </button>
              <button
                className="btn btn-light mx-4"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div className={styles.loginWrapper}>
      <form>
        <div className={`d-flex flex-column p-4  ${styles.loginBox}`}>
          <img className="w-50 align-self-center mb-5" src="logo.png"></img>
          <h2 className={styles.headingLogin}>Content de te revoir !</h2>
          <span className="align-self-center mb-5">
            Connectez-vous pour continuer vers Windo
          </span>
          <div className="d-flex flex-column mb-3">
            <label>
              <strong>Email</strong>
            </label>
            <div>
              <i
                className={`fa fa-envelope-o ${styles.inputIcon}`}
                aria-hidden="true"
              ></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="d-flex flex-column mb-3">
            <label>
              <strong>Mot de passe</strong>
            </label>
            <div>
              <i
                className={`fa fa-key ${styles.inputIcon}`}
                aria-hidden="true"
              ></i>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <a className="mb-3 cursor-pointer" onClick={() => forgotPassword()}>
            Mot de passe oublié
          </a>
          <button
            className={`commonBtnWindo w-100 mb-3 ${styles.loginBTN}`}
            onClick={fromSubmit}
          >
            Se connecter
          </button>
          <span className="align-self-center">
            Je n'ai pas de compte? <a href="/register">S'inscrire</a>
          </span>
          <a className="align-self-center" href="/">
            De retour à la maison
          </a>
        </div>
      </form>
      <BalnktCard isOpen={isModalOpen} data={forgetPasswordView} />
      <div className={styles.RightImageWrapper}>
        <img src="loginImage.jpg" className={styles.RightImage}></img>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Login;
