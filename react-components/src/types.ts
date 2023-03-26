import { InputHTMLAttributes } from 'react';
import { COUNTRIES } from './constants';

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function isCountry(a: unknown): a is ArrayElement<typeof COUNTRIES> {
  return COUNTRIES.indexOf(a as ArrayElement<typeof COUNTRIES>) != -1;
}

export interface IProductsResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IResponse {
  limit: number;
  products: IProductsResponse[];
  skip: number;
  total: number;
}

export type Sex = 'Female' | 'Male' | 'Other';

export interface UserData {
  givenName: string;
  middleName?: string;
  familyName: string;
  email: string;
  dateOfBirth: Date;
  countryOfOrigin: ArrayElement<typeof COUNTRIES>;
  sex: Sex;
  isAdmin: boolean;
  image?: string;
}

export type UserDataFormInputName =
  | 'Given name'
  | 'Middle name'
  | 'Family name'
  | 'Date of birth'
  | 'Email'
  | 'Image'
  | 'Consent';

export interface UserDataFormInput {
  name: UserDataFormInputName;
  description?: string;
  attributes: InputHTMLAttributes<HTMLInputElement>;
}
