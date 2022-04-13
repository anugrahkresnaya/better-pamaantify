import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/tokenSlice";
import url from '../../components/data/Auth'
import { Center, Button } from '@chakra-ui/react'

const LoginPage = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		const accessToken = new URLSearchParams(window.location.hash).get('#access_token')
		
		if (accessToken !== null) {
			const setUserProfile = async () => {
				try{
					const requestOptions = {
            headers: {
              "Authorization": "Bearer " + accessToken,
              "Content-Type": "application/json",
            },
          };

					const response = await fetch(
						'https://api.spotify.com/v1/me',
						requestOptions
					)
					.then(data => data.json());
					dispatch(setToken({
						accessToken: accessToken,
						user: response,
					}));
					history.push("/create-playlist");
				} catch (error) {
					console.log(error);
				}
			};

			setUserProfile();
		}
	}, [dispatch, history]);

	return (
		<>
			<Center mt='10px'>
				<Button colorScheme='teal' variant='outline'>
					<a href={url}>Login</a>
				</Button>
			</Center>
		</>
	);
}

export default LoginPage;