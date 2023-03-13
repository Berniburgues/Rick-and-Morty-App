import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResidentInfo = ({ urlResident }) => {
  const [residentInfo, setResidentInfo] = useState(null);

  const loadResidentInfo = async () => {
    try {
      const res = await axios.get(urlResident);
      setResidentInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadResidentInfo();
  }, [urlResident]);

  return (
    <article className="bg-black rounded-lg shadow-green-500 shadow-sm p-4 flex flex-col">
      {residentInfo ? (
        <>
          <div className="flex items-center justify-center mb-4">
            <img
              src={residentInfo.image}
              alt={residentInfo.name}
              className="rounded-full w-48 h-48 object-cover"
            />
          </div>
          <div className="text-white flex-grow">
            <h3 className="text-xl font-bold mb-2 text-center">{residentInfo.name}</h3>
            <hr className="mb-4 border-green-500" />
            <div className="flex flex-col gap-1">
              <div>
                <p className="font-bold text-start text-red-400">SPECIE</p>
                <p className="text-start text-gray-100">{residentInfo.species}</p>
              </div>
              <div>
                <p className="font-bold text-start text-yellow-400">GENDER</p>
                <p className="text-start text-gray-100">{residentInfo.gender}</p>
              </div>
              <div>
                <p className="font-bold text-start text-green-400">STATUS</p>
                <p className="text-start text-gray-100">{residentInfo.status}</p>
              </div>
              <div>
                <p className="font-bold text-start text-blue-400">ORIGIN</p>
                <p className="text-start text-gray-100">
                  <a
                    href={residentInfo.origin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-500"
                  >
                    {residentInfo.origin.name}
                  </a>
                </p>
              </div>
              <div>
                <p className="font-bold text-start text-purple-400">
                  EPISODE APPEARANCES
                </p>
                <p className="text-start text-gray-100">{residentInfo.episode.length}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-white">Loading resident information...</p>
      )}
    </article>
  );
};

export default ResidentInfo;
