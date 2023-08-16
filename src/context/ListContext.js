import React, { useState, useEffect } from 'react'
import {createContext} from 'react'

export const ListContext = createContext(null)

export default ({ children }) => {
  const [listShort, setListShort] = useState([]);

  const addNewLink = (newLink) =>{
    setListShort([...listShort, newLink]);
  }
  
  const removeLink = (removedLink) =>{
    setListShort(listShort.filter((link) => link.link_url !== removedLink));
  }

  const decrementTTL = () => {
    setListShort((prevList) =>
      prevList.map((link) => ({
        ...link,
        ttl: Math.max(0, link.ttl - 1),
      }))
    );
  };


  useEffect(() => {
    const intervalId = setInterval(decrementTTL, 1000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  return <ListContext.Provider value={{listShort, addNewLink, removeLink}}>{children}</ListContext.Provider>
} 