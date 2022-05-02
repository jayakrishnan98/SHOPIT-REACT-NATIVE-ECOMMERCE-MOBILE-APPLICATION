import { Button, View, Text, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { GlobalState } from '../GlobalState';
import { useContext } from 'react';

export default function PaymentScreen({ navigation }) {
  
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  
  const handleNavigation = (data)=>{
    navigation.navigate("History");
    console.log("dataaaaaa"+data);
  }

  const handleOrderCompletion = ()=>{
    navigation.navigate("ShopIt");
    setCart([])
  }

  return (
    <Modal
    onRequestClose={navigation.navigate("History")}
    >
      <View>
        <Button title="Orders" onPress={handleOrderCompletion}></Button>
      </View>

      <WebView
        source={{ uri: 'https://shopit-jk-ecommerce.herokuapp.com/cart' }}
        onNavigationStateChange={(data)=>handleNavigation(data)}

/>
    </Modal>
  );
}