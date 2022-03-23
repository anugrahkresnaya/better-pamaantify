import './App.css';
import data from './components/Data';

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
              <img
                src={data.album.images[1].url}
                alt="album"
              />
              <h3>Title: {data.name}</h3>
              <p>Artist: {data.artists[0].name}</p>
              <p>Album: {data.album.name}</p>
              <button>Select</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const spotify_secret_key = process.env.REACT_APP_CLIENT_ID;
export default App;
