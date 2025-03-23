import React from 'react';
import { SvgXml } from 'react-native-svg';

const bluetoothSVG = (color) => `<svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49873 19.8333L21.4987 8.16667L14.4999 3.5V24.5L21.4999 19.8333L7.49756 8.16667" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6563 14H22.6679M6.33228 14H6.34278" stroke="${color}" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const BluetoothIcon = ({ color, size }) => <SvgXml xml={bluetoothSVG(color)} width={size} height={size} />;

export default BluetoothIcon;
