import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext'

const MyDevice = () => {
    const theme = useTheme()
  return (
    <SafeAreaView style={[ styles.container,{ backgroundColor:theme.light.background}]}>
      <Text style={styles.text}>No Content </Text>
      
    </SafeAreaView>
  )
}

export default MyDevice

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
    
  },
  text:{
    fontFamily:"Poppins-Regular",
    fontSize:30
  }
})