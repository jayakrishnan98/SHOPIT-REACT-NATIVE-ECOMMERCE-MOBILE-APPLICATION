import React from 'react';
import { SafeAreaView, StyleSheet, View, Text ,Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../Constants/Colors';

const CartScreen = ({ navigation, route }) => {

    console.log("From HistoryDetail Screen");

    const url = 'https://shopit-jk-ecommerce.herokuapp.com';

    const product = route.params;

    let ourData = product.cart

    const CartCard = ({ item }) => {
        console.log(item.images.url);
        return (
          <View style={style.cartCard}>
            <Image source={{uri:item.images.url}} style={{ height: "70%",width:"30%"}} />
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

              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>

            </View>
          </View>
        );
      };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={ ourData }
                renderItem={({ item }) => <CartCard item={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 15,
                            }}>
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
    historyHeading: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
});

export default CartScreen;
