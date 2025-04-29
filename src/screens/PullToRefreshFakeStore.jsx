import { View, Text, StyleSheet, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

const PullToRefreshFakeStore = () => {

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const result = await response.json();
            setData(result);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts().then(() => setRefreshing(false));
    }

    return (
        <View>
            <Text>PullToRefreshFakeStore</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                contentContainerStyle={styles.list}
            />
        </View>
    )
};

const styles = StyleSheet.create({

    list: {
        padding: 10,
    },

    item: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        elevation: 3,
    },

    image: {
        width: 80,
        height: 80,
        marginRight: 15,
        borderRadius: 8,
    },

    info: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
    },

    price: {
        marginTop: 5,
        fontSize: 14,
        color: '#4CAF50',
    },

})

export default PullToRefreshFakeStore