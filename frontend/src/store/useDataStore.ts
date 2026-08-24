import { create } from 'zustand';
import type { User } from '../dto/User';
import type { Vehicle } from '../dto/Vehicle';

type DataStoreState = {
  users: User[];
  vehicles: Vehicle[];
};

type DataStoreActions = {
  setUsers: (_newUsers: User[]) => void;
  setVehicles: (_newVehicles: Vehicle[]) => void;
  addUser: (_newUser: User) => void;
  addVehicle: (_newVehicle: Vehicle) => void;
  updateUser: (_id: number, _newUser: User) => void;
  updateVehicle: (_id: string, _newVehicle: Vehicle) => void;
  removeUser: (_id: number) => void;
  removeVehicle: (_id: string) => void;
};

type DataStore = DataStoreState & DataStoreActions;

export const useDataStore = create<DataStore>((set) => ({
  users: [],
  vehicles: [],
  setUsers: (newUsers) => set({ users: newUsers }),
  setVehicles: (newVehicles) => set({ vehicles: newVehicles }),
  addUser: (newUser) => set((state) => ({ users: [...state.users, newUser] })),
  addVehicle: (newVehicle) =>
    set((state) => ({ vehicles: [...state.vehicles, newVehicle] })),
  updateUser: (id, newUser) =>
    set((state) => ({
      users: [...state.users.filter((user) => user.id !== id), newUser],
    })),
  updateVehicle: (id, newVehicle) =>
    set((state) => ({
      vehicles: [
        ...state.vehicles.filter((vehicle) => vehicle.id !== id),
        newVehicle,
      ],
    })),
  removeUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  removeVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
    })),
}));
