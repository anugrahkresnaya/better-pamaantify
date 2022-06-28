var client_id = process.env.REACT_APP_CLIENT_ID;
var redirect_uri = 'https://better-pamaantify.vercel.app/';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateRandomString = (length) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

var state = generateRandomString(16);

localStorage.setItem("TOKEN", state);
var scope = 'playlist-modify-private user-top-read';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

export default url;