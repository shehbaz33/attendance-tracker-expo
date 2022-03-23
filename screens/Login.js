/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Platform,
   Text,
   TextInput,
   Button,
   useColorScheme,
   TouchableOpacity,
   View,
   Image
 } from 'react-native';
 import { Formik } from 'formik';
 import * as yup from 'yup';
 import colors from '../assets/colors/colors';
 import axios from 'axios';
 import { useSelector, useDispatch } from 'react-redux';
 import {updateStart,updateSuccess,updateError} from '../redux/userSlice';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 let loginValidationSchema = yup.object().shape({
     email: yup.string().email('Please enter a valid email').required('Required'),
     password: yup.string().required('Required')
 })
 
 const Login = ({navigation}) => {
   const [error,setError] = useState('')
   const token = useSelector((state) => state.user.token)
   const dispatch = useDispatch()
   return (
     <SafeAreaView style={styles.container}>
         <View>
           <View style={styles.imageContainer}>
             <Image 
             style={styles.image}
             source={require('../assets/Grouphome.png')}
             />
           </View>
           <Formik 
           initialValues={{email:"",password:""}}
           onSubmit={async (values) => {
             dispatch(updateStart())
             await axios({
               method: 'post',
               url:'http://172.25.5.86:5000/api/v1/login',
               data: values,
               headers: {"Content-Type": "application/json"}
              })
              .then((res) => {
                dispatch(updateSuccess(res.data.token))
                const storeData = async () => {
                  try {
                    await AsyncStorage.setItem('token', res.data.token)
                  } catch (e) {
                    console.log(e)
                  }
                }
                storeData()
                navigation.navigate('Dashboard')
              })
              .catch((err) => {
                dispatch(updateError())
                setError(err.response.data.error)
              })
            }}
           validationSchema={loginValidationSchema}
           >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                <View>
                    <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.textInput1}
                    placeholder='johndoe@gptw.com'
                    value={values.email}
                    />
                    {touched.email && errors.email ?
                    <Text style={styles.error}>{errors.email}</Text>
                    : null}
                    <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={styles.textInput2}
                    placeholder='sns_1234'
                    value={values.password}
                    />
                    {touched.password && errors.password ?
                    <Text style={styles.error}>{errors.password}</Text>
                    : null}
                    <View style={{marginLeft:30,marginRight:30}}>
                        <TouchableOpacity style={[styles.button,{
                            backgroundColor: isValid ? '#373A4E' : '#CACFD2'
                        }]}
                         onPress={handleSubmit}
                         disabled={!isValid}
                         >
                        <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.error}>{error ? error : null}</Text>
                </View>
            )}
            </Formik>
         </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: colors.background,
     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
   },  
   image:{
     width: 242,
     height: 182
   },
   imageContainer:{
     alignItems:'center',
     paddingTop: 100,
     marginBottom: 30
   },
   textInput1:{
     padding: 10,
     color:'#000000',
     backgroundColor:'#ffffff',
     marginLeft:30,
     marginRight:30,
     borderRadius:10,
     height: 45,
     borderColor: '#E5E5E5',
     borderWidth: 1,
     fontSize:18,
     fontFamily:'DMSans-Regular'
   },
   textInput2:{
    padding: 10,
    color:'#000000',
    backgroundColor:'#ffffff',
    marginLeft:30,
    marginRight:30,
    borderRadius:10,
    height: 45,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    fontSize:18,
    fontFamily:'DMSans-Regular',
    marginTop:20
  },
   error:{
    fontSize:14,
    color: 'red',
    marginLeft:30,
    fontFamily:'DMSans-Regular'
   },
   button:{
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 12,
     paddingHorizontal: 32,
     borderRadius: 10,
     elevation: 3,
     backgroundColor: colors.button,
     marginTop:30
   },
   text:{
     color: 'white',
     fontSize:18,
     fontFamily:'DMSans-Regular'
   },
 });
 
 export default Login;
 