import { RegisterForm } from 'features/auth/register';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate('/');
  };
  return <RegisterForm onSuccess={onSuccess} />;
};

export default RegisterPage;
