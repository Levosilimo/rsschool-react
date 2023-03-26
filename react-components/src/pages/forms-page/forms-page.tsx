import './forms-page.css';
import React from 'react';
import { LocationContext, LocationContextValue } from '../../contexts/location-context';
import Form from '../../components/form/form';
import { UserData } from '../../types';
import UserCard from '../../components/user-card/user-card';

type FormsPageState = {
  users: Array<UserData>;
};

class FormsPage extends React.Component<Readonly<Record<string, never>>, FormsPageState> {
  state: FormsPageState = { users: [] };
  componentDidMount() {
    (this.context as LocationContextValue).setRoot('Form');
  }

  private addUser = (user: UserData) => {
    this.setState((prevState) => ({
      users: [...prevState.users, user],
    }));
  };

  render() {
    return (
      <div className="page form-page">
        <h1>{(this.context as LocationContextValue).route}</h1>
        <Form addCardFn={this.addUser} />
        <div className="cards-wrapper">
          {this.state.users.map((user) => (
            <UserCard user={user} key={user.givenName + user?.middleName + user.familyName} />
          ))}
        </div>
      </div>
    );
  }
}
FormsPage.contextType = LocationContext;
export default FormsPage;
