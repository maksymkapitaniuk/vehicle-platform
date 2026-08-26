import type { FormMode } from './types/FormMode';

export interface VehicleFormProps {
  mode: FormMode;
}

export function VehicleForm({ mode }: VehicleFormProps) {
  return <div>{mode}</div>;
}
