import moment from 'moment';
import PushNotification, {Importance} from 'react-native-push-notification';

class NotifyManager {
  clearAllDeliveredNotifications() {
    PushNotification.removeAllDeliveredNotifications();
  }

  clearNotifAndScheduleNotications() {
    this.clearAllDeliveredNotifications();
    this.checkForRepeatedSchedules();
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

  cancelNotificationById(id) {
    PushNotification.cancelLocalNotifications({id});
  }

  checkForRepeatedSchedules() {
    this.getScheduleNotification(notifications => {
      notifications.map(notification => {
        if (notification.userData?.lastDate) {
          if (
            notification.userData.lastDate > Number(moment().format('YYYYMMDD'))
          ) {
            this.cancelNotificationById(notification.id);
          }
        }
      });
    });
  }

  createLocalNotification(message, id) {
    PushNotification.localNotification({
      message,
      channelId: 'Bill',
      id,
    });
  }
  createScheduleNotification(userDevice, numberOfBills, repeatInterval) {
    if (userDevice.toLowerCase() === 'samsung') {
      this.getScheduleNotification(notification => {
        if (notification.length <= 400) {
          for (let i = 0; i < numberOfBills; i++) {
            PushNotification.localNotificationSchedule({
              message: 'Notification fired after 10sec.',
              date: new Date(Date.now() + 10 * 1000),
              id: 1,
              channelId: 'Bill',
            });
          }
        } else {
          PushNotification.localNotificationSchedule({
            repeatType: repeatInterval,
            repeatTime: 1,
            id: 1,
            userInfo: {
              lastDate: LAST_DATE,
            },
          });
        }
      });
    } else {
      for (let i = 0; i < numberOfBills; i++) {
        PushNotification.localNotificationSchedule({
          message: 'Notification fired after 10sec.',
          date: moment().add(),
          id: 1,
          channelId: 'Bill',
        });
      }
    }
  }
}

export default new NotifyManager();
