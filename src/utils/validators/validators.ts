import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
    login: Yup.string()
        .email('Incorrect email')
        .required('Must be filled'),
    password: Yup.string()
        .min(8, 'At least 8 char')
        .required('Must be filled'),
})