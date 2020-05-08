import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { TableContainer } from './TableContainer';
import { TableBadge } from './TableBadge';
import { TableDropdown } from './TableDropdown';
import { TableInputField } from './TableInputField';
import { FlexBox } from '../../../../core/components/atoms/FlexBox';
import { TableErrorContainer } from '../../../../core/components/atoms/TableErrorContainer';
import { TableCell } from '../../../../core/components/atoms/TableCell';
import { TableHead } from '../../../../core/components/atoms/TableHead';
import { Alert } from '../../../../core/components/atoms/Alert';
import { StockOrder } from '../../../../types/types';

interface OrdersBasketTableProps {
  orders: StockOrder[];
  onSelectCheckClickHandler: (orderId: string, selected: boolean) => void;
  onExecutionModeSelectHandler: (stockIdx: number, modeIdx: number) => void;
  onOrderPriceChangeHandler: (stockIdx: number, orderPrice: string) => void;
  onShareAmountChangeHandler: (stockIdx: number, shareAmount: string) => void;
  onCancelButtonClickHandler: (stockIdx: number) => void;
}

export const OrdersBasketTable: React.FC<OrdersBasketTableProps> = ({
  onSelectCheckClickHandler,
  onExecutionModeSelectHandler,
  onOrderPriceChangeHandler,
  onShareAmountChangeHandler,
  onCancelButtonClickHandler,
  orders,
}) => {
  return (
    <TableContainer responsive>
      <thead>
        <tr>
          <TableHead />
          <TableHead>Status</TableHead>
          <TableHead>Side</TableHead>
          <TableHead>Stock Code</TableHead>
          <TableHead>Execution Code</TableHead>
          <TableHead>Order Price</TableHead>
          <TableHead>Amount &#40;Shares&#41;</TableHead>
        </tr>
      </thead>
      <tbody>
        {orders.map(
          (
            {
              id,
              side,
              bloombergTickerLocal,
              status,
              executionMode,
              currency,
              orderPrice,
              shareAmount,
              error,
              selected,
              orderId,
            },
            i
          ) => {
            const disabledOnMarketMode =
              executionMode !== undefined && executionMode === 'Market';
            const disabledOnSubmittedCondition =
              status !== 'Not Ready' && status !== 'Ready';
            return (
              <React.Fragment key={orderId}>
                <tr>
                  <TableCell>
                    <Form.Check
                      checked={selected}
                      onChange={() => onSelectCheckClickHandler(orderId, selected)}
                    />
                  </TableCell>
                  <TableCell>
                    <TableBadge orderStatus={status} />
                  </TableCell>
                  <TableCell>{side}</TableCell>
                  <TableCell>{bloombergTickerLocal}</TableCell>
                  <TableCell>
                    <TableDropdown
                      dropdownID={`${id}_${side}_mode_dropdown`}
                      title={executionMode}
                      disabled={disabledOnSubmittedCondition}
                      onSelect={(optionId) =>
                        onExecutionModeSelectHandler(i, Number(optionId))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <InputGroup>
                      <TableInputField
                        disabled={
                          disabledOnMarketMode || disabledOnSubmittedCondition
                        }
                        value={orderPrice || ''}
                        type="number"
                        aria-describedby={`${id}_${side}_input_append`}
                        onChange={({ target }) =>
                          onOrderPriceChangeHandler(i, target.value)
                        }
                      />
                      <InputGroup.Append id={`${id}_${side}_input_append`}>
                        <InputGroup.Text>{currency}</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </TableCell>
                  <TableCell>
                    <TableInputField
                      disabled={disabledOnSubmittedCondition}
                      value={shareAmount || ''}
                      type="number"
                      onChange={({ target }) =>
                        onShareAmountChangeHandler(i, target.value)
                      }
                    />
                  </TableCell>
                </tr>
                {error ? (
                  <tr>
                    <TableErrorContainer colSpan={7}>
                      <Alert variant="danger">
                        <FlexBox justifyContent="space-between">
                          {`Error: ${error}`}
                          <Button
                            variant="light"
                            onClick={() => onCancelButtonClickHandler(i)}
                          >
                            Close
                          </Button>
                        </FlexBox>
                      </Alert>
                    </TableErrorContainer>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          }
        )}
      </tbody>
    </TableContainer>
  );
};
