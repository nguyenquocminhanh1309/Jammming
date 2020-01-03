const client_id = '89282924c3f04ad3b482fa6cec9bdcdd';
const redirect_uri = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }
        
        //check address token
        //Array
        let accessTokenFound = window.location.href.match(/access_token=([^&]*)/);
        //Array
        const expiresInFound = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenFound && expiresInFound) {
            accessToken = accessTokenFound[1];
            let expiresIn = Number(expiresInFound[1]);

            window.setTimeout(() => { accessToken = '' ; }, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        
        }   else {
            //redirect user to the /authorize endpoint of the Accounts service
            //Have application request authorization; the user log in and authorizes access
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public%20user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private%20playlist-modify-public%20playlist-modify-private&redirect_uri=${redirect_uri}`;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);
        //fetch send a request to api and return a promise : GET
        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {headers: 
                    //Authorization header to the request containing the access token.
                    {Authorization: `Bearer ${accessToken}`},     
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    
                }
            })
        })
    },

    savePlaylist(name, tracksArray) {
        if(!name && !tracksArray && tracksArray.length > 99) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        let user_id;
        //make a request to get the user_id: GET
        return fetch(
            'https://api.spotify.com/v1/me', 
            {headers:
                {Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            user_id = jsonResponse.id;
            //use user_id to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
            //create a playlist : POST
            return fetch(
                `https://api.spotify.com/v1/users/${user_id}/playlists`, 
                {
                    headers: {Authorization: `Bearer ${accessToken}`},
                    method: 'POST',
                    body: JSON.stringify({name: name})          // convert a JS object or value to a JSON string
                }
            ).then(response => {
                return response.json();
            }).then(jsonResponse => {
                let playlistId=jsonResponse.id;
                //add tracks to playlist: POST
                return fetch(
                    `https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}/tracks`,
                    {
                        headers: {Authorization: `Bearer ${accessToken}`},
                        method: 'POST',
                        body: JSON.stringify({'uris': tracksArray})
                    }
                ).then(response => {
                    return response.json();
                });
            });
        });
    }
};

export default Spotify;