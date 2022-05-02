import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from "react-native";

import Colors from "../Constants/Colors";

export default function LoginScreen({ navigation }) {
    const [name, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isloading, setLoading] = useState(false);

    let user ={
        name,
        email,
        password
    }

    const registerSubmit = async e =>{
        setLoading(true);
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)
            setEmail("")
            setPassword("")
            setUserName("")
            navigation.replace("ShopIt");
            setLoading(false);
            
            
        } catch (err) {
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
        }
    }
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
                    placeholder="User Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(userName) => setUserName(userName)}
                />
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
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>



            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.replace('ShopIt')}>
                <Text style={styles.loginText}
                >SIGNUP</Text>
            </TouchableOpacity>
            <Text></Text>

            <Text style={styles.forgot_button}>Already have an account?</Text>
            <TouchableOpacity>
                <Text onPress={registerSubmit} style={{ color: 'red', fontSize: 20, marginBottom: 50, marginTop: 0 }}>Login</Text>
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
        marginBottom: 10,
        marginTop: 20
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
    }
})
