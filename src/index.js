import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import { NewsList, NewsListContainer } from './components/NewsList';

render(
  <Relay.Renderer
    Container={NewsListContainer}
    environment={Relay.Store}
    queryConfig={{
      name: 'Route',
      queries: {
        viewer: () => Relay.QL`query { viewer }`,
      },
      params: {},
    }}
  />,
  document.getElementById('root')
);
