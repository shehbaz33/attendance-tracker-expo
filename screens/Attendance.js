import { StyleSheet, Text, View,SafeAreaView,Image,FlatList,Pressable } from 'react-native'
import Constants from 'expo-constants'
import React,{useEffect} from 'react'
import colors from '../assets/colors/colors';
import tw from 'twrnc';
import AttendanceCard from '../components/AttendanceCard';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  {id:1,name:'Shehbaz Sayed',company:'Great Place to Work', status:'Work from home'},
  {id:2,name:'Faizan Shaikh',company:'Great Place to Work', status:'Work from home'},
  {id:3,name:'Omkar Lanjekar',company:'Great Place to Work', status:'Work from home'},
  {id:4,name:'Swati Inje',company:'Great Place to Work', status:'Leave without pay'},
]


const Attendance = ({navigation}) => {
  const [token,setToken] = useState()
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
          setToken(value)
        }
      } catch(e) {
        console.log(e)
      }
    }

    useEffect(() =>{
      getData();
    },[])

    const getAllAttendance = async () => {
      await axios({
        method: 'get',
        url:'http://192.168.0.175:5000/api/v1/attendance',
        headers: {token: token}
       })
       .then((res) => {
         console.log(res.data)
       })
       .catch((err) => {
         console.log(err.response.data)
       })
    }

    useEffect(() =>{
      getAllAttendance()
    },[token])
  return (
    <SafeAreaView style={styles.container}>
    <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
      <Pressable onPress={() => navigation.navigate('Dashboard')}>
        <View style={styles.square}>
            <Ionicons name='chevron-back' size={22}/>
        </View>
      </Pressable>
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
      style={{width:180,height:180}}
      source={require('../assets/attendance.png')}
      />
    </View>
      <View style={styles.bodyHeight}>
        <View style={tw`mt-4`}>
          <FlatList
                data={data}
                renderItem={({item}) => (
                  <AttendanceCard item={item} navigation={navigation}/>
                )}
                keyExtractor={item => item.id}
          />
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
    borderRadius:25
  },
  square:{
    height: 40,
    marginRight:15,
    width: 40,
    backgroundColor: 'white',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation:2
  }
})