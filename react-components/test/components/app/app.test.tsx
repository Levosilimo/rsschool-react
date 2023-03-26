import * as React from 'react';
import { render } from '@testing-library/react';
import App from '../../../src/components/app/app';
import { MemoryRouter } from 'react-router-dom';

describe('App component', () => {
  it('renders the main page when the route is set to "Main"', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(container.getElementsByClassName('not-found-page').length).toBe(0);
    expect(container.getElementsByClassName('main-page').length).toBe(1);
    expect(container.getElementsByClassName('form-page').length).toBe(0);
    expect(container.getElementsByClassName('about-us-page').length).toBe(0);
  });

  it('renders the about us page when the route is set to "About Us"', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about-us']}>
        <App />
      </MemoryRouter>
    );

    expect(container.getElementsByClassName('not-found-page').length).toBe(0);
    expect(container.getElementsByClassName('main-page').length).toBe(0);
    expect(container.getElementsByClassName('form-page').length).toBe(0);
    expect(container.getElementsByClassName('about-us-page').length).toBe(1);
  });

  it('renders the form page when the route is set to "Form"', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/form']}>
        <App />
      </MemoryRouter>
    );

    expect(container.getElementsByClassName('not-found-page').length).toBe(0);
    expect(container.getElementsByClassName('main-page').length).toBe(0);
    expect(container.getElementsByClassName('form-page').length).toBe(1);
    expect(container.getElementsByClassName('about-us-page').length).toBe(0);
  });

  it('renders the not found page when the route is not recognized', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/404']}>
        <App />
      </MemoryRouter>
    );

    expect(container.getElementsByClassName('not-found-page').length).toBe(1);
    expect(container.getElementsByClassName('main-page').length).toBe(0);
    expect(container.getElementsByClassName('form-page').length).toBe(0);
    expect(container.getElementsByClassName('about-us-page').length).toBe(0);
  });
});
