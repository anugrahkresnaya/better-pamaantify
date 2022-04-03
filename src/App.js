import './App.css';
// import data from './components/data/index';
// import searchBar from './pages/search';
import Music from './components/music';
import CreatePlaylist from './components/playlist';
import { useState, useEffect } from 'react';
import url from './components/data/Auth';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');
  const [searchMusic, setSearchMusic] = useState('');
  const [musicData, setMusicData] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [combinedMusics, setCombinedMusics] = useState([]);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    const queryString = new URL(window.location.href.replace('#', '?')).searchParams;
    const accessToken = queryString.get('access_token');
    setToken(accessToken);
    if (accessToken !== null) {
      setToken(accessToken);
      setIsLogin(accessToken !== null);

      const setUserProfile = async () => {
        try {
          const requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'appliaction/json',
            },
          };
          console.log(requestOptions);

          const response = await fetch(`https://api.spotify.com/v1/me`, requestOptions).then(data => data.json());
          console.log(response);
          setUser(response);
        } catch(err) {
          alert(err)
        }
      }
      setUserProfile();
    }
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
    console.log(combinedMusicsWithSelectedMusic);
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
            {!isLogin && (<a href={url}>Login</a>)}
          </div>
        </div>
        <h1>Create Playlist</h1>
      </header>
      <main>
        <div className="playlist-content">
          {isLogin && (<CreatePlaylist accessToken={token} userId={user.id} uris={selectedMusic}/>)}
        </div>
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
