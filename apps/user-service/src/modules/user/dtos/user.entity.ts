export class User {
  id: number;
  created_at: Date;
  updated_at: Date;
  order_id: number;
  restaurant_id: number;
  payment_id: number;
  email: string;
  password: string;
  name: string;
  userType: string;
  address: Address[];
}

export class Address {
  id: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}
