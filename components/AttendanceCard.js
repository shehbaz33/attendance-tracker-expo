import { StyleSheet, Text, View,Image,Pressable } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import colors from '../assets/colors/colors';
import { Feather,Ionicons } from '@expo/vector-icons';

const smallCard = ({item,navigation}) => {
  return (
    <View style={{height:70,backgroundColor:colors.background,marginTop:20,marginLeft:30,marginRight:30,borderRadius:10,justifyContent:'center',borderLeftWidth:3,borderLeftColor:colors.accents}}>
      <View style={[tw`m-0`,{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
        <View style={{width:180,marginLeft:30}}>
            <Text style={styles.textDetails}>
               {item.name}
            </Text>
            <Text style={{fontSize:12,color:colors.textSecondary,fontFamily:'DMSans-Regular'}}>
                {item.company_name}
            </Text>
            <Text style={{fontSize:12,color:colors.accents,fontFamily:'DMSans-Regular'}}>
                {item.attendance_type}
            </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('AttendanceDetails',{item})}>
          <View style={styles.square}>
              <Text style={[tw`text-xl text-black`,{fontFamily:'DMSans-Regular'}]}>P</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default smallCard

const styles = StyleSheet.create({ 
    textDetails:{
        fontSize:18,
        fontFamily:'DMSans-Regular',
        color: 'black',
    },
    square:{
        height: 50,
        marginRight:15,
        width: 50,
        backgroundColor: '#76CB8E',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    }
})