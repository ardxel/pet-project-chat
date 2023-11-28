import * as yup from 'yup';
import { passwordSchema } from './passwordSchema';

export const validationRegisterSchema = yup.object().shape({
  agree: yup.boolean().oneOf([true], 'Вы должны согласиться с Правилами и Условиями ПО'),
  name: yup
    .string()
    .min(4, 'имя пользователя должно иметь минимум 4 символа')
    .required('имя пользователя является обязательным.'),
  email: yup.string().email('Неправильный почтовый адрес.').required('почтовый адрес является обязательным.'),
  password: passwordSchema.fields.password,
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Необходимо ввести пароль повторно.'),
});
