//import * as Notifications from 'expo-notifications'
import { DataService } from '../state/dataService';
import { Platform } from 'react-native';


const useDeviceToken = () => {
  /* Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
}) */

  const registerDeviceToken = async (userToken, loged) => {        
              let tokenExpo
              /* if (Platform.OS === 'android') {
                  await Notifications.setNotificationChannelAsync('default', {
                      name: 'default',
                      importance: Notifications.AndroidImportance.MAX,
                      vibrationPattern: [0, 250, 250, 250],
                      lightColor: '#ffffff',
                  });
              }

              if (Platform.OS === 'android') {
                  const { status: existingStatus } = await Notifications.getPermissionsAsync()
                  let finalStatus = existingStatus
                  if (existingStatus !== 'granted') {
                      const { status } = await Notifications.requestPermissionsAsync()
                      finalStatus = status
                  }
                  if (finalStatus !== 'granted') {
                      alert('Failed to get push token for push notification!')
                      return;
                  }
                  tokenExpo = (await Notifications.getExpoPushTokenAsync()).data
                  await DataService.sendTokenDevice(userToken, tokenExpo, loged)
              } else {
                  alert('Must use physical device for Push Notifications')
              } */
       
      } 
          
  return { registerDeviceToken }
}

export default useDeviceToken