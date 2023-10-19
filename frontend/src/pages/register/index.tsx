import { RegisterForm } from 'features/auth/register';
import { useNavigate } from 'react-router';
import { Paths } from 'shared/routing';

const RegisterPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(Paths.home);
  };
  return <RegisterForm onSuccess={onSuccess} />;
};

export default RegisterPage;
