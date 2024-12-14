// @ts-check

const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  chatPagePath: () => `/`,
  loginPagePath: () => `/login`,
  signupPagePath: () => `/signup`,
};

export default routes;
