import { business } from "@/content/site";

// E-mailadres met een afbreekpunt na de @, zodat het op smalle schermen netjes afbreekt.
export function EmailText() {
  const [user, domain] = business.email.split("@");
  return (
    <>
      {user}@<wbr />
      {domain}
    </>
  );
}
