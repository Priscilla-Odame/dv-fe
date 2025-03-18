export interface SignUpFormData {
  lastName: string;
  firstName: string;
  otherNames?: string;
  email: string;
  company_name: string;
  country: string;
  current_location: string;
  password: string;
  mobile: string;
  birth_date: string;
}

export interface LoginFormData {
    email: string;
    password: string;
  }