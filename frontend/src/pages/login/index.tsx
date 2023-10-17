import { LoginForm } from 'features/auth/login';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate('/');
  };
  return <LoginForm onSuccess={onSuccess} />;
};

export default LoginPage;
