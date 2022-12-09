export interface User {
  address: Address;
  type?: string[] | null;
  is_verified: boolean;
  role: string;
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
  __v: number;
  primary_email: PrimaryEmail;
}
export interface Address {}
export interface PrimaryEmail {
  _id: string;
  user: string;
  contact_mech_type: string;
  contact_mech_value: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
