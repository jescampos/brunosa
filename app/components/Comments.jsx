import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Button, Text } from 'react-native';
import styles from '../styles/main';

const Comments = (props) => {

    const { postId } = props.route.params;

    // Hook useState: Similar to 'this.state' in class components
    // https://reactjs.org/docs/hooks-state.html
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const uri = 'https://jsonplaceholder.typicode.com/comments?postId=' + postId;

    // Hook useEffect: Similar to componentDidMount and componentDidUpdate
    // https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        fetch(uri)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const ListComments = ({ comment }) => {
        return (
            <View style={styles.postListItem}>
                <Text style={styles.postTitle}>{comment.email}</Text>
                <Text style={styles.postBody}>{comment.body}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ?
                <ActivityIndicator />
                :
                (
                    <View style={styles.container}>
                        <FlatList
                            style={styles.flatList}
                            data={data}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <ListComments comment={item} />}
                        />
                        <View style={styles.button}>
                            <Button title="Go back" onPress={() => props.navigation.goBack()} />
                        </View>
                    </View>
                )}
        </View>
    );
}

export default Comments;