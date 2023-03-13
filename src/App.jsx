import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Location from './components/Location';

function App() {
  const [data, setData] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [locations, setLocations] = useState([]);

  const loadLocation = async (id) => {
    try {
      const url = `https://rickandmortyapi.com/api/location/${id}`;
      const res = await axios.get(url);
      setData(res.data);
      setLocations([]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/?name=${locationQuery}`,
      );
      setLocations(response.data.results.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (locations.length > 0) {
      loadLocation(locations[0].id);
    }
  };

  useEffect(() => {
    loadLocation(Math.floor(Math.random() * 126) + 1);
  }, []);

  useEffect(() => {
    if (locationQuery.length > 0) {
      fetchLocations();
    }
  }, [locationQuery]);

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <div className="flex flex-col items-center justify-center py-10">
        <form
          onSubmit={handleLocationSubmit}
          className="flex flex-col items-center justify-center space-y-3"
        >
          <div className="flex space-x-2">
            <input
              id="location-input"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="block w-72 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              placeholder="Search location..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-2xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Search
            </button>
          </div>
          {locations.length > 0 && (
            <div className="w-full mt-2">
              {locations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => {
                    setLocationQuery(location.name);
                    loadLocation(location.id);
                  }}
                  className="cursor-pointer p-2 hover:bg-gray-800"
                >
                  {location.name}
                </div>
              ))}
            </div>
          )}
        </form>
        {data && (
          <>
            <h1 className="text-6xl text-green-500 font-bold font-mono mt-10">
              {data.name}
            </h1>
            <Location
              type={data.type}
              dimension={data.dimension}
              residents={data.residents}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
