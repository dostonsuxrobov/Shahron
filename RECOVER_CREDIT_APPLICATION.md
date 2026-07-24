# Recover the Credit Application

The historical credit application existed only as compiled JavaScript on the
`gh-pages` branch. The recovered source is now isolated in
`src/CreditApplication.jsx` and uses the existing hash-routing pattern.

## Why this does not break the current site

- The home page remains the default route.
- The existing quote form and its Web3Forms submission are unchanged.
- The privacy page remains at `#privacy-policy`.
- The recovered credit application is available separately at `#apply`.
- No additional runtime package is required.

## Files to add

- `src/CreditApplication.jsx`
- `.env.example`

## Changes to `src/App.jsx`

Import the recovered component:

```jsx
import CreditApplication from './CreditApplication';
```

Add the application navigation item:

```jsx
{ label: 'Applications', href: '#apply' },
```

Add the title and route handling:

```jsx
document.title = route === '#privacy-policy'
  ? 'Privacy Policy | Alpha Auto'
  : route === '#apply'
    ? 'Credit Application | Alpha Auto'
    : 'Alpha Auto | Car Lease Deals';

const isPrivacyPolicy = route === '#privacy-policy';
const isCreditApplication = route === '#apply';
```

Render it without changing the home page:

```jsx
{isPrivacyPolicy ? (
  <PrivacyPolicy />
) : isCreditApplication ? (
  <CreditApplication />
) : (
  <main>{/* Existing home-page sections */}</main>
)}
```

## Configure submission

Copy `.env.example` to `.env` and set:

```dotenv
VITE_CREDIT_APPLICATION_ENDPOINT=https://your-secure-api.example.com/credit-applications
```

The endpoint must:

1. Accept an HTTPS `POST` request using `multipart/form-data`.
2. Authenticate and authorize staff access to stored applications.
3. Encrypt sensitive fields in transit and at rest.
4. Apply appropriate retention, deletion, audit, and access-control policies.
5. Return an HTTP `2xx` response only after the application is safely stored.

Do not route SSNs, dates of birth, income, or credit-application data through
ordinary email or a general-purpose contact-form service.

## Verify locally

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Open:

```text
http://localhost:5173/#apply
```

Verify that `#home`, `#quote`, and `#privacy-policy` still behave as before.

## Deploy

After committing the source changes to `main`, deploy the built site:

```bash
npm run deploy
```

The deployed application will be available at:

```text
https://alpha-auto.net/#apply
```
