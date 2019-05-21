import { createSelector } from 'reselect';
import { IStore } from '../../rootReducer';

export const getFreeEmployeesSelector = createSelector(
  [(state: IStore) => state.employees.freeEmployees],
  freeEmployees => freeEmployees,
);
