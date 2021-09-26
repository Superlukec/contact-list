import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './interfaces/contact.interface';

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService: ContactsService) {}

    /**
     * Get all contacts from database
     * @returns 
     */
    @Get()
    getContacts() {
        return this.contactsService.findAll();
    }

    /**
     * Add contact to the database
     * @returns 
     */
    @Post()
    addContact(@Body() createItemDto: CreateContactDto): Promise<Contact> {
        return this.contactsService.create(createItemDto);
    }

    /**
     * Delete specific contact
     * @param id 
     * @returns 
     */
    @Delete(':id')
    deleteContact(@Param('id') id) {
        return this.contactsService.delete(id);
    }

}
