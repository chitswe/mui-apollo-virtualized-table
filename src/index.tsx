import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import secret from './secret.json';
import Example from './Example';
import update from 'immutability-helper';
import { PropertyFindAll_propertyQuery_properties } from './__generated__/PropertyFindAll';


const authFetch = (input: RequestInfo, init: RequestInit = {}) => {
  init.headers = {
    ...init.headers,
    // Authorization: `Bearer ${secret.githubUserToken}`
  };
  return fetch(input, init);
};


const apolloClient = new ApolloClient({
  connectToDevTools: true,
  ssrMode: false,
  cache: new InMemoryCache({
    typePolicies: {
      PropertyQuery: {
        fields: {
          properties: {
            keyArgs: ["where","orderBy"],
            merge: (existing: PropertyFindAll_propertyQuery_properties, incoming: PropertyFindAll_propertyQuery_properties) => {
              if (!existing)
                return incoming;
              const merged = update(incoming, {
                edges: {
                  $set: [...existing.edges, ...incoming.edges]
                }
              });
              return merged;
            }
          }
        }
      }
    }
  }),
  link: new HttpLink({
    uri: "/graphql",
    fetch: authFetch
  })
});
const theme = createTheme({
  palette:{
    mode:"light"
  },
  typography: {
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontFamily: "Noto Sans Myanmar,Poppins, sans-serif",
    body1: {
      lineHeight: "2em",
    },
    subtitle1: {
      fontWeight: 500
    }
  }
})
const Root = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Example />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Root />
);

reportWebVitals();
