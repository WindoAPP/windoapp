import * as Yup from 'yup';
import lang from '@/lang/en-fr.json';

export const validationSchema = Yup.object().shape({
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
