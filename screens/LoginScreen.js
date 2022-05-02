import { StatusBar } from "expo-status-bar";
import React, { useState,useMemo, useContext } from "react";
// import * as SecureStore from "expo-secure-store";

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,

} from "react-native";

import Colors from "../Constants/Colors";

// API Client
import Axios from 'axios';

import 'localstorage-polyfill'
global.localStorage 
import { GlobalState } from "../GlobalState";

export default function LoginScreen({ navigation }) {

    const url = 'https://shopit-jk-ecommerce.herokuapp.com/user/login';

    const state = useContext(GlobalState)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = state.token

    if(token){
        navigation.replace("ShopIt");
    }

    const [isloading, setLoading] = useState(false)
    const handleLogin = async () => {
        // Keyboard.dismiss();
        setLoading(true);
        await Axios.post(url, {
            email,
            password,
        }).then(async (response) => {
                setLoading(false);
                localStorage.setItem('firstLogin', true);
                setEmail("")
                setPassword("")
                setToken(response.data.accesstoken);
                navigation.replace("ShopIt");
            })
            .catch((error) => {

                Alert.alert("Login error", `${error.response.data.msg}`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
                console.log('Login failed, Error:', error);
                console.log(error.response);
                setLoading(false);
            });
    };

    if(isloading){
        return(
            <View style = {styles.activity}>
                <ActivityIndicator size= "large" color="#0000ff"/>
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Image style={styles.image} source={require('../assets/shopit.png')} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>



            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}
                >LOGIN</Text>
            </TouchableOpacity>
            <View>
                <Text></Text>
            </View>

            <Text style={styles.forgot_button}>Don't have an account?</Text>
            <TouchableOpacity>
                <Text style={styles.signUp} onPress={() => navigation.replace('Signup')}>SignUp</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgm,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: Colors.accent,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: Colors.primary,
    },
    loginText: {
        color: 'white'
    },
    signUp: {
        color: 'red',
        fontSize: 20
    },
    activity:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
})
