/* eslint-disable no-console */

const express = require("express");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const { fragmentMatcher } = require("@times-components/schema");
const fetch = require("node-fetch");
const { createHttpLink } = require("apollo-link-http");
const getData = require("./get-data");
const authorProfile = require("./author-profile");
const topic = require("./topic");

const port = 3000;
const server = express();

const makeClient = () =>
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: process.env.GRAPHQL_ENDPOINT
    }),
    cache: new Cache({ addTypename: true, fragmentMatcher })
  });

const makeHtml = (
  client,
  identifier,
  page,
  { bundleName, html, rnwStyles, scStyles, title }
) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>
            ${rnwStyles}
            ${scStyles}
            <script>
            window.nuk = { identifier: "${identifier}", page: ${page} };
            window.__APOLLO_STATE__=${JSON.stringify(client.extract()).replace(
              /</g,
              "\\\u003c"
            )};
            </script>
          </head>
          <body style="margin:0">
            <div id="app">${html}</div>
          </body>
          <script src="/vendor.bundle.js"></script>
          <script src="/${bundleName}.bundle.js"></script>
        </html>
      `;

const toNumber = s => {
  const parsed = Number.parseInt(s, 10);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
};

server.get("/profile/:slug", (req, res) => {
  const { params: { slug }, query: { page } } = req;
  const pageNum = toNumber(page) || 1;
  const client = makeClient();
  const App = authorProfile(client, slug, pageNum);

  getData(App).then(props =>
    res.send(
      makeHtml(client, slug, pageNum, {
        ...props,
        bundleName: "author-profile",
        title: slug
      })
    )
  );
});

server.get("/topic/:slug", (req, res) => {
  const { params: { slug }, query: { page } } = req;
  const pageNum = toNumber(page) || 1;
  const client = makeClient();
  const App = topic(client, slug, pageNum);

  getData(App).then(props =>
    res.send(
      makeHtml(client, slug, pageNum, {
        ...props,
        bundleName: "topic",
        title: slug
      })
    )
  );
});

server.use(express.static("dist"));

server.listen(port, () => console.log(`Serving at http://localhost:${port}`));
