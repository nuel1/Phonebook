import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/service/contact.service';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-contact-view',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  dialogShow: boolean = false;

  contact: Contact = {
    id: '',
    name: '',
    phone: '',
  };

  id = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.contact = this.contactService.getContactById(this.id);
  }

  openDeleteDialog() {
    this.dialogShow = true;
  }

  deleteContact() {
    this.id = this.route.snapshot.params['id'];
    this.contactService.deleteContact(this.id);

    this.router.navigate(['']);
  }

  cancelDelete() {
    this.dialogShow = false;
  }

  goToEditContact() {
    this.router.navigate(['edit-contact', this.id]);
  }
}
