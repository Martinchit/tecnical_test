import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import HomePage from './pages/Home/HomePage';
import StockListPage from './pages/StockList/StockListPage';
import OrdersBasketPage from './pages/OrdersBasket/OrdersBasketPage';
import { NavBar } from './core/components/organisms/NavBar';
import { FlexBox } from './core/components/atoms/FlexBox';
import { RootStateType, ActionsType, actions } from './redux/store';

interface Props {
  loggedIn: boolean;
  logOutAction: () => void;
}

export const App: React.FC<Props> = ({ loggedIn, logOutAction }) => {
  return (
    <Router>
      <NavBar loggedIn={loggedIn} logOutAction={logOutAction} />
      <FlexBox margin="2% 10%" width="80%">
        {loggedIn ? (
          <Switch>
            <Route exact path="/stock_list" component={StockListPage} />
            <Route exact path="/orders_basket" component={OrdersBasketPage} />
            <Redirect from="*" to="/stock_list" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Redirect from="*" to="/" />
          </Switch>
        )}
      </FlexBox>
    </Router>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => ({
  logOutAction: () => dispatch(actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
