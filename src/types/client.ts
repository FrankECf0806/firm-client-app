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

export type AddClientFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  clientType: string;
  notes: string;
};
