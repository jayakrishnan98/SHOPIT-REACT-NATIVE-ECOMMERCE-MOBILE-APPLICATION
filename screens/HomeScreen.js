import React, { useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  LogBox
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


import axios from 'axios';
import { GlobalState } from '../GlobalState';



import 'localstorage-polyfill'
global.localStorage
// import LoadMore from '../Components/LoadMore';

import COLORS from '../Constants/Colors';

const url = 'https://shopit-jk-ecommerce.herokuapp.com';



const width = Dimensions.get('window').width / 2 - 30;

const HomeScreen = ({ navigation }) => {


  const state = useContext(GlobalState)
  const [products, setProducts] = state.productsAPI.products
  const [token, setToken] = state.token

  const [isloading, setLoading] = useState(false)

  const [categories] = state.categoriesAPI.categories

  const [category, setCategory] = state.productsAPI.category
  const [sort, setSort] = state.productsAPI.sort
  const [search, setSearch] = state.productsAPI.search
  console.log("from HomeScreen")


  const handleCategory = e => {
    // setCategory(e.target.value)
    console.log("eeeeeeeeeeeeeeeeeeee"+e);
    setSearch('')
  }

  LogBox.ignoreAllLogs();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)




  const handleSort = (selectedSort)=>{
    setVisible(false)
    setSort(selectedSort)
  }

  const getItemCount = (data) => 12;

  //  SignoutHandler
  const handleSignOut = async () => {
    setLoading(true);
    await axios.get(url + '/user/logout');
    localStorage.removeItem('firstLogin');
    setToken(false);
    console.log('Signout Complete');

    navigation.replace('Login');
    setLoading(false)
  }







  const Card = ({ product }) => {
    console.log(product._id);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', product)}>
        <View style={style.card}>
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
            </View>
          </View>

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={{ uri: product.images.url }}
              style={{ flex: 1, width: '100%', height: '100%' }}
            />
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
            {product.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
            ₹{product.price}
            </Text>

          </View>
        </View>
      </TouchableOpacity>
    );
  };





  if (isloading) {
    return (
      <View style={style.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>




      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
          <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
            SHOPIT
          </Text>
        </View>

        <Icon name="shopping-cart" size={28} onPress={() => navigation.navigate('Cart')} />


        <Icon name='history' size={28} onPress={() => navigation.navigate('History')} />
        <Icon name='logout' size={28} onPress={handleSignOut} />


      </View>
      <View style={{ marginTop: 30, flexDirection: 'row' }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" onChangeText={(search) => { setSearch(search) }} value={search} style={style.input} />
        </View>
        <TouchableOpacity style={style.sortBtn}>
          
          <Menu
            visible={visible}
            anchor={<Icon name="sort" size={30} color={COLORS.white} onPress={showMenu} />}
            onRequestClose={hideMenu}
          >
            <MenuItem onPress={()=>handleSort('')}>Newest</MenuItem>
            <MenuItem onPress={()=>handleSort('sort=oldest')}>Oldest</MenuItem>
            <MenuItem onPress={()=>handleSort('sort=-sold')}>Best Sales</MenuItem>
            <MenuItem onPress={()=>handleSort('sort=-price')}>Price High to Low</MenuItem>
            <MenuItem onPress={()=>handleSort('sort=price')}>Price Low to High</MenuItem>
          </Menu>
        </TouchableOpacity>
        
      </View>





      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={products}
        renderItem={({ item }) => {
          return <Card key={item => item._id} product={item} getItemCount={getItemCount} />;
        }}
      />
      {/* <LoadMore /> */}
    </View>

  );
};


const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold'
  },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

});
export default HomeScreen;
