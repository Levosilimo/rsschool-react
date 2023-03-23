import './form.css';
import React from 'react';
import { UserData, Sex, UserDataFormInputName, isCountry, ArrayElement } from '../../types';
import { COUNTRIES, emailRegex, UserDataFormInputs } from '../../constants';
import { getAge } from '../../utils';

type FormProps = {
  addCardFn: (user: UserData) => void;
};

export class Form extends React.Component<FormProps, Readonly<Record<string, never>>> {
  private readonly form: React.RefObject<HTMLFormElement>;
  private readonly inputGivenName: React.RefObject<HTMLInputElement>;
  private readonly inputMiddleName: React.RefObject<HTMLInputElement>;
  private readonly inputFamilyName: React.RefObject<HTMLInputElement>;
  private readonly inputDateOfBirth: React.RefObject<HTMLInputElement>;
  private readonly inputEmail: React.RefObject<HTMLInputElement>;
  private readonly inputConsent: React.RefObject<HTMLInputElement>;
  private readonly inputIsAdmin: React.RefObject<HTMLInputElement>;
  private readonly inputSex: React.RefObject<Array<HTMLInputElement>>;
  private readonly inputImage: React.RefObject<HTMLInputElement>;
  private readonly inputCountry: React.RefObject<HTMLSelectElement>;

  constructor(props: FormProps) {
    super(props);
    this.form = React.createRef<HTMLFormElement>();
    this.inputGivenName = React.createRef<HTMLInputElement>();
    this.inputMiddleName = React.createRef<HTMLInputElement>();
    this.inputFamilyName = React.createRef<HTMLInputElement>();
    this.inputDateOfBirth = React.createRef<HTMLInputElement>();
    this.inputEmail = React.createRef<HTMLInputElement>();
    this.inputConsent = React.createRef<HTMLInputElement>();
    this.inputIsAdmin = React.createRef<HTMLInputElement>();
    this.inputImage = React.createRef<HTMLInputElement>();
    this.inputCountry = React.createRef<HTMLSelectElement>();
    this.inputSex = React.createRef<Array<HTMLInputElement>>();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // RefObject storing an array of elements must be initialized with an empty array. Typescript typing does not allow to put initial value =(
    this.inputSex.current = [];
  }

  private getRef: (name: UserDataFormInputName) => React.RefObject<HTMLInputElement> = (
    name: UserDataFormInputName
  ) => {
    switch (name) {
      case 'Given name':
        return this.inputGivenName;
      case 'Middle name':
        return this.inputMiddleName;
      case 'Family name':
        return this.inputFamilyName;
      case 'Date of birth':
        return this.inputDateOfBirth;
      case 'Email':
        return this.inputEmail;
      case 'Image':
        return this.inputImage;
      case 'Consent':
        return this.inputConsent;
      default:
        throw new Error('corresponding ref not found');
    }
  };

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !this.inputGivenName.current ||
      !this.inputMiddleName.current ||
      !this.inputFamilyName.current ||
      !this.inputDateOfBirth.current ||
      !this.inputEmail.current ||
      !this.inputConsent.current ||
      !this.inputIsAdmin.current ||
      !this.inputSex.current ||
      !this.inputImage.current ||
      !this.inputCountry.current
    ) {
      throw new Error('Value was not assigned to one of the RefObjects');
    }
    let isFormValid = true;
    if (!this.inputGivenName.current.value.length) {
      isFormValid = false;
      this.inputGivenName.current.setCustomValidity('You must enter your given name');
    } else this.inputGivenName.current.setCustomValidity('');
    if (!this.inputFamilyName.current.value.length) {
      isFormValid = false;
      this.inputFamilyName.current.setCustomValidity('You must enter your family name');
    } else this.inputFamilyName.current.setCustomValidity('');
    const dateOfBirth = this.inputDateOfBirth.current.valueAsDate;
    if (!dateOfBirth) {
      isFormValid = false;
      this.inputDateOfBirth.current.setCustomValidity('You must enter your date of birth');
    } else if (getAge(dateOfBirth) < 18) {
      isFormValid = false;
      this.inputDateOfBirth.current.setCustomValidity('You must be 18 years or older.');
    } else this.inputDateOfBirth.current.setCustomValidity('');
    if (!this.inputEmail.current.value.length) {
      isFormValid = false;
      this.inputEmail.current.setCustomValidity('You must enter your email');
    } else if (!emailRegex.test(this.inputEmail.current.value)) {
      isFormValid = false;
      this.inputEmail.current.setCustomValidity('Email is not valid.');
    } else this.inputEmail.current.setCustomValidity('');
    if (!this.inputConsent.current.checked) {
      isFormValid = false;
      this.inputConsent.current.setCustomValidity('You must agree with terms of usage');
    } else this.inputConsent.current.setCustomValidity('');
    const country = this.inputCountry.current.value;
    if (!isCountry(country)) {
      isFormValid = false;
      this.inputCountry.current.setCustomValidity('You must enter your country of origin');
    } else this.inputCountry.current.setCustomValidity('');
    const file = this.inputImage.current.files?.item(0);
    if (!file || !file.type.includes('image')) {
      isFormValid = false;
      this.inputImage.current.setCustomValidity('You must upload an image');
    } else this.inputImage.current.setCustomValidity('');
    let sex: string | undefined;
    for (const el of this.inputSex.current) {
      if (el.checked) {
        sex = el.value;
        break;
      }
    }
    if (!sex) {
      isFormValid = false;
      this.inputSex.current[this.inputSex.current.length - 1].setCustomValidity('Select your sex');
    } else this.inputSex.current.forEach((el) => el.setCustomValidity(''));
    if (!isFormValid) {
      console.log('form is not valid');
      this.form.current?.reportValidity();
      return;
    }
    const url = URL.createObjectURL(file as File);
    const newUser: UserData = {
      givenName: this.inputGivenName.current.value,
      middleName: this.inputMiddleName.current.value,
      familyName: this.inputFamilyName.current.value,
      dateOfBirth: dateOfBirth as Date,
      countryOfOrigin: country as ArrayElement<typeof COUNTRIES>,
      isAdmin: this.inputIsAdmin.current.checked,
      image: url,
      sex: sex as Sex,
    };
    this.props.addCardFn(newUser);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form
        className={'card-creating-form'}
        ref={this.form}
        onSubmit={this.handleSubmit}
        noValidate={true}
      >
        {UserDataFormInputs.map((input) => (
          <label key={input.name}>
            {input.description ? input.description : input.name}:
            {input.attributes.required ? <span className={'remark'}>(Required)</span> : ''}
            <input name={input.name} {...input.attributes} ref={this.getRef(input.name)} />
          </label>
        ))}
        <label key={'Country of origin'}>
          <select name={'Country of origin'} ref={this.inputCountry}>
            <option value="">Choose your country of origin...</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        Admin rights
        <label className="switch">
          <input type="checkbox" name="Admin" ref={this.inputIsAdmin} />
          <span className="slider"></span>
        </label>
        <fieldset>
          Sex:<span className={'remark'}>(Required)</span>
          <div>
            {Array.from(new Set(['Male', 'Female', 'Other'])).map((sex) => (
              <label key={sex}>
                {sex}
                <input
                  type="radio"
                  name="Sex"
                  defaultValue={sex}
                  ref={(el) => {
                    if (this.inputSex.current && el) {
                      this.inputSex.current[this.inputSex.current.length] = el;
                    }
                  }}
                />
              </label>
            ))}
          </div>
        </fieldset>
        <button type={'submit'}>Submit</button>
      </form>
    );
  }
}
