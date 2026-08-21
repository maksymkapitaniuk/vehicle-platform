import { useEffect } from 'react';
import { USERS_API_URL, VEHICLES_API_URL } from './lib/constants';

function App() {
  useEffect(() => {
    (async () => {
      const usersRes = await fetch(`${USERS_API_URL}/users`);
      const users = await usersRes.json();
      const vehiclesRes = await fetch(`${VEHICLES_API_URL}/vehicles`);
      const vehicles = await vehiclesRes.json();

      console.log('Users:', users);
      console.log('Vehicles:', vehicles);
    })();
  }, []);

  return <div></div>;
}

export default App;
