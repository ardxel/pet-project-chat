import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Неправильная форма почтового адреса.').required('почтовый адрес является обязательным.'),
  password: yup.string().min(6, 'Минимальная длина пароля 6 символов.').required('Пожалуйста, введите пароль'),
});
