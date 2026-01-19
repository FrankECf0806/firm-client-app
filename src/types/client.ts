export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  casesCount: number;
  status: "active" | "inactive";
}
