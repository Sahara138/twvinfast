export interface LabelType {
  id: number;
  name: string;
  count?: number;   // ✅ FIX
  icon?: React.ReactNode;
  color?: string;
  created_at: string;
}


export interface LabelFormData {
    name: string;
}