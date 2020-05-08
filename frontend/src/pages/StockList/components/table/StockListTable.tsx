import React from 'react';
import { Table } from 'react-bootstrap';
import { TableButton } from './TableButton';
import { TableErrorContainer } from '../../../../core/components/atoms/TableErrorContainer';
import { TableCell } from '../../../../core/components/atoms/TableCell';
import { TableHead } from '../../../../core/components/atoms/TableHead';
import { Alert } from '../../../../core/components/atoms/Alert';
import { OrderSide, Stock, StockListAlert } from '../../../../types/types';

interface StockListTableProps {
  alert: StockListAlert;
  stocks: Stock[];
  onActionButtonClickHandler: (action: OrderSide, idx: number) => void;
}

export const StockListTable: React.FC<StockListTableProps> = ({
  alert,
  stocks,
  onActionButtonClickHandler,
}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <TableHead>Stock Code</TableHead>
          <TableHead>Market Price</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        {stocks.map(({ id, currency, price, bloombergTickerLocal }, idx) => (
          <React.Fragment key={bloombergTickerLocal}>
            <tr>
              <TableCell>{bloombergTickerLocal}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{currency}</TableCell>
              <TableCell>
                <TableButton
                  variant="primary"
                  onClick={() => onActionButtonClickHandler('Buy', idx)}
                >
                  Buy
                </TableButton>
                <TableButton
                  variant="secondary"
                  onClick={() => onActionButtonClickHandler('Sell', idx)}
                >
                  Sell
                </TableButton>
              </TableCell>
            </tr>
            {alert[id] ? (
              <tr>
                <TableErrorContainer colSpan={4}>
                  <Alert variant="success">
                    {`${alert[id]} order for ${bloombergTickerLocal} is added to the Orders Basket`}
                  </Alert>
                </TableErrorContainer>
              </tr>
            ) : null}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};
