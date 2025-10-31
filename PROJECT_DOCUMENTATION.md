# Suvarna Capital Website Modernization Project

## Document Information
- **Project**: Suvarna Capital Website Modernization
- **Client**: Suvarna Capital Limited
- **Date**: October 30, 2025
- **Prepared by**: AI Assistant
- **Status**: Planning Phase

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Company Research](#company-research)
3. [Current Data Collection Structure](#current-data-collection-structure)
4. [Technical Requirements](#technical-requirements)
5. [Scope of Work](#scope-of-work)
6. [Technical Implementation Plan](#technical-implementation-plan)
7. [Project Timeline](#project-timeline)
8. [Technology Stack](#technology-stack)
9. [Form Structure & CRM Integration](#form-structure--crm-integration)
10. [Success Metrics](#success-metrics)

---

## Executive Summary

Suvarna Capital Limited requires a complete modernization of their digital presence including a professional website with Zoho CRM integration. The project aims to create a modern, SEO-compliant website that effectively captures leads from Power Purchase Agreement (PPA) buyers and integrates seamlessly with their CRM system for streamlined lead management and automation.

---

## Company Research

### Business Overview
- **Company**: Suvarna Capital Limited
- **Registration**: England & Wales (Reg: 8065828)
- **Headquarters**: London, UK
- **Operations**: Dharwad, Karnataka, India
- **Founded/Leadership**: Managed by Prashant Basanagoudar (Managing Director, MSc International Securities, Investment & Banking)

### Core Services
1. **On-Site Solar Solutions**: Rooftop and ground-mounted solar with zero capital investment, zero maintenance, and guaranteed savings
2. **Off-Site Renewable Energy**: Open access route for sourcing power from distant solar/wind parks
3. **M&A Advisory**: Mergers & acquisitions of renewable energy assets (wind/solar) on buy/sell sides
4. **Additional Services**: Private equity capital raising, structured finance advisory

### Market Position
- Active in Karnataka, Maharashtra, Gujarat, Rajasthan, and Tamil Nadu
- Focus on mid-market independent power producers
- Currently running mandates for wind and solar power assets
- Strong network of global investors and renewable energy asset buyers
- Emphasis on enabling corporates to meet RE100 goals

### Current Website Analysis
- **URL**: https://suvarnacapital.com/
- **Current State**: Basic static site with placeholder lorem ipsum content
- **Issues**: Outdated design, limited interactivity, poor mobile experience
- **Required Changes**: Modern, professional design with animations, SEO optimization, lead capture integration

---

## Current Data Collection Structure

Based on existing lead collection processes, the following fields are currently being captured:

### Company Information
- Company Name (Required)
- Location (Required)
- State (Required)
- Credit Rating (Optional)
- Priority (Optional)

### Contact Person Details
- First Name (Required)
- Last Name (Required)
- Designation (Required)

### Contact Information
- Mobile 1 (Required)
- Mobile 2 (Optional)
- Landline (Optional)
- Landline 2 (Optional)
- Email 1 (Required)
- Email 2 (Optional)

### Additional Information
- Remarks (Optional)

### Sample Data Provided
```
Company: Threads (India) Private Limited
Location: Kannauj, Uttar Pradesh
Credit Rating: BBB+
Contact: Dev Tripathi (PPC)
Mobile: 7054424235, 9453326009

Company: Hi-tech Pipes Ltd
Location: Sikandrabad, Uttar Pradesh
Credit Rating: A- CRISIL 2022 June
Contact: [Not specified in sample]
Phones: 9411860554, 7827801001, 01148440050, 05735221188
```

---

## Technical Requirements

### Website Requirements
- **Modern Design**: Professional appearance with animations and modern UI/UX
- **Responsive**: Mobile-first design approach
- **SEO Compliant**: Meta tags, structured data, sitemap generation
- **Performance**: Optimized loading times, image optimization, code splitting
- **Accessibility**: WCAG compliant components

### Integration Requirements
- **CRM Integration**: Direct integration with Zoho CRM
- **Lead Capture**: Multi-step forms with validation
- **Automation**: Email notifications, WhatsApp integration (optional)
- **Document Automation**: NDAs, LOIs, Term Sheets generation

### Branding Requirements
- **Logo**: Use existing Suvarna Capital logo
- **Colors**: Maintain current branding colors
- **Tone**: Professional, trustworthy, sustainable energy focus

---

## Scope of Work

### Project Components

#### 2.1. Website Development
- Design and deploy a new responsive website
- Integrate lead capture forms (Name, Email, Phone, Query) that feed directly into Zoho CRM
- Configure centralised lead database accessible to Suvarna Capital's employees and partners
- Migrate existing website content into the new layout and design

#### 2.2. CRM Implementation (Zoho CRM & Email)
- Procure and configure Zoho CRM and Zoho Email accounts
- Design CRM structure for lead management, classification (hot/warm/cold), and tracking sales activity
- Implement automation for data entry from website forms into CRM
- Setup notifications for new leads, lead updates, and scheduled follow-ups

#### 2.3. Communication and Automation
- Configure WhatsApp business automation for initial client response (optional integration)
- Automate email responses for client enquiries using Zoho Email templates
- Implement basic scheduling automation for client meetings through Zoho CRM

#### 2.4. Data Management and Visualization
- Develop internal dashboards within Zoho CRM for real-time visibility of leads, pipeline, and employee activity
- Configure basic data visualization by industry, sector, region, and lead size
- Enable role-based access for employees and partners

#### 2.5. Document and Proposal Automation
- Automate standard documents such as NDAs, LOIs, and Term Sheets using CRM data
- Generate basic offer tables (capacity, tariff, tenure, validity) for clients
- Streamline approval and sending workflows to reduce manual effort

### Deliverables
1. Fully functional website integrated with Zoho CRM
2. Zoho CRM setup for lead capture, tracking, and automation
3. Automated client communication via Zoho Email (and optionally WhatsApp)
4. Internal dashboards for leads and performance monitoring
5. Template-based document automation for NDAs, LOIs, and proposals

### Timeline
- **Phase 1 (7-10 days)**: Website and Zoho CRM integration, basic automation setup
- **Phase 2 (Post-acceptance)**: Dashboard enhancement, document automation, and UI improvements based on client feedback

### Commercial Terms
- **Total Fee**: £2,000.00 (Two Thousand Pounds Sterling)
- **Payment Terms**: 50% deposit (£1,000) upon signing, 50% (£1,000) within 14 days of Phase 1 completion
- **Exclusions**: Third-party software licenses (Zoho CRM subscription costs)

---

## Technical Implementation Plan

### Phase 1: Foundation (Week 1-2)
1. Set up project structure with Vite + React + TypeScript
2. Configure shadcn/ui and Tailwind CSS
3. Create basic layout and routing
4. Implement hero section with animations
5. Set up SEO foundation

### Phase 2: Core Pages (Week 3-4)
1. Services page with interactive elements
2. About page with team section
3. Contact page with lead capture form
4. Implement responsive navigation
5. Add professional imagery and icons

### Phase 3: Integration & Automation (Week 5-6)
1. Backend API setup with Node.js
2. Zoho CRM integration
3. Form submission and data handling
4. Email automation setup
5. WhatsApp integration (optional)

### Phase 4: Enhancement & Launch (Week 7-8)
1. Performance optimization
2. SEO finalization
3. Testing and bug fixes
4. Deployment setup
5. Analytics integration

---

## Technology Stack

### Frontend
- **Build Tool**: Vite
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **API**: Express.js or Fastify
- **Database**: Not required (direct CRM integration)
- **Authentication**: JWT for admin access

### Deployment
- **Frontend**: Vercel or Netlify
- **Backend**: Railway or Render
- **Domain**: Existing suvarnacapital.com

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Testing**: Vitest for unit tests

---

## Form Structure & CRM Integration

### Form Fields (Exact Match to Current Collection)
```javascript
const leadFormFields = [
  // Company Information
  { name: 'companyName', label: 'Company Name', type: 'text', required: true },
  { name: 'location', label: 'Location', type: 'text', required: true },
  { name: 'state', label: 'State', type: 'select', required: true },
  { name: 'creditRating', label: 'Credit Rating', type: 'text', required: false },
  { name: 'priority', label: 'Priority', type: 'select', required: false },
  
  // Contact Person Details
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'designation', label: 'Designation', type: 'text', required: true },
  
  // Contact Numbers
  { name: 'mobile1', label: 'Mobile 1', type: 'tel', required: true },
  { name: 'mobile2', label: 'Mobile 2', type: 'tel', required: false },
  { name: 'landline', label: 'Landline', type: 'tel', required: false },
  { name: 'landline2', label: 'Landline 2', type: 'tel', required: false },
  
  // Email Addresses
  { name: 'email1', label: 'Email 1', type: 'email', required: true },
  { name: 'email2', label: 'Email 2', type: 'email', required: false },
  
  // Additional Information
  { name: 'remarks', label: 'Remarks', type: 'textarea', required: false }
]
```

### Zoho CRM Data Mapping
```javascript
const zohoLeadData = {
  "data": [{
    "Company": formData.companyName,
    "Location": formData.location,
    "State": formData.state,
    "Credit_Rating": formData.creditRating,
    "Priority": formData.priority,
    "First_Name": formData.firstName,
    "Last_Name": formData.lastName,
    "Designation": formData.designation,
    "Phone": formData.mobile1, // Primary phone
    "Mobile": formData.mobile2,
    "Other_Phone": formData.landline,
    "Home_Phone": formData.landline2,
    "Email": formData.email1, // Primary email
    "Secondary_Email": formData.email2,
    "Description": formData.remarks,
    "Lead_Source": "Website",
    "Lead_Status": "New Lead"
  }]
}
```

### State Options (All Indian States)
```javascript
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep'
]
```

---

## Success Metrics

### Website Performance Metrics
- **User Engagement**: Improved time on site (>2x current), pages per session (>1.5x)
- **SEO Performance**: Top 10 rankings for target keywords within 6 months
- **Lead Quality**: Increased qualified leads through contact forms (target: 50+ monthly)
- **Conversion Rate**: 5-10% form completion rate

### Technical Metrics
- **Performance**: Lighthouse score >90 for all categories
- **Mobile Responsiveness**: 100% mobile-friendly score
- **Loading Speed**: <3 seconds initial page load
- **Accessibility**: WCAG AA compliance

### Business Metrics
- **Lead Generation**: Seamless integration with Zoho CRM
- **Automation Efficiency**: 70% reduction in manual data entry
- **Response Time**: <24 hours for lead follow-up
- **Client Satisfaction**: >90% satisfaction rate in post-project survey

---

## Next Steps

1. **Project Approval**: Client review and approval of this documentation
2. **Project Setup**: Initialize repository and development environment
3. **Design Phase**: Create wireframes and mockups for key pages
4. **Development Phase**: Begin implementation following the outlined phases
5. **Testing & Launch**: Comprehensive testing and deployment

---

## Contact Information

**Client Contact:**
- Suvarna Capital Limited
- Registered Office: RS No.45, Plot No. 24, Sri Laxmi Nivas, 2nd Cross, Jaynagar, Saptapur, Dharwad 580001, Karnataka, India
- Contact: +91 98864 90099
- Email: info@suvarnacapital.com

**Project Manager:**
- Energy Future World Ltd
- Contact: Kiran Ravi Kumar

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | October 30, 2025 | AI Assistant | Initial comprehensive documentation |

---

*This document serves as the single source of truth for the Suvarna Capital Website Modernization Project. All project decisions and implementations should reference this document.*
