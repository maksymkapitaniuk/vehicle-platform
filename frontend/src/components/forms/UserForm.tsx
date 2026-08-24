export interface UserFormProps {
  mode: 'create' | 'update';
}

export function UserForm({ mode }: UserFormProps) {
  return <div>{mode}</div>;
}
