import { Button, View, Text } from 'react-native';

export default function PaymentSuccessScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Payment Successful</Text>
      <Button
        title="Back To Home"
        onPress={() => navigation.navigate('ShopIt')}
      />
    </View>
  );
}