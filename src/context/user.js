import React from 'react';

export const UserContext = React.createContext({});

export function withUser(Component) {
  return function DecoratedComponent(props) {
    return (
      <UserContext.Consumer>
        {user => <Component {...props} currentUser={user} />}
      </UserContext.Consumer>
    );
  };
} 