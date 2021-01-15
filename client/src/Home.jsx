import React from 'react';
import mockData from '../data/result.json'; 
import Table from './Table';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.setState({data: mockData});
  }

  render() {
    return <Table data={this.state.data} headers={["itemId", "minBuyout"]}/>;
  }
}
