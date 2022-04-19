import { Button, Flex, Center, Heading, Text } from '@chakra-ui/react'
// import { SelectedSongType } from 'pages/CreatePlaylist';

interface PropsMusic {
	image: string;
	title: string;
	artist: string;
	album: string;
	onSelectMusic: (uri: string) => void;
	uri: string;
	isSelected: boolean;
}
const Music = (props: PropsMusic) => {
	return (
	<div className="music-box">
		<Flex flexDirection='column'>
			<div className="music-image">
				<Center>
				<img
				data-testid='image-preview'
				src={props.image}
				alt="album"
				/>
				</Center>
			</div>
			<div className="music-info">
				<Center flexDirection='column'>
					<Heading as='h3' size='md' textAlign='center' data-testid='title'>{props.title}</Heading>
					<Text fontSize='sm' data-testid='artist'>{props.artist}</Text>
					<Text fontSize='sm' data-testid='album'>{props.album}</Text>
					<Button 
						colorScheme='teal' 
						variant='outline' 
						onClick={() => props.onSelectMusic(props.uri)}
					>
						{props.isSelected ? 'Deselect' : 'Select'}
					</Button>
				</Center>
			</div>
		</Flex>
	</div>
	);
}

export default Music;