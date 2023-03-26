import './form.css';
import * as React from 'react';
import { UserData, Sex, UserDataFormInputName, isCountry, ArrayElement } from '../../types';
import { COUNTRIES, emailRegex, UserDataErrors, UserDataFormInputs } from '../../constants';
import { getAge, isStringUppercase } from '../../utils';

type FormProps = {
  addCardFn: (user: UserData) => void;
};

type FormState = {
  givenNameInputError: string;
  middleNameInputError: string;
  familyNameInputError: string;
  dateOfBirthInputError: string;
  emailInputError: string;
  consentInputError: string;
  isAdminInputError: string;
  sexInputError: string;
  imageInputError: string;
  countryInputError: string;
};

export default class Form extends React.Component<FormProps, FormState> {
  state: FormState = {
    givenNameInputError: '',
    middleNameInputError: '',
    familyNameInputError: '',
    dateOfBirthInputError: '',
    emailInputError: '',
    consentInputError: '',
    isAdminInputError: '',
    sexInputError: '',
    imageInputError: '',
    countryInputError: '',
  };
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
        throw new Error('Corresponding ref not found');
    }
  };

  private getError: (name: UserDataFormInputName) => JSX.Element = (
    name: UserDataFormInputName
  ) => {
    switch (name) {
      case 'Given name':
        return <span className={'input-error'}>{this.state.givenNameInputError}</span>;
      case 'Middle name':
        return <span className={'input-error'}>{this.state.middleNameInputError}</span>;
      case 'Family name':
        return <span className={'input-error'}>{this.state.familyNameInputError}</span>;
      case 'Date of birth':
        return <span className={'input-error'}>{this.state.dateOfBirthInputError}</span>;
      case 'Email':
        return <span className={'input-error'}>{this.state.emailInputError}</span>;
      case 'Image':
        return <span className={'input-error'}>{this.state.imageInputError}</span>;
      case 'Consent':
        return <span className={'input-error'}>{this.state.consentInputError}</span>;
      default:
        throw new Error('Corresponding error not found');
    }
  };

  private checkRefs: () => void = () => {
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
  };

  private validateInputs: () => boolean = () => {
    this.checkRefs();
    const firstCharOfMiddleName = this.inputMiddleName.current?.value.at(0);
    const dateOfBirth = this.inputDateOfBirth.current?.valueAsDate;
    const country = this.inputCountry.current?.value;
    const file = this.inputImage.current?.files?.item(0);
    if (!this.inputGivenName.current?.value.length)
      this.inputGivenName.current?.setCustomValidity(UserDataErrors.noGivenName);
    else if (!isStringUppercase(this.inputGivenName.current.value.at(0)))
      this.inputGivenName.current.setCustomValidity(UserDataErrors.notUpperCaseGivenName);
    else this.inputGivenName.current.setCustomValidity('');
    if (!this.inputFamilyName.current?.value.length)
      this.inputFamilyName.current?.setCustomValidity(UserDataErrors.noFamilyName);
    else if (!isStringUppercase(this.inputFamilyName.current.value.at(0)))
      this.inputFamilyName.current.setCustomValidity(UserDataErrors.notUpperCaseFamilyName);
    else this.inputFamilyName.current.setCustomValidity('');
    if (firstCharOfMiddleName && !isStringUppercase(firstCharOfMiddleName))
      this.inputMiddleName.current?.setCustomValidity(UserDataErrors.notUpperCaseMiddleName);
    else this.inputMiddleName.current?.setCustomValidity('');
    if (!dateOfBirth)
      this.inputDateOfBirth.current?.setCustomValidity(UserDataErrors.noDateOfBirth);
    else if (getAge(dateOfBirth) < 18)
      this.inputDateOfBirth.current?.setCustomValidity(UserDataErrors.minorDateOfBirth);
    else this.inputDateOfBirth.current?.setCustomValidity('');
    if (!this.inputEmail.current?.value.length)
      this.inputEmail.current?.setCustomValidity(UserDataErrors.noEmail);
    else if (!emailRegex.test(this.inputEmail.current?.value))
      this.inputEmail.current?.setCustomValidity(UserDataErrors.invalidEmail);
    else this.inputEmail.current?.setCustomValidity('');
    if (!this.inputConsent.current?.checked)
      this.inputConsent.current?.setCustomValidity(UserDataErrors.noConsent);
    else this.inputConsent.current?.setCustomValidity('');
    if (!isCountry(country)) this.inputCountry.current?.setCustomValidity(UserDataErrors.noCountry);
    else this.inputCountry.current?.setCustomValidity('');
    if (!file || !file.type.includes('image'))
      this.inputImage.current?.setCustomValidity(UserDataErrors.noImage);
    else this.inputImage.current?.setCustomValidity('');
    return this.form.current?.checkValidity() ?? false;
  };

  private getSex: () => string | undefined = () => {
    let sex: string | undefined;
    if (this.inputSex.current?.length) {
      for (const el of this.inputSex.current) {
        if (el.checked) {
          sex = el.value;
          break;
        }
      }
      if (!sex) {
        this.inputSex.current[this.inputSex.current?.length - 1].setCustomValidity(
          UserDataErrors.noSex
        );
      } else {
        this.inputSex.current?.forEach((el) => el.setCustomValidity(''));
      }
    }
    return sex;
  };

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.inputSex.current) return;
    const file = this.inputImage.current?.files?.item(0);
    const dateOfBirth = this.inputDateOfBirth.current?.valueAsDate;
    const sex = this.getSex();
    const isFormValid = this.validateInputs();
    this.setState({
      givenNameInputError: this.inputGivenName.current?.validationMessage ?? '',
      middleNameInputError: this.inputMiddleName.current?.validationMessage ?? '',
      familyNameInputError: this.inputFamilyName.current?.validationMessage ?? '',
      dateOfBirthInputError: this.inputDateOfBirth.current?.validationMessage ?? '',
      emailInputError: this.inputEmail.current?.validationMessage ?? '',
      countryInputError: this.inputCountry.current?.validationMessage ?? '',
      consentInputError: this.inputConsent.current?.validationMessage ?? '',
      imageInputError: this.inputImage.current?.validationMessage ?? '',
      sexInputError:
        this.inputSex.current[this.inputSex.current?.length - 1].validationMessage ?? '',
    });
    this.form.current?.reportValidity();
    if (!isFormValid) return;
    const url = URL.createObjectURL(file as File);
    const newUser: UserData = {
      givenName: this.inputGivenName.current?.value as string,
      middleName: this.inputMiddleName.current?.value as string,
      familyName: this.inputFamilyName.current?.value as string,
      dateOfBirth: dateOfBirth as Date,
      email: this.inputEmail.current?.value as string,
      countryOfOrigin: this.inputCountry.current?.value as ArrayElement<typeof COUNTRIES>,
      isAdmin: this.inputIsAdmin.current?.checked as boolean,
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
            {input.description ?? input.name}:
            {input.attributes.required ? <span className={'remark'}>(Required)</span> : ''}
            <input name={input.name} {...input.attributes} ref={this.getRef(input.name)} />
            {this.getError(input.name)}
          </label>
        ))}
        <label key={'Country of origin'}>
          Country of origin:
          <select name={'Country of origin'} ref={this.inputCountry}>
            <option value="">Choose your country of origin...</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <span className={'input-error'}>{this.state.countryInputError}</span>
        </label>
        Admin rights
        <label className="switch">
          <input type="checkbox" name="Admin" ref={this.inputIsAdmin} />
          <span className="slider"></span>
          <span className={'input-error'}>{this.state.isAdminInputError}</span>
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
          <span className={'input-error'}>{this.state.sexInputError}</span>
        </fieldset>
        <button type={'submit'}>Submit</button>
      </form>
    );
  }
}
