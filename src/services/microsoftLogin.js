import React, { useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { msalInstanceConfig } from "./msalInstanceConfig";
import { useDispatch } from "react-redux";
import { loginSuccess, setMicrosoftAuthGraphData } from "./authReducer";
import { callMsGraph } from "./microsoftGraph";

function MicrosoftLogin() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      instance
        .acquireTokenSilent({
          ...msalInstanceConfig.loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            dispatch(setMicrosoftAuthGraphData(response))
          );
          dispatch(loginSuccess(response.account));
        })
        .catch((e) => {
          console.error("ERROR RESPONSE ???", e);
          console.error(e);
        });
    }
  }, [accounts, dispatch, instance, isAuthenticated]);

  const handleLogin = () => {
    instance.loginRedirect(msalInstanceConfig.loginRequest).catch((e) => {
      console.error('Login Error ??? ', e);
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign In with Microsoft</button>
    </div>
  );
}

export default MicrosoftLogin;
