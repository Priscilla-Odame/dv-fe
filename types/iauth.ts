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
