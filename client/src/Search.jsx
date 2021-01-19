import React from 'react';
import styled from 'styled-components';

const StyledBar = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1.2em;
`

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      this.props.onEnter(e && e.target && e.target.value || '');
    }
  }

  render() {
    return <StyledBar type="search" placeholder="Search..." onKeyPress={this.handleEnter}/>
  }
}

export default Search;
