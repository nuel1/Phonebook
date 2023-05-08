import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/service/contact.service';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  contact: Contact = {
    id: '',
    name: '',
    phone: '',
  };

  nameEntryError = false;
  phoneEntryError = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.contact = this.contactService.getContactById(id);
  }

  save() {
    const filledAllFormEntries = this.contactService.validateFormEntries(
      this.contact
    );

    if (filledAllFormEntries) {
      this.contactService.updateContact(this.contact.id, this.contact);
      this.router.navigate(['']);
    } else {
      const { name, phone } = this.contact;
      this.nameEntryError = !name;
      this.phoneEntryError = !(phone.length >= 11);
    }
  }
}
