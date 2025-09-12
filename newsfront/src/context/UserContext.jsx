import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage once on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("TIM412user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("the current user data:", storedUser);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("TIM412user", JSON.stringify(user));
    } else {
      localStorage.removeItem("TIM412user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};