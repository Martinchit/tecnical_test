import React from 'react';
import styled from 'styled-components';
import { Badge as B } from 'react-bootstrap';
import { OrderStatus } from '../../../../types/types';

interface TableBadge {
  orderStatus: OrderStatus;
}

export const TableBadge: React.FC<TableBadge> = ({ orderStatus }) => {
  const getVariant = () => {
    switch (orderStatus) {
      case 'Booked':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Rejected':
        return 'danger';
      case 'Ready':
        return 'primary';
      default:
        return 'warning';
    }
  };
  return <Badge variant={getVariant()}>{orderStatus}</Badge>;
};

const Badge = styled(B)`
  width: 80%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
