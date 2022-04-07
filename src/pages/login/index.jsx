import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import url from "../../components/data/Auth";
import { setToken } from "../../store/tokenSlice";

const LoginPage = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		const accessToken = new URLSearchParams(window.location.search).get("access_token");

		if (accessToken !== null) {
			const setUserProfile = async () => {
				try {
					const requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          };

					const response = await fetch(`https://api.spotify.com/v1/me`, requestOptions).then(data => data.json());
					response();
				} catch (error) {
					alert(error);
				}
			};
			dispatch(setToken(accessToken));
			setUserProfile();
		}
	}, [dispatch]);

	return (
		<>
			<a href={url}>Login</a>
		</>
		
	);
}

export default LoginPage;