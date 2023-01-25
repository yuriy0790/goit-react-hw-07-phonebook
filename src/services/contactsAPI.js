import axios from 'axios';

axios.defaults.baseURL = 'https://63d187a4120b32bbe8fa3e98.mockapi.io/';

export async function getContacts() {
  const { data } = await axios.get(`contacts`);
  return data;
}

export async function postContact(newContact) {
  const { data } = await axios.post('contacts', newContact);
  return data;
}

export async function deleteContact(contactId) {
  const { data } = await axios.delete(`contacts/${contactId}`);
  return data;
}
