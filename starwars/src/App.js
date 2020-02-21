import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Cards from './components/Cards';
import Page from './components/Pagination';
import styled from 'styled-components';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [people, setPeople] = useState ([]);
  const [url, setUrl] = useState (`https://swapi.co/api/people/`);
  const [nextUrl, setNextUrl] = useState ('');
  const [prevUrl, setPrevUrl] = useState ('');
  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  useEffect(() => {
    axios
    .get(url)
    .then(response => {
      console.log(response.data);
      setPeople(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    })
    .catch(error => console.log({error}));
  },[url]);

  const StyledDiv=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `
  return (
    <StyledDiv className='App'>
      <h1 className='Header'>React Wars</h1>
      {people.map((person, index) => (
        <Cards 
          key={index}
          person = {person}
        />
      ))}
      <Page next={nextUrl} previous={prevUrl} url={setUrl} />
    </StyledDiv>
  );
}



export default App;
