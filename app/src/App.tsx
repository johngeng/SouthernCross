import React, { useEffect, useState, SyntheticEvent } from 'react';

import Container from '@mui/material/Container';

import Header from './Header';
import Search from './Search';
import SearchResult, {IMember}  from './SearchResult';


function App() {
  const [headerText,setHeaderText] = useState('Member Search');

  const [showSearch,setShowSearch] = useState(true);
  const [showSearchResult,setShowSearchResult] = useState(false);
  const [searchResults,setSearchResults] = useState<Array<IMember>>([]);

  const handleShowSearchResult = (e:IMember) =>{
    setHeaderText('Search Results');

    setShowSearch(false);
    setShowSearchResult(true);
    
    let results: Array<IMember> = searchResults.some((k:IMember)=>k.id == e.id)?searchResults: [e,...searchResults];
    setSearchResults(results);
  };

  const handleMenuClick = (e:boolean) =>{
      setHeaderText(e?'Menu':headerText);

      if(e){
        setShowSearch(false);
        setShowSearchResult(false);
      }
  };

  const handleMenuItemSelected = (e:React.SyntheticEvent<HTMLLinkElement>) =>{
    const id = e.currentTarget.dataset['id'];
    if (id=="MemberSearch"){
      setShowSearch(true);
      setShowSearchResult(false);
    }
    if (id=="SearchResults"){
      setShowSearchResult(true);
      setShowSearch(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <Header headerText={headerText} onMenuClick={handleMenuClick} onMenuItemSelected={handleMenuItemSelected} />
      {showSearch ? <Search onSearch={handleShowSearchResult} /> : ''}  
      {showSearchResult ? <SearchResult searchResults={searchResults} /> : ''} 
    </Container>
  );
}

export default App;
