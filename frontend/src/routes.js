// @ts-check

const basePath = '/fullstack-javascript-project-12';
const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  chatPagePath: () => `${basePath}/`,
  loginPagePath: () => `${basePath}/login`,
  signupPagePath: () => `${basePath}/signup`,
};

export default routes;
