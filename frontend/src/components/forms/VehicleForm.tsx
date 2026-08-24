export interface VehicleFormProps {
  mode: 'create' | 'update';
}

export function VehicleForm({ mode }: VehicleFormProps) {
  return <div>{mode}</div>;
}
