import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatEventsGateway } from './events.gateway';
import { ChatService } from './chat.service';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Message.name, schema: MessageSchema }],
      'messages',
    ),
  ],
  providers: [ChatEventsGateway, ChatService],
})
export class ChatEventsModule {}
