import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ejs from 'ejs';
import pageTemplate from '../../index.ejs';

import App from '../../client/components/App.jsx';

const compiledTemplate = ejs.compile(pageTemplate);
const stylesTag = `<link href="/main${GLOBAL__VERSION_NUMBER}.css" rel="stylesheet"></link>`;
const scriptTag = `<script src="/main${GLOBAL__VERSION_NUMBER}.js"></script>`;

export default (req, store) => {
  
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} query={req.query}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = JSON.stringify(store.getState());

  return compiledTemplate({
    content,
    stylesTag,
    scriptTag,
    preloadedState: `<script> window.__PRELOADED_STATE__ = '${preloadedState}' </script>`
  });
};
