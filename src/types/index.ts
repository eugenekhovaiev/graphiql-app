export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormProps {
  data: AuthFormData;
  setSuccessMessage?: (successMessage: string | null) => void;
  setErrorMessage: (errorMessage: string | null) => void;
}
