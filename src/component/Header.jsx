import css from "../styles/Header.module.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate('/login');
  })

  }

  return (
    <div className={css.headerContainer}>
        <div className={css.companyName}>Placify</div>
        <button className={css.logoutButton}
        onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header