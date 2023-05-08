import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/service/contact.service';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  constructor(private contactService: ContactService, private router: Router) {}

  contacts: Contact[] = [];

  ngOnInit(): void {
    if (this.contactService.getContacts() as Contact[]) {
      this.contacts = this.contactService.getContacts() as Contact[];
    }
  }

  contactDetails(id: string) {
    this.router.navigate(['view-contact', id]);
  }

  search(value: string) {
    this.contacts = this.contactService.searchContact(value);
  }

  goToCreateContact() {
    this.router.navigate(['create-contact']);
  }
}
