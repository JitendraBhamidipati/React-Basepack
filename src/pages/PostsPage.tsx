import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import * as styles from './PostsPage.module.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      setStatus('loading');
      setError(null);
      try {
        const { data } = await api.get<Post[]>('/posts', {
          params: { _limit: 10 },
          signal: controller.signal,
        });
        setPosts(data);
        setStatus('success');
      } catch (err) {
        if ((err as { name?: string }).name === 'CanceledError') return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setStatus('error');
      }
    }

    fetchPosts();
    return () => controller.abort();
  }, []);

  return (
    <div className={styles.page}>
      <h2>Posts</h2>
      <p className={styles.lead}>Fetched via the pre-configured Axios instance.</p>

      {status === 'loading' && <p className={styles.state}>Loading…</p>}
      {status === 'error' && <p className={styles.stateError}>Error: {error}</p>}
      {status === 'success' && (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id} className={styles.item}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.body}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
