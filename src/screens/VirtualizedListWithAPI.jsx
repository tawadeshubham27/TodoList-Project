import { View, Text, StyleSheet, VirtualizedList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const VirtualizedListWithAPI = () => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const json = await response.json();
            setProducts(json);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const getItemCount = (data) => data.length;

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );

    const getItem = (data, index) => ({
        id: data[index].id.toString(),
        title: data[index].title,
        price: data[index].price,
        image: data[index].image,
    })

    return (
        <View>
            <Text>VirtualizedListWithAPI</Text>
            <VirtualizedList
                data={products}
                initialNumToRender={3}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                getItem={getItem}
                getItemCount={getItemCount}
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
});

export default VirtualizedListWithAPI