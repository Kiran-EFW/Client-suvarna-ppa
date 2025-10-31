import dotenv from 'dotenv';

dotenv.config();

let cachedAccessToken = null;
let cachedAccessTokenExpiresAt = 0;

const ensureZohoEnv = () => {
  const required = [
    'ZOHO_CLIENT_ID',
    'ZOHO_CLIENT_SECRET',
    'ZOHO_REFRESH_TOKEN',
    'ZOHO_ACCESS_TOKEN_URL',
    'ZOHO_CRM_API_URL'
  ];
  const missing = required.filter((k) => !process.env[k] || String(process.env[k]).includes('your_'));
  if (missing.length > 0) {
    throw new Error(`Missing Zoho env configuration: ${missing.join(', ')}`);
  }
};

const getZohoAccessToken = async () => {
  const now = Date.now();
  if (cachedAccessToken && cachedAccessTokenExpiresAt - now > 60_000) {
    return cachedAccessToken;
  }

  ensureZohoEnv();

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', process.env.ZOHO_REFRESH_TOKEN);
  params.append('client_id', process.env.ZOHO_CLIENT_ID);
  params.append('client_secret', process.env.ZOHO_CLIENT_SECRET);

  const tokenResponse = await fetch(process.env.ZOHO_ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!tokenResponse.ok) {
    const text = await tokenResponse.text().catch(() => '');
    throw new Error(`Zoho token refresh failed (${tokenResponse.status}): ${text}`);
  }

  const tokenJson = await tokenResponse.json();
  const accessToken = tokenJson.access_token;
  const expiresInSec = Number(tokenJson.expires_in_sec || tokenJson.expires_in || 3300);
  if (!accessToken) {
    throw new Error('Zoho token response missing access_token');
  }

  cachedAccessToken = accessToken;
  cachedAccessTokenExpiresAt = Date.now() + expiresInSec * 1000;
  return accessToken;
};

// Zoho CRM field mapping based on PROJECT_DOCUMENTATION.md
const mapLeadToZohoFormat = (leadData) => {
  return {
    data: [{
      Company: leadData.companyName || '',
      Location: leadData.location || '',
      State: leadData.state || '',
      Credit_Rating: leadData.creditRating || '',
      Priority: leadData.priority || '',
      First_Name: leadData.firstName || '',
      Last_Name: leadData.lastName || '',
      Designation: leadData.designation || '',
      Phone: leadData.mobile1 || '',
      Mobile: leadData.mobile2 || '',
      Other_Phone: leadData.landline || '',
      Home_Phone: leadData.landline2 || '',
      Email: leadData.email1 || '',
      Secondary_Email: leadData.email2 || '',
      Description: leadData.remarks || '',
      Lead_Source: 'Website',
      Lead_Status: 'New Lead'
    }]
  };
};

// TODO: Implement actual Zoho CRM API integration
// This is a placeholder that will be implemented with actual Zoho credentials
export const submitLeadToZoho = async (leadData) => {
  try {
    const zohoFormattedData = mapLeadToZohoFormat(leadData);
    // If env not fully configured, fall back to safe no-op with debug output
    const missingEnv = ['ZOHO_CLIENT_ID','ZOHO_CLIENT_SECRET','ZOHO_REFRESH_TOKEN','ZOHO_ACCESS_TOKEN_URL','ZOHO_CRM_API_URL']
      .filter((k) => !process.env[k] || String(process.env[k]).includes('your_'));
    if (missingEnv.length > 0) {
      console.warn('Zoho not configured, skipping API call. Missing:', missingEnv.join(', '));
      console.log('Lead data to be submitted to Zoho:', JSON.stringify(zohoFormattedData, null, 2));
      return {
        id: 'placeholder_' + Date.now(),
        status: 'skipped',
        message: 'Zoho not configured. Lead formatted only.',
        data: zohoFormattedData
      };
    }

    const accessToken = await getZohoAccessToken();
    const response = await fetch(`${process.env.ZOHO_CRM_API_URL}/Leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(zohoFormattedData)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Failed to submit lead to Zoho CRM (${response.status}): ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in submitLeadToZoho:', error);
    throw new Error('Failed to submit lead to Zoho CRM: ' + error.message);
  }
};

export const refreshZohoAccessToken = async () => {
  return getZohoAccessToken();
};
