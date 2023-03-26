import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import UserCard from '../../../src/components/user-card/user-card';
import { testUser1, testUser2 } from '../../__mocks__/usersMocks';

describe('User card', () => {
  it("renders user's avatar", () => {
    const { getByAltText } = render(<UserCard user={testUser1} />);
    const image = getByAltText(`${testUser1.givenName}'s avatar`);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe(testUser1.image);
  });

  it('renders the user name', () => {
    const { getByText } = render(<UserCard user={testUser1} />);
    expect(
      getByText(
        `${testUser1.givenName} ${testUser1.middleName ? testUser1.middleName + ' ' : ''}${
          testUser1.familyName
        }`
      )
    ).toBeInTheDocument();
  });

  it("renders user's role", () => {
    {
      const { getByText } = render(<UserCard user={testUser1} />);
      expect(getByText(testUser1.isAdmin ? 'Admin' : 'User')).toBeInTheDocument();
    }
    cleanup();
    {
      const { getByText } = render(<UserCard user={testUser2} />);
      expect(getByText(testUser2.isAdmin ? 'Admin' : 'User')).toBeInTheDocument();
    }
  });

  it("renders user's date of birth", () => {
    const { getByText } = render(<UserCard user={testUser1} />);
    expect(getByText(new Date(testUser1.dateOfBirth).toLocaleDateString())).toBeInTheDocument();
  });

  it("renders user's country of origin", () => {
    const { getByText } = render(<UserCard user={testUser1} />);
    expect(getByText(testUser1.countryOfOrigin)).toBeInTheDocument();
  });

  it("renders user's sex", () => {
    const { getByText } = render(<UserCard user={testUser1} />);
    expect(getByText(testUser1.sex)).toBeInTheDocument();
  });
});
