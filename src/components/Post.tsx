import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, editPost, deletePost } from '../store/postSlice';
import CustomButton from './CustomButton';
import {useTheme} from '@react-navigation/native';

interface PostType {
  id: number;
  title: string;
  body: string;
}

interface RootState {
  posts: {
    posts: PostType[];
    loading: boolean;
    error: string | null;
  };
}

const Post: React.FC = () => {
  const dispatch = useDispatch();
  const {Colors} = useTheme() as any;
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  const [newPost, setNewPost] = useState<{ title: string; body: string }>({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState<PostType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(fetchPosts(1)); // Fetch the first page of posts
  }, [dispatch]);

  const handleAddPost = () => {
    console.log('newPost=====', newPost);
    if (!newPost.title || !newPost.body) {
      Alert.alert('Validation Error', 'Please enter both title and body.');
      return;
    }
    
    dispatch(addPost(newPost));
    setNewPost({ title: '', body: '' });
  };

  const handleEditPost = (post: PostType) => {
    setEditingPost(post);
    setNewPost({ title: post.title, body: post.body });
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      dispatch(editPost({ id: editingPost.id, updatedPost: newPost }));
      setEditingPost(null);
      setNewPost({ title: '', body: '' });
    }
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }: { item: PostType }) => (
    <View style={[styles.postContainer,{borderColor:Colors.borderColor}]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:25}}>
      <CustomButton title="Edit" onPress={() => handleEditPost(item)} />
      <CustomButton title="Delete" onPress={() => handleDeletePost(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={[styles.searchInput,{borderColor:Colors.borderColor}]}
      />
      <TextInput
        placeholder="Title"
        value={newPost.title}
        onChangeText={(text) => setNewPost({ ...newPost, title: text })}
        style={[styles.input,{borderColor:Colors.borderColor}]}
      />
      <TextInput
        placeholder="Body"
        value={newPost.body}
        onChangeText={(text) => setNewPost({ ...newPost, body: text })}
        style={[styles.input,{borderColor:Colors.borderColor}]}
      />
      <CustomButton title={editingPost ? "Update Post" : "Add Post"} onPress={editingPost ? handleUpdatePost : handleAddPost} />
      {loading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>No posts available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Post;