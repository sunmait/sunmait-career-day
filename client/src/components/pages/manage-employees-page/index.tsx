import { ManageList } from './ManageList'
import { ConnectContainer } from './ManageListContainer';
import { StylesContainer } from './StylesContainer';


export const ManageEmployeesPage = ConnectContainer(StylesContainer(ManageList));


