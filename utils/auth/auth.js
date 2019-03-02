import auth0 from 'auth0-js';
import cookie from 'cookie';

import { AUTH_CONFIG } from './auth0-variables';
import redirect from '../../helpers/redirect';
import { setCookies, removeCookies} from '../../helpers/helpers';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  // Used for Auth0 callback url. Get user info from location.hash
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        redirect({}, '/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    const cookies = {
      'auth0_idToken': this.idToken,
      'auth0_accessToken': this.accessToken,
      'auth0_expiresAt': this.expiresAt,
    }
    // Set cookies
    setCookies(cookies)

    // TO-DO:: Maybe route them back to the last page they was at?
    // Navigate to the home route
    redirect({}, '/');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout(apolloClient) {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    const cookies = {
      'auth0_idToken': this.idToken,
      'auth0_accessToken': this.accessToken,
      'auth0_expiresAt': this.expiresAt,
    }
    // Remove cookies
    removeCookies(cookies)

    // Reset cache 
    apolloClient.clearStore().then(() => {
      redirect({}, '/');
    })
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}