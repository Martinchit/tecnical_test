import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderInputField } from './HeaderInputField';
import { HeaderButton } from './HeaderButton';

interface StockListHeaderProps {
  onSearchValueChangeHandler: (value: string) => void;
  onSearchButtonClickHandler: () => void;
  onClearButtonClickHandler: () => void;
  searchValue: string;
  buttonsDisable: boolean;
  isStocksFiltered: boolean;
}

export const StockListHeader: React.FC<StockListHeaderProps> = ({
  onClearButtonClickHandler,
  onSearchValueChangeHandler,
  onSearchButtonClickHandler,
  searchValue,
  buttonsDisable,
  isStocksFiltered,
}) => {
  return (
    <HeaderContainer>
      <HeaderInputField
        value={searchValue}
        onChange={({ target }) => onSearchValueChangeHandler(target.value)}
        placeholder="Search Stock by Stock Code"
      />
      <HeaderButton
        disabled={buttonsDisable}
        variant="primary"
        onClick={onSearchButtonClickHandler}
      >
        Search
      </HeaderButton>
      <HeaderButton
        disabled={buttonsDisable || !isStocksFiltered}
        variant="warning"
        onClick={onClearButtonClickHandler}
      >
        Clear
      </HeaderButton>
    </HeaderContainer>
  );
};
