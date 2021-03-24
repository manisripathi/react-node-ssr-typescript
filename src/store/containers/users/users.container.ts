import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Users from '../../components/users/users.component';
import * as UserActions from '../../actions/users.actions';

export interface StateFromProps {
  users?: string[];
}

export interface DispatchFromProps {
  setUsers?: (val: any) => void;
}

const mapStateToProps = (state: any) => ({
  users: state?.users || [],
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
  setUsers: (val: any) => dispatch(UserActions.setUsers(val)),
});

export default connect<StateFromProps, DispatchFromProps>(
  mapStateToProps, mapDispatchToProps,
)(Users);
