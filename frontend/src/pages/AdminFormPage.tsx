import { AdminForm, type AdminFormMode } from '../components/forms/AdminForm';

export interface AdminFormPageProps {
  mode: AdminFormMode;
}

export function AdminFormPage({ mode }: AdminFormPageProps) {
  return <AdminForm mode={mode} />;
}
