import messaging from '@react-native-firebase/messaging';

export const getFCMToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      return fcmToken;
    } catch (e) {
      return 'null';
    }
  };