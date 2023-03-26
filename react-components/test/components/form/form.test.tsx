import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../../../src/components/form/form';
import { testUser1 } from '../../__mocks__/usersMocks';
import { UserDataErrors } from '../../../src/constants';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Form', () => {
  const mockAddCardFn = jest.fn();

  test('renders form with all inputs and submit button', () => {
    const { getByLabelText, getByText, getByRole } = render(<Form addCardFn={mockAddCardFn} />);
    expect(getByLabelText(/Given name/i)).toBeInTheDocument();
    expect(getByLabelText(/Middle name:/i)).toBeInTheDocument();
    expect(getByLabelText(/Family name:/i)).toBeInTheDocument();
    expect(getByLabelText(/Date of birth:/i)).toBeInTheDocument();
    expect(getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(getByLabelText(/Image:/i)).toBeInTheDocument();
    expect(
      getByLabelText(/I hereby consent to the processing of my personal data:/i)
    ).toBeInTheDocument();
    expect(getByText(/Admin rights/i)).toBeInTheDocument();
    expect(getByLabelText('Male')).toBeInTheDocument();
    expect(getByLabelText(/Female/i)).toBeInTheDocument();
    expect(getByLabelText(/Other/i)).toBeInTheDocument();
    expect(getByText(/Choose your country of origin.../i)).toBeInTheDocument();
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('shows error messages for required fields when submitting an empty form', async () => {
    const { getByText, getByRole } = render(<Form addCardFn={mockAddCardFn} />);
    await userEvent.click(getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(getByText(UserDataErrors.noGivenName)).toBeInTheDocument();
      expect(getByText(UserDataErrors.noFamilyName)).toBeInTheDocument();
      expect(getByText(UserDataErrors.noDateOfBirth)).toBeInTheDocument();
      expect(getByText(UserDataErrors.noEmail)).toBeInTheDocument();
      expect(getByText(UserDataErrors.noImage)).toBeInTheDocument();
      expect(getByText(UserDataErrors.noConsent)).toBeInTheDocument();
      expect(getByText(UserDataErrors.noCountry)).toBeInTheDocument();
      expect(getByText(UserDataErrors.noSex)).toBeInTheDocument();
    });
  });

  test('submits the form with valid data', async () => {
    global.URL.createObjectURL = jest.fn();
    const { getByLabelText, getByRole } = render(<Form addCardFn={mockAddCardFn} />);
    await userEvent.type(getByLabelText(/Given name/i), testUser1.givenName);
    await userEvent.type(getByLabelText(/Middle name:/i), testUser1.middleName as string);
    await userEvent.type(getByLabelText(/Family name:/i), testUser1.familyName);
    const date = testUser1.dateOfBirth.toISOString().substring(0, 10);
    await userEvent.type(getByLabelText(/Date of birth:/i), date);
    await userEvent.type(getByLabelText(/Email:/i), testUser1.email);
    await userEvent.selectOptions(getByLabelText(/Country of origin:/i), testUser1.countryOfOrigin);
    await userEvent.click(
      getByLabelText(/I hereby consent to the processing of my personal data:/i)
    );
    await userEvent.click(getByLabelText('Male'));
    const data = new Int8Array([
      82, 73, 70, 70, -42, 0, 0, 0, 87, 69, 66, 80, 86, 80, 56, 76, -55, 0, 0, 0, 47, -97, -64, 39,
      16, -43, -64, -83, -83, -67, 109, -77, -126, 58, 57, 119, 110, 115, 40, -67, -1, 100, -9, 0,
      -76, -35, -3, 58, -26, 63, 0, 106, -108, -50, 57, -80, 70, 39, 36, 72, -120, -2, -65, 107, 81,
      -48, -74, 13, 27, 74, -69, -65, -2, 79, -64, 124, 15, -53, 61, -98, -20, -90, -127, -114, 71,
      -64, 51, 20, 29, -40, 49, -14, -21, 120, 8, -68, 2, 94, -65, 40, 89, -76, 99, -28, -9, -122,
      -119, 11, 14, 92, 112, 96, 98, -57, 120, -17, -96, 46, -102, -8, -122, -33, -8, -122, 11, 38,
      118, -116, -24, 58, 38, 14, 76, 124, -64, -60, -73, -94, 3, 101, -63, -107, -62, -120, 110,
      -32, 55, 46, -104, 56, 42, 39, 62, 96, 98, 108, -105, 56, 42, 103, -27, -127, 82, -74, 97, 68,
      87, -10, 1, 101, -32, 3, 38, -82, 123, 76, 124, -60, -120, -18, 17, 31, -80, -52, 116, -27, 1,
      35, 58, 109, -8, 88, 84, 18, 31, -79, -106, 54, -100, 111, 96, 124, -90, 13, -91, 118, -101,
      -20, 124, 75, -58, 103, -38, 38, 59, -33, -39, -15, -39, -90, 65, 0,
    ]);
    const file = new File([data.buffer], '3F3F%3F_JE4_BE3.webp', {
      type: 'image/webp',
      lastModified: 1667932152786,
    });
    await userEvent.upload(getByLabelText(/Image:/i), file);

    await userEvent.click(getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(mockAddCardFn).toHaveBeenCalledTimes(1);
      expect(mockAddCardFn).toHaveBeenCalledWith(
        expect.objectContaining({ ...testUser1, image: undefined })
      );
    });
  });
});
