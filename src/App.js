import React from 'react';
import Home from './pages/Home';
import Axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './AppContext';

import './app.scss';
import Freezer from './pages/Freezer';

function App() {
  const [locationName, setLocationName] = React.useState("");
  const [locationNamedText, setlocationNamedText] = React.useState("");
  const onClickLocationName = (idLocation) => {
    setlocationNamedText(itemsLocations[idLocation-1].namedText);
    setLocationName(itemsLocations[idLocation-1].locationName);
  }
  const [items, setItems] = React.useState([]);
  const [itemsLocations, setItemsLocations] = React.useState([]);
  const [itemsUnits, setItemsUnits] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const [itemsResponse, itemsLocationsResponse, itemsUnitsResponse] = await Promise.all([
        Axios.get('http://10.0.0.4:8080/api/products'),
        Axios.get('http://10.0.0.4:8080/api/locations'),
        Axios.get('http://10.0.0.4:8080/api/units'),
      ]);
      setItems(itemsResponse.data);
      setItemsLocations(itemsLocationsResponse.data);
      setItemsUnits(itemsUnitsResponse.data);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <AppContext.Provider value={{items, setItems, isLoaded, locationName, itemsLocations, locationNamedText, itemsUnits}}>
    <div className="App">
      <div className="Main-app">
      <Routes>
        <Route path="/" element={
          <Home 
          onClickLocation={(locName) => onClickLocationName(locName)} />
        }></Route>
        <Route path="/freezer" element={
          <Freezer/>
        }></Route>
        </Routes>
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default App;
