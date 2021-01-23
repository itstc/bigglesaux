import React from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';

const StyledSearch = styled(TextField)`
  width: 100%;
`;

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
    return <StyledSearch placeholder="Search..." onKeyPress={this.handleEnter}/>
  }
}

export default Search;
