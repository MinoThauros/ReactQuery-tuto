import React, { useEffect, useState } from 'react';
import  {useQuery} from "react-query";
import Character from './Character';

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
    const fetchCharacters=async()=>{
        const response=await fetch('https://rickandmortyapi.com/api/character')
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

    const {data,status}=useQuery("Characters",fetchCharacters)
    //linking a fetching function and a string key
    //useQuery wraps the fetching function

    if (status==="loading"){
        return <div>Loading...</div>
    }
    if (status==="error"){
        return <div>Error</div>
    }

    
    
    return (
        <div className='characters'>{/*classname makes the display flex */}
            {data.results.map(((character:result)=>(
                <Character character={character}/>
                
                
                )))}
        </div>
    )

    
}


export default Characters