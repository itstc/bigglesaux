import React from 'react';
import Table from './Table';
import Search from './Search';
import endpoints from './endpoints';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    fetch(endpoints.GET_ITEMS)
      .then(res => res.json())
      .then(data => {
        this.setState({data: data});
      });
  }


  updateData(value) {
    fetch(`${endpoints.GET_ITEMS}?q=${value}`)
      .then(res => res.json())
      .then(data => {
        this.setState({data: data});
      });
  }

  render() {
    return (
      <div>
        <Search onEnter={this.updateData}/>
        <Table
          data={this.state.data}
          headers={[{
              key: "name",
              text: "Name"
            },{
              key: "buyout",
              text: "Minimum Buyout"
            }]}
        />
      </div>
    )
  }
}
