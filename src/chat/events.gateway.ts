import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatEventsGateway implements OnGatewayConnection {
  private readonly logger = new Logger(ChatEventsGateway.name);
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  async handleConnection() {
    process.env.NODE_ENV === 'development' && this.logger.log('New connection');

    const messageHistory = await this.chatService.findAll();
    this.server.emit('messageHistory', messageHistory);
  }

  @SubscribeMessage('requestHistory')
  async handleHistoryRequest() {
    const messageHistory = await this.chatService.findAll();
    this.server.emit('messageHistory', messageHistory);
  }

  @SubscribeMessage('message')
  async handleSendMessage(
    @MessageBody() payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const savedMessage = await this.chatService.create(payload);
    this.server.emit('recMessage', { ...savedMessage, clientId: client.id });
    return { ...savedMessage, clientId: client.id };
  }
}
