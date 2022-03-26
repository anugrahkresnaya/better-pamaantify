import './App.css';
import data from './components/data/index';
// import Button from './components/button/index';
import Music from './components/music';

function App() {

  const renderSongs = data.map((song) => 
  <Music
    key={song.id}
    image={song.album.images[1].url}
    title={song.name}
    artist={song.artists[0].name}
    album={song.album.name}
  />)

  return (
    <div className="main">
      <header>
        <h1>Create Playlist</h1>
      </header>
      <main>
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

const spotify_secret_key = process.env.REACT_APP_CLIENT_ID;
export default App;
