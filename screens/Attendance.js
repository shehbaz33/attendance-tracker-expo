import { StyleSheet, Text, View,SafeAreaView,Image,FlatList } from 'react-native'
import Constants from 'expo-constants'
import React from 'react'
import colors from '../assets/colors/colors';
import tw from 'twrnc';
import SmallCard from '../components/SmallCard';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const Attendance = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
      <View>
          <Image 
          style={styles.image}
          source={{uri:'https://www.greatplacetowork.in/wp-content/uploads/2021/11/GPTW-Corporate-logo-1.png'}}
          />
      </View>
      <Text style={styles.textStyle}>Manage Users{"\n"}
      from your fingertip!
      </Text>
    </View>
    <View style={{alignItems:'center',marginRight:30,flexDirection:'row',justifyContent:'space-between'}}>
      <View style={[tw`border-b-4 border-[#D46200]`,{marginLeft:20}]}>
        <Text style={[tw`text-3xl text-black`,{fontFamily:'DMSans-Bold'}]}>
          Attendance
        </Text>
      </View>
      <Image
      style={{width:120,height:180}}
      source={require('../assets/Groupdashboard.png')}
      />
    </View>
      <View style={styles.bodyHeight}>
        <View style={tw`mt-4`}>
          <SmallCard/>
        </View>
      </View>
  </SafeAreaView>
  )
}

export default Attendance

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.background,
    marginTop: Constants.statusBarHeight
  }, 
  textStyle:{
    color: colors.accents,
    fontSize: 14,
    marginRight:20,
    fontFamily:'DMSans-Regular'
  },
  image:{
    width: 40,
    height: 40,
    marginLeft:20,
    borderRadius:5
  },
  bodyHeight:{
    height: windowHeight,
    backgroundColor: 'white',
  }
})