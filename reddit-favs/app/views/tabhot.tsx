import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { HotList } from './postlist';
import type { RedditPost } from './postlist';

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

export type RedditListing = {
    data: {
        children: RedditPost[]
    }
}

export function Search() {
    let [currentSub, setCurrentSub] = useState("");
    let [currentPosts, setPosts] = useState<RedditPost[]>([]);
    let subreddit = currentSub;

    const makeAPICall = () => {
        let url: string = "";
        url = url.concat("https://www.reddit.com/r/",subreddit,'/hot.json?limit=10');

        fetch(url, {
            // method: "GET" 
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setPosts(data.data.children);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    
    //useEffect(()=>{ 
    //    makeAPICall();
    //}, [])
    
    const handleButton = () => {
        makeAPICall();
    }

    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%'}}>
            <Paper sx={{ width: '100%', p: 2}}>
                <Stack direction='row' spacing={2} sx={{ width: '100%'}}>
                    <Autocomplete
                        sx={{ maxWidth: '30%', width: '100%' }}
                        id="search-field"
                        freeSolo
                        options={["btd6","phoenixsc"]}
                        onInputChange={(event, value) => {setCurrentSub(value);}}
                        renderInput={
                            (params) => <TextField
                            {...params}
                            label="r/"
                            />
                        }
                    />
                    <Button variant="contained" onClick={handleButton}>Find Posts</Button>
                </Stack>
            </Paper>
            <HotList posts={currentPosts}/>
        </Stack>
    );
}