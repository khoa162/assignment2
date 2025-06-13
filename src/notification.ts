export interface NotificationService {
  notify(message: string): void;
}

export class ConsoleNotificationService implements NotificationService {
  notify(message: string): void {
    console.log('[Notification]', message);
  }
} 