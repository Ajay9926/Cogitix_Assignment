import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import CharacterGrid from './components/CharacterGrid';

function App() {
  // Holds all episodes
  const [episodes, setEpisodes] = useState([]);

  // Stores the selected episode's ID
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // Holds characters from the selected episode
  const [characters, setCharacters] = useState([]);

  // Fetch episodes on initial load
  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        setEpisodes(response.data.results);

        // Select the first episode by default
        if (response.data.results.length > 0) {
          selectEpisode(response.data.results[0].id);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    }
    fetchEpisodes();
  }, []);

  // Select an episode and fetch its characters
  const selectEpisode = async (id) => {
    setSelectedEpisode(id);

    try {
      const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      const characterUrls = episodeResponse.data.characters;

      // Fetch details for each character in the episode
      const characterData = await Promise.all(
        characterUrls.map((url) => axios.get(url).then((res) => res.data))
      );
      setCharacters(characterData);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar with clickable episodes */}
      <Sidebar
        episodes={episodes}
        selectedEpisode={selectedEpisode}
        onSelect={selectEpisode}
      />

      {/* Character grid for selected episode */}
      <CharacterGrid characters={characters} />
    </div>
  );
}

export default App;
