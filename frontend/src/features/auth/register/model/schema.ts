import * as yup from 'yup';

export const validationRegistrSchema = yup.object().shape({
  agree: yup.boolean().oneOf([true], 'Вы должны согласиться с Правилами и Условиями'),
  name: yup.string().min(4).required('имя пользователя является обязательным.'),
  email: yup.string().email('Неправильный почтовый адрес.').required('почтовый адрес является обязательным.'),
  password: yup
    .string()
    .matches(/^(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву.')
    .matches(/^(?=.*[a-z])/, 'Пароль должен содержать хотя бы одну строчную букву.')
    .matches(/^(?=.*\d)/, 'Пароль должен содержать хотя бы одну цифру.')
    .matches(/^(?=.*[@#$%^&+=!])/, 'Пароль должен содержать хотя бы один специальный символ.')
    .matches(/^([A-Za-z\d@#$%^&+=!-_.]){6,}$/, 'Пароль должен быть не менее 6 символов в длину.')
    .required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Необходимо ввести пароль повторно.'),
});
