import * as React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import MainPage from '../../../src/pages/main-page/main-page';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('MainPage', () => {
  it('should render the page title', () => {
    const { getByText } = render(<MainPage />);
    expect(getByText('Main')).toBeInTheDocument();
  });

  it('should update the search value when the input changes', () => {
    const { getByPlaceholderText } = render(<MainPage />);
    const input = getByPlaceholderText('Search here') as HTMLInputElement;
    const value = 'new search value';
    fireEvent.change(input, {
      target: { value },
    });
    expect(input.value).toEqual(value);
  });

  it('should save the search value to localStorage when the component unmounts', () => {
    const setItemSpy = jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    const { getByPlaceholderText } = render(<MainPage />);
    const value = 'test';
    const input = getByPlaceholderText('Search here') as HTMLInputElement;
    fireEvent.change(input, {
      target: { value },
    });
    expect(setItemSpy).not.toHaveBeenCalledWith('search', value);
    cleanup();
    expect(setItemSpy).toHaveBeenCalledWith('search', value);
  });

  it('should load the search value from localStorage on mount', () => {
    const searchValue = 'test';
    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem').mockReturnValue(searchValue);
    const { getByPlaceholderText } = render(<MainPage />);
    expect((getByPlaceholderText('Search here') as HTMLInputElement).value).toBe(searchValue);
  });
});
