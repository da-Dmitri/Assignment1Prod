import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { getFavs } from '~/storage/localstore';

import { HotList, ColdList } from './postlist';
import type { RedditPost } from './postlist';

export function Favs() {
    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%'}}>
            <ColdList posts={getFavs()}/>
        </Stack>
    );
}