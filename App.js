import * as React from 'react';
import {useState, useContext} from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {DataProvider} from './GlobalState'
import 'localstorage-polyfill';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import DetailsScreen from './screens/DetailScreen';
import PaymentScreen from './screens/PaymentScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import HistoryScreen from './screens/HistoryScreen';
import HistoryDetailScreen from './screens/HistoryDetailScreen';
import Admin from './screens/Admin';


const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <Image
      style={{ width: 70, height: 70 }}
      source={require('./assets/shopit.png')}
    />
  );
}

function App() {


  
  return (
    <DataProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ShopIt" component={HomeScreen} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name='HistoryDetail' component={HistoryDetailScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
          <Stack.Screen name="Admin" component={Admin} />

        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>

  );
}

export default App;
