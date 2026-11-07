import { NavLink, Outlet } from 'react-router';
import * as styles from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <div className={styles.shell}>
      <nav className={styles.nav}>
        <span className={styles.brand}>⚡ React Basepack</span>
        <div className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : '')}>
            Home
          </NavLink>
          <NavLink to="/posts" className={({ isActive }) => (isActive ? styles.active : '')}>
            Posts
          </NavLink>
        </div>
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
