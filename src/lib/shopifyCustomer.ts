/**
 * Shopify Customer API Integration
 *
 * This module handles newsletter signups and contact form submissions
 * by creating customer records via Shopify Storefront API.
 *
 * NOTE: Shopify Storefront API doesn't support creating customers with tags or notes.
 * We store submissions locally and you can manually import them to Shopify.
 */

import { storefrontClient } from './shopify';

interface NewsletterSignupData {
  email: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Subscribe to newsletter
 * Stores locally for manual import to Shopify
 */
export async function subscribeToNewsletter(data: NewsletterSignupData): Promise<boolean> {
  try {
    // Store locally
    const signups = JSON.parse(localStorage.getItem('newsletter_signups') || '[]');
    signups.push({
      email: data.email,
      subscribedAt: new Date().toISOString(),
      source: 'website-newsletter',
    });
    localStorage.setItem('newsletter_signups', JSON.stringify(signups));

    console.log('✅ Newsletter signup stored locally:', data.email);
    console.log('📋 Total signups:', signups.length);

    return true;
  } catch (error) {
    console.error('Newsletter signup error:', error);
    throw error;
  }
}

/**
 * Submit contact form
 * Stores locally for manual import to Shopify
 */
export async function submitContactForm(data: ContactFormData): Promise<boolean> {
  try {
    // Store locally
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form',
    });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));

    console.log('✅ Contact form stored locally');
    console.log('📋 Total submissions:', submissions.length);

    return true;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
}

/**
 * Get all newsletter signups (for manual import to Shopify)
 */
export function getNewsletterSignups(): Array<{ email: string; subscribedAt: string; source: string }> {
  return JSON.parse(localStorage.getItem('newsletter_signups') || '[]');
}

/**
 * Get all contact form submissions (for manual import to Shopify)
 */
export function getContactSubmissions(): Array<ContactFormData & { submittedAt: string; source: string }> {
  return JSON.parse(localStorage.getItem('contact_submissions') || '[]');
}

/**
 * Clear newsletter signups after manual import
 */
export function clearNewsletterSignups(): void {
  localStorage.removeItem('newsletter_signups');
}

/**
 * Clear contact submissions after manual import
 */
export function clearContactSubmissions(): void {
  localStorage.removeItem('contact_submissions');
}

/**
 * Export newsletter signups as CSV for Shopify import
 */
export function exportNewsletterSignupsCSV(): string {
  const signups = getNewsletterSignups();
  if (signups.length === 0) return '';

  const header = 'Email,Subscribed At,Source,Accepts Marketing\n';
  const rows = signups.map(s =>
    `${s.email},${s.subscribedAt},${s.source},yes`
  ).join('\n');

  return header + rows;
}

/**
 * Export contact submissions as CSV for Shopify import
 */
export function exportContactSubmissionsCSV(): string {
  const submissions = getContactSubmissions();
  if (submissions.length === 0) return '';

  const header = 'Name,Email,Subject,Message,Submitted At,Source\n';
  const rows = submissions.map(s =>
    `"${s.name}","${s.email}","${s.subject}","${s.message.replace(/"/g, '""')}",${s.submittedAt},${s.source}`
  ).join('\n');

  return header + rows;
}

/**
 * Download newsletter signups as CSV file
 */
export function downloadNewsletterSignupsCSV(): void {
  const csv = exportNewsletterSignupsCSV();
  if (!csv) {
    alert('No newsletter signups to export');
    return;
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `newsletter-signups-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Download contact submissions as CSV file
 */
export function downloadContactSubmissionsCSV(): void {
  const csv = exportContactSubmissionsCSV();
  if (!csv) {
    alert('No contact submissions to export');
    return;
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

