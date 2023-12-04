const msalConfig = {
  auth: {
    clientId: "166d425f-f364-4e5a-8d09-226c163ab1db",
    authority: "https://login.microsoftonline.com/eda90c68-ca7d-46fd-a67c-bd617ce55f0b",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";

const loginRequest = {
  scopes: ["User.Read"],
};

export const msalInstanceConfig = {
  msalConfig,
  graphMeEndpoint,
  loginRequest,
};
