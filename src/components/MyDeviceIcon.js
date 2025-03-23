import React from 'react';
import { SvgXml } from 'react-native-svg';

const myDeviceSVG = (color) => `<svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.41663 14C3.41663 8.77569 3.41663 6.16235 5.03946 4.53952C6.66229 2.91669 9.27446 2.91669 14.5 2.91669C19.7243 2.91669 22.3376 2.91669 23.9605 4.53952C25.5833 6.16235 25.5833 8.77452 25.5833 14C25.5833 19.2244 25.5833 21.8377 23.9605 23.4605C22.3376 25.0834 19.7255 25.0834 14.5 25.0834C9.27563 25.0834 6.66229 25.0834 5.03946 23.4605C3.41663 21.8377 3.41663 19.2255 3.41663 14Z" stroke="${color}" stroke-width="1.75" stroke-linejoin="round"/>
<path d="M12.1666 18.0834C12.1666 18.5475 11.9823 18.9926 11.6541 19.3208C11.3259 19.649 10.8808 19.8334 10.4166 19.8334C9.9525 19.8334 9.50738 19.649 9.17919 19.3208C8.851 18.9926 8.66663 18.5475 8.66663 18.0834C8.66663 17.6192 8.851 17.1741 9.17919 16.8459C9.50738 16.5177 9.9525 16.3334 10.4166 16.3334C10.8808 16.3334 11.3259 16.5177 11.6541 16.8459C11.9823 17.1741 12.1666 17.6192 12.1666 18.0834ZM20.3333 9.91669C20.3333 9.45256 20.1489 9.00744 19.8207 8.67925C19.4925 8.35106 19.0474 8.16669 18.5833 8.16669C18.1192 8.16669 17.674 8.35106 17.3459 8.67925C17.0177 9.00744 16.8333 9.45256 16.8333 9.91669C16.8333 10.3808 17.0177 10.8259 17.3459 11.1541C17.674 11.4823 18.1192 11.6667 18.5833 11.6667C19.0474 11.6667 19.4925 11.4823 19.8207 11.1541C20.1489 10.8259 20.3333 10.3808 20.3333 9.91669Z" stroke="${color}" stroke-width="1.75"/>
<path d="M10.4166 16.3334V8.16669M18.5833 11.6667V19.8334" stroke="${color}" stroke-width="1.75" stroke-linecap="round"/>
</svg>`;

const MyDeviceIcon = ({ color, size }) => <SvgXml xml={myDeviceSVG(color)} width={size} height={size} />;

export default MyDeviceIcon;
