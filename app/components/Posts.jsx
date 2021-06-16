import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Button, Text, Image } from 'react-native';
import styles from '../styles/main';

const Posts = (props) => {

    // Hook useState: Similar to 'this.state' in class components
    // https://reactjs.org/docs/hooks-state.html
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const uri = 'https://jsonplaceholder.typicode.com/posts/';

    // Hook useEffect: Similar to componentDidMount and componentDidUpdate
    // https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        fetch(uri)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const ListPosts = ({ post }) => {
        return (
            <View style={styles.postListItem}>
                <Text style={styles.postTitle}>Post #{post.id} - {post.title.slice(0, 30)}...</Text>
                <Text style={styles.postBody}>{post.body.slice(0, 60)}...</Text>
                <View style={styles.postSeparator}></View>
                <View>
                    <View style={styles.postButton}>
                        <Button title="See More"
                            onPress={() => props.navigation.navigate('Post', { post: post })} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ?
                <ActivityIndicator />
                :
                (
                    <FlatList
                        style={styles.flatList}
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <ListPosts post={item} />}
                    />
                )}
        </View>
    );
}

export default Posts;