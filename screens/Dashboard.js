import { StyleSheet, Text, View, StatusBar,SafeAreaView,Image,ScrollView } from 'react-native'
import Constants from 'expo-constants'
import React from 'react';
import colors from '../assets/colors/colors';
import tw from 'twrnc';
import { Dimensions } from 'react-native';
import SmallCard from '../components/SmallCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
  {id:1,title:'Company',subtitle:'View or create a company',image:'open-outline'},
  {id:2,title:'Attendance',subtitle:'View attendance details',image:'people-outline'},
  {id:3,title:'Schedule',subtitle:'View or create your schedule',image:'md-stopwatch-outline'},
  {id:4,title:'Status Report',subtitle:'View or download status report',image:'analytics-outline'},
  {id:5,title:'Hyperlinks',subtitle:'View or create a hyperlink',image:'link-outline'},
]

const Dashboard = ({navigation}) => {
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
            Dashboard
          </Text>
        </View>
        <Image
        style={{width:120,height:180}}
        source={require('../assets/Groupdashboard.png')}
        />
      </View>
      <ScrollView>
        <View style={styles.bodyHeight}>
          <View style={tw`mt-4`}>
            {
              data.map((details) => <SmallCard title={details.title} subtitle={details.subtitle} image={details.image} key={details.id} navigation={navigation}/>)
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard

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
    borderRadius: 25,
  }
})