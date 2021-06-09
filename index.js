/**
 * @format
 */
import {Database} from '@nozbe/watermelondb';
import {AppRegistry, LogBox, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SqlAdapter from '@nozbe/watermelondb/adapters/sqlite';
import NotifyManager from './Source/NotificationConfig/NotifyService';
import schema from './Source/databases/schema';
import BillModel from './Source/databases/Bills.model';
import HalfPaidDatesModel from './Source/databases/HalfPaid.model';
import Migration from './Source/databases/Migration';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
]);
// const adapter = new SqlAdapter({
//   schema,
//   dbName: 'bills',
//   jsi: true,
//   migrations: Migration,
// });

// export const databases = new Database({
//   adapter,
//   actionsEnabled: true,
//   modelClasses: [BillModel, HalfPaidDatesModel],
// });

NotifyManager.configureNotifications();
AppRegistry.registerComponent(appName, () => App);
