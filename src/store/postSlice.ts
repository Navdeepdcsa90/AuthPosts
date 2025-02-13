// src/features/posts/postSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/axiosInstance";

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (page) => {
  const response = await apiClient.get(
    `https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`
  );
  return response.data.posts;
});

// Async thunk for adding a new post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("https://dummyjson.com/posts/add", {
        title: newPost.title,
        body: newPost.body,
        userId: 1,
      });

      console.log("Response of addPost event:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding post:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk for editing/updating a post
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, updatedPost }) => {
    console.log("updatedPost====", updatedPost);
    const response = await apiClient.put(
      `https://dummyjson.com/posts/${id}`,
      updatedPost
    );
    return response.data;
  }
);

// Async thunk for deleting a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await apiClient.delete(`https://dummyjson.com/posts/${id}`);
  return id;
});

// Create the posts slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export const { clearPosts } = postSlice.actions;

// Export the reducer
export default postSlice.reducer;
