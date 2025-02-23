import * as React from 'react';
import { Route } from 'react-router';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ButtonBase } from '@mui/material';
import { AddFavorite, RemoveFavorite, IsFavorited } from '~/storage/localstore';

const HeartEmpty = 'public/HeartEmpty.png';
const HeartFilled = 'public/HeartFilled.png';
const Upvote = 'public/Upvote.png';

import { Typography } from '@mui/material';

import type { RedditPost } from './postlist';

export type PostProps = {
    details: RedditPost,
}
export type APIPostProps = {
    id: string,
}

//
// For building a post entry straight from the API
//
export function APIPost({id}: APIPostProps) {

    let [postContent, setPostContent] = useState<RedditPost[]>([]);

    let type: string = "t3_"

    const makeAPICall = () => {
        let url: string = "https://www.reddit.com/by_id/".concat(type, id, ".json");

        fetch(url, {
            // method: "GET" 
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setPostContent(data.data.children); //the first entry, which should be the post itself
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
    useEffect(()=>{ 
        makeAPICall();
    }, []);

    return postContent.map((post) => {
        return post == null ? (<div className="hidden"/>) : (<Post details={post}/>);
    })
}

export function Post({details}: PostProps) {

    let [favorited, setFavorited] = useState(IsFavorited(details.data.id));

    const redditurl = "https://www.reddit.com";

    let goExtern = (url: string) => {
        open(url, '_blank');
    }

    let toggleFavorite = () => {
        if(!(details === null)) { //(we need to make sure it's actually loaded)
            if(favorited) {
                setFavorited(false);
                RemoveFavorite(details.data.id);
                console.log("Removed favorite ".concat(details.data.id));
            } else {
                setFavorited(true);
                AddFavorite(details.data.id);
                console.log("Added favorite ".concat(details.data.id));
            }
        }
    }

    return (
    <Box className="w-1, p-2 self-stretch">
        <span className="flex align-left">r/{details.data.subreddit}</span>       
        <Paper className="flex self-start p-3 m-2">
            <a href={redditurl.concat(details.data.permalink)} target="_blank" rel="noopener noreferrer">
                <Typography variant="h5">
                    {details.data.title}
                </Typography>
            </a>
        </Paper>
        <Stack direction="row" className="flex items-stretch m-2" spacing={1}>
            <Paper className="flex self-start aspect-square max-w-12 p-0">
                <ButtonBase className="m-0" onClick={toggleFavorite}>
                    <img src={favorited ? HeartFilled : HeartEmpty}/>
                </ButtonBase>
            </Paper>
            <Paper className='flex items-stretch flex-wrap justify-center max-h-32 self-start p-2'>
                <span className="flex self-center">+{details.data.ups}</span>
                <img className="flex self-center" src={Upvote} style={{width: '32px'}}/>
            </Paper>
        </Stack>
    </Box>
    );
}