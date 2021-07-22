/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import Amplify from 'aws-amplify';
import awsconfig from './awsconfig';

Amplify.configure(awsconfig);
AppRegistry.registerComponent(appName, () => App);