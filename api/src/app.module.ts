import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forRoot('mongodb://localhost/contacts')
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
