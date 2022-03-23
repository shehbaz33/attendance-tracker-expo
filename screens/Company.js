import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Company = () => {
  const [localToken,setLocalToken] = useState()
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        setLocalToken(value)
      }
    } catch(e) {
      console.log(e)
    }
  }
  getData()
  console.log(localToken)
  return (
    <View>
      <Text>Company</Text>
    </View>
  )
}

export default Company

const styles = StyleSheet.create({})