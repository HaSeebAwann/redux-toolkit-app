import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../reducer/reducer'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function PostsList() {
    const dispatch = useDispatch();
    const { postsList, loading, error } = useSelector((state) => state);
    console.log('postsListsss', postsList)

    useEffect(() => {
        postsList.length === 0 && dispatch(fetchPosts());
    }, [dispatch, postsList.length])

    return (
        <div>
            {loading &&
                <p>...loading</p>
            }
            {
                error && <p>Error: {error}</p>
            }
            <Grid container spacing={3}>
                {postsList && postsList.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card>
                            <CardContent>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )

}

export default PostsList;