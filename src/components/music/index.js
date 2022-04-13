import { Button, Flex, Center, Heading, Text } from '@chakra-ui/react'

const Music = ({image, title, artist, album, onSelectMusic, uri, isSelected}) => {
	return (
	<div className="music-box">
		<Flex flexDirection='column'>
			<div className="music-image">
				<Center>
				<img
				src={image}
				alt="album"
				/>
				</Center>
			</div>
			<div className="music-info">
				<Center flexDirection='column'>
					<Heading as='h3' size='md' textAlign='center'>{title}</Heading>
					<Text fontSize='sm'>{artist}</Text>
					<Text fontSize='sm'>{album}</Text>
					<Button 
						colorScheme='teal' 
						variant='outline' 
						onClick={() => onSelectMusic(uri)}
					>
						{isSelected ? 'Deselect' : 'Select'}
					</Button>
				</Center>
			</div>
		</Flex>
	</div>
	);
}

export default Music;