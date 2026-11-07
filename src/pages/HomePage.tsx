import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, decrement, reset } from '@/store/slices/counterSlice';
import * as styles from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div className={styles.page}>
      <h2>Home</h2>
      <p className={styles.lead}>
        Redux Toolkit counter — state is preserved across route changes.
      </p>

      <div className={styles.card}>
        <p className={styles.count}>{count}</p>
        <div className={styles.actions}>
          <button
            className={styles.btn}
            aria-label="Decrement"
            onClick={() => dispatch(decrement())}
          >
            −
          </button>
          <button
            className={styles.btn}
            aria-label="Increment"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <button
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
