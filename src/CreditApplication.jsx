import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const MONTHS = [
  ['01', 'January'],
  ['02', 'February'],
  ['03', 'March'],
  ['04', 'April'],
  ['05', 'May'],
  ['06', 'June'],
  ['07', 'July'],
  ['08', 'August'],
  ['09', 'September'],
  ['10', 'October'],
  ['11', 'November'],
  ['12', 'December'],
];

const YEARS = Array.from(
  { length: 83 },
  (_, index) => String(new Date().getFullYear() - 18 - index),
);

const inputClass =
  'w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/30';

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
  min,
  step,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <input
        className={inputClass}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        step={step}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
  placeholder = 'Select',
  value,
  onChange,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <select
        className={inputClass}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const [optionValue, optionLabel] = Array.isArray(option)
            ? option
            : [option, option];

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </label>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 shadow-xl shadow-black/10 md:p-8">
      <div className="mb-7 border-b border-neutral-800 pb-5">
        <h2 className="text-xl font-extrabold uppercase tracking-tight text-white md:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function BirthDateFields({ prefix = '' }) {
  return (
    <div className="md:col-span-2">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400">
        Date of Birth <span className="ml-1 text-red-500">*</span>
      </span>
      <div className="grid grid-cols-3 gap-3">
        <select
          className={inputClass}
          name={`${prefix}birth_month`}
          required
          aria-label="Birth month"
        >
          <option value="">Month</option>
          {MONTHS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className={inputClass}
          name={`${prefix}birth_day`}
          required
          aria-label="Birth day"
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, index) => {
            const day = String(index + 1).padStart(2, '0');
            return (
              <option key={day} value={day}>
                {day}
              </option>
            );
          })}
        </select>
        <select
          className={inputClass}
          name={`${prefix}birth_year`}
          required
          aria-label="Birth year"
        >
          <option value="">Year</option>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PersonalInformation({ prefix = '' }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Field
        label="First Name"
        name={`${prefix}first_name`}
        required
        placeholder="First name"
        autoComplete={prefix ? 'off' : 'given-name'}
      />
      <Field
        label="Last Name"
        name={`${prefix}last_name`}
        required
        placeholder="Last name"
        autoComplete={prefix ? 'off' : 'family-name'}
      />
      <Field
        label="Middle Initial"
        name={`${prefix}middle_initial`}
        placeholder="Optional"
      />
      <Field
        label="SSN"
        name={`${prefix}ssn`}
        required
        placeholder="123-45-6789"
        autoComplete="off"
      />
      <BirthDateFields prefix={prefix} />
      <Field
        label="Phone"
        name={`${prefix}phone`}
        type="tel"
        required
        placeholder="(123) 456-7890"
        autoComplete={prefix ? 'off' : 'tel'}
      />
      <Field
        label="Email"
        name={`${prefix}email`}
        type="email"
        required
        placeholder="your@email.com"
        autoComplete={prefix ? 'off' : 'email'}
      />
      <div className="md:col-span-2">
        <Field
          label="Present Address"
          name={`${prefix}address`}
          required
          placeholder="Street address"
          autoComplete={prefix ? 'off' : 'street-address'}
        />
      </div>
      <Field
        label="Apt/Suite Number"
        name={`${prefix}apt`}
        placeholder="Optional"
      />
      <Field
        label="City"
        name={`${prefix}city`}
        required
        placeholder="City"
        autoComplete={prefix ? 'off' : 'address-level2'}
      />
      <SelectField
        label="State"
        name={`${prefix}state`}
        options={STATES}
        required
      />
      <Field
        label="ZIP Code"
        name={`${prefix}zip`}
        required
        placeholder="ZIP code"
        autoComplete={prefix ? 'off' : 'postal-code'}
      />
      <Field
        label="Years at Address"
        name={`${prefix}years_at_address`}
        type="number"
        required
        placeholder="0"
        min="0"
        step="0.1"
      />
      <SelectField
        label="Type of Residence"
        name={`${prefix}residence_type`}
        options={['Own', 'Rent', 'Living with family', 'Other']}
        required
      />
      <Field
        label="Monthly Payment"
        name={`${prefix}monthly_payment`}
        type="number"
        required
        placeholder="0"
        min="0"
        step="0.01"
      />
    </div>
  );
}

function EmploymentInformation({ prefix = '' }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Field
        label="Current Employer"
        name={`${prefix}employer`}
        required
        placeholder="Company name"
      />
      <Field
        label="Employer Phone"
        name={`${prefix}employer_phone`}
        type="tel"
        required
        placeholder="(123) 456-7890"
      />
      <div className="md:col-span-2">
        <Field
          label="Business Address"
          name={`${prefix}business_address`}
          required
          placeholder="Street address"
        />
      </div>
      <Field
        label="Suite Number"
        name={`${prefix}business_suite`}
        placeholder="Optional"
      />
      <Field
        label="City"
        name={`${prefix}business_city`}
        required
        placeholder="City"
      />
      <SelectField
        label="State"
        name={`${prefix}business_state`}
        options={STATES}
        required
      />
      <Field
        label="ZIP Code"
        name={`${prefix}business_zip`}
        required
        placeholder="ZIP code"
      />
      <Field
        label="Years You've Been There"
        name={`${prefix}years_employed`}
        type="number"
        required
        placeholder="0"
        min="0"
        step="0.1"
      />
      <Field
        label="Position"
        name={`${prefix}position`}
        required
        placeholder="Your position"
      />
      <Field
        label="Gross Annual Income"
        name={`${prefix}gross_income`}
        type="number"
        required
        placeholder="0"
        min="0"
        step="0.01"
      />
      <Field
        label="Other Annual Income"
        name={`${prefix}other_income`}
        type="number"
        placeholder="0"
        min="0"
        step="0.01"
      />
      <Field
        label="Source of Other Income"
        name={`${prefix}other_income_source`}
        placeholder="Optional"
      />
    </div>
  );
}

function SubmissionSuccess() {
  return (
    <main id="apply" className="min-h-[75vh] bg-black px-4 py-20">
      <div className="mx-auto max-w-lg rounded-lg border border-neutral-800 bg-neutral-900 p-10 text-center shadow-2xl">
        <CheckCircle className="mx-auto mb-6 h-20 w-20 text-red-500" />
        <h1 className="text-3xl font-extrabold uppercase text-white">
          Application Submitted
        </h1>
        <p className="mt-4 text-lg leading-7 text-gray-400">
          Thank you for your application. Our team will review it and contact
          you shortly.
        </p>
        <a
          href="#home"
          className="mt-8 inline-flex items-center justify-center rounded bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-red-700"
        >
          Return Home
        </a>
      </div>
    </main>
  );
}

export default function CreditApplication() {
  const [hasCoApplicant, setHasCoApplicant] = useState('No');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!agreed) {
      setError('You must agree to the terms before submitting.');
      return;
    }

    const endpoint = import.meta.env.VITE_CREDIT_APPLICATION_ENDPOINT;

    if (!endpoint) {
      setError(
        'The secure credit-application endpoint has not been configured.',
      );
      return;
    }

    const formData = new FormData(event.currentTarget);

    // Silently accept bot submissions without sending any customer data.
    if (formData.get('botcheck')) {
      setSubmitted(true);
      return;
    }

    formData.delete('botcheck');
    formData.set('submitted_at', new Date().toISOString());

    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('The application could not be submitted.');
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError.message ||
          'A network error occurred. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <SubmissionSuccess />;
  }

  return (
    <main id="apply" className="bg-black text-white">
      <section className="border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <a
            href="#home"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 transition hover:text-red-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Alpha Auto
          </a>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded border border-red-600/30 bg-red-600/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500">
                <ShieldCheck className="h-4 w-4" />
                Secure application
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
                Credit Application
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
                Complete the form below to begin your lease application. Fields
                marked with an asterisk are required.
              </p>
            </div>
            <p className="max-w-xs rounded border border-neutral-800 bg-black/60 p-4 text-sm leading-6 text-gray-500">
              Your information must be transmitted only to the configured
              secure application endpoint.
            </p>
          </div>
        </div>
      </section>

      <form
        className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 md:py-14 lg:px-8"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="botcheck"
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        <Section
          title="Personal Information"
          description="Primary applicant identity and residence information."
        >
          <PersonalInformation />
        </Section>

        <Section
          title="Employment Information"
          description="Primary applicant employment and income information."
        >
          <EmploymentInformation />
        </Section>

        <Section
          title="Co-Applicant"
          description="Add a second applicant only when needed."
        >
          <div className="max-w-md">
            <SelectField
              label="Do you have a co-applicant?"
              name="has_co_applicant"
              options={['No', 'Yes']}
              value={hasCoApplicant}
              onChange={(event) => setHasCoApplicant(event.target.value)}
              required
            />
          </div>

          {hasCoApplicant === 'Yes' && (
            <div className="mt-10 space-y-10 border-t border-neutral-800 pt-8">
              <div>
                <h3 className="mb-6 text-lg font-bold uppercase text-white">
                  Co-Applicant Personal Information
                </h3>
                <PersonalInformation prefix="co_" />
              </div>
              <div className="border-t border-neutral-800 pt-8">
                <h3 className="mb-6 text-lg font-bold uppercase text-white">
                  Co-Applicant Employment Information
                </h3>
                <EmploymentInformation prefix="co_" />
              </div>
            </div>
          )}
        </Section>

        <Section title="Terms, Conditions & Disclosure">
          <div className="space-y-5 text-sm leading-7 text-gray-400">
            <p>
              By submitting this application, each applicant certifies that the
              information provided is complete and accurate and authorizes
              Alpha Auto and its financing partners to verify the information
              for the purpose of evaluating this application.
            </p>
            <p>
              Submission does not guarantee approval and does not create an
              obligation to purchase or lease a vehicle.
            </p>
            <label className="flex cursor-pointer items-start gap-3 rounded border border-neutral-700 bg-neutral-800/60 p-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-1 h-4 w-4 accent-red-600"
              />
              <span className="font-semibold text-gray-300">
                I have read and agree to the terms above and authorize
                verification of the submitted information.
              </span>
            </label>
          </div>
        </Section>

        {error && (
          <p
            className="rounded border border-red-600/30 bg-red-600/10 px-4 py-3 text-center text-sm text-red-300"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded bg-red-600 px-6 py-4 text-lg font-bold uppercase tracking-wider text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting Application
            </>
          ) : (
            'Submit Application'
          )}
        </button>

        <p className="text-center text-xs leading-5 text-gray-600">
          Do not enable this form until a secure, access-controlled application
          endpoint has been configured.
        </p>
      </form>
    </main>
  );
}
