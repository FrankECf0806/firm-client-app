export type FormMode = "create" | "edit";

export interface QuickAcessFormProps<T extends object> {
  mode: FormMode;
  open: boolean;
  onClose: () => void;
  formData?: Partial<T>;
}

export interface FormState<T extends object> {
  mode: FormMode;
  open: boolean;
  formData?: T;
}
