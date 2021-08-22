import moment from 'moment';
import PushNotification, {Importance} from 'react-native-push-notification';

class NotifyManager {
  clearAllDeliveredNotifications() {
    PushNotification.removeAllDeliveredNotifications();
  }

  clearNotifAndScheduleNotications() {
    this.clearAllDeliveredNotifications();
    this.checkForRepeatedSchedules();
    this.createChannel(created => {
      console.log(created);
    });
  }

  makeOverdueBillNotification(noOfOverdueBill) {
    this.createLocalNotification(
      `You have ${noOfOverdueBill} bills that are overdue`,
    );
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
      console.log(notifications);
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

  createLocalNotification(message) {
    PushNotification.localNotification({
      message,
      channelId: 'Bill',
    });
  }

  _createTimeStampArrayForNotification(
    numberOfBills,
    repeatInterval,
    {hour, minutes},
  ) {
    const billInterval = [];
    for (let i = 0; i < numberOfBills; i++) {
      billInterval.push(
        moment().add(i, repeatInterval).hour(hour).minute(minutes).toDate(),
      );
    }
    console.log(billInterval[0].getHours());
    return billInterval;
  }

  createScheduleNotification(
    userDevice,
    numberOfBills,
    repeatInterval: 'month' | 'days' | 'year',
    {userPreferHour, userPreferMinutes},
  ) {
    const billInterval = this._createTimeStampArrayForNotification(
      numberOfBills,
      repeatInterval,
      {
        userPreferHour,
        userPreferMinutes,
      },
    );
    if (!billInterval.length) return;
    if (userDevice.toLowerCase() === 'samsung') {
      this.getScheduleNotification(notification => {
        if (notification.length <= 450) {
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
          date: billInterval[i],
          channelId: 'Bill',
        });
      }
    }
    this.getScheduleNotification(notification => {
      console.log(notification);
    });
  }
}

export default new NotifyManager();
