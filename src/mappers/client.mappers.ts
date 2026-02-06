import { Client, ClientFormValues } from "../types/client";

export function clientToFormValues(clientItem: Client): ClientFormValues {
  return {
    firstName: clientItem.name.split(" ")[0] || "",
    lastName: clientItem.name.split(" ")[1] || "",
    company: clientItem.company,
    email: clientItem.email,
    phone: clientItem.phone,
    address: clientItem.address,
    type: clientItem.type,
    status: clientItem.status,
    description: clientItem.description,
  };
}

export function formValuesToClientUpdate(
  clientItem: ClientFormValues,
): Partial<Client> {
  return {
    name: `${clientItem.firstName} ${clientItem.lastName}`.trim(),
    company: clientItem.company,
    email: clientItem.email,
    phone: clientItem.phone,
    address: clientItem.address,
    type: clientItem.type,
    status: clientItem.status,
    description: clientItem.description,
  };
}
