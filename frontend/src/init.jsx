import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import App from './Components/Pages/App.js';
import resources from './I18/index.js';
import reducer, { actions } from './slices/index.js';
import { channelsApi } from './service/channelsApi.js';
import { messagesApi } from './service/messagesApi.js';

const init = async (socket) => {
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat([channelsApi.middleware, messagesApi.middleware]),
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find((item) => item.id === payload.id);
      channel.name = payload.name;
    }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const newChannels = draftChannels.filter((channel) => channel.id !== payload.id);
      const state = store.getState();
      if (state.ui.currentChannelId === payload.id) {
        store.dispatch(actions.setCurrentChannel(state.ui.defaultChannelId));
      }
      return newChannels;
    }));
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </I18nextProvider>
  );
};

export default init;
