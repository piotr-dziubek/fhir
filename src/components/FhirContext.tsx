import React, {FC, useState, useEffect} from "react";
import {createContext} from "react";
import {oauth2 as SMART} from "fhirclient";
import Client from "fhirclient/lib/Client";
import {NavLink} from "react-router-dom";

type clientContext = {
  client: Client | null;
  setClient: (client: Client) => void;
};

const context: clientContext = {
  client: null,
  setClient: (client: Client) => {
    context.client = client;
  },
};

interface Props {
  children: React.ReactNode;
}

export const FhirProvider: FC<Props> = (props) => {
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      console.log("useeffect");
      SMART.ready()
        .then((client) => setClient(client))
        .catch((error) => setError(error))
        .finally(() => console.debug("FHIR client ready"));
    }

    return () => {
      ignore = true;
    };
  }, []);

  if (error) {
    console.error(error.stack);
    return (
      <>
        <p>{error.stack}</p>
        <pre>This page should only be accessed using the Home page, please click the links from there</pre>
        <NavLink to={"/"}>Home page</NavLink>
        <p>{client?.getIdToken()?.iss ?? "t"} </p>
      </>)
  }

  return <FhirContext.Provider value={{client: client, setClient: setClient}}>{props.children}</FhirContext.Provider>;
};

export const FhirContext = createContext(context);
