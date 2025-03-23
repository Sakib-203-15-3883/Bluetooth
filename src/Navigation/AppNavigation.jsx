import React from 'react';

import BottomTab from '../screens/BottomTab';
import Permission from '../screens/Permission';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name="PermissionsScreen" component={Permission}
         options={{ 
          title: 'Permission' ,
          headerStyle: { backgroundColor: 'white' },
        }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
