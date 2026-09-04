import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/LayoutWrapper';
import { UsersPage } from './pages/UsersPage';
import { UserPage } from './pages/UserPage';
import { UserFormPage } from './pages/UserFormPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { VehiclePage } from './pages/VehiclePage';
import { VehicleFormPage } from './pages/VehicleFormPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Navigate to="/users" replace />} />

          <Route path="/users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserPage />} />
          <Route path="/create-user" element={<UserFormPage mode="create" />} />
          <Route
            path="/update-user/:id"
            element={<UserFormPage mode="update" />}
          />

          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehiclePage />} />
          <Route
            path="/create-vehicle"
            element={<VehicleFormPage mode="create" />}
          />
          <Route
            path="/update-vehicle/:id"
            element={<VehicleFormPage mode="update" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
