import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const Data=createContext();

export const DataProvider=(props)=>{
    const [arr,setarr]=useState([])
    return(
        <Data.Provider value={[arr,setarr]}>
            {props.children}
        </Data.Provider>
    )
}