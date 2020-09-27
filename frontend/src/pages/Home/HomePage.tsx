import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionsType, RootStateType, actions } from '../../redux/store';
import { Home } from './Home';

interface OwnProps {}

const mapStateToProps = (state: RootStateType) => ({
  authError: state.auth.error,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ActionsType>,
  props: OwnProps
) => ({
  logInAction: (email, password) => dispatch(actions.logIn(email, password)),
  signUpAction: (email, password) => dispatch(actions.signUp(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
