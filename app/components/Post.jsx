import React from 'react';
import { View, Button, Text } from 'react-native';
import styles from '../styles/main';

const Post = (props) => {

    const { post } = props.route.params;

    return (
        <View style={styles.postListItem}>
            <Text style={styles.postTitle}>Post #{post.id}</Text>
            <Text style={styles.postBody}>{post.body}</Text>
            <View style={styles.postSeparatorLg}></View>
            <View>
                <View style={styles.postButton2x}>
                    <Button title="Go back" onPress={() => props.navigation.goBack()} />
                    <Button
                        title="Go to Comments"
                        onPress={() => props.navigation.navigate('Comments', { postId: post.id })} />
                </View>
            </View>
        </View>
    );
}

export default Post;