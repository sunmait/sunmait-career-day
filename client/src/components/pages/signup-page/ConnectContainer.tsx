import { connect } from 'react-redux';
import { signUp } from '../../../redux/modules/auth/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signUp,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
