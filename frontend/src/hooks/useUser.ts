import { useState, useEffect } from 'react';
import axios from 'axios';
import { USERS_API_URL } from '../util/api';
import { User, type UserType } from '../dto/User';
import { processHttpError, type AppError } from '../util/errors';
import { getAdminToken } from '../util/auth';

export function useUser(
  userId: number,
  onAuthError?: (() => void) | undefined,
) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const token = getAdminToken();

        const userRes = await axios.get(`${USERS_API_URL}/users/${userId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const userData = User.parse(userRes.data);

        setUser(userData);
      } catch (err) {
        setError(processHttpError(err, { requestTarget: 'user', onAuthError }));
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId, onAuthError]);

  return { user, loading, error };
}
