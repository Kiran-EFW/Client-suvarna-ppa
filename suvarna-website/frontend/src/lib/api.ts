import { getApiPath } from './apiConfig';

export interface LeadFormData {
  companyName: string;
  location: string;
  state: string;
  creditRating: string;
  priority: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobile1: string;
  mobile2: string;
  landline: string;
  landline2: string;
  email1: string;
  email2: string;
  remarks: string;
}

export const submitLeadToCRM = async (formData: LeadFormData) => {
  const response = await fetch(getApiPath('/api/leads'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to submit lead to CRM');
  }

  return response.json();
};
