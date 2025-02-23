import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { Post, APIPost } from './post';
import { Search } from './tabhot';


export type RedditPost = {
    data: {
        title: string,
        id: string,
        type: string,
        subreddit: string,
        subreddit_id: string,
        ups: number,
        permalink: string,
    }
}

export type HotlistProps = {
    posts: RedditPost[];
}
export type ColdlistProps = {
    posts: string[];
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
}));

export function HotList({ posts }: HotlistProps) {
    return (
        <Box sx={{ width: '100%', bgcolor: 'none'}}>
            <List>
                {posts.map((post) => {
                    return (
                        <ListItem key={post.data.id}>
                            <Item>
                                <Post details={post}/>
                            </Item>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}

export function ColdList({ posts }: ColdlistProps) {
    return (
        <Box sx={{ width: '100%', bgcolor: 'none'}}>
            <List>
                {posts.map((id) => {
                    return (
                        <ListItem key={id}>
                            <Item>
                                <APIPost id={id}/>
                            </Item>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}

