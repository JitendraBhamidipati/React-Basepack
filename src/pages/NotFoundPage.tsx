import { Link } from 'react-router';
import * as styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">← Back home</Link>
    </div>
  );
}
