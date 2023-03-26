import { UserData } from '../../src/types';

export const testUser1: UserData = {
  givenName: 'John',
  middleName: 'Roe',
  familyName: 'Doe',
  dateOfBirth: new Date(0),
  email: 'test@test.com',
  countryOfOrigin: 'Afghanistan',
  sex: 'Male',
  isAdmin: false,
  image: 'https://i.imgur.com/hKQTObF.jpg',
};

export const testUser2: UserData = {
  givenName: 'Jane',
  middleName: undefined,
  familyName: 'Doe',
  dateOfBirth: new Date(0),
  email: 'dest@dest.com',
  countryOfOrigin: 'Albania',
  sex: 'Female',
  isAdmin: true,
  image: 'https://i.imgur.com/hKQTObF.jpg',
};
