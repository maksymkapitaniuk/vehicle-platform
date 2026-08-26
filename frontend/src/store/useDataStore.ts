import { create } from 'zustand';
import type { UserType } from '../dto/User';
import type { VehicleType } from '../dto/Vehicle';

type DataStoreState = {
  users: UserType[];
  vehicles: VehicleType[];
};

type DataStoreActions = {
  setUsers: (_newUsers: UserType[]) => void;
  setVehicles: (_newVehicles: VehicleType[]) => void;
};

type DataStore = DataStoreState & DataStoreActions;

export const useDataStore = create<DataStore>((set) => ({
  users: [],
  vehicles: [],
  setUsers: (newUsers) => set({ users: newUsers }),
  setVehicles: (newVehicles) => set({ vehicles: newVehicles }),
}));
