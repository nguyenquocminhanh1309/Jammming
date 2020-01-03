import React from 'react';
import './Track.css';
import PropTypes from 'prop-types';

const styles = {
    cursor: "pointer",
}

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        
    }

    addTrack() {
        this.props.onAdd(this.props.track);
        
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    
    handleClickTrack(id) {
        window.open('https://open.spotify.com/track/' + id, '_blank')
    }

    handleClickArtist(id) {
        window.open('https://open.spotify.com/artist/' + id, '_blank')
    }

    handleClickAlbum(id) {
        window.open('https://open.spotify.com/album/' + id, '_blank')
    }   

    renderAction() {
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>   //playList
        }
        else {  
            return <button className="Track-action" onClick={this.addTrack}>+</button>      //searchResult
        }
        
    }
    
    render() {
        
            return (
                <div className="Track">                    
                    <div className="Track-information">
                        <h3 style={styles} onClick={this.handleClickTrack.bind(this, this.props.track.id)}>{this.props.track.name}</h3>
                        <p><span onClick={this.handleClickArtist.bind(this, this.props.track.artist_id)} style={styles}>{this.props.track.artist}</span> | <span onClick={this.handleClickAlbum.bind(this, this.props.track.album_id)} style={styles}>{this.props.track.album}</span></p>
                    </div>                    
                    {this.renderAction()}
                </div>
            )
    }
}

Track.propTypes = {
    track: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isRemoval: PropTypes.bool.isRequired,
    

}

export default Track;
