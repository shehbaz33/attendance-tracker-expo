import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Company = ({route}) => {
  console.log(route.params.token)
  return (
    <View>
      <Text>Company</Text>
    </View>
  )
}

export default Company

const styles = StyleSheet.create({})