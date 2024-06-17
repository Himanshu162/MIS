import "babel-polyfill";
import * as Keycloak from "keycloak-js";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./_index.scss";
import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import jwtAuthService from "./app/services/jwtAuthService";

const keycloakConfig = {
  url: window__ENV__.REACT_APP_KEYCLOAK_URL,
  realm: window__ENV__.REACT_APP_KEYCLOAK_REALM,
  clientId: window__ENV__.REACT_APP_KEYCLOAK_CLIENTID,
};
const keycloak = new Keycloak(keycloakConfig);

// ReactDOM.render(<App />, document.getElementById("root"));

keycloak
  .init({ onLoad: "login-required" })
  .success((authenticated) => {
    if (!authenticated) {
      window.location.reload();
    } else {
      keycloak.loadUserInfo().then((resp) => {
        sessionStorage.setItem("jwt_token", keycloak.token);
        sessionStorage.setItem("userInfo", JSON.stringify(resp));
        let user = JSON.stringify(resp);
        sessionStorage.setItem("username", resp.username);
        sessionStorage.setItem("role", resp.role);
        let val = jwtAuthService.loginWithEmailAndPassword(
          user,
          keycloak.token
        );
        val.then((resp) => {
          ReactDOM.render(<App />, document.getElementById("root"));
        });
      });
    }

    sessionStorage.setItem("jwt_token", keycloak.token);
    sessionStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
      keycloak
        .updateToken(10000)
        .success((refreshed) => {
          if (refreshed) {
            console.debug("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .error(() => {
          console.error("Failed to refresh token");
        });
    }, 80000);
  })
  .error(() => {
    console.error("Authenticated Failed");
  });
