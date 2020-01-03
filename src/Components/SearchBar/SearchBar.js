import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.onSearch(this.state.term)
        }
    }

    search() {
        this.props.onSearch(this.state.term)
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value,
        })
    }

    render() {
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyUp={this.handleEnter}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,

}

export default SearchBar;