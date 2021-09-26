import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import config from '../config';
import { Contact } from '../interfaces/contacts.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
   * Get all contacts from database
   * @returns 
   */
  getContacts() {
    return this._http.get<Contact[]>(config.api_url + '/api/contacts')
  }

  /**
   * Add contact to the database
   * @param newContact 
   * @returns 
   */
  addContact(newContact: Contact) {
    return this._http.post<Contact>(config.api_url + '/api/contacts', newContact)
  }

  /**
   * Delete specific conact
   * @param id 
   * @returns 
   */
  deleteContact(id: string) {
    return this._http.delete<Contact>(config.api_url + '/api/contacts/' + id)
  }

}
