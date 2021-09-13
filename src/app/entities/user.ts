export interface User {
  userId: number;
  givenName: string;
  familyName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  dob: Date;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}
