import { SafeAreaView, StyleSheet, View, Text, Image, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Constants/Colors';
import { PrimaryButton } from '../Components/Button';

import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../GlobalState';
import axios from 'axios'



const CartScreen = ({ navigation }) => {
  const url = 'https://shopit-jk-ecommerce.herokuapp.com'

  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)

  console.log("From CartScreen");
  console.log(`Token Token Token=${token}`);


  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(total)
    }

    getTotal()

  }, [cart])

  console.log(cart);

  console.log("Violence Violence Violence");

  const addToCart = async (cart) => {
    await axios.patch(url + '/user/addcart', { cart }, {
      headers: { Authorization: token }
    })
  }

  const increment = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = id => {
    Alert.alert("Confirm Remove?", `Do you Really want to remove this item from Cart?`,
    [
        {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
              return
            },
            style: "cancel"
        },
        { text: "OK", onPress: () =>{
          console.log("OK Pressed");
          cart.forEach((item, index) => {
            if (item._id === id) {
              cart.splice(index, 1)
            }
          })   
          setCart([...cart])
          addToCart(cart)
        } }
    ]
)
    }



  const decrement = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(url + '/api/payment', { cart, paymentID, address }, {
      headers: { Authorization: token }
    })

    setCart([])
    addToCart([])
    alert("You have successfully placed an order.")
  }


  if (cart.length === 0)
    return <View style={{ textAlign: "center", fontSize: "5rem", justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cart Empty</Text>
    </View>

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={{uri:item.images.url}} style={{flex:1, height: "80%"}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {item.ingredients}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rs. {item.price}</Text>
        </View>
          
        <View style={{ marginRight: 20, alignItems: 'center' }}>
        <Icon name= "close" size={25} color={COLORS.dark} style={style.close} onPress={ ()=>{removeProduct(item._id)} }/>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>
          <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} onPress={()=>decrement(item._id)}/>
            <Icon name="add" size={25} color={COLORS.white} onPress={()=> increment(item._id)}/>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cart}
        renderItem={({ item }) => <CartCard item={item} key = {item._id} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Total Price
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₹ {total}</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="CHECKOUT" onPress={() => navigation.navigate('Payment')} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  close:{
    paddingRight:0
  }
});

export default CartScreen;
