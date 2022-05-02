import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-dom'
import { FlatList } from 'react-native-gesture-handler';
import COLORS from '../Constants/Colors';
import plants from '../Constants/plants';
import axios from 'axios';

import { GlobalState } from '../GlobalState';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const CartScreen = ({ navigation }) => {

    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [token] = state.token

    const url = 'https://shopit-jk-ecommerce.herokuapp.com';


    console.log("From historyScreen");
    console.log("Token" + token);

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                const res = await axios.get(url + '/user/history', {
                    headers: { Authorization: token }
                })
                console.log("res.data==========" + res.data);
                setHistory(res.data)
            }
            getHistory()
        }
    }, [token, setHistory])

    console.log("History aanu======" + history)


    const CartCard = ({ item }) => {
        return (
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('HistoryDetail', item)}
            >
                <View style={style.cartCard}>
                    <View
                        style={{
                            height: 100,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>PaymentID: {item.paymentID}</Text>
                    </View>
                    <View style={{ marginRight: 20, alignItems: 'center' }}>
                        <View>
                            <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                        <Text>Touch to View Details</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

            <Text>History</Text>
            <Text>You have {history.length} ordered</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={history}
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
