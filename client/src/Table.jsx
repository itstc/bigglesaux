import React from 'react';
import styled from 'styled-components';

import ItemLink from './ItemLink';

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border: 1px solid #eee;
  font-family: 'Arial', san-serif;
  background: #323232;
  border-collapse: collapse;
`;

const StyledRow = styled.tr`
`;

const StyledHeading = styled.th`
  padding: 4px;
  color: white;
  border: 1px solid #646464;
`;

const StyledCell = styled.td`
  width: 50%;
  padding: 4px;
  border: 1px solid #646464;
  color: white;
`

const GoldSpan = styled.span`
  color: gold;
`;
const SilverSpan = styled.span`
  color: silver;
`;
const CopperSpan = styled.span`
  color: brown;
`;

const convertNumberToCurrency = (amt) => {
  return (<div>
    <GoldSpan>{Math.floor(amt/10000)}G </GoldSpan>
    <SilverSpan>{Math.floor((amt%10000)/100)}S </SilverSpan>
    <CopperSpan>{Math.floor(amt%100)}C</CopperSpan>
  </div>);
}

export default ({data, headers}) => {
  return (
    <StyledTable>
      <thead>
        <StyledRow>
          {headers.map(({text}) => {
            return <StyledHeading key={`tableHeading-${text}`}>{text}</StyledHeading>
          })}
        </StyledRow>
      </thead>
      <tbody>
        {data.map((item, i) => {
          return <StyledRow key={`tableRow-${item.id}`}>
            {
              headers.map(({key}) => {
                let dataValue = data[i][key];
                if (key == 'buyout') {
                  if (dataValue < 0) {
                    dataValue = '???';
                  } else {
                    dataValue = convertNumberToCurrency(dataValue); 
                  }
                } else if (key == 'name') {
                  dataValue = <ItemLink color={item.color} itemName={item.name}/>;
                }
                return <StyledCell key={`tableColumn-${item.id}-${key}`}>{
                  dataValue
                }</StyledCell>
              })
            }
          </StyledRow>
        })}
      </tbody>
    </StyledTable>
  );
}
