import { jsPDF } from 'jspdf';

const money = (value) =>
  value ? `$${Number(value).toLocaleString('en-US')}` : '';

const birthDate = (data, prefix = '') =>
  [
    data[`${prefix}birth_month`],
    data[`${prefix}birth_day`],
    data[`${prefix}birth_year`],
  ]
    .filter(Boolean)
    .join('/');

const address = (data, prefix = '') =>
  [
    data[`${prefix}address`],
    data[`${prefix}apt`],
    data[`${prefix}city`],
    data[`${prefix}state`],
    data[`${prefix}zip`],
  ]
    .filter(Boolean)
    .join(', ');

const businessAddress = (data, prefix = '') =>
  [
    data[`${prefix}business_address`],
    data[`${prefix}business_suite`],
    data[`${prefix}business_city`],
    data[`${prefix}business_state`],
    data[`${prefix}business_zip`],
  ]
    .filter(Boolean)
    .join(', ');

export function downloadCreditApplicationPdf(data) {
  const pdf = new jsPDF({ unit: 'pt', format: 'letter' });
  const margin = 48;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = 48;

  const ensureSpace = (height = 32) => {
    if (y + height <= pageHeight - margin) return;
    pdf.addPage();
    y = margin;
  };

  const section = (title) => {
    ensureSpace(42);
    pdf.setFillColor(220, 38, 38);
    pdf.rect(margin, y, contentWidth, 24, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(title.toUpperCase(), margin + 10, y + 16);
    y += 34;
  };

  const row = (label, value) => {
    const printableValue = String(value || '—');
    const lines = pdf.splitTextToSize(printableValue, contentWidth - 152);
    const height = Math.max(22, lines.length * 13 + 7);
    ensureSpace(height);

    pdf.setDrawColor(225, 225, 225);
    pdf.line(margin, y + height - 3, pageWidth - margin, y + height - 3);

    pdf.setTextColor(90, 90, 90);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(label, margin, y + 12);

    pdf.setTextColor(25, 25, 25);
    pdf.setFont('helvetica', 'normal');
    pdf.text(lines, margin + 150, y + 12);
    y += height;
  };

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(20, 20, 20);
  pdf.text('ALPHA', margin, y);
  pdf.setTextColor(220, 38, 38);
  pdf.text('AUTO', margin + 78, y);

  pdf.setTextColor(70, 70, 70);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('CREDIT APPLICATION', margin, y + 18);
  pdf.text(
    new Date().toLocaleString('en-US'),
    pageWidth - margin,
    y,
    { align: 'right' },
  );
  y += 38;

  section('Personal Information');
  row('Full Name', `${data.first_name || ''} ${data.middle_initial || ''} ${data.last_name || ''}`.replace(/\s+/g, ' ').trim());
  row('SSN', data.ssn);
  row('Date of Birth', birthDate(data));
  row('Phone', data.phone);
  row('Email', data.email);
  row('Address', address(data));
  row('Years at Address', data.years_at_address);
  row('Residence Type', data.residence_type);
  row('Monthly Payment', money(data.monthly_payment));

  section('Employment Information');
  row('Current Employer', data.employer);
  row('Employer Phone', data.employer_phone);
  row('Business Address', businessAddress(data));
  row('Years Employed', data.years_employed);
  row('Position', data.position);
  row('Gross Annual Income', money(data.gross_income));
  row('Other Annual Income', money(data.other_income));
  row('Other Income Source', data.other_income_source);

  row('Co-Applicant', data.has_co_applicant || 'No');

  if (data.has_co_applicant === 'Yes') {
    section('Co-Applicant Personal Information');
    row(
      'Full Name',
      `${data.co_first_name || ''} ${data.co_middle_initial || ''} ${data.co_last_name || ''}`
        .replace(/\s+/g, ' ')
        .trim(),
    );
    row('SSN', data.co_ssn);
    row('Date of Birth', birthDate(data, 'co_'));
    row('Phone', data.co_phone);
    row('Email', data.co_email);
    row('Address', address(data, 'co_'));
    row('Years at Address', data.co_years_at_address);
    row('Residence Type', data.co_residence_type);
    row('Monthly Payment', money(data.co_monthly_payment));

    section('Co-Applicant Employment Information');
    row('Current Employer', data.co_employer);
    row('Employer Phone', data.co_employer_phone);
    row('Business Address', businessAddress(data, 'co_'));
    row('Years Employed', data.co_years_employed);
    row('Position', data.co_position);
    row('Gross Annual Income', money(data.co_gross_income));
    row('Other Annual Income', money(data.co_other_income));
    row('Other Income Source', data.co_other_income_source);
  }

  section('Agreement');
  row('Agreed to Terms', 'Yes');
  row('Submitted At', new Date().toLocaleString('en-US'));

  const applicantName =
    `${data.first_name || 'applicant'}-${data.last_name || ''}`
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/gi, '')
      .toLowerCase();

  pdf.save(`credit-application-${applicantName}.pdf`);
}
