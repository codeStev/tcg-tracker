import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Button, Input, TextField } from '@mui/material';



export default function CardSearchModal() {
 
    //interface IFooBar {     foo?: string;     bar?: string; }  var x: IFooBar = {};  x.foo = "asdf";  // ok x.test = "asdf"; // error, as it should be 
    const [searchParams, setSearchParams] = React.useState({
        cardName : "",
        setName : ""
    })
    const [ygoSetNames, setYgoSetNames] = React.useState(new Array<string>())
    const [searchResult, setSearchResult] = React.useState("");
    const handleChange = (event : any) : void => {
        const value = event.target.value
        setSearchParams({
            ...searchParams,
            [event.target.name] : value
        })
    }
//NUMH-DE011
    const searchSetForSetName = function(setName: string) : any {
        fetch('http://localhost:3001/yugiohprices/set_data/' + encodeURIComponent(setName))
        .then(async response =>{
            const data = await response.json()
            console.log(data)
            if (!response.ok){
                const error = "error "+ (data && data.message) || response.statusText
                console.log(error)
                return Promise.reject(error);
            }
            return data
        })
        .catch(error =>{
            console.log("error die zweite " + error);
            return null;
        })
        return null as any
    }

    const searchForAllSetNames = function() : Array<string> {
        fetch('http://localhost:3001/yugiohprices/card_sets')
        .then(async response => {
            const data = await response.json()
            console.log(data)
            if (!response.ok){
                const error = "error "+ (data && data.message) || response.statusText
                console.log(error)
                return Promise.reject(error);
            }
            let returnData : Array<string> = data
            return returnData
        })
        .catch(error => {
            console.log("error die zweite " + error)
            return new Array<string>(error);
        })
        return new Array<string>()
    }
    //https://db.ygoprodeck.com/api/v7/cardinfo.php
    const handleSearch = (event : any) : void => {
        setSearchResult(searchSetForSetName(searchParams.setName)) ;
    }

    React.useEffect(() => {
        (async () => {
            console.log("looking for sets")
          let res =  searchForAllSetNames();
          setYgoSetNames(res);          
        })();
      }, []);

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