import axios from "axios";
import { useState, useEffect } from "react";
import CreatePlaylist from "../../components/playlist";
import Music from "../../components/music";
import { useSelector } from "react-redux";
// import url from "../../components/data/Auth";

const CreatePlaylistPage = () => {
	// const token = useSelector((state) => state.token);
	const [accToken, setAccToken] = useState("");
  const [searchMusic, setSearchMusic] = useState("");
  const [musicData, setMusicData] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [combinedMusics, setCombinedMusics] = useState([]);
  const [user, setUser] = useState({});
	const accessToken = useSelector((state) => state.token.token.accessToken);
  const userData = useSelector((state) => state.token.user);
  
  useEffect(() => {
    setAccToken(accessToken);
    setUser(userData);
  }, [accessToken, userData]);

  // console.log(accessToken);
  const getMusic = async () => {
    await axios
			.get(
				`https://api.spotify.com/v1/search?q=${searchMusic}&type=track&access_token=${accToken}`
			)
			.then((response) => setMusicData(response.data.tracks.items))
			.catch((err) => {
				console.log(err);
			});
		};
    // console.log(accToken);
    
	const handleSelectedMusic = (uri) => {
		const alreadySelected = selectedMusic.find((m) => m === uri);
		if (alreadySelected) {
			setSelectedMusic(selectedMusic.filter((m) => m !== uri));
		} else {
			setSelectedMusic([...selectedMusic, uri]);
		}

		console.log(selectedMusic);
	};
    
	useEffect(() => {
		const combinedMusicsWithSelectedMusic = musicData.map((music) => ({
			...music,
			isSelected: selectedMusic.find((m) => m === music.uri) ? true : false
		}));
		setCombinedMusics(combinedMusicsWithSelectedMusic);
		console.log(combinedMusicsWithSelectedMusic);
	}, [selectedMusic, musicData]);
    
	const renderSongs = combinedMusics.map((song) => (
		<Music
			key={song.id}
			image={song.album.images[1].url}
			title={song.name}
			artist={song.artists[0].name}
			album={song.album.name}
			onSelectMusic={handleSelectedMusic}
			uri={song.uri}
			isSelected={song.isSelected}
		/>
	));
    
	return (
		<div className="main">
        <header>
          <div className="navbar">
            <div className="logo">
              <h1>Pamaantify</h1>
            </div>
            {/* <div className="login">
              {!isLogin ? (
                <a href={url}>Login</a>
              ) : (
                <a href="http://localhost:3000/">Logout</a>
              )}
            </div> */}
          </div>
          <h1>Create Playlist</h1>
          {/* <p>{token.token}</p> */}
        </header>
        <main>
          <div className="playlist-content">
            {/* {isLogin && (
              <>
                <CreatePlaylist accessToken={accToken} userId={user.id} uris={selectedMusic}/>
              </>
            )} */}
            <CreatePlaylist
              accessToken={accToken}
              userId={user.id}
              uris={selectedMusic}
            />
          </div>
          <div className="search-bar">
            <input
              type="search"
              onChange={(e) => {
                console.log(e.target.value);
                setSearchMusic(e.target.value)}}
            />
            <button onClick={getMusic}>search</button>
          </div>
          <div className="music-desc">
            <div className="container">
              <div className="music-content">
                <div className="music-list">{renderSongs}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}

export default CreatePlaylistPage;