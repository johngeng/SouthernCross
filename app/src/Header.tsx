import React, { useEffect, useState } from 'react';
import { FaBars,FaAngleLeft } from "react-icons/fa";
import Menu from './Menu';

import {Box,Grid} from '@mui/material';

export default function Header(props:{headerText:string, onMenuClick:Function, onMenuItemSelected:Function}) {
    const [headerText,setHeaderText] = useState<string|undefined>(props.headerText);
    const [showMenu,setShowMenu] = useState(false);
    
    const handleMenuClick = ()=>{
        props.onMenuClick(!showMenu);
        setShowMenu(!showMenu);
    }

    const handleMenuItemSelected = (e:React.SyntheticEvent<HTMLLinkElement>) =>{
        props.onMenuItemSelected(e);
        setShowMenu(false);

        setHeaderText(e.currentTarget.dataset['title']);
    }
    return (
        <Box p={2}>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={2}>
                    <span className="menu" onClick={handleMenuClick}>
                        {showMenu? <FaAngleLeft /> : <FaBars />}
                    </span>
                </Grid>
                <Grid item xs={10}>
                    <strong>{headerText}</strong>
                </Grid>
                <Grid item xs={12}>
                    {showMenu ? <Menu onItemSelected={handleMenuItemSelected} /> : ''}
                </Grid>
            </Grid>
        </Box>
    )
}