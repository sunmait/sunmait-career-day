// import authReducer from 'redux/modules/auth/reducer.ts';
// import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';
// import {ROLES} from 'redux/modules/auth/constants';
//
// describe('authReducer', () => {
//   test('Should return default state', () => {
//     const initAction = {type: '', payload: {}};
//     const defaultState = authReducer(undefined, initAction);
//
//     expect(defaultState).toEqual({user: null});
//   });
//
//   test('Should return correct role of employee and full name', () => {
//     const user = {
//       role: ROLES.UNIT_MANAGER,
//       fullName: 'Alex Denisenko',
//     };
//
//     const initAction = {type: AUTH_ACTIONS.LOGIN_AS_UNIT_MANAGER, payload: user};
//     const managerState = authReducer(undefined, initAction);
//
//     expect(managerState).toEqual({user: user});
//   });
//
//   test('Should return correct role of unit manager and full name', () => {
//     const user = {
//       role: ROLES.EMPLOYEE,
//       fullName: 'Alex Denisenko',
//     };
//
//     const initAction = {type: AUTH_ACTIONS.LOGIN_AS_EMPLOYEE, payload: user};
//     const managerState = authReducer(undefined, initAction);
//
//     expect(managerState).toEqual({user: user});
//   });
// });
