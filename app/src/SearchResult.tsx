import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export interface IMember {
    id:string,
    firstName:string,
    lastName:string,
    dataOfBirth:string,
    memberCardNumber:string,
    policyNumber:string
}
export default function SearchResult(props:{searchResults:Array<IMember>}){
    const list =  props.searchResults.map((m:IMember)=>(
        <ListItem key={m.id} style={{background:'#f1f1f1',textAlign:'center'}} sx={{mb:1}}>
            <ListItemText primary="First name" secondary={m.firstName}></ListItemText>
            <ListItemText primary="Last name" secondary={m.lastName}></ListItemText>
            <ListItemText primary="Date of birth" secondary={m.dataOfBirth}></ListItemText>
        </ListItem>
    ));
    return (
        <Box sx={{width:'100%',bgcolor:'background.paper'}}>
            <List>
                {list}
            </List>
        </Box>
    )
}