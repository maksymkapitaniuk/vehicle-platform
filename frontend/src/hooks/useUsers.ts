import { useState, useEffect } from 'react';
import { useDataStore } from '../store/useDataStore';
import { getUsers } from '../api/users';

export function useUsers() {
  const users = useDataStore((state) => state.users);
  const setUsers = useDataStore((state) => state.setUsers);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [setUsers]);

  return { users, loading, error };
}
