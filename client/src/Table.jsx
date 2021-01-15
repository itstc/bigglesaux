import React from 'react';
import styled from 'styled-components';

import itemInfo from '../data/itemInfo.json';

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border: 1px solid #eee;
  font-family: 'Arial', san-serif;
`;

const StyledRow = styled.tr`
`;

const StyledCell = styled.td`
  border: 1px solid #eee;
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
    <GoldSpan>{Math.floor(amt/1000)}G </GoldSpan>
    <SilverSpan>{Math.floor((amt%1000)/100)}S </SilverSpan>
    <CopperSpan>{Math.floor(amt%100)}C</CopperSpan>
  </div>);
}

export default ({data, headers}) => {
  return (
    <StyledTable>
      <thead>
        <StyledRow>
          {headers.map((item) => {
            return <th key={`tableHeading-${item}`}>{item}</th>
          })}
        </StyledRow>
      </thead>
      <tbody>
        {data.map((item, i) => {
          return <StyledRow key={`tableRow-${item['itemId']}`}>
            {
              headers.map((hk) => {
                let dataValue = data[i][hk];
                if (hk == 'minBuyout') {
                  if (!dataValue) {
                    dataValue = '???';
                  } else {
                    dataValue = convertNumberToCurrency(dataValue); 
                  }
                } else if (hk == 'itemId') {
                  let itemId = data[i][hk].split(':');
                  dataValue = itemInfo[itemId[0]]['itemName'];
                }
                return <StyledCell key={`tableColumn-${item['itemId']}-${hk}`}>{dataValue}</StyledCell>
              })
            }
          </StyledRow>
        })}
      </tbody>
    </StyledTable>
  );
}
