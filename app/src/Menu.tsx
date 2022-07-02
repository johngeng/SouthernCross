import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Menu(props:{onItemSelected:Function}){

    return(
        <Box>
            <List>
                <ListItem><a data-id="MemberSearch" data-title="Member Search" onClick={(e)=> props.onItemSelected(e) }>Member Search</a></ListItem>
                <ListItem><a data-id="SearchResults"  data-title="Search Results" onClick={(e)=> props.onItemSelected(e) }>Search Results</a></ListItem>
            </List>
        </Box>
    )
}