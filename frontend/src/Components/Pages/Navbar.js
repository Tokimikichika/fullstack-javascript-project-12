import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices/index.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const logOut = () => dispatch(actions.logout());

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">{t('hexletChat')}</BootstrapNavbar.Brand>
        {!!auth.token && <Button onClick={logOut}>{t('logout')}</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
