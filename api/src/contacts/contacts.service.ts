import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './interfaces/contact.interface';

@Injectable()
export class ContactsService {

    constructor(@InjectModel('Contact') private readonly contactModel: Model<Contact>) { }

    /**
     *  Get all contacts from database
     * @returns 
     */
    async findAll(): Promise<Contact[]> {
        return await this.contactModel.find();
    }

    /**
     * Add contact to the database
     * @param item 
     * @returns 
     */
    async create(item: Contact): Promise<Contact> {
        const newContact = new this.contactModel(item);
        return await newContact.save();
    }

    /**
     * Delete specific contact
     * @param id 
     * @returns 
     */
    async delete(id: string): Promise<Contact> {
        return await this.contactModel.findByIdAndRemove(id);
    }

}
