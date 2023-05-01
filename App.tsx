import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';

const API_URL = 'https://api.tvmaze.com/search/shows?q=';

const App = () => {
    const [value, setValue] = useState('');
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef<ScrollView>(null);

    const onGetData = async () => {
        const response = await fetch(API_URL + value, {
            method: 'GET',
        });
        const result = await response.json();
        console.log(result[0]);
        setMovies(result);
    };
    console.log(movies);

    const ClearArea = () => {
        setValue('');
        setMovies([]);
    };
    const onChangeText = (text: string) => {
        setValue(text);
    };
    const scrollToTop = () => {
        scrollRef.current?.scrollToOffset({ offset: 0 });
    };
    const scrollToEnd = () => {
        scrollRef.current?.scrollToEnd({});
    };

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: '600',
                    backgroundColor: '#7E354D',
                    color: 'white',
                    borderRadius: 6,
                }}
            >
                {value}
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={value}
                placeholder="Enter movie name...."
                placeholderTextColor="white"
                onChangeText={onChangeText}
            />

            <View style={{ flexDirection: 'row', gap: 10 }}>
                {value ? (
                    <>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onGetData}
                        >
                            <Text style={styles.title}>SEND</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={ClearArea}
                        >
                            <Text style={styles.title}>CLEAR</Text>
                        </TouchableOpacity>
                    </>
                ) : null}
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={scrollToTop}>
                    <Text style={styles.title}>UP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={scrollToEnd}>
                    <Text style={styles.title}>DOWN</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                numColumns={2}
                data={movies}
                renderItem={({ item }) => {
                    return (
                        <View key={item.index}>
                            <Image
                                style={{ width: 200, height: 300 }}
                                source={{
                                    uri: item?.show?.image?.medium || '',
                                }}
                            />
                            <Text> {item?.show?.name}</Text>
                        </View>
                    );
                }}
                ref={scrollRef}
            />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#B38481',
        alignItems: 'center',
        gap: 5,
    },
    inputStyle: {
        width: '100%',
        height: 50,
        borderColor: '#7E354D',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: '#7E354D',
        color: 'white',
    },
    button: {
        width: 80,
        height: 20,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#550A35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
});
