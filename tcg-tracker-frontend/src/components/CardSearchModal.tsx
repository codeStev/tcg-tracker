import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Button, Input, TextField } from '@mui/material';



export default function CardSearchModal() {
 
    const [searchParams, setSearchParams] = React.useState({
        cardName : "",
        setName : ""
    })
    const [searchResult, setSearchResult] = React.useState("");
    const handleChange = (event : any) : void => {
        const value = event.target.value
        setSearchParams({
            ...searchParams,
            [event.target.name] : value
        })
    }
//NUMH-DE011
    const searchForCardId = function() : void {
        fetch('http://yugiohprices.com/api/set_data/' + searchParams.setName)
        .then(async response =>{
            const data = await response.json()
            console.log(data)
            if (!response.ok){
                const error = "error "+ (data && data.message) || response.statusText
                console.log(error)
                return Promise.reject(error);
            }
            setSearchResult(data)
        })
        .catch(error =>{
            console.log("error die zweite " + error);
        })
    }

    //https://db.ygoprodeck.com/api/v7/cardinfo.php
    const handleSearch = (event : any) : void => {
        searchForCardId();
    }

    return (
      <React.Fragment>
        <Title>Search</Title>
       <TextField id='card-name' name='cardName' label='card-name' variant='outlined' value={searchParams.cardName} onChange={handleChange}></TextField>
       <TextField id='set-code' name='setName' label='set-code' variant='outlined' value={searchParams.setName} onChange={handleChange}></TextField>
       <div>
       <Button variant="contained" onClick={handleSearch}>Search</Button>
       </div>
      </React.Fragment>
    );
  }