import React, { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import styles from './Layout.module.css';

const Layout: FC<{}> = () => {
  const location = useLocation();
  
  // We might not want BottomNav on checkout/delivery page
  const showBottomNav = location.pathname !== '/delivery';

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;
