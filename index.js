const React = require('react');
const { renderToString } = require('react-dom/server');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const path = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);
const schema = require('./src/graphQl').default;

const app = express()

app.use(middleware(compiler));

app.use('/graphql', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: true,
  context: {
    rootValue: {
      id: 'viewer'
    },
  },
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(3000, () => console.log('Server is running on 3000 port'));