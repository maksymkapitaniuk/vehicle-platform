import { useState, useEffect } from 'react';
import { getUserById } from '../api/users';
import type { UserType } from '../dto/User';

export function useUser(userId: number) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
}
