import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NotifyManager from './Source/NotificationConfig/NotifyService';

NotifyManager.configureNotifications();
AppRegistry.registerComponent(appName, () => App);
