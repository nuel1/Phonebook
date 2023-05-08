import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ViewContactComponent } from './component/view-contact/view-contact.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { CreateContactComponent } from './component/create-contact/create-contact.component';
import { ContactService } from './service/contact.service';
import { ContactComponent } from './component/contact/contact.component';
import { EditContactComponent } from './component/edit-contact/edit-contact.component';

const routes: Routes = [
  { path: 'contacts', component: ContactListComponent },
  { path: 'create-contact', component: CreateContactComponent },
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'view-contact/:id', component: ViewContactComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ViewContactComponent,
    ContactListComponent,
    CreateContactComponent,
    ContactComponent,
    EditContactComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
