import axios from "axios";
import { useState, useEffect } from "react";
import CreatePlaylist from "../../components/playlist";
import Music from "../../components/music";
import { useSelector } from "react-redux";
import { 
  Button,
  Input,
  Grid,
  Heading,
} from '@chakra-ui/react'

const CreatePlaylistPage = () => {
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
    
	const handleSelectedMusic = (uri) => {
		const alreadySelected = selectedMusic.find((m) => m === uri);
		if (alreadySelected) {
			setSelectedMusic(selectedMusic.filter((m) => m !== uri));
		} else {
			setSelectedMusic([...selectedMusic, uri]);
		}
	};
    
	useEffect(() => {
		const combinedMusicsWithSelectedMusic = musicData.map((music) => ({
			...music,
			isSelected: selectedMusic.find((m) => m === music.uri) ? true : false
		}));
		setCombinedMusics(combinedMusicsWithSelectedMusic);
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
              <Heading as='h1' size='2xl'>Pamaantify</Heading>
            </div>
          </div>
          <h1>Create Playlist</h1>
        </header>
        <main>
          <div className="container">
            <div className="playlist-content">
              <CreatePlaylist
                accessToken={accToken}
                userId={user.id}
                uris={selectedMusic}
              />
            </div>
            <div className="search-bar">
              <Input
                placeholder="Search Music"
                type="search"
                onChange={(e) => setSearchMusic(e.target.value)}
              />
              <Button 
                colorScheme='teal'
                variant='outline'
                onClick={getMusic}
              >
                search
              </Button>
            </div>
          </div>
          <div className="music-desc">
            <div className="container">
              <div className="music-content border-list">
                <div className="music-list">
                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                  {renderSongs}
                </Grid>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}

export default CreatePlaylistPage;