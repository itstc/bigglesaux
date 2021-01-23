import React from 'react';
import styled from 'styled-components';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ItemLink from './ItemLink';
import Search from './Search';

const GoldSpan = styled.span`
  color: gold;
`;
const SilverSpan = styled.span`
  color: white;
`;
const CopperSpan = styled.span`
  color: brown;
`;

const StickyHeadRow = styled(TableRow)`
  > th {
    top: 65px;
  }
`;

export default class AuctionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || []
    }

    this.convertNumberToCurrency = this.convertNumberToCurrency.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data || []
      });
    } 
  }

  convertNumberToCurrency(amt) {
    return (<div>
      <GoldSpan>{Math.floor(amt/10000)}G </GoldSpan>
      <SilverSpan>{Math.floor((amt%10000)/100)}S </SilverSpan>
      <CopperSpan>{Math.floor(amt%100)}C</CopperSpan>
    </div>);
  }

  updateData(value) {
    this.props.onUpdate(value);
  }

  render() {
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell colSpan={Object.keys(this.props.headers).length || 1}>
              <Search onEnter={this.updateData}/>
            </TableCell>
          </TableRow>
          <StickyHeadRow>
            {this.props.headers.map(({text}) => {
              return <TableCell key={`tableHeading-${text}`}>{text}</TableCell>
            })}
          </StickyHeadRow>
        </TableHead>
        <TableBody>
          {this.props.data.map((item, i) => {
            return <TableRow key={`tableRow-${item.id}`} hover>
              {
                this.props.headers.map(({key}) => {
                  let dataValue = this.props.data[i][key];
                  if (key == 'buyout') {
                    if (dataValue < 0) {
                      dataValue = '???';
                    } else {
                      dataValue = this.convertNumberToCurrency(dataValue); 
                    }
                  } else if (key == 'name') {
                    dataValue = <ItemLink color={item.color} itemName={item.name}/>;
                  }
                  return <TableCell key={`tableColumn-${item.id}-${key}`}>{
                    dataValue
                  }</TableCell>
                })
              }
            </TableRow>
          })}
        </TableBody>
      </Table>
    );
  }
}


