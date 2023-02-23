import React, { useContext } from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function Home() {

    const {authState} = useContext(AuthContext);
    const [listOfQuotes, setListOfQuotes] = useState([])
    let navigate = useNavigate();

     useEffect(() => {
        axios.get("http://localhost:3001/quotes").then((response) => {
          setListOfQuotes(response.data);
        })
     }, []);

    if(!authState.status){
        navigate("/login")
    }

    return (
        <div>
            {listOfQuotes.map((value, key) => {
                return (
                <div 
                    key={key}
                    className="quote" 
                    onClick={() => {
                        navigate(`/quote/${value.id}`);
                    }}>
                        <div className='title'>{value.title}</div>
                        <div className='body'>{value.body}</div>
                        <div className='username'>Author: {value.username}</div>
                        <div className='description'>{value.description}</div>
                </div>
                );
            })}
        </div>
    )
}

export default Home