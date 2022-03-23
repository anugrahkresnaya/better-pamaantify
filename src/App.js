import './App.css';
import data from './components/data/index';
import Button from './components/button/index';
import Music from './components/music';

function App() {
  return (
    <div className="main">
      <header>
        <h1>Create Playlist</h1>
      </header>
      <main>
        <div className="music-desc">
          <div className="container">
            <div className="music-content">
              <Music
                image={data.album.images[1].url}
                title={data.name} 
                artist={data.artists[0].name}
                album={data.album.name}
              />
              <Button />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const spotify_secret_key = process.env.REACT_APP_CLIENT_ID;
export default App;
