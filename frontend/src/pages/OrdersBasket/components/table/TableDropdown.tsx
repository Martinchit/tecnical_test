import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { TableDropdownButton } from './TableDropdownButton';
import { OrderExecutionMode } from '../../../../types/types';
import { ExecutionMode } from '../../../../core/lib/utils/executionMode';

interface TableDropdownProps {
  title: OrderExecutionMode | undefined;
  dropdownID: string;
  onSelect: (id: number) => void;
  disabled: boolean;
}

export const TableDropdown: React.FC<TableDropdownProps> = ({
  title,
  dropdownID,
  onSelect,
  disabled,
}) => (
  <Dropdown onSelect={(id: string) => onSelect(Number(id))}>
    <TableDropdownButton
      className="pull-right"
      disabled={disabled}
      variant="light"
      id={dropdownID}
    >
      {title}
    </TableDropdownButton>
    <Dropdown.Menu>
      {ExecutionMode.map((option, i) => (
        <Dropdown.Item eventKey={`${i}`} key={option}>
          {option}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);
