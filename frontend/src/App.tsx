import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/LayoutWrapper';
import { Users } from './pages/Users';
import { User } from './pages/User';
import { UserFormPage } from './pages/UserFormPage';
import { Vehicles } from './pages/Vehicles';
import { VehicleFormPage } from './pages/VehicleFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Navigate to="/users" replace />} />

          <Route path="/users" element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="/create-user" element={<UserFormPage mode="create" />} />
          <Route
            path="/update-user/:id"
            element={<UserFormPage mode="update" />}
          />

          <Route path="/vehicles" element={<Vehicles />} />
          <Route
            path="/create-vehicle"
            element={<VehicleFormPage mode="create" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
