import React from 'react';

function CharacterGrid({ characters }) {
  return (
    <div className="w-3/4 grid grid-cols-3 gap-4 p-4">
      {characters.map((character) => (
        <div key={character.id} className="card bg-light shadow">
          <img src={character.image} alt={character.name} className="card-img-top rounded" />
          <div className="card-body">
            <h5 className="card-title text-center font-bold">{character.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharacterGrid;
