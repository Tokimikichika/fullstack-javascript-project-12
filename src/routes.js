// @ts-check

const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  // channelPath: (id) => [apiPath, 'channels', id].join('/'),
  // messagesPath: () => [apiPath, 'messages'].join('/'),
  // messagePath: (id) => [apiPath, 'messages', id].join('/'),
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
};

export default routes;
