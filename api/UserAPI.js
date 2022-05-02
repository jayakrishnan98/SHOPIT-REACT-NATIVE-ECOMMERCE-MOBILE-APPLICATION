import { useState, useEffect } from 'react'
import axios from 'axios'
import { Alert } from 'react-native';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    const url = 'https://shopit-jk-ecommerce.herokuapp.com';

    
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get(url + '/user/infor', {
                        headers: { Authorization: token }
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)
                } catch (err) {
                    Alert.alert(err.response.data.msg)
                }
            }

            getUser()

        }
    }, [token])



    const addCart = async (product) => {
        if (!isLogged) return Alert.alert("Please login to continue buying")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])

            await axios.patch(url + '/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })

        } else {
            console.log("Product has been added to Cart")
        }
    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI
