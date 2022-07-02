import React, { useState, useEffect } from 'react';
import { FieldValues, useForm } from "react-hook-form";
import {Input, TextField, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
    
export default function Search(props:{onSearch:Function}) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [searchError,setSearchError] = useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonSx = {
        m:2.5,
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };
    
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const onSubmit = (data:FieldValues) => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);

            setSearchError('');
            let url = `${process.env.REACT_APP_API_SEARCH}?`;
            if(data.PolicyNumber){
                url = url+`policynumber=${data.PolicyNumber}`;
            }
            if(data.CardNumber){
                url = url+`&cardnumber=${data.CardNumber}`;
            }

            fetch(url)
              .then((res) => res.json())
              .then((res) => {
                props.onSearch(res);

                timer.current = window.setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                  }, 500);
              }).catch((err) => {
                 setSearchError('Oops, something went wrong.');
                 timer.current = window.setTimeout(() => {
                    setSuccess(false);
                    setLoading(false);
                  }, 100);
              });
        }
    }

    return (
        <form>
            {searchError?<span style={{color:'red'}}>{searchError}</span>:''}
            <div>
                <h3>Service Date</h3>
                <TextField id="ServiceDate" label="Service Date" type="date"  sx={{ width: 220, m:2 }}  InputLabelProps={{ shrink: true }} {...register("ServiceDate")} />
            </div>
            <div>
                <h3>Search Using</h3>
                <div>
                    <TextField label="Policy Number" sx={{m:2}} {...register("PolicyNumber",{ required:true, pattern: /[0-9]/})} />
                    {errors.PolicyNumber && errors.PolicyNumber.type === "required" && <span style={{display:'block',color:'red',marginLeft:'1em'}}>This field is required</span>}
                    {errors.PolicyNumber && errors.PolicyNumber.type === "pattern" && <span style={{display:'block',color:'red',marginLeft:'1em'}}>Please enter number</span>}
                </div>
                <div>
                    <TextField label="Member Card Number" sx={{m:2}} type="text" {...register("CardNumber")} />
                </div>
            </div>
            <div>
                <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={buttonSx} disabled={loading}>Submit</Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                        color: green[500],
                        position: 'relative',
                        top: -30,
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}
                    />
                )}
                <Button variant="outlined" onClick={()=>{reset();setSearchError('');}} sx={{m:2.5}} disabled={loading}>Reset</Button>
            </div>
        </form>
    )
}