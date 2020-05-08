import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderButton } from './HeaderButton';

interface OrdersBasketHeaderProps {
  onRemoveButtonClickHandler: () => void;
  onBookButtonClickHandler: () => void;
  removeButtonDisable: boolean;
  bookButtonDisable: boolean;
}

export const OrdersBasketHeader: React.FC<OrdersBasketHeaderProps> = ({
  onRemoveButtonClickHandler,
  onBookButtonClickHandler,
  removeButtonDisable,
  bookButtonDisable,
}) => {
  return (
    <HeaderContainer>
      <HeaderButton
        disabled={removeButtonDisable}
        variant="primary"
        onClick={onRemoveButtonClickHandler}
      >
        Remove
      </HeaderButton>
      <HeaderButton
        disabled={bookButtonDisable}
        variant="primary"
        onClick={onBookButtonClickHandler}
      >
        Book
      </HeaderButton>
    </HeaderContainer>
  );
};
