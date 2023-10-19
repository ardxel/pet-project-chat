import { LoginForm } from 'features/auth/login';
import { useNavigate } from 'react-router';
import { Paths } from 'shared/routing';

const LoginPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(Paths.home);
  };
  return <LoginForm onSuccess={onSuccess} />;
};

export default LoginPage;
