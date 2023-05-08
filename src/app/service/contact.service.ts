import { Injectable } from '@angular/core';
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  getContacts(): Contact[] {
    if (!sessionStorage.getItem('contacts'))
      sessionStorage.setItem('contacts', JSON.stringify([]));

    return JSON.parse(sessionStorage.getItem('contacts') as string);
  }

  validateFormEntries(contact: Contact) {
    const { name, phone } = contact;
    let filledAllFormEntries = false;

    if (name && phone.length >= 11) filledAllFormEntries = true;

    return filledAllFormEntries;
  }

  createContact(contact: Contact) {
    let contacts = JSON.parse(sessionStorage.getItem('contacts') as string);
    contacts = [...contacts, contact];
    sessionStorage.setItem('contacts', JSON.stringify(contacts));
  }

  getContactById(id: string): Contact {
    const contacts = JSON.parse(
      sessionStorage.getItem('contacts') as string
    ) as Contact[];

    const contact = contacts.filter((contact: Contact) => contact.id === id)[0];

    return contact;
  }

  updateContact(id: string, contact: Contact) {
    const contacts = JSON.parse(sessionStorage.getItem('contacts') as string);

    const modifiedContacts = contacts.reduce(
      (result: Contact[], obj: Contact) => {
        if (obj.id === id) return (result = [...result, contact]);
        return result.concat(obj);
      },
      []
    );

    sessionStorage.setItem('contacts', JSON.stringify(modifiedContacts));
  }

  deleteContact(id: string) {
    const initialContacts = JSON.parse(
      sessionStorage.getItem('contacts') as string
    ) as Contact[];

    const contacts = initialContacts.filter(
      (contact: Contact) => contact.id !== id
    );

    sessionStorage.setItem('contacts', JSON.stringify(contacts));
  }

  //Search by phonenumber or by name.
  searchContact(value: string) {
    const contacts = JSON.parse(sessionStorage.getItem('contacts') as string);

    return contacts.reduce((searchResult: Contact[], contact: Contact) => {
      const searchInput = new RegExp(`${value}`, 'i');

      if (contact.name.match(searchInput) || contact.phone.match(searchInput)) {
        searchResult = searchResult.concat(contact);
      }

      return searchResult;
    }, []);
  }
}
