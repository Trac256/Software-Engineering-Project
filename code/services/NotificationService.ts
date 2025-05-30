import { Notification } from '../models';

export class NotificationService {
  private notifications = new Map<string, Notification>();

  sendNotification(recipientId: string, content: string): Notification {
    const n = new Notification(
      crypto.randomUUID(),
      content,
      false
    );
    n.send();
    this.notifications.set(n.notificationId, n);
    return n;
  }

  markRead(notificationId: string): void {
    const n = this.notifications.get(notificationId);
    if (!n) throw new Error('Notification not found');
    n.markRead();
  }

  getForUser(recipientId: string): Notification[] {
    return Array.from(this.notifications.values())
      .filter(n => n.recipient.userId === recipientId);
  }
}
