/**
 * Newsletter & Contact Form - Shopify Integration
 *
 * This module handles newsletter signups and contact form submissions
 * by creating customers directly in Shopify via the Storefront API.
 *
 * REQUIRED: Your Storefront Access Token must have the
 * 'unauthenticated_write_customers' scope enabled.
 *
 * To enable this scope:
 * 1. Go to Shopify Admin → Settings → Apps and sales channels
 * 2. Click "Develop apps" → Select your app
 * 3. Click "Configuration" → "Storefront API integration"
 * 4. Check "unauthenticated_write_customers" scope
 * 5. Save and reinstall the access token
 *
 * Note: Contact form messages are NOT stored (Storefront API limitation).
 * Consider using Shopify Inbox or a third-party service for message storage.
 */

import { shopifyClient } from './shopify';

export interface NewsletterSignupData {
  email: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Subscribe to newsletter
 * Creates a customer in Shopify with email marketing consent
 */
export async function subscribeToNewsletter(data: NewsletterSignupData): Promise<boolean> {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          acceptsMarketing
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  // Generate a random password (customer won't use it, but Shopify requires it)
  const randomPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

  const variables = {
    input: {
      email: data.email,
      acceptsMarketing: true,
      password: randomPassword
    }
  };

  console.log('📤 Sending newsletter signup request:', variables);

  const response = await shopifyClient.request(mutation, { variables });

  console.log('📥 Response received:', response);

  // Check for GraphQL errors
  if (response.errors && response.errors.length > 0) {
    console.error('❌ GraphQL errors:', response.errors);
    throw new Error(response.errors[0].message || 'Failed to create customer');
  }

  // Check if response has data
  if (!response.data) {
    console.error('❌ No data in response:', response);
    throw new Error('Failed to create customer - no data returned from Shopify');
  }

  const result = response.data as any;

  if (!result.customerCreate) {
    console.error('❌ No customerCreate in response:', result);
    throw new Error('Failed to create customer - invalid response structure');
  }

  if (result.customerCreate.customerUserErrors && result.customerCreate.customerUserErrors.length > 0) {
    const errors = result.customerCreate.customerUserErrors;

    // Check if customer already exists
    if (errors.some((e: any) => e.code === 'TAKEN' || e.message.includes('taken'))) {
      console.log('ℹ️ Customer already exists:', data.email);
      // Still return true - they're already in the system
      return true;
    }

    console.error('❌ Shopify customer creation errors:', errors);
    throw new Error(errors[0].message);
  }

  console.log('✅ Newsletter signup successful in Shopify:', data.email);
  console.log('📧 Customer ID:', result.customerCreate.customer.id);

  return true;
}

/**
 * Submit contact form
 * Creates customer in Shopify with contact details
 * Note: Message content is NOT stored (Storefront API doesn't support notes)
 * Consider using Shopify Inbox or a third-party service for message storage
 */
export async function submitContactForm(data: ContactFormData): Promise<boolean> {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  // Generate a random password (customer won't use it, but Shopify requires it)
  const randomPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

  // Split name into first and last name
  const nameParts = data.name.trim().split(' ');
  const firstName = nameParts[0] || data.name;
  const lastName = nameParts.slice(1).join(' ') || '.'; // Use '.' if no last name provided

  const variables = {
    input: {
      email: data.email,
      firstName: firstName,
      lastName: lastName,
      acceptsMarketing: false, // Don't auto-subscribe contact form users
      password: randomPassword
    }
  };

  console.log('📤 Creating customer in Shopify for contact form:', data.email);

  const response = await shopifyClient.request(mutation, { variables });

  // Check for GraphQL errors
  if (response.errors && response.errors.length > 0) {
    console.error('❌ GraphQL errors:', response.errors);
    throw new Error(response.errors[0].message || 'Failed to create customer');
  }

  if (!response.data) {
    console.error('❌ No data in response:', response);
    throw new Error('Failed to create customer - no data returned from Shopify');
  }

  const result = response.data as any;

  if (!result.customerCreate) {
    console.error('❌ No customerCreate in response:', result);
    throw new Error('Failed to create customer - invalid response structure');
  }

  if (result.customerCreate.customerUserErrors && result.customerCreate.customerUserErrors.length > 0) {
    const errors = result.customerCreate.customerUserErrors;

    // Customer might already exist - that's okay
    if (errors.some((e: any) => e.code === 'TAKEN' || e.message.includes('taken'))) {
      console.log('ℹ️ Customer already exists in Shopify');
      return true;
    }

    console.error('❌ Shopify customer creation errors:', errors);
    throw new Error(errors[0].message);
  }

  console.log('✅ Customer created in Shopify:', result.customerCreate.customer.id);
  console.log('⚠️ Note: Message content is NOT stored in Shopify (API limitation)');
  console.log('💡 Consider using Shopify Inbox or a third-party form service for message storage');

  return true;
}



