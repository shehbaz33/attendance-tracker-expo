import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import colors from '../assets/colors/colors';
import { Feather,Ionicons } from '@expo/vector-icons';

const smallCard = ({title,subtitle,image}) => {
  return (
    <View style={{height:60,backgroundColor:colors.background,marginTop:20,marginLeft:30,marginRight:30,borderRadius:10,justifyContent:'center',borderLeftWidth:3,borderLeftColor:colors.accents}}>
      <View style={[tw`m-0`,{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
          <View style={{width:50}}>
            <Ionicons name={image} size={28} color={colors.textSecondary} style={tw`ml-4`} />
          </View>
        <View style={{width:180}}>
            <Text style={styles.textDetails}>
                {title}
            </Text>
            <Text style={{fontSize:12,color:colors.textSecondary}}>
                {subtitle}
            </Text>
        </View>
        <View style={styles.rounded}>
            <Feather name='chevron-right' size={22} color="white" />
        </View>
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
    rounded:{
        height: 40,
        marginRight:20,
        width: 40,
        backgroundColor: colors.button,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    }
})