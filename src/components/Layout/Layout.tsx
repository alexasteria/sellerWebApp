import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import styles from './Layout.module.css';

const Layout: FC<{}> = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
