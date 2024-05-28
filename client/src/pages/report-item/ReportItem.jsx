import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ReportItem() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role) {
      if (user.role === 'user') {
        navigate('/user/lost/create');
      } else if (user.role === 'admin') {
        navigate('/admin/lost/create');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
}
