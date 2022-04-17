// import axios from "axios";
import { useState } from "react";
import { 
	Button,
	Input,
	Textarea 
} from '@chakra-ui/react'

const CreatePlaylist = ({accessToken, userId, uris}) => {
	const [form, setForm] = useState({
		title: '',
		description: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({...form, [name]: value});
	}

	const handleCreatePlaylist = async (e) => {
		e.preventDefault();

		if (form.title.length > 10) {
			try {
				const requestOptions = {
					method: 'POST',
					headers: {
						'Authorization' : 'Bearer ' + accessToken,
						'Content-Type' : 'application/json',
					}
				}

				const optionsCreatePlaylist = {
					...requestOptions,
					body : JSON.stringify({
						name: form.title,
						description: form.description,
						public: false,
						collaborative: false
					}),
				}

				const responseCreatePlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, optionsCreatePlaylist)
				.then((data) => data.json());

				const optionsAddMusic = {
					...requestOptions,
					body: JSON.stringify({
						uris
					}),
				}

				await fetch(`https://api.spotify.com/v1/playlists/${responseCreatePlaylist.id}/tracks`, optionsAddMusic)
				.then((data) => {
					console.log(responseCreatePlaylist);
					data.json()});

				setForm({title: '', description: ''});
				alert('Playlist created successfully');
			} catch(err) {
				alert(err)
			}
		} else {
			alert('Title must be larger than 10 characters')
		}
	};

	console.log(CreatePlaylist);

	return <form onSubmit={handleCreatePlaylist}>
		<label htmlFor="title">Title</label>
		<br />
		<Input 
			// width="100px"
			placeholder="Create a title for your playlist (min 10 characters)"
			type="text" 
			name="title" 
			id="title"
			value={form.title}
			onChange={handleChange}
		/>
		<br />
		<label htmlFor="description">Description</label>
		<br />
		<Textarea 
			placeholder="Create a description for your playlist"
			name="description" 
			id="description" 
			cols="30" 
			rows="10"
			value={form.description}
			onChange={handleChange}
		>
		</Textarea>
		<br />
		<Button colorScheme='teal' variant='outline' type="submit">
    	Create
  	</Button>
	</form>
}

export default CreatePlaylist;