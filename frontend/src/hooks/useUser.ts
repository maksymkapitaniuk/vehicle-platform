import { useState, useEffect } from 'react';
import { getUserById } from '../api/users';
import type { UserType } from '../dto/User';
import { processUnknownError } from '../util/errors';
import type { AppError } from '../util/errors';

export function useUser(userId: number) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError(processUnknownError(err));
        setUser(null);
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
