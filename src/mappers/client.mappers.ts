import { Client, ClientFormValues } from "@/types/client";

export function clientToFormValues(
  client: Client,
): ClientFormValues & { id: string } {
  return {
    id: client.id,
    firstName: client.firstName,
    lastName: client.lastName,
    company: client.company,
    email: client.email,
    phone: client.phone,
    address: client.address,
    status: client.status,
    type: client.type,
    description: client.description,
  };
}

// No changes needed for formValuesToClientUpdate
export function formValuesToClientUpdate(
  formValues: ClientFormValues,
): Partial<Client> {
  return {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    company: formValues.company,
    email: formValues.email,
    phone: formValues.phone,
    address: formValues.address,
    status: formValues.status,
    type: formValues.type,
    description: formValues.description,
  };
}
