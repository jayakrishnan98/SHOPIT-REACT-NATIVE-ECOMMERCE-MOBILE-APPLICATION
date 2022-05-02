import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Admin({ navigation }) {
  return (
        <View>
            <Text>
                You are admin You can't use ShopIt Mobile app
            </Text>
            <View>
                <Button title='Signout' onPress={navigation.replace('Login')} />
            </View>
        </View>
    )
}
