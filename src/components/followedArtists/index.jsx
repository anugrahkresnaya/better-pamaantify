import { Box, Text } from "@chakra-ui/react";

const FollowedArtists = ({image, followers, genres, name, popularity}) => {
  return (
    <div className="followed-artists">
      <Box maxW='sm' borderWidth='' overflow='hidden'>
        <img src={image} alt="artist"/>
        <Text>{name}</Text>
        <Text>{genres}</Text>
        <Text>{followers}</Text>
        <Text>#{popularity}</Text>
      </Box>
    </div>
  );
}

export default FollowedArtists;