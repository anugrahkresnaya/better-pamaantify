import './App.css';
// import data from './components/data/index';
// import searchBar from './pages/search';
import Music from './components/music';
import { useState, useEffect } from 'react';
import url from './components/data/Auth';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');
  const [searchMusic, setSearchMusic] = useState('');
  const [musicData, setMusicData] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [combinedMusics, setCombinedMusics] = useState([]);
  
  useEffect(() => {
    const queryString = new URL(window.location.href.replace('#', '?')).searchParams;
    const accessToken = queryString.get('access_token');
    setToken(accessToken);
  }, []);

  const getMusic = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${searchMusic}&type=track&access_token=${token}`)
      .then((response) => setMusicData(response.data.tracks.items))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectedMusic = (uri) => {
    const alreadySelected = selectedMusic.find(m => m === uri);
    if (alreadySelected) {
      setSelectedMusic(selectedMusic.filter(m => m !== uri))
    } else {
      setSelectedMusic([...selectedMusic, uri])
    }

    console.log(selectedMusic)
  }

  useEffect(() => {
    const combinedMusicsWithSelectedMusic = musicData.map((music) => ({
      ...music,
      isSelected: selectedMusic.find((m) => m === music.uri) ? true : false,
    }));
    setCombinedMusics(combinedMusicsWithSelectedMusic);
    // console.log(combinedMusicsWithSelectedMusic);
  }, [selectedMusic, musicData]);

  const renderSongs = combinedMusics.map((song) => 
  <Music
    key={song.id}
    image={song.album.images[1].url}
    title={song.name}
    artist={song.artists[0].name}
    album={song.album.name}
    onSelectMusic={handleSelectedMusic}
    uri={song.uri}
    isSelected={song.isSelected}
  />);

  return (
    <div className="main">
      <header>
        <div className="navbar">
          <div className="logo">
            <h1>Pamaantify</h1>
          </div>
          <div className="login">
            <a href={url}>Login</a>
          </div>
        </div>
        <h1>Create Playlist</h1>
      </header>
      <main>
        <div className="search-bar">
          <input type="search" onChange={(e) => setSearchMusic(e.target.value)} />
          <button onClick={getMusic}>search</button>
        </div>
        <div className="music-desc">
          <div className="container">
            <div className="music-content">
              <div className="music-list">
                {renderSongs}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
