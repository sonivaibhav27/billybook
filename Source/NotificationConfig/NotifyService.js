import PushNotification, {Importance} from 'react-native-push-notification';

class NotifyManager {
  clearAllDeliveredNotifications() {
    PushNotification.removeAllDeliveredNotifications();
  }
  configureNotifications() {
    PushNotification.configure({
      onNotification: notification => {
        if (notification.action === 'Repeat after one day') {
          this.createScheduleNotification();
        }
        this.clearAllDeliveredNotifications();
      },
      requestPermissions: false,
    });
  }
  getScheduleNotification(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }
  getAllChannel(callback) {
    PushNotification.getChannels(callback);
  }

  createChannel(callback) {
    PushNotification.createChannel(
      {
        channelId: 'Bill',
        channelName: 'Bill Reminder Updates',
        channelDescription: 'Notification to remind the bills',
        importance: Importance.HIGH,
        vibrate: true,
      },
      callback,
    );
  }

  createLocalNotification(message, id) {
    PushNotification.localNotification({
      message,
      channelId: 'Bill',
      id,
    });
  }
  createScheduleNotification() {
    PushNotification.localNotificationSchedule({
      message: 'Notification fired after 10sec.',
      date: new Date(Date.now() + 10 * 1000),
      id: 1,
      channelId: 'Bill',
      actions: ['Repeat after one day'],
    });
  }
}

export default new NotifyManager();
