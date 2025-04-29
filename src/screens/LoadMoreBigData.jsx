import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

const LoadMoreBigData = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0); // Start with 0 (skip)
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const limit = 10;
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`);
            const json = await response.json();

            if (json.products.length > 0) {
                setProducts((prevProducts) => [...prevProducts, ...json.products]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false); 
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); 
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );

    return (
        <View>
            <Text>LoadMoreBigData</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onEndReached={fetchProducts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" color="blue" /> : null
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

    footer: {
        paddingVertical: 20,
    },
});

export default LoadMoreBigData