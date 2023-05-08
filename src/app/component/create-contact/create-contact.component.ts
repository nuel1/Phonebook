import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/service/contact.service';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
})
export class CreateContactComponent {
  constructor(private contactService: ContactService, private router: Router) {}

  contact: Contact = {
    id: '',
    name: '',
    phone: '',
  };

  nameEntryError = false;
  phoneEntryError = false;

  getGenerateId() {
    let c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 21; i++) id += c[Math.floor(Math.random() * c.length)];

    return id;
  }

  createContact() {
    const filledAllFormEntries = this.contactService.validateFormEntries(
      this.contact
    );

    if (filledAllFormEntries) {
      this.contact.id = this.getGenerateId();
      this.contactService.createContact(this.contact);
      this.router.navigate(['']);
    } else {
      const { name, phone } = this.contact;
      this.nameEntryError = !name;
      this.phoneEntryError = !(phone.length >= 11);
    }
  }
}
