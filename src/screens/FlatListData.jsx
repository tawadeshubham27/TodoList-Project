import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

const FlatListData = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (pageNum) => {
        setIsLoading(true);
        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newItems = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (pageNum - 1) * 10}`);
        setData((prevData) => [...prevData, ...newItems]);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const loadMore = () => {
        if (!isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={{ padding: 10 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
                <View style={{ padding: 20, borderBottomWidth: 1 }}>
                    <Text>{item}</Text>
                </View>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
    )
}

export default FlatListData