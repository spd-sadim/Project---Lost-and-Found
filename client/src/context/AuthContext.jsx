import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "loginStart":
      return {
        user: null,
        loading: true,
        error: null,
      };

    case "signUpSuccess":
      return {
        user: null,
        loading: false,
        error: null,
      };

    case "loginSuccess":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case "loginFailure":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };

    case "logout":
      return {
        user: null,
        loading: false,
        error: null,
      };

      case "updateProfileSuccess":
        return {
          ...state,
          user: action.payload,
        };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user])
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
