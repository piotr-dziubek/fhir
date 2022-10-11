import { FC, useEffect } from "react";
import { oauth2 as SMART } from "fhirclient";
import {useLocation} from "react-router-dom";

const FHIR_URL = process.env.REACT_APP_FHIR_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

type Props = {
  redirectUri: string
}

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}


/**
 * Launch smart launch sequence using redirectUri
 * @constructor
 */
const FhirAuthoriser: FC<Props> = (props) => {
  const {redirectUri} = props;
  const redirectMessage = `Connecting to FHIR s back end using redirectUri: '${redirectUri}'`;
  console.info(redirectMessage)

  const queryParams = useQueryParams();


  const iss = queryParams.get("iss");
  const launch = queryParams.get("launch");


  useEffect(() => {


    if (!iss || !launch) {
      console.error(
          "Missing SMART EHR launch queryparams. This app should be run using SMART provider-launch sandbox."
      );
      return;
    }
    debugger;
    let ignore = false;
    console.log("use effect authorize")
    if (!ignore) {
      console.log("here");
      SMART.authorize({
        //launch: "",
        iss,
        target: "_top",
        redirectUri: "http://localhost:3000/auth",
        clientId: "clientId",
        scope: "launch openid fhirUser patient/read launch/patient",
        completeInTarget: true,
        clientSecret: "clientSecret",
      }).then();
    }
    return () => {
      ignore = true;
    };
  }, [iss,  launch]);

  return <p>{redirectMessage}</p>;
};

export default FhirAuthoriser;
