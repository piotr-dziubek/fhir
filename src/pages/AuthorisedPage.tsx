import {FhirProvider} from "../components/FhirContext";
import Connected from "../components/Connected";

const AuthorisedPage = () => {
  return (
    <FhirProvider>
      <Connected />
    </FhirProvider>
  )
}

export default AuthorisedPage;
