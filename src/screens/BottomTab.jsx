import React from 'react';
import MyDevice from './MyDevice';
import Bluetooth from './Bluetooth';
import {useTheme} from '../context/ThemeContext';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import BluetoothIcon from '../components/BluetoothIcon';
import MyDeviceIcon from '../components/MyDeviceIcon';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Bluetooth"
      barStyle={{
        backgroundColor: theme.light.bottomBackground,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
      }}
      activeIndicatorStyle={{backgroundColor: 'transparent'}}
      activeColor={theme.light.primary}
      inactiveColor={theme.light.text}>
      <Tab.Screen
        name="My Device"
        component={MyDevice}
        options={{
          tabBarLabel: 'My Device',
          tabBarIcon: ({focused}) => (
            <MyDeviceIcon
              color={focused ? theme.light.primary : theme.light.text}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bluetooth"
        component={Bluetooth}
        options={{
          tabBarLabel: 'Bluetooth',
          tabBarIcon: ({focused}) => (
            <BluetoothIcon
              color={focused ? theme.light.primary : theme.light.text}
              size={27}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
