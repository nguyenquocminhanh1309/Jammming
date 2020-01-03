import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {             // obejct
            searchResults: [],        // array of objects with properties
            playlistName: '',
            playlistTracks: [{id: "7A8tOkp7ihOkc8a3RPoUUt", name: "Simple Love", artist: "Obito", album: "Simple Love", uri: "spotify:track:7A8tOkp7ihOkc8a3RPoUUt"},
            {id: "5HbLlcJogki9rRq2KfkGQP", name: "Nơi Này Có Anh", artist: "Sơn Tùng M-TP", album: "m-tp M-TP", uri: "spotify:track:5HbLlcJogki9rRq2KfkGQP"}
                            ],      // array of objects
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.savePlaylistUris = this.savePlaylistUris.bind(this);
        this.saveToSpotify = this.saveToSpotify.bind(this)
        this.search = this.search.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this)
    }

    //this method return searchResult that does not have items same as item in playList
    compare(searchResults, playlistTracks) {
        playlistTracks.forEach((playlistTrack) => searchResults.forEach((searchResult) => {
            if (searchResult.id === playlistTrack.id) {
                searchResults = searchResults.filter(search => search.id !== searchResult.id)
            }    
        }));
        return searchResults;
    }

    // componentWillUpdate(nextProps,nextState) {
    //     if(this.state.searchResults !== nextState.searchResults) {
    //         console.log('Hi');
            // this.compare(this.state.searchResults, this.state.playlistTracks)
            // this.setState(
            //     {
            //         searchResults: newSearchResults
            //     }
            // )
    //     }
    // }
    
    // UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    //     if(this.state.searchResults !== nextState.searchResults) {
    //         compare   
    //     }
    // };

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => 
            savedTrack.id === track.id
        ))
        {
            return;
        }
        else {
            tracks.push(track);             // NOTE: array.push add new item to the end of array and return the new length
            let newSearchResults = this.compare(this.state.searchResults, tracks);
            this.setState({
                searchResults: newSearchResults,
                playlistTracks: tracks
            });
            // this.state.searchResults.forEach(playlistTrack => {
            //     console.log(playlistTrack);
            // })
           
        }
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
        this.setState({
            playlistTracks: tracks,
        })
        
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name,
        })
    }

    savePlaylistUris() {
        return this.state.playlistTracks.map(playlistTrack => {
            return playlistTrack.uri;
        });
        
    }
    
    search(term) {
        Spotify.search(term).then(searchResults => {
            let newSearchResults = this.compare(searchResults, this.state.playlistTracks)
            this.setState({
                searchResults: newSearchResults,
            })
        })
    }

    saveToSpotify() {
        console.log(this.savePlaylistUris());
        Spotify.savePlaylist(this.state.playlistName,this.savePlaylistUris());
        alert('Create playlist sucessfully!')
    }

    render() {
        return (
            <div>
                <h1><span className="highlight">Minh Anh's </span>Musc</h1>
                <div className="App">
                    {/* <!-- Add a SearchBar component --> */}
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        {/* <!-- Add a SearchResults component -->
                        <!-- Add a Playlist component --> */}
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist 
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.saveToSpotify}
                        />
                    </div>
                </div>
            </div>
        );
    }
  
}

export default App;
