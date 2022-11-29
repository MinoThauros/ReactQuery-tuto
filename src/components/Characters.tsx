import React, { useEffect, useState } from 'react';
import  {useQuery} from "react-query";
import Character from './Character';
import { Pagination } from '@mui/material';

interface result{
        id:number,
        name:string,
        status:string,
        species:string,
        type:string,
        url:string
    }


const Characters:React.FC=()=>{
    const [characters,setCharacters]=useState({
        info:{
            count:0,
            pages:0,
            next:'',
            prev:'',
        },
        results:[]
    })

    const [queryIndex,setQueryIndex]=useState<number>(1)
    const fetchCharacters=async(callbackReturns:any)=>{
        console.log(callbackReturns)//we can see that the queryKeys are passed down to the function through the useQuery hook
        const {queryKey}=callbackReturns
        const response=await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
        return response.json()
        /**
         * before:
        console.log(data)
        setCharacters(data)

        useEffect(()=>{
        fetchCharacters();
    },[]) 
         */
        
    }

    const {data,status}=useQuery(["Characters",queryIndex],fetchCharacters)
    //linking a fetching function and a string key
    //useQuery wraps the fetching function
    //we can add an index to the queryKey param in order to allow for pagination
    //so that the queryIndex changes => makes caching easier

    if (status==="loading"){
        return <div>Loading...</div>
    }
    if (status==="error"){
        return <div>Error</div>
    }

    const getLatestPage=(event: React.ChangeEvent<unknown>, page: number)=>{
        setQueryIndex(page)
    }

    
    
    return (
        <div>
            <div className='characters'>{/*classname makes the display flex */}
                {data.results.map(((character:result)=>(
                    <Character character={character}/>
                    
                    
                    )))}
                <div>
                    <Pagination count={10} color="primary" onChange={getLatestPage} defaultPage={queryIndex}/>
                </div>
            </div>
            
        </div>
        
    )

    
}


export default Characters