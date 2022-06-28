import { Flex, Heading, Image, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "components/navbar";
import TopTrack from "components/topTrack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Grid } from "@chakra-ui/react";
import FollowedArtists from "components/followedArtists";

const UserPage = () => {
  const userData = useSelector(state => state.token.user);
  const accessToken = useSelector(state => state.token.token.accessToken);
  const [userTopTracks, setUserTopTracks] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);

  useEffect(() => {
    const getTopTracks = () => {
      try{
        const requestOptions = {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        };

        axios
        .get('https://api.spotify.com/v1/me/top/tracks?limit=20', requestOptions)
        .then(data => setUserTopTracks(data.data.items));
      } catch (error) {
        alert(error)
      };
    };
  
    getTopTracks();

    const getTopArtists = () => {
      try{
        const requestOptions = {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        };

        axios
        .get('https://api.spotify.com/v1/me/following?type=artist&limit=20', requestOptions)
        .then(response => {
          console.log(response.data.artists.items);
          setFollowedArtists(response.data.artists.items)});
      } catch(error) {
        alert(error);
      }
    };

    getTopArtists();
  }, [accessToken]);

 
  const renderTopTracks = userTopTracks.map(track => {
    const convertedDuration = () => {
      let ms = track.duration_ms;
      const min = Math.floor((ms/1000/60) << 0);
      const sec = Math.floor((ms/1000) % 60);

      return(padTo2Digits(min) + ':' + padTo2Digits(sec)); 
    }
    const padTo2Digits = (num) => {
      return num.toString().padStart(2, '0');
    }
    return(
      <TopTrack 
        key={track.album.id + track.id}
        image={track.album.images[2].url}
        title={track.name}
        artist={track.album.artists[0].name}
        album={track.album.name}
        duration_ms={convertedDuration()}
      />
    );
  });

  const renderFollowedArtists = followedArtists.map(artist => {
    return(
      <FollowedArtists 
        key={artist.id}
        image={artist?.images[1]?.url}
        name={artist.name}
        genres={artist?.genres[0] + ' ' + artist?.genres[1]}
        followers={artist?.followers?.total}
        popularity={artist?.popularity}
      />
    )
  });

  return (
    <>
      <Navbar />
      <div className="heading">
        <Heading as="h1" size='2xl' color='teal.200' m={10}>User Profile</Heading>
      </div>
      <div className="profile">
        <Flex mt='10' ml='10'>
          <div className="profile-image">
            <Skeleton isLoaded>
              <Image 
                src={userData.images[0]?.url}
                alt="profile image"
              />
            </Skeleton>
          </div>
          <div className="profile-info">
            <Heading as="h1" size='4xl' ml={5} color='teal.200'>{userData.display_name}</Heading>
            <Text fontSize='lg' ml={5} mt='10'>Followers: {userData.followers.total}</Text>
          </div>
        </Flex>
        <Heading as="h1" size='2xl' color='teal.200' m='10'>Top Tracks</Heading>
        <Grid templateColumns='repeat(4, 1fr)' gap='2' ml='10' mr='10' mb='10'>
          {renderTopTracks}
        </Grid>
        <Heading as="h1" size='2xl' color='teal.200' m='10'>Followed Artists</Heading>
        <Grid templateColumns='repeat(4, 1fr)' gap='2' ml='10' mr='10' mb='10'>
          {renderFollowedArtists}
        </Grid>
      </div>
    </>
  )
};

export default UserPage;