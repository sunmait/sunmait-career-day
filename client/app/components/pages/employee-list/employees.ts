export interface IEmployee {
  id: number;
  avatar: string;
  fullName: string;
  isActive: boolean;
}

interface IEmployeesArray extends Array<IEmployee> {}

export const employees: IEmployeesArray = [
  {
    id: 1,
    avatar: 'http://penoksal.ru/images/imgcont16.png',
    fullName: 'A',
    isActive: true,
  },
  {
    id: 2,
    avatar: 'http://penoksal.ru/images/imgcont16.png',
    fullName: 'B',
    isActive: true,
  },
  {
    id: 3,
    avatar: 'http://penoksal.ru/images/imgcont16.png',
    fullName: 'C',
    isActive: false,
  },
  {
    id: 4,
    avatar: 'http://penoksal.ru/images/imgcont16.png',
    fullName: 'D',
    isActive: false,
  },
  {
    id: 5,
    avatar: 'http://penoksal.ru/images/imgcont16.png',
    fullName: 'E',
    isActive: true,
  },
];
