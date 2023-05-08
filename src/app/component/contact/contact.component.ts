import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() phone: string = '';
  @Output() viewContactDetails: EventEmitter<string> = new EventEmitter();

  constructor(private contactService: ContactService) {}

  toggleViewContactDetails() {
    this.viewContactDetails.emit(this.id);
  }
}
