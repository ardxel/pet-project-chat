import { RegistrForm } from 'features/auth/register';
import { useNavigate } from 'react-router';

const RegistrPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate('/');
  };
  return <RegistrForm onSuccess={onSuccess} />;
};

export default RegistrPage;
