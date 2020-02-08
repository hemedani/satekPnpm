// import { InMemoryCache } from "apollo-boost";
// import { createUploadLink } from "apollo-upload-client";
// import { setContext } from "apollo-link-context";
// import ApolloClient from "apollo-client";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { Routes } from "./routes";
// import React, { useState } from "react";

// const link = createUploadLink({
//   uri: "/api"
// });

// const cache = new InMemoryCache();

// const simpleClient = new ApolloClient({ cache, link });

// export const client = React.createContext<ApolloClient<object>>(
//   simpleClient
// );

// export const ApolloCL: React.FC = () => {
//   const [token, setToken] = useState();

//   const httpLink = createUploadLink({
//     uri: "/api" // Apollo Server is served from port 4000
//     //   fetchOptions: {
//     //     credentials: "same-origin",
//     //     mode: "same-origin"
//     //   }
//   });

//   const getToken = () => {
//     const newToken = localStorage.getItem("Token") || "";
//     setToken(newToken);
//     return token;
//   };

//   const client: ApolloClient<object> = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache
//   });

//   return (
//     <client.Provider value={client}>
//       <ApolloProvider client={client}>
//         <Routes />
//       </ApolloProvider>
//     </client.Provider>
//   );
// };

// import ApolloClient from "apollo-boost";
// import { ApolloCache } from "apollo-cache";

// export const client: ApolloClient<ApolloCache<any>> = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   headers: { token: localStorage.getItem("Token") || "" }
// });

import { InMemoryCache } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import ApolloClient from "apollo-client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("Token") || "";
  return {
    headers: {
      ...headers,
      token
    }
  };
});

const uploadLink = createUploadLink({
  uri: "/api" // Apollo Server is served from port 4000
  // headers: {
  //     token: localStorage.getItem("Token") || ""
  // },
  // fetchOptions: {
  //     credentials: "same-origin",
  //     mode: "same-origin",
  //     headers: {
  //         "keep-alive": true
  //     }
  // }
});

export const client: ApolloClient<any> = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache()
});
