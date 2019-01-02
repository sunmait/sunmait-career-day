import EmployeeList from './EmployeeList';
import ConnectContainer from './EmployeeListContainer';
import StylesContainer from './StylesContainer';

export default ConnectContainer(StylesContainer(EmployeeList));
