import axios from "axios";
import { useState, useEffect } from "react";
import CreatePlaylist from "../../components/playlist";
import Music from "../../components/music";
import { 
  Button,
  Input,
  Grid,
  GridItem,
  Heading,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";
import { useAppSelector } from "store/hooks";
import Navbar from "components/navbar";

interface SongType {
  id: string,
  uri: string,
  album: {
    images: [{ url: string}, { url: string}],
    name: string,
  },
  duration_ms: number,
  name: string,
  artists: [{ name: string }],
  isSelected: isSelected,
}

// interface UserType {
//   token: {
//     token: {
//       access_token: string,
//       user: {
//         id: string,
//       }
//     }
//   }
// }

type isSelected = boolean;

export interface SelectedSongType {
  uri: string,
}

const CreatePlaylistPage = () => {
	const [accToken, setAccToken] = useState("");
  const [searchMusic, setSearchMusic] = useState("");
  const [musicData, setMusicData] = useState<SongType[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<SelectedSongType['uri'][]>([]);
  const [combinedMusics, setCombinedMusics] = useState<SongType[]>([]);
  const [user, setUser] = useState<any>({});
	const accessToken = useAppSelector((state: any) => state.token.token.accessToken);
  const userData = useAppSelector((state: any) => state.token.user);
  
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
    
	const handleSelectedMusic = (uri: string) => {
		const alreadySelected = selectedMusic.find((m) => m === uri);
		if (alreadySelected) {
			setSelectedMusic(selectedMusic.filter((m) => m !== uri));
		} else {
			setSelectedMusic([...selectedMusic, uri]);
		}
	};
    
	useEffect(() => {
		const combinedMusicsWithSelectedMusic = musicData.map((music: SongType) => ({
			...music,
			isSelected: selectedMusic.find((m) => m === music['uri']) ? true : false
		}));
		setCombinedMusics(combinedMusicsWithSelectedMusic);
    console.log(combinedMusicsWithSelectedMusic);
	}, [selectedMusic, musicData]);
    
	const renderSongs = combinedMusics.map((song) => {
    const convertedDuration = () => {
      let ms: number = song.duration_ms;
      const min = Math.floor((ms/1000/60) << 0);
      const sec = Math.floor((ms/1000) % 60);

      return(padTo2Digits(min) + ':' + padTo2Digits(sec)); 
    }
    const padTo2Digits = (num: number) => {
      return num.toString().padStart(2, '0');
    }
    return(
      <Music
        key={song.id}
        image={song.album.images[1]?.url}
        title={song.name}
        artist={song.artists[0].name}
        album={song.album.name}
        duration_ms={convertedDuration()}
        onSelectMusic={handleSelectedMusic}
        uri={song.uri}
        isSelected={song.isSelected}
      />
    )
  });

  console.log(musicData)
    
	return (
		<div className="main">
      <main>
        <div>
          <Navbar />
          <Heading as='h3' size='lg' ml='5' mb='5'>Create Playlist</Heading>
        </div>
        <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(4, 1fr)' m='5'>
          <GridItem rowSpan={2} colSpan={1} width="400px" mr='5'>
            <div className="playlist-content">
              <CreatePlaylist
                accessToken={accToken}
                userId={user.id}
                uris={selectedMusic}
              />
            </div>
          </GridItem>
          <GridItem rowSpan={1} colSpan={3} mt='3'>
            <div className="search-bar">
              <InputGroup>
                <InputLeftElement children={<Search2Icon color='teal.200' />} mt='6' />
                <Input
                  placeholder="Search Music"
                  type="search"
                  onChange={(e) => setSearchMusic(e.target.value)}
                  mt='6'
                  mb='3'
                />
              </InputGroup>
              <Button 
                colorScheme='teal'
                variant='outline'
                onClick={getMusic}
                mb='10'
              >
                search
              </Button>
            </div>
          </GridItem>
          <GridItem rowSpan={2} colSpan={3}>
            <div className="music-desc">
              <div className="container">
                <div className="music-content border-list">
                  <div className="music-list">
                  <Grid 
                    templateColumns='repeat(5, 1fr)'
                    gap={6} 
                  >
                    {renderSongs}
                  </Grid>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}

export default CreatePlaylistPage;