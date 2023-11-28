import { useState } from 'react';
import styles from './signUp.module.scss';
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';
import {
  createPayment,
  createUser,
  sendContactForm,
} from '../../services/service';
import { useRouter } from 'next/router';
import { env_data } from '../../config/config';
import ContentCard from '../contentCard/contentCard';

import contentData from './content';
import { postData } from '../../src/utils/helpers';
import { getStripe } from '../../src/utils/stripe-client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputField from '../input';
import React from 'react';
import lang from '@/lang/en-fr.json';
import Link from 'next/link';

type InitialValues = {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  phoneNumber: string;
  shopName: string;
  shopId: string;
  termsCheck: boolean;
};

const SignUp = () => {
  /**
   * Formik
   */
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    phoneNumber: '',
    shopName: '',
    shopId: '',
    termsCheck: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(lang['The provided email address is invalid.'])
      .required(lang['Please provide an email address to proceed.']),
    password: Yup.string()
      .min(6, lang['The password must be at least 6 characters long.'])
      .required(lang['Please enter a password to continue.']),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        lang[
          'The confirmation password must match the original password entered.'
        ]
      )
      .required(lang['Please confirm your password by entering it again.']),
    userName: Yup.string().required(
      lang['Please provide a user name to continue.']
    ),
    phoneNumber: Yup.string().required(
      lang['Please enter your mobile number to proceed.']
    ),
    shopName: Yup.string().required(
      lang['Please provide a shop name to continue.']
    ),
  });

  const [priceId, setPriceId] = useState(env_data.trialProduct);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { query } = router;

  const onSubmit = async (values: InitialValues) => {
    // setLoading(true);
    try {
      const user = await createUser(values);
      console.log({ user });
      if (user) {
        const { sessionId } = await postData({
          url: '/api/payment',
          data: {
            price: priceId,
            user: {
              id: user?.user?._id,
              email: values.email,
            },
          },
        });
        console.log({ sessionId });
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendEmail = async (mailData) => {
    try {
      await sendContactForm(mailData);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    // validate,
  });

  /**
   * Side effect
   */
  React.useEffect(() => {
    if (query) {
      if (query.payment == 'success') {
        showNotifications(false, 'Payment Successfull !');

        const paymentData = {
          user: query.uid,
          amount_total: query.total,
          currency: query.currency,
          success: true,
          accStatus: 'trial',
        };

        createPayment(paymentData)
          .then(() => {
            var emailData = {
              name: values.userName,
              email: values.email,
              subject: 'paiement réussi',
              message:
                'nous avons reçu votre paiement. Merci de nous avoir rejoint',
            };
            sendEmail(emailData);

            router.push('login');
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (query.payment == 'failed') {
        const paymentData = {
          user: query.uid,
          amount_total: query.total,
          currency: query.currency,
          success: false,
          accStatus: 'created',
        };

        createPayment(paymentData)
          .then(() => {
            var emailData = {
              name: values.userName,
              email: values.email,
              subject: 'échec du paiement',
              message:
                "nous n'avons pas reçu votre paiement. essayer à nouveau",
            };
            sendEmail(emailData);
            router.push('login');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    setPriceId(env_data.trialProduct);
  }, [query]);

  return (
    <div className={styles.loginWrapper}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={`d-flex flex-column p-4  ${styles.loginBox}`}>
          <img className="w-50 align-self-center mb-3" src="logo.png"></img>
          <span className="align-self-center mb-3">
            Inscrivez-vous pour continuer Windo
          </span>
          <InputField
            label={lang['Username']}
            type="text"
            name="userName"
            placeholder={lang['Enter your username']}
            className={`form-control regi-input ${
              errors.userName && touched.userName ? 'is-invalid' : ''
            }`}
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.userName && touched.userName && errors.userName}
          />
          <InputField
            label={lang['Email Address']}
            type="email"
            name="email"
            placeholder={lang['Enter your email address']}
            className={`form-control regi-input ${
              errors.email && touched.email ? 'is-invalid' : ''
            }`}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email && errors.email}
          />

          <InputField
            label={lang['Password']}
            type="password"
            name="password"
            placeholder={lang['Create a password']}
            className={`form-control regi-input ${
              errors.password && touched.password ? 'is-invalid' : ''
            }`}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password && errors.password}
          />
          <InputField
            label={lang['Confirm your password']}
            type="password"
            name="confirmPassword"
            placeholder={lang['Confirm your password']}
            className={`form-control regi-input ${
              errors.confirmPassword && touched.confirmPassword
                ? 'is-invalid'
                : ''
            }`}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword
            }
          />
          <InputField
            label={lang['Shop Name']}
            type="text"
            name="shopName"
            placeholder={lang['Enter your shop name']}
            className={`form-control regi-input ${
              errors.shopName && touched.shopName ? 'is-invalid' : ''
            }`}
            value={values.shopName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.shopName && touched.shopName && errors.shopName}
          />
          <InputField
            min={0}
            label={lang['Phone Number']}
            type="number"
            name="phoneNumber"
            placeholder={lang['Enter your phone number']}
            className={`form-control regi-input ${
              errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''
            }`}
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
            }
          />

          <InputField
            label={
              <div className="d-flex flex-column mb-1">
                <label>
                  <strong>Boutique ID {`(Facultatif)`}</strong>
                </label>
                <label>
                  <a
                    target="_blank"
                    href="https://veryeasyagency.com/id-google/"
                  >
                    Cliquez ici
                  </a>{' '}
                  pour obtenir votre boutique ID{' '}
                </label>
              </div>
            }
            type="text"
            name="shopId"
            placeholder={lang['Enter your Shop Id']}
            className={`form-control regi-input ${
              errors.shopId && touched.shopId ? 'is-invalid' : ''
            }`}
            value={values.shopId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.shopId && touched.shopId && errors.shopId}
          />
          {/* <div className="d-flex flex-column">
            <div className="d-flex flex-column mb-1">
              <label>
                <strong>Boutique ID {`(Facultatif)`}</strong>
              </label>
              <label>
                <a target="_blank" href="https://veryeasyagency.com/id-google/">
                  Cliquez ici
                </a>{' '}
                pour obtenir votre boutique ID{' '}
              </label>
            </div>

            <input
              type="text"
              name="shopId"
              placeholder="Boutique ID"
              className="form-control regi-input "
              onChange={handleChange}
              value={formData.shopId}
            ></input>
          </div> */}
          <div className="form-check my-3">
            <input
              id="termsCheck"
              type="checkbox"
              name="termsCheck"
              checked={values.termsCheck}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-check-input"
            />
            <label className="form-check-label">
              J'accepte les termes et conditions.{' '}
              <span className="text-primary cursor-pointer" onClick={openModal}>
                Cliquez ici
              </span>
            </label>
          </div>
          <button
            type="submit"
            className={`commonBtnWindo mt-4 ${styles.loginBTN}`}
          >
            Commencer mon essai gratuit
          </button>
          <span className="align-self-center">
            Vous avez déjà un compte? <Link href="/login">Se connecter</Link>
          </span>
        </div>
        <ContentCard
          isOpen={isModalOpen}
          onClose={closeModal}
          title={'CONDITIONS GÉNÉRALES'}
          data={contentData}
        />
      </form>
      <div className={styles.RightImageWrapper}>
        <img src="loginImage.jpg" className={styles.RightImage}></img>
      </div>
      {isSubmitting && <Loader />}
    </div>
  );
};

export default SignUp;
