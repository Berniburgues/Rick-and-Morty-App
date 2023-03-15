import React, { useState } from 'react';
import ResidentInfo from './ResidentInfo';

function Location({ name, type, dimension, residents }) {
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 12;
  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{name}</h2>
      <div className="flex flex-wrap flex-grow gap-2  md:gap-14 md:text-base text-sm mb-5 justify-center">
        <p>
          <span className="text-green-600 font-bold">Type: </span> {type}
        </p>
        <p>
          <span className="text-green-600 font-bold">Dimension: </span> {dimension}
        </p>
        <p>
          <span className="text-green-600 font-bold">Residents: </span>
          {residents?.length}
        </p>
      </div>
      {residents && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {currentResidents.map((resident, urlResident) => (
              <div key={urlResident} className="md:w-52 lg:w-72 w-auto h-auto">
                <ResidentInfo urlResident={resident} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-7">
            {currentPage > 1 && (
              <button
                className="font-bold px-4 py-2 mr-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span className="text-2xl">{'<'}</span>
              </button>
            )}
            {currentResidents.length === residentsPerPage && (
              <button
                className="font-bold px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span className="text-2xl">{'>'}</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Location;
