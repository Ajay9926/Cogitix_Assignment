import React from 'react';

function Sidebar({ episodes, selectedEpisode, onSelect }) {
  return (
    <div className="w-1/4 h-screen sticky top-0 p-4 bg-gray-800 text-white">
      <ul className="list-group overflow-y-auto max-h-full">
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={`list-group-item list-group-item-action cursor-pointer ${selectedEpisode === episode.id ? 'bg-primary text-white' : 'bg-secondary text-dark'}`}
            onClick={() => onSelect(episode.id)}
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
