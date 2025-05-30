import { ChatConversation, Message, User } from '../models';

export class ChatService {
  private convos = new Map<string, ChatConversation>();
  private messages = new Map<string, Message[]>();

  startConversation(conversationId: string, participants: User[]): ChatConversation {
    const c = new ChatConversation(conversationId, participants);
    c.start();
    this.convos.set(conversationId, c);
    this.messages.set(conversationId, []);
    return c;
  }

  sendMessage(
    conversationId: string,
    messageId: string,
    sender: User,
    recipient: User,
    content: string
  ): Message {
    const conv = this.convos.get(conversationId);
    if (!conv) throw new Error('Conversation not found');
    const m = new Message(messageId, content, new Date());
    m.send();
    m.sender = sender;
    m.recipient = recipient;
    this.messages.get(conversationId)!.push(m);
    return m;
  }

  getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  closeConversation(conversationId: string): void {
    const conv = this.convos.get(conversationId);
    if (!conv) throw new Error('Conversation not found');
    conv.close();
    this.convos.delete(conversationId);
    this.messages.delete(conversationId);
  }
}
