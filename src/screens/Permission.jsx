import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useTheme} from '../context/ThemeContext';
import {HeroImage, WriteIcon} from '../assets/Icons/Icons';
import {SvgXml} from 'react-native-svg';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { SafeAreaView } from 'react-native-safe-area-context';

const PermissionsScreen = () => {
  const theme = useTheme();
  const [permissions, setPermissions] = useState({});
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  const enableBluetooth = () => {
    BluetoothStateManager.requestToEnable()
      .then(() => setBluetoothEnabled(true))
      .catch(error => console.log('User denied Bluetooth activation', error));
  };

  const permissionList = [
    {
      key: 'bluetoothConnect',
      title: 'Bluetooth connect',
      permission: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    },
    {
      key: 'bluetoothScan',
      title: 'Bluetooth scan',
      permission: PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    },
    {
      key: 'fineLocation',
      title: 'Access fine location',
      permission: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    },
    {
      key: 'bluetoothAdvertise',
      title: 'Bluetooth advertise',
      permission: PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    },
    {
      key: 'recordAudio',
      title: 'Record audio',
      permission: PERMISSIONS.ANDROID.RECORD_AUDIO,
    },
  ];

  const checkPermissions = async () => {
    let newPermissions = {};
    for (let item of permissionList) {
      const result = await check(item.permission);
      newPermissions[item.key] = result;
    }
    setPermissions(newPermissions);
  };

  const requestPermission = async (key, permission) => {
    const result = await request(permission);
    setPermissions(prev => ({...prev, [key]: result}));

    if (
      result === RESULTS.GRANTED &&
      key === 'bluetoothConnect' &&
      !bluetoothEnabled
    ) {
      enableBluetooth(); // Enable Bluetooth when permission is granted
    }
  };

  useEffect(() => {
    checkPermissions();

    // Check if Bluetooth is enabled
    BluetoothStateManager.getState()
      .then(state => {
        if (state === 'PoweredOff') {
          enableBluetooth(); // Prompt user if Bluetooth is off
        } else {
          setBluetoothEnabled(true);
        }
      })
      .catch(error => console.log('Error checking Bluetooth state:', error));
  }, []);

  const renderItem = ({item, index}) => (
    <View style={styles.permissionList}>
      {/* // Permission order in number */}

      <View style={[styles.circle, {backgroundColor: theme.light.primary}]}>
        <Text style={[styles.circleText, {color: theme.light.background}]}>
          {index + 1}
        </Text>
      </View>

      {/* // permission Name  */}

      <Text style={styles.permissionText}>{item.title}</Text>

      {/* // permission state  */}

      {permissions[item.key] === RESULTS.GRANTED ? (
        <SvgXml
          xml={WriteIcon}
          width="16"
          height="13"
          style={styles.writeIcon}
        />
      ) : permissions[item.key] === RESULTS.DENIED ? (
        <TouchableOpacity
          onPress={() => requestPermission(item.key, item.permission)}
          style={[styles.openButton, {backgroundColor: theme.light.primary}]}>
          <Text style={{color: theme.light.bottomBackground}}>OPEN</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="small" />
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.light.background}]}>
      {/* // Hero Image */}

      <View style={styles.heroImage}>
        <SvgXml xml={HeroImage} width="260" height="260" />
      </View>

      {/* // permission list */}
      <FlatList
        data={permissionList}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heroImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleText: {
    fontWeight: 'bold',
  },
  permissionText: {
    fontSize: 16,
    flex: 1,
  },
  writeIcon: {
    marginRight: 10,
  },
  openButton: {
    padding: 8,
    borderRadius: 5,
  },
});

export default PermissionsScreen;
