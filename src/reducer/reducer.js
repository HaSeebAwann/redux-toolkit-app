import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../api";

const initialState = {
    postsList: [],
    loading: false,
    currentRequestId: "",
    error: ""
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPostsList',
    async () => {
        try {
            const posts = await getPosts();
            return posts;
        } catch (err) {
            return err;
        }
    }
)

const { actions, reducer } = createSlice({
    name: 'posts/fetchPostsList',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.fulfilled]: (state, { meta, payload }) => {
            if (meta.requestId === state.currentRequestId.requestId) {
                state.postsList = payload;
                state.loading = false;
                state.currentRequestId = "";
            }
        },
        [fetchPosts.pending]: (state, { meta }) => {
            state.currentRequestId = meta;
            state.loading = true;
        },
        [fetchPosts.rejected]: (state, { meta, payload, error }) => {
            if (meta.requestId === state.currentRequestId.requestId) {
                state.currentRequestId = meta;
                state.posts = payload;
                state.loading = false;
                state.error = error;
            }
        }
    }
})

export default reducer;