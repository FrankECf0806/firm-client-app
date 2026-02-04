export type FormMode = "create" | "edit";

export interface QuickAcessFormProps<T extends Record<string, unknown>> {
  mode: FormMode;
  open: boolean;
  onClose: () => void;
  formData?: Partial<T>;
}

export interface FormState<T extends Record<string, unknown>> {
  mode: FormMode;
  open: boolean;
  formData?: T;
}
