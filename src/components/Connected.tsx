import {FC, useContext, useEffect, useState} from "react";
import {FhirContext} from "./FhirContext";
import {fhirclient} from "fhirclient/lib/types";



const Connected: FC = () => {
  const [patient, setPatient] = useState<fhirclient.FHIR.Patient | null>(null);
  const ctx = useContext(FhirContext);
  useEffect(() => {
    if (ctx.client !== null) {

      debugger;
      ctx.client?.patient.read().then(pat => {

        if (!patient){
          setPatient(pat);
        }
      })
    }

    return () => {

    };
  }, [ctx, patient]);

  if (ctx.client) {
    console.log(ctx.client.patient.id)
    return <div>
      <p>Connection success!</p>
      <p>{patient?.name[0].text}</p>
    </div>
  }
  return <p>No FHIR client connected</p>
}

export default Connected;
