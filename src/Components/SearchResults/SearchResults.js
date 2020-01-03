import React from 'react';
import './SearchResults.css';
import PropTypes from 'prop-types';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        let isRemoval = false;
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                {/* <!-- Add a TrackList component --> */}
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={isRemoval}/>
                </div>
        )
    }
}

SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,

}

export default SearchResults;