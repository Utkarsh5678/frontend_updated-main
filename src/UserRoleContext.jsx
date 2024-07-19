import { createContext, useState } from 'react';

const UserRoleContext = createContext();

const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export { UserRoleProvider, UserRoleContext };