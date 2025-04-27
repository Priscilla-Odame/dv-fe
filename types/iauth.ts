export interface SignUpFormData {
  lastName: string;
  firstName: string;
  otherNames?: string;
  email: string;
  country: string;
  current_location: string;
  password: string;
  mobile: string;
  birth_date: Date | string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}
export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}
export interface ResetPassFormData {
  newpassword: string;
  token: string | null;
}
