import React, {useContext} from 'react'
import { GlobalState } from '../GlobalState';
import { View, Button } from 'react-native';

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <View className="load_more">
            {
                result < page * 9 ? ""
                : <Button onClick={() => setPage(page+1)}>Load more</Button>
            }
        </View>
    )
}

export default LoadMore