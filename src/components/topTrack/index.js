import { Box, Flex, Text } from "@chakra-ui/react";

const TopTrack = ({ image, title, artist, album, duration_ms }) => {
  return (
    <div className="top-track">
      <Box display='flex' maxW='sm' overflow='hidden'>
        <img src={image} alt='album img' />
        <Flex justifyContent='space-between' alignItems='center' width='100%'>
        <div>
          <Text fontSize='md' isTruncated ml='2'>{title}</Text>
          <Text fontSize='sm' ml='2'>{artist}</Text>
          <Text fontSize='sm' ml='2' isTruncated>{album}</Text>
        </div>
        <div>
          <Text fontSize='sm'>{duration_ms}</Text>
        </div>
        </Flex>
      </Box>
    </div>
  )
}

export default TopTrack;