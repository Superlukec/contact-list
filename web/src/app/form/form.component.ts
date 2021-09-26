import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../interfaces/contacts.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  loading: boolean = true;
  mainForm!: FormGroup;
  submitted: boolean = false;

  contactsList: Contact[] = [];

  constructor(
    private _fb: FormBuilder,
    private _contactsService: ContactsService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
    this.createForm();

    this._contactsService.getContacts().subscribe((contact: Contact[]) => {

      this.loading = false;
      this.contactsList = [...contact];
      
    }, (err) => {

      this.loading = false;
      this._toastr.error('Problem listing contacts', err.statusText);
      
    });

  }

  /**
   * Form creating function
   */
  createForm() {
    this.mainForm = this._fb.group({
      name: ['', [Validators.required]],
      gender: [0, [Validators.required]],
      email: ['', [Validators.email]],
      telephone: '',
    });
  }

  // get field properties and validation errors for screen
  get f() { return this.mainForm.controls; }

  cancel() {
    this.mainForm.patchValue({          
      name: '',
      email: '',
      telephone: '',
  });
  }

  onSubmit() {

    this.submitted = true;

    if (this.mainForm.status != "INVALID") {

      let newContact = <Contact>{
        name: this.mainForm.value.name,
        gender: this.mainForm.value.gender,
        email: this.mainForm.value.email,
        telephone: this.mainForm.value.telephone,
      }

      this._contactsService.addContact(newContact).subscribe((contact: Contact) => {
        /**
         * After we add contact, we add them to the list, 
         * then we clear the form, and notify user, that adding was
         * successful
         */

        this._toastr.success('Contact added', 'Contact added successfully');
    
        this.contactsList.push(contact); 
    
        this.cancel();
        this.submitted = false;

      }, (err) => {
        this._toastr.error('Problem adding new contact', err.statusText);
      });

    } 
    else {
      this._toastr.error('Validation error', "Required field missing");
    }

  }

  deleteContact(id: string) {
    this._contactsService.deleteContact(id).subscribe((contact: Contact) => {

      /**
       * We find contact in list and then, we delete it
       */

      let contactIndex = -1;

      this.contactsList.map((contact: Contact, index: number) => {

        // we find the contact ID
        if(id == contact._id) {
          contactIndex = index;
        }

      });

      // if found we delete it
      if(contactIndex > -1) {
        this.contactsList.splice(contactIndex, 1);
      }
      
      this._toastr.success('Contact deleted', 'Contact deleted successfully');

    }, (err) => {
      this._toastr.error('Problem deleting contact', err.statusText);
    });
  }

}
