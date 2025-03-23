import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Modal,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {
  VolumeIcon,
  BluetoothImage,
  SearchIcon,
  SearchIconBlue,
} from '../assets/Icons/Icons';
import {useNavigation} from '@react-navigation/native';
import {BleManager} from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const {width, height} = Dimensions.get('window');

const Bluetooth = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [pressSearch, setPressSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressedItem, setPressedItem] = useState(null);
  const [data, setData] = useState([]); // Store scanned devices
  const bleManager = new BleManager();

  // Check if permissions have been granted before
  const checkPermissionState = async () => {
    const permissionState = await AsyncStorage.getItem(
      'bluetoothPermissionGranted',
    );
    if (permissionState === 'true') {
      startScanning(); // If permission has been granted, start scanning
    } else {
      navigation.navigate('PermissionsScreen'); // Navigate to permission screen if not granted
    }
  };

  // Request Bluetooth permission before starting the scanning process
  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Bluetooth Permission',
          message:
            'This app requires access to Bluetooth to find nearby devices.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Store permission state in AsyncStorage
        await AsyncStorage.setItem('bluetoothPermissionGranted', 'true');
        startScanning();
      } else {
        console.log('Bluetooth permission denied');
      }
    } else {
      // If on iOS, directly start scanning
      startScanning();
    }
  };

  const handleSearchPress = async () => {
    const isFirstTime = await AsyncStorage.getItem('searchButtonPressed');
    if (isFirstTime === null) {
      // If it's the first time, navigate to the permission screen
      setPressSearch(true);
      await AsyncStorage.setItem('searchButtonPressed', 'true');
      checkPermissionState(); // Check if permissions are granted before proceeding
    } else {
      // If it's not the first time, proceed without navigating to the permission screen
      setPressSearch(true);
      startScanning(); // Start scanning without permission check
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (pressSearch) {
        setPressSearch(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [pressSearch]);

  const startScanning = () => {
    setData([]); // Clear previous scan results
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      if (device && device.name) {
        setData(prevDevices => {
          if (!prevDevices.some(d => d.id === device.id)) {
            return [...prevDevices, {id: device.id, name: device.name}];
          }
          return prevDevices;
        });
      }
    });

    // Stop scanning after 5 seconds
    setTimeout(() => {
      bleManager.stopDeviceScan();
      setModalVisible(true);
    }, 5000);
  };

  const handleItemPress = device => {
    setPressedItem(device.id);
    connectToDevice(device);
  };

  const connectToDevice = async device => {
    try {
      const connectedDevice = await bleManager.connectToDevice(device.id);
      console.log('Connected to device:', connectedDevice.name);
      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log('Device services discovered');

      navigation.navigate('PermissionsScreen', {device: connectedDevice});
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.deviceItem,
        {
          backgroundColor:
            pressedItem === item.id ? theme.light.primary : 'transparent',
        },
      ]}
      onPress={() => handleItemPress(item)}>
      <SvgXml
        xml={VolumeIcon}
        width={width * 0.05}
        height={width * 0.05}
        style={{
          color:
            pressedItem === item.id
              ? theme.light.background
              : theme.light.primary,
        }}
      />
      <Text
        style={[
          styles.deviceName,
          {
            color:
              pressedItem === item.id
                ? theme.light.background
                : theme.light.text,
          },
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.light.background}]}>

        {/* part 1 start */}

        {/* // Header Bluetooth Image start */}
      <View style={styles.bluetooth}>
        <SvgXml
          xml={BluetoothImage}
          width={width * 0.35}
          height={width * 0.35}
        />
      </View>

      {/* // Header Bluetooth Image End */}

      {/* // Search button start */}

      {!pressSearch && (
        <>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={handleSearchPress}
              style={[
                styles.searchButton,
                {backgroundColor: theme.light.primary},
              ]}>
              <SvgXml
                xml={SearchIcon}
                width={width * 0.05}
                height={width * 0.05}
              />
              <View style={{flex: 1}} />
              <Text
                style={[styles.searchText, {color: theme.light.background}]}>
                Search
              </Text>
            </TouchableOpacity>
          </View>

          {/* // Search button End */}

          {/* // Instruction Text Start */}


          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Turn on Bluetooth</Text>
          </View>

          <View style={styles.instructionTextContainer}>
            <Text style={styles.instructionText}>
              To connect your wearable to the app make sure your Bluetooth is
              on.
            </Text>
          </View>
        </>
      )}


      {/* // Instruction Text End */}

       {/* part 1 start */}

       {/* // part 2 start  */}

       {/* searching for device after pressing search button start */}

      {pressSearch && (
        <View style={styles.searchDeviceContainer}>
          <SvgXml
            xml={SearchIconBlue}
            width={width * 0.05}
            height={width * 0.05}
          />
          <Text style={[styles.searchDeviceText, {color: theme.light.primary}]}>
            Searching for device
          </Text>
        </View>
      )}

        {/* searching for device after pressing search button End */}

         {/* // part 2 End  */}

         {/* part 3 Start */}

{/* open model that show available devices start */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>List Device in range</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </Modal>

      {/* open model that show available devices end */}

       {/* part 3 End */}



    </SafeAreaView>
  );
};

export default Bluetooth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bluetooth: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },

  searchContainer: {
    alignItems: 'center',
    marginTop: height * 0.14,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.015,
    width: width * 0.38,
  },
  searchText: {
    fontSize: width * 0.05,
    fontWeight: '400',
  },
  headerTextContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  headerText: {
    color: '#535862',
    fontWeight: '600',
    fontSize: width * 0.06,
  },
  instructionTextContainer: {
    marginHorizontal: width * 0.1,
    marginTop: height * 0.006,
  },
  instructionText: {
    fontSize: width * 0.045,
    textAlign: 'center',
    color: '#535862',
  },
  searchDeviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '35%',
  },
  searchDeviceText: {
    fontSize: 20,
    marginLeft: '3%',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:"12%"
  },
  modalContent: {
    width: '100%',
    height: height * 0.36,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:"4%"
  },
  deviceName: {
    fontSize: 16,
    marginLeft: width * 0.05,
    fontWeight: '400',
  },
});
