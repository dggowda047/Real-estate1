import type {
  User, Agency, Team, Lead, Property, PropertyMatch, SiteVisit, VisitStatus,
  Deal, Commission, Task, Communication, MessageTemplate,
  Integration, Notification, Customer, PropertyOwner, ChannelPartner,
  AuditLog, LeadActivity, LeadSource,
} from '@/types';

// ============================================================
// AGENCIES
// ============================================================
export const agencies: Agency[] = [
  {
    id: 'ag-1',
    name: 'Prestige Realty Bengaluru',
    email: 'contact@prestigerealty.in',
    phone: '+91 80 2345 6789',
    address: 'Prestige Tower, MG Road',
    city: 'Bengaluru',
    plan: 'ENTERPRISE',
    activeAgents: 10,
    maxAgents: 25,
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'ag-2',
    name: 'Whitefield Properties',
    email: 'info@whitefieldproperties.in',
    phone: '+91 80 3456 7890',
    address: 'ITPL Main Road, Whitefield',
    city: 'Bengaluru',
    plan: 'PRO',
    activeAgents: 6,
    maxAgents: 15,
    createdAt: '2024-03-20T09:00:00Z',
  },
  {
    id: 'ag-3',
    name: 'Sarjapur Estates',
    email: 'hello@sarjapurp estates.in',
    phone: '+91 80 4567 8901',
    address: 'Sarjapur Road, Wipro Junction',
    city: 'Bengaluru',
    plan: 'STARTER',
    activeAgents: 3,
    maxAgents: 5,
    createdAt: '2024-06-10T09:00:00Z',
  },
];

// ============================================================
// USERS
// ============================================================
export const users: User[] = [
  {
    id: 'u-1', name: 'Rahul Sharma', email: 'rahul@prestigerealty.in', phone: '+91 98450 12345',
    role: 'AGENCY_ADMIN', agencyId: 'ag-1', agencyName: 'Prestige Realty Bengaluru',
    active: true, createdAt: '2024-01-15T09:00:00Z', lastLoginAt: new Date().toISOString(),
  },
  {
    id: 'u-2', name: 'Priya Patel', email: 'priya@prestigerealty.in', phone: '+91 98450 23456',
    role: 'AGENT', agencyId: 'ag-1', agencyName: 'Prestige Realty Bengaluru',
    teamId: 't-1', teamName: 'Whitefield Team', active: true, createdAt: '2024-01-20T09:00:00Z',
    lastLoginAt: new Date().toISOString(),
  },
  {
    id: 'u-3', name: 'Arjun Reddy', email: 'arjun@prestigerealty.in', phone: '+91 98450 34567',
    role: 'AGENT', agencyId: 'ag-1', agencyName: 'Prestige Realty Bengaluru',
    teamId: 't-1', teamName: 'Whitefield Team', active: true, createdAt: '2024-02-01T09:00:00Z',
  },
  {
    id: 'u-4', name: 'Sneha Iyengar', email: 'sneha@prestigerealty.in', phone: '+91 98450 45678',
    role: 'AGENT', agencyId: 'ag-1', agencyName: 'Prestige Realty Bengaluru',
    teamId: 't-2', teamName: 'South Bengaluru Team', active: true, createdAt: '2024-02-15T09:00:00Z',
  },
  {
    id: 'u-5', name: 'Vikram Nair', email: 'vikram@prestigerealty.in', phone: '+91 98450 56789',
    role: 'TEAM_MANAGER', agencyId: 'ag-1', agencyName: 'Prestige Realty Bengaluru',
    teamId: 't-1', teamName: 'Whitefield Team', active: true, createdAt: '2024-01-18T09:00:00Z',
  },
  {
    id: 'u-6', name: 'Deepak Gowda', email: 'deepak@prestigerealty.in', phone: '+91 98450 67890',
    role: 'AGENT', agencyId: 'ag-1', agencyName: 'Prestige Realty Bengaluru',
    teamId: 't-2', teamName: 'South Bengaluru Team', active: true, createdAt: '2024-03-01T09:00:00Z',
  },
  {
    id: 'u-7', name: 'Ananya Krishnan', email: 'ananya@whitefieldproperties.in', phone: '+91 98450 78901',
    role: 'AGENCY_ADMIN', agencyId: 'ag-2', agencyName: 'Whitefield Properties',
    active: true, createdAt: '2024-03-20T09:00:00Z',
  },
  {
    id: 'u-8', name: 'Karthik Menon', email: 'karthik@whitefieldproperties.in', phone: '+91 98450 89012',
    role: 'AGENT', agencyId: 'ag-2', agencyName: 'Whitefield Properties',
    active: true, createdAt: '2024-03-25T09:00:00Z',
  },
  {
    id: 'u-9', name: 'Lakshmi Pillai', email: 'lakshmi@sarjapurp estates.in', phone: '+91 98450 90123',
    role: 'AGENCY_ADMIN', agencyId: 'ag-3', agencyName: 'Sarjapur Estates',
    active: true, createdAt: '2024-06-10T09:00:00Z',
  },
  {
    id: 'u-10', name: 'System Administrator', email: 'admin@estateos.com', phone: '+91 90000 00000',
    role: 'SUPER_ADMIN', agencyId: null, active: true, createdAt: '2024-01-01T09:00:00Z',
  },
];

// ============================================================
// TEAMS
// ============================================================
export const teams: Team[] = [
  { id: 't-1', name: 'Whitefield Team', agencyId: 'ag-1', managerId: 'u-5', managerName: 'Vikram Nair', memberCount: 3, createdAt: '2024-01-18T09:00:00Z' },
  { id: 't-2', name: 'South Bengaluru Team', agencyId: 'ag-1', managerId: 'u-1', managerName: 'Rahul Sharma', memberCount: 2, createdAt: '2024-02-01T09:00:00Z' },
];

// ============================================================
// HELPER DATA
// ============================================================
export const locations = [
  'Whitefield', 'Sarjapur Road', 'Electronic City', 'Varthur', 'Marathahalli',
  'HSR Layout', 'Bellandur', 'Hebbal', 'Yelahanka', 'Devanahalli',
  'JP Nagar', 'Banashankari', 'Indiranagar', 'Koramangala', 'Malleshwaram',
];

export const leadSourceLabels: Record<LeadSource, string> = {
  NOBROKER: 'NoBroker',
  '99ACRES': '99acres',
  MAGICBRICKS: 'MagicBricks',
  HOUSING_COM: 'Housing.com',
  FACEBOOK: 'Facebook Lead Ads',
  GOOGLE_ADS: 'Google Ads',
  WEBSITE: 'Website Form',
  WHATSAPP: 'WhatsApp',
  MANUAL: 'Manual Entry',
  CSV_IMPORT: 'CSV Import',
  REFERRAL: 'Referral',
  API: 'API Source',
};

// ============================================================
// PROPERTIES — 50 properties
// ============================================================
const propertyTypes = ['APARTMENT', 'VILLA', 'INDEPENDENT_HOUSE', 'PLOT', 'LAND', 'OFFICE', 'RETAIL'] as const;
const amenities = [
  'Swimming Pool', 'Gym', 'Clubhouse', 'Children\'s Play Area', 'Landscaped Gardens',
  '24/7 Security', 'Power Backup', 'Lift', 'CCTV', 'Fire Safety',
  'Car Parking', 'Visitor Parking', 'Intercom', 'Rainwater Harvesting',
  'Solar Panels', 'Jogging Track', 'Tennis Court', 'Basketball Court',
  'Multipurpose Hall', 'ATM', 'Convenience Store', 'Pharmacy',
];

const propertyTitles = [
  'Prestige Lakeside Habitat', 'Sobha Dream Acres', 'Brigade Cornerstone Utopia',
  'Godrej Air', 'Prestige Falcon City', 'Sobha Dream Gardens', 'Brigade Meadows',
  'Prestige Sunnyside', 'Sobha Hartland', 'Godrej Garden City', 'Prestige Jindal City',
  'Brigade Gateway', 'Sobha City', 'Prestige Willowdale', 'Godrej Reserve',
  'Prestige Park Grove', 'Sobha Dream Serene', 'Brigade Calibre', 'Prestige High Fields',
  'Godrej United', 'Prestige Waterford', 'Sobha International', 'Brigade Infinity',
  'Prestige Park Ridge', 'Godrej Air Platinum', 'Prestige Kew Gardens', 'Sobha Lakevista',
  'Brigade Cosmopolis', 'Prestige Dolce Vita', 'Godrej Splendour', 'Prestige Eden Park',
  'Sobha Galera', 'Brigade Jewel', 'Prestige Eternity', 'Godrej Prana',
  'Prestige Green Meadows', 'Sobha Seagull', 'Brigade Reflections', 'Prestige Makers',
  'Godrej 24', 'Prestige Raintree Park', 'Sobha Arena', 'Brigade Vantage',
  'Prestige Dolce Vista', 'Godrej Aqua', 'Prestige Ferns Residency', 'Sobha Dream Acres 2',
  'Brigade Palm Springs', 'Prestige De Marina', 'Godrej Sanctuary',
];

const agents = [
  { id: 'u-2', name: 'Priya Patel' },
  { id: 'u-3', name: 'Arjun Reddy' },
  { id: 'u-4', name: 'Sneha Iyengar' },
  { id: 'u-6', name: 'Deepak Gowda' },
];

function generateProperties(): Property[] {
  const properties: Property[] = [];
  for (let i = 0; i < 50; i++) {
    const type = propertyTypes[i % propertyTypes.length];
    const loc = locations[i % locations.length];
    const agent = agents[i % agents.length];
    const isResidential = type !== 'OFFICE' && type !== 'RETAIL';
    const price = type === 'PLOT' || type === 'LAND'
      ? 4000000 + (i * 250000)
      : isResidential
      ? 6500000 + (i * 850000)
      : 12000000 + (i * 1500000);
    const bedrooms = isResidential ? (2 + (i % 4)) : undefined;
    const status = i < 35 ? 'ACTIVE' : i < 40 ? 'SOLD' : i < 44 ? 'RENTED' : i < 47 ? 'HOLD' : 'DRAFT';

    properties.push({
      id: `prop-${i + 1}`,
      title: propertyTitles[i],
      propertyType: type,
      category: isResidential ? 'RESIDENTIAL' : 'COMMERCIAL',
      transactionType: i % 5 === 0 ? 'RENT' : 'SALE',
      status: status as Property['status'],
      price,
      expectedPrice: price + (i * 50000),
      rent: i % 5 === 0 ? 35000 + (i * 2000) : undefined,
      deposit: i % 5 === 0 ? 200000 + (i * 5000) : undefined,
      location: loc,
      address: `${100 + i}, ${loc}, Bengaluru, Karnataka 5600${(i % 9) + 1}`,
      latitude: 12.9352 + (i * 0.002),
      longitude: 77.6245 + (i * 0.002),
      bedrooms,
      bathrooms: bedrooms ? bedrooms - 1 : undefined,
      builtUpArea: 800 + (i * 50),
      carpetArea: 650 + (i * 40),
      plotArea: type === 'PLOT' || type === 'LAND' ? 1200 + (i * 50) : undefined,
      floor: isResidential ? (i % 15) + 1 : undefined,
      totalFloors: isResidential ? (i % 20) + 4 : undefined,
      age: i % 10,
      furnishing: i % 3 === 0 ? 'FULLY_FURNISHED' : i % 3 === 1 ? 'SEMI_FURNISHED' : 'UNFURNISHED',
      parking: 1 + (i % 3),
      amenities: amenities.slice(i % 5, (i % 5) + 8 + (i % 4)),
      availability: i % 3 === 0 ? 'Ready to Move' : i % 3 === 1 ? 'Under Construction' : 'Available from next month',
      ownerId: `owner-${(i % 10) + 1}`,
      ownerName: ['Ramesh Gupta', 'Suresh Jain', 'Mahesh Pai', 'Geeta Reddy', 'Anil Kumar',
                   'Sunitha Rao', 'Mohan Das', 'Rajesh Mehta', 'Kavitha Nair', 'Prakash Bhat'][i % 10],
      ownerPhone: `+91 99${10000000 + i * 1234}`,
      assignedAgentId: agent.id,
      assignedAgentName: agent.name,
      agencyId: 'ag-1',
      photos: [],
      description: `${propertyTitles[i]} is a premium ${type.toLowerCase().replace('_', ' ')} located in ${loc}, Bengaluru. ${bedrooms ? `${bedrooms} BHK` : ''} property with excellent connectivity and modern amenities.`,
      verification: {
        ownerVerified: i % 4 !== 0,
        propertyVerified: i % 3 !== 0,
        documentsVerified: i % 5 !== 0,
        locationVerified: i % 2 === 0,
        priceVerified: i % 3 === 0,
        availabilityVerified: i % 4 === 0,
      },
      createdAt: new Date(2024, 0, (i % 28) + 1).toISOString(),
      updatedAt: new Date(2024, (i % 9), (i % 28) + 1).toISOString(),
      views: Math.floor(Math.random() * 500) + 50,
      matches: Math.floor(Math.random() * 20),
    });
  }
  return properties;
}

export const properties: Property[] = generateProperties();

// ============================================================
// LEADS — 100 leads
// ============================================================
const leadNames = [
  'Amit Singh', 'Pooja Bhat', 'Rohan Verma', 'Kavya Reddy', 'Nikhil Joshi',
  'Shreya Kapoor', 'Tarun Agarwal', 'Megha Desai', 'Aditya Rao', 'Divya Menon',
  'Sahil Khanna', 'Isha Gupta', 'Manish Saxena', 'Nisha Pillai', 'Raj Malhotra',
  'Swati Jain', 'Gaurav Mishra', 'Pallavi Shetty', 'Sandeep Kumar', 'Tanvi Shah',
  'Ashwin Pai', 'Ritu Agarwal', 'Harish Iyer', 'Jyotsna Nair', 'Mohit Sehgal',
  'Nandini Rao', 'Pranav Bhat', 'Rashmi Joshi', 'Sanjay Gupta', 'Usha Kiran',
  'Vibhor Chauhan', 'Aarti Deshpande', 'Chetan Pai', 'Fiona Pereira', 'Ganesh Hegde',
  'Hema Reddy', 'Irfan Khan', 'Jagan Mohan', 'Kiran Patel', 'Leela Sharma',
  'Madhu Sudhan', 'Naveen Kumar', 'Omar Sheikh', 'Pavan Reddy', 'Quazi Ahmed',
  'Ramesh Iyengar', 'Sujatha Rao', 'Tushar Mehta', 'Uma Mahesh', 'Vinod Kamath',
];

const leadSources: LeadSource[] = [
  'NOBROKER', '99ACRES', 'MAGICBRICKS', 'HOUSING_COM', 'FACEBOOK',
  'GOOGLE_ADS', 'WEBSITE', 'WHATSAPP', 'MANUAL', 'REFERRAL',
];

const leadStatuses = [
  'NEW', 'CONTACTED', 'QUALIFIED', 'PROPERTY_SHARED', 'SITE_VISIT_SCHEDULED',
  'SITE_VISITED', 'NEGOTIATION', 'TOKEN_PAID', 'AGREEMENT', 'CLOSED', 'LOST', 'NURTURE',
] as const;

const leadRequirements = [
  '3 BHK Apartment in Whitefield', '2 BHK for Rent in HSR Layout',
  'Villa in Sarjapur Road', 'Plot in Devanahalli',
  '4 BHK in Koramangala', 'Office Space in Indiranagar',
  '2 BHK Apartment in Electronic City', 'Independent House in JP Nagar',
  '3 BHK in Marathahalli', '1 BHK for Rent in Bellandur',
];

function generateLeads(): Lead[] {
  const leads: Lead[] = [];
  for (let i = 0; i < 100; i++) {
    const name = leadNames[i % leadNames.length] + (i >= leadNames.length ? ` ${Math.floor(i / leadNames.length) + 1}` : '');
    const source = leadSources[i % leadSources.length];
    const status = leadStatuses[i % leadStatuses.length];
    const loc = locations[i % locations.length];
    const agent = agents[i % agents.length];
    const score = i % 7 === 0 ? 'HOT' : i % 3 === 0 ? 'WARM' : 'COLD';
    const scoreValue = score === 'HOT' ? 85 + (i % 15) : score === 'WARM' ? 55 + (i % 30) : 20 + (i % 35);
    const purpose = i % 10 < 7 ? 'BUY' : i % 10 < 9 ? 'RENT' : 'SELL';
    const ptype = propertyTypes[i % 5];
    const budget = purpose === 'RENT' ? 30000 + (i * 2000) : 5000000 + (i * 700000);
    const isDup = i % 17 === 0 && i > 0;

    const activities: LeadActivity[] = [
      {
        id: `act-${i}-1`, leadId: `lead-${i + 1}`, type: 'CREATED',
        description: `Lead captured from ${leadSourceLabels[source]}`,
        performedBy: 'System', timestamp: new Date(2024, (i % 9), (i % 28) + 1).toISOString(),
      },
    ];
    if (status !== 'NEW') {
      activities.push({
        id: `act-${i}-2`, leadId: `lead-${i + 1}`, type: 'CONTACTED',
        description: `Called customer - ${i % 3 === 0 ? 'Interested' : 'Will revert'}`,
        performedBy: agent.name, timestamp: new Date(2024, (i % 9), (i % 28) + 2).toISOString(),
      });
    }
    if (['QUALIFIED', 'PROPERTY_SHARED', 'SITE_VISIT_SCHEDULED', 'SITE_VISITED', 'NEGOTIATION', 'TOKEN_PAID', 'AGREEMENT', 'CLOSED'].includes(status)) {
      activities.push({
        id: `act-${i}-3`, leadId: `lead-${i + 1}`, type: 'QUALIFIED',
        description: 'Lead qualified - budget confirmed',
        performedBy: agent.name, timestamp: new Date(2024, (i % 9), (i % 28) + 3).toISOString(),
      });
    }
    if (['PROPERTY_SHARED', 'SITE_VISIT_SCHEDULED', 'SITE_VISITED', 'NEGOTIATION', 'TOKEN_PAID', 'AGREEMENT', 'CLOSED'].includes(status)) {
      activities.push({
        id: `act-${i}-4`, leadId: `lead-${i + 1}`, type: 'PROPERTY_SHARED',
        description: `Shared 3 properties in ${loc}`,
        performedBy: agent.name, timestamp: new Date(2024, (i % 9), (i % 28) + 4).toISOString(),
      });
    }

    leads.push({
      id: `lead-${i + 1}`,
      name,
      phone: `+91 98${445000000 + i * 12345}`,
      email: `${name.toLowerCase().replace(/[^a-z]/g, '.')}@email.com`,
      source,
      sourceLabel: leadSourceLabels[source],
      status: status as Lead['status'],
      score: score as Lead['score'],
      leadScoreValue: scoreValue,
      purpose: purpose as Lead['purpose'],
      requirement: {
        purpose: purpose as Lead['purpose'],
        category: ptype === 'OFFICE' || ptype === 'RETAIL' ? 'COMMERCIAL' : 'RESIDENTIAL',
        propertyType: ptype as Lead['requirement']['propertyType'],
        minBudget: Math.floor(budget * 0.8),
        maxBudget: Math.floor(budget * 1.2),
        preferredLocations: [loc, locations[(i + 1) % locations.length]],
        minBedrooms: 2,
        maxBedrooms: 4,
        furnishing: i % 2 === 0 ? 'SEMI_FURNISHED' : 'FULLY_FURNISHED',
        parking: true,
        amenities: ['Gym', 'Swimming Pool', '24/7 Security'],
        timeline: i % 3 === 0 ? '1 month' : i % 3 === 1 ? '3 months' : '6 months',
        financing: i % 2 === 0,
      },
      location: loc,
      budget,
      propertyType: ptype as Lead['propertyType'],
      bedrooms: 2 + (i % 3),
      assignedAgentId: agent.id,
      assignedAgentName: agent.name,
      agencyId: 'ag-1',
      lastActivity: new Date(2024, (i % 9), (i % 28) + 5).toISOString(),
      nextFollowUp: i % 4 === 0 ? new Date(2024, 9, ((i % 28) + 1)).toISOString() : undefined,
      notes: i % 5 === 0 ? `Customer looking for ${leadRequirements[i % leadRequirements.length]}` : '',
      tags: [score.toLowerCase(), source.toLowerCase()],
      isDuplicate: isDup,
      duplicateOf: isDup ? `lead-${i}` : undefined,
      createdAt: new Date(2024, (i % 9), (i % 28) + 1).toISOString(),
      updatedAt: new Date(2024, (i % 9), (i % 28) + 5).toISOString(),
      activities,
    });
  }
  return leads;
}

export const leads: Lead[] = generateLeads();

// ============================================================
// SITE VISITS — 20 visits
// ============================================================
const visitStatuses = ['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'] as const;

function generateVisits(): SiteVisit[] {
  const visits: SiteVisit[] = [];
  for (let i = 0; i < 20; i++) {
    const lead = leads[i * 3];
    const property = properties[i];
    const agent = agents[i % agents.length];
    const status = visitStatuses[i % visitStatuses.length];
    const date = new Date();
    date.setDate(date.getDate() + (i - 10));

    visits.push({
      id: `visit-${i + 1}`,
      leadId: lead.id,
      leadName: lead.name,
      leadPhone: lead.phone,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentId: agent.id,
      agentName: agent.name,
      agencyId: 'ag-1',
      date: date.toISOString().split('T')[0],
      time: ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'][i % 6],
      duration: '45 minutes',
      meetingPoint: `${property.location} Main Gate`,
      notes: i % 2 === 0 ? 'Customer interested in visiting during weekend' : '',
      status: status as VisitStatus,
      customerAttended: status === 'COMPLETED' ? true : undefined,
      agentAttended: status === 'COMPLETED' ? true : undefined,
      feedback: status === 'COMPLETED' ? ['Very positive, asking for price negotiation', 'Liked the property, wants to discuss with family', 'Not satisfied with location', 'Excellent response, ready to proceed'][i % 4] : undefined,
      rating: status === 'COMPLETED' ? 3 + (i % 3) : undefined,
      nextAction: status === 'COMPLETED' ? 'Schedule follow-up call' : undefined,
      createdAt: new Date(2024, (i % 9), (i % 28) + 1).toISOString(),
    });
  }
  return visits;
}

export const siteVisits: SiteVisit[] = generateVisits();

// ============================================================
// DEALS — 10 deals
// ============================================================
const dealStages = ['NEW_OPPORTUNITY', 'QUALIFIED', 'PROPERTY_SHORTLISTED', 'SITE_VISIT', 'NEGOTIATION', 'TOKEN', 'AGREEMENT', 'REGISTRATION', 'CLOSED_WON', 'CLOSED_LOST'] as const;

function generateDeals(): Deal[] {
  const deals: Deal[] = [];
  for (let i = 0; i < 10; i++) {
    const lead = leads[i * 5];
    const property = properties[i * 3];
    const agent = agents[i % agents.length];
    const stage = dealStages[i];
    const dealValue = property.price;
    const commPercent = 1 + (i % 3);

    deals.push({
      id: `deal-${i + 1}`,
      title: `${lead.name} - ${property.title}`,
      leadId: lead.id,
      leadName: lead.name,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentId: agent.id,
      agentName: agent.name,
      agencyId: 'ag-1',
      stage: stage as Deal['stage'],
      dealValue,
      expectedCloseDate: new Date(2024, 11, (i + 5) * 2).toISOString().split('T')[0],
      probability: stage === 'CLOSED_WON' ? 100 : stage === 'CLOSED_LOST' ? 0 : 20 + (i * 8),
      commissionPercent: commPercent,
      commissionAmount: Math.floor((dealValue * commPercent) / 100),
      tokenAmount: stage === 'TOKEN' || stage === 'AGREEMENT' || stage === 'REGISTRATION' || stage === 'CLOSED_WON' ? 100000 : undefined,
      agreementDate: stage === 'AGREEMENT' || stage === 'REGISTRATION' || stage === 'CLOSED_WON' ? new Date().toISOString().split('T')[0] : undefined,
      notes: i % 2 === 0 ? 'Customer negotiating for better price' : 'Smooth progression through pipeline',
      activities: [
        {
          id: `dact-${i}-1`, dealId: `deal-${i + 1}`, type: 'CREATED',
          description: `Deal created from lead ${lead.name}`, performedBy: agent.name,
          timestamp: new Date(2024, (i % 6), (i + 5)).toISOString(),
        },
        {
          id: `dact-${i}-2`, dealId: `deal-${i + 1}`, type: 'STAGE_CHANGE',
          description: `Moved to ${stage.replace(/_/g, ' ')}`, performedBy: agent.name,
          timestamp: new Date(2024, (i % 6) + 1, (i + 10)).toISOString(),
        },
      ],
      createdAt: new Date(2024, (i % 6), (i + 5)).toISOString(),
      updatedAt: new Date(2024, (i % 6) + 2, (i + 15)).toISOString(),
      closedAt: stage === 'CLOSED_WON' || stage === 'CLOSED_LOST' ? new Date(2024, (i % 6) + 3, (i + 20)).toISOString() : undefined,
    });
  }
  return deals;
}

export const deals: Deal[] = generateDeals();

// ============================================================
// COMMISSIONS
// ============================================================
function generateCommissions(): Commission[] {
  return deals
    .filter(d => d.stage === 'CLOSED_WON' || d.stage === 'AGREEMENT' || d.stage === 'REGISTRATION' || d.stage === 'TOKEN')
    .map((d, i) => {
      const total = d.commissionAmount;
      const agentPct = 50;
      const agencyPct = 40;
      const refPct = 10;
      const tax = Math.floor(total * 0.18);
      return {
        id: `comm-${i + 1}`,
        dealId: d.id,
        dealTitle: d.title,
        dealValue: d.dealValue,
        commissionPercent: d.commissionPercent,
        commissionType: 'PERCENTAGE' as const,
        totalCommission: total,
        agentShare: Math.floor(total * agentPct / 100),
        agentPercent: agentPct,
        agencyShare: Math.floor(total * agencyPct / 100),
        agencyPercent: agencyPct,
        referralShare: Math.floor(total * refPct / 100),
        referralPercent: refPct,
        taxAmount: tax,
        payableAmount: total - tax,
        paidAmount: d.stage === 'CLOSED_WON' ? total - tax : 0,
        status: d.stage === 'CLOSED_WON' ? 'PAID' as const : 'PENDING' as const,
        paymentDate: d.stage === 'CLOSED_WON' ? d.closedAt : undefined,
        agencyId: 'ag-1',
        agentId: d.agentId,
        agentName: d.agentName,
        createdAt: d.createdAt,
      };
    });
}

export const commissions: Commission[] = generateCommissions();

// ============================================================
// TASKS
// ============================================================
const taskTitles = [
  'Follow up with lead on property interest',
  'Call back regarding budget clarification',
  'Schedule site visit for Whitefield property',
  'Send property photos to customer',
  'Update lead status after site visit',
  'Collect token amount from customer',
  'Prepare agreement draft',
  'Coordinate with owner for verification',
  'Share new listings with hot lead',
  'Send WhatsApp update on property availability',
  'Negotiate price with property owner',
  'Confirm site visit attendance',
  'Upload property documents',
  'Review and qualify new leads',
  'Prepare commission split calculation',
  'Send monthly report to agency admin',
  'Update property photos and description',
  'Follow up on rental agreement renewal',
  'Check duplicate leads in inbox',
  'Call referral partner for new leads',
];

function generateTasks(): Task[] {
  const tasks: Task[] = [];
  for (let i = 0; i < 20; i++) {
    const agent = agents[i % agents.length];
    const date = new Date();
    date.setDate(date.getDate() + (i - 5));
    const isOverdue = i < 3;
    const isCompleted = i >= 15;

    tasks.push({
      id: `task-${i + 1}`,
      title: taskTitles[i],
      description: `Detailed task: ${taskTitles[i]}`,
      assigneeId: agent.id,
      assigneeName: agent.name,
      dueDate: date.toISOString().split('T')[0],
      dueTime: ['09:00', '10:30', '12:00', '14:00', '16:00', '17:30'][i % 6],
      priority: i % 4 === 0 ? 'URGENT' : i % 3 === 0 ? 'HIGH' : i % 2 === 0 ? 'MEDIUM' : 'LOW',
      status: isCompleted ? 'COMPLETED' : isOverdue ? 'OVERDUE' : i % 3 === 0 ? 'IN_PROGRESS' : 'PENDING',
      relatedLeadId: i < 10 ? leads[i * 3].id : undefined,
      relatedLeadName: i < 10 ? leads[i * 3].name : undefined,
      relatedPropertyId: i >= 5 && i < 15 ? properties[i].id : undefined,
      relatedPropertyName: i >= 5 && i < 15 ? properties[i].title : undefined,
      relatedDealId: i >= 12 ? deals[i % 10].id : undefined,
      relatedDealName: i >= 12 ? deals[i % 10].title : undefined,
      reminder: true,
      agencyId: 'ag-1',
      createdAt: new Date(2024, (i % 9), (i % 28) + 1).toISOString(),
      completedAt: isCompleted ? new Date().toISOString() : undefined,
    });
  }
  return tasks;
}

export const tasks: Task[] = generateTasks();

// ============================================================
// COMMUNICATIONS
// ============================================================
function generateCommunications(): Communication[] {
  const channels = ['CALL', 'EMAIL', 'WHATSAPP', 'SMS'] as const;
  const comms: Communication[] = [];
  for (let i = 0; i < 30; i++) {
    const lead = leads[i * 3];
    const agent = agents[i % agents.length];
    const channel = channels[i % channels.length];
    comms.push({
      id: `comm-${i + 1}`,
      leadId: lead.id,
      leadName: lead.name,
      channel,
      direction: i % 4 === 0 ? 'INBOUND' : 'OUTBOUND',
      subject: channel === 'EMAIL'
        ? ['Property details for your consideration', 'Site visit confirmation', 'Price update on shortlisted property', 'Follow-up on your requirement'][i % 4]
        : channel === 'WHATSAPP'
        ? ['Sent property photos', 'Shared location map', 'Reminder for tomorrow visit', 'New property available'][i % 4]
        : channel === 'CALL'
        ? ['Initial contact call', 'Follow-up call', 'Site visit discussion', 'Negotiation call'][i % 4]
        : ['Visit reminder', 'Welcome message', 'Property alert', 'Status update'][i % 4],
      content: `Communication with ${lead.name} regarding ${lead.requirement.propertyType.replace('_', ' ')} in ${lead.location}`,
      status: i % 10 === 0 ? 'FAILED' : i % 5 === 0 ? 'READ' : i % 3 === 0 ? 'DELIVERED' : 'SENT',
      agentId: agent.id,
      agentName: agent.name,
      agencyId: 'ag-1',
      timestamp: new Date(2024, (i % 9), (i % 28) + 1, (i % 12) + 9).toISOString(),
    });
  }
  return comms;
}

export const communications: Communication[] = generateCommunications();

// ============================================================
// MESSAGE TEMPLATES
// ============================================================
export const messageTemplates: MessageTemplate[] = [
  {
    id: 'tpl-1', name: 'New Property Alert', channel: 'WHATSAPP',
    subject: 'New Property Available',
    body: 'Hi {{customer_name}},\n\nA new property matching your requirement is now available:\n\nProperty: {{property_title}}\nLocation: {{property_location}}\nPrice: {{property_price}}\nType: {{property_type}}\n\nContact us for more details or to schedule a visit.\n\nRegards,\n{{agent_name}}',
    variables: ['customer_name', 'property_title', 'property_location', 'property_price', 'property_type', 'agent_name'],
    agencyId: 'ag-1', createdAt: '2024-01-20T09:00:00Z',
  },
  {
    id: 'tpl-2', name: 'Site Visit Confirmation', channel: 'EMAIL',
    subject: 'Site Visit Confirmed - {{property_title}}',
    body: 'Dear {{customer_name}},\n\nYour site visit has been confirmed:\n\nProperty: {{property_title}}\nDate: {{visit_date}}\nTime: {{visit_time}}\nMeeting Point: {{meeting_point}}\nAgent: {{agent_name}}\n\nPlease carry a valid ID proof.\n\nRegards,\n{{agency_name}}',
    variables: ['customer_name', 'property_title', 'visit_date', 'visit_time', 'meeting_point', 'agent_name', 'agency_name'],
    agencyId: 'ag-1', createdAt: '2024-01-20T09:00:00Z',
  },
  {
    id: 'tpl-3', name: 'Site Visit Reminder', channel: 'SMS',
    subject: 'Visit Reminder',
    body: 'Reminder: Site visit tomorrow at {{visit_time}} for {{property_title}}. Agent {{agent_name}} will meet you at {{meeting_point}}. Contact: {{agent_phone}}',
    variables: ['visit_time', 'property_title', 'agent_name', 'meeting_point', 'agent_phone'],
    agencyId: 'ag-1', createdAt: '2024-01-20T09:00:00Z',
  },
  {
    id: 'tpl-4', name: 'Follow-up Call', channel: 'CALL',
    subject: 'Follow-up Call',
    body: 'Hi {{customer_name}}, this is {{agent_name}} from {{agency_name}}. I wanted to follow up on the properties we discussed. Are you available for a quick call?',
    variables: ['customer_name', 'agent_name', 'agency_name'],
    agencyId: 'ag-1', createdAt: '2024-01-20T09:00:00Z',
  },
  {
    id: 'tpl-5', name: 'Price Update Notification', channel: 'WHATSAPP',
    subject: 'Price Update',
    body: 'Hi {{customer_name}},\n\nPrice update for {{property_title}}:\n\nNew Price: {{new_price}}\nPrevious Price: {{old_price}}\n\nContact us if interested.\n\nRegards,\n{{agent_name}}',
    variables: ['customer_name', 'property_title', 'new_price', 'old_price', 'agent_name'],
    agencyId: 'ag-1', createdAt: '2024-01-20T09:00:00Z',
  },
  {
    id: 'tpl-6', name: 'Deal Confirmation', channel: 'EMAIL',
    subject: 'Deal Confirmed - {{property_title}}',
    body: 'Dear {{customer_name}},\n\nCongratulations! Your deal for {{property_title}} has been confirmed.\n\nDeal Value: {{deal_value}}\nToken Amount: {{token_amount}}\nNext Steps: {{next_steps}}\n\nRegards,\n{{agency_name}}',
    variables: ['customer_name', 'property_title', 'deal_value', 'token_amount', 'next_steps', 'agency_name'],
    agencyId: 'ag-1', createdAt: '2024-01-20T09:00:00Z',
  },
];

// ============================================================
// INTEGRATIONS
// ============================================================
export const integrations: Integration[] = [
  { id: 'int-1', name: 'NoBroker', category: 'LEAD_SOURCE', description: 'Import leads from NoBroker portal', status: 'CONNECTED', logo: 'building', lastSync: new Date().toISOString(), leadCount: 42, apiRequired: false, configFields: [{ label: 'API Key', key: 'apiKey', type: 'password', required: true }, { label: 'City', key: 'city', type: 'text', required: true }] },
  { id: 'int-2', name: '99acres', category: 'LEAD_SOURCE', description: 'Import leads from 99acres', status: 'API_REQUIRED', logo: 'building-2', leadCount: 0, apiRequired: true, configFields: [{ label: 'Partner ID', key: 'partnerId', type: 'text', required: true }, { label: 'API Secret', key: 'apiSecret', type: 'password', required: true }] },
  { id: 'int-3', name: 'MagicBricks', category: 'LEAD_SOURCE', description: 'Import leads from MagicBricks', status: 'API_REQUIRED', logo: 'building-2', leadCount: 0, apiRequired: true, configFields: [{ label: 'Advertiser ID', key: 'advertiserId', type: 'text', required: true }, { label: 'Auth Token', key: 'authToken', type: 'password', required: true }] },
  { id: 'int-4', name: 'Housing.com', category: 'LEAD_SOURCE', description: 'Import leads from Housing.com', status: 'PENDING', logo: 'home', leadCount: 0, apiRequired: true, configFields: [{ label: 'Subscription ID', key: 'subscriptionId', type: 'text', required: true }] },
  { id: 'int-5', name: 'Facebook Lead Ads', category: 'LEAD_SOURCE', description: 'Capture leads from Facebook ad campaigns', status: 'CONNECTED', logo: 'facebook', lastSync: new Date().toISOString(), leadCount: 18, apiRequired: false, configFields: [{ label: 'Page ID', key: 'pageId', type: 'text', required: true }, { label: 'Access Token', key: 'accessToken', type: 'password', required: true }] },
  { id: 'int-6', name: 'Google Ads', category: 'LEAD_SOURCE', description: 'Capture leads from Google ad campaigns', status: 'CONNECTED', logo: 'search', lastSync: new Date().toISOString(), leadCount: 25, apiRequired: false, configFields: [{ label: 'Customer ID', key: 'customerId', type: 'text', required: true }, { label: 'Developer Token', key: 'devToken', type: 'password', required: true }] },
  { id: 'int-7', name: 'WhatsApp Business', category: 'COMMUNICATION', description: 'Send WhatsApp messages via Business API', status: 'PENDING', logo: 'message-circle', apiRequired: true, configFields: [{ label: 'Phone Number ID', key: 'phoneId', type: 'text', required: true }, { label: 'Access Token', key: 'accessToken', type: 'password', required: true }] },
  { id: 'int-8', name: 'Email (SMTP)', category: 'COMMUNICATION', description: 'Send emails via SMTP', status: 'CONNECTED', logo: 'mail', apiRequired: false, configFields: [{ label: 'SMTP Host', key: 'host', type: 'text', required: true }, { label: 'Username', key: 'username', type: 'text', required: true }, { label: 'Password', key: 'password', type: 'password', required: true }] },
  { id: 'int-9', name: 'Google Calendar', category: 'CALENDAR', description: 'Sync site visits and tasks with Google Calendar', status: 'NOT_CONNECTED', logo: 'calendar', apiRequired: false, configFields: [{ label: 'Client ID', key: 'clientId', type: 'text', required: true }, { label: 'Client Secret', key: 'clientSecret', type: 'password', required: true }] },
  { id: 'int-10', name: 'Google Maps', category: 'MAPS', description: 'Display property locations on maps', status: 'CONNECTED', logo: 'map-pin', apiRequired: false, configFields: [{ label: 'API Key', key: 'apiKey', type: 'password', required: true }] },
  { id: 'int-11', name: 'Razorpay', category: 'PAYMENT', description: 'Accept payments for token, commission, and subscriptions', status: 'NOT_CONNECTED', logo: 'credit-card', apiRequired: false, configFields: [{ label: 'Key ID', key: 'keyId', type: 'text', required: true }, { label: 'Key Secret', key: 'keySecret', type: 'password', required: true }] },
  { id: 'int-12', name: 'Website Forms', category: 'LEAD_SOURCE', description: 'Capture leads from your website forms', status: 'CONNECTED', logo: 'globe', lastSync: new Date().toISOString(), leadCount: 15, apiRequired: false, configFields: [{ label: 'Webhook URL', key: 'webhookUrl', type: 'text', required: true }] },
];

// ============================================================
// NOTIFICATIONS
// ============================================================
export const notifications: Notification[] = [
  { id: 'n-1', title: 'New Lead Assigned', message: 'Amit Singh from NoBroker has been assigned to you', type: 'LEAD', read: false, link: '/leads', timestamp: new Date(Date.now() - 3600000).toISOString(), userId: 'u-2' },
  { id: 'n-2', title: 'Site Visit Tomorrow', message: 'Visit scheduled for Prestige Lakeside Habitat at 10:30 AM', type: 'VISIT', read: false, link: '/visits', timestamp: new Date(Date.now() - 7200000).toISOString(), userId: 'u-2' },
  { id: 'n-3', title: 'Deal Stage Updated', message: 'Deal moved to Negotiation stage', type: 'DEAL', read: false, link: '/deals', timestamp: new Date(Date.now() - 10800000).toISOString(), userId: 'u-2' },
  { id: 'n-4', title: 'Task Overdue', message: 'Follow up with lead on property interest is overdue', type: 'TASK', read: true, link: '/tasks', timestamp: new Date(Date.now() - 86400000).toISOString(), userId: 'u-2' },
  { id: 'n-5', title: 'Commission Paid', message: 'Commission of Rs. 54,000 has been paid for Deal #1', type: 'COMMISSION', read: true, link: '/commissions', timestamp: new Date(Date.now() - 172800000).toISOString(), userId: 'u-2' },
  { id: 'n-6', title: 'New Property Match', message: '95% match found for Pooja Bhat - Prestige Lakeside Habitat', type: 'LEAD', read: false, link: '/matching', timestamp: new Date(Date.now() - 1800000).toISOString(), userId: 'u-2' },
];

// ============================================================
// CUSTOMERS — 30
// ============================================================
function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  for (let i = 0; i < 30; i++) {
    const lead = leads[i * 3];
    const agent = agents[i % agents.length];
    customers.push({
      id: `cust-${i + 1}`,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      type: i % 4 === 0 ? 'TENANT' : i % 5 === 0 ? 'SELLER' : i % 6 === 0 ? 'LANDLORD' : 'BUYER',
      budget: lead.budget,
      preferredLocations: lead.requirement.preferredLocations,
      propertyType: lead.propertyType,
      purpose: lead.purpose,
      assignedAgentId: agent.id,
      assignedAgentName: agent.name,
      agencyId: 'ag-1',
      leadCount: 1 + (i % 3),
      visitCount: i % 4,
      dealCount: i % 10 === 0 ? 1 : 0,
      createdAt: lead.createdAt,
      notes: i % 3 === 0 ? 'VIP customer - high budget' : '',
    });
  }
  return customers;
}

export const customers: Customer[] = generateCustomers();

// ============================================================
// PROPERTY OWNERS — 10
// ============================================================
function generateOwners(): PropertyOwner[] {
  const ownerNames = ['Ramesh Gupta', 'Suresh Jain', 'Mahesh Pai', 'Geeta Reddy', 'Anil Kumar',
                       'Sunitha Rao', 'Mohan Das', 'Rajesh Mehta', 'Kavitha Nair', 'Prakash Bhat'];
  return ownerNames.map((name, i) => {
    const ownerProps = properties.filter(p => p.ownerName === name);
    return {
      id: `owner-${i + 1}`,
      name,
      phone: `+91 99${10000000 + i * 1234}`,
      email: `${name.toLowerCase().replace(/[^a-z]/g, '.')}@email.com`,
      propertyCount: ownerProps.length,
      totalPropertyValue: ownerProps.reduce((sum, p) => sum + p.price, 0),
      agencyId: 'ag-1',
      properties: ownerProps.map(p => p.id),
      verified: i % 3 !== 0,
      createdAt: new Date(2024, 0, (i + 1) * 3).toISOString(),
    };
  });
}

export const propertyOwners: PropertyOwner[] = generateOwners();

// ============================================================
// CHANNEL PARTNERS — 5
// ============================================================
export const channelPartners: ChannelPartner[] = [
  { id: 'cp-1', name: 'Srikanth Reddy', company: 'Reddy Realty Partners', phone: '+91 98450 11111', email: 'srikanth@reddyrealty.in', referralCount: 15, activeDeals: 3, totalCommission: 180000, agencyId: 'ag-1', createdAt: '2024-02-01T09:00:00Z' },
  { id: 'cp-2', name: 'Fatima Sheikh', company: 'Sheikh Property Advisors', phone: '+91 98450 22222', email: 'fatima@sheikhadvisors.in', referralCount: 8, activeDeals: 2, totalCommission: 95000, agencyId: 'ag-1', createdAt: '2024-03-01T09:00:00Z' },
  { id: 'cp-3', name: 'Thomas George', company: 'George Real Estate Consulting', phone: '+91 98450 33333', email: 'thomas@georgerec.in', referralCount: 12, activeDeals: 1, totalCommission: 120000, agencyId: 'ag-1', createdAt: '2024-02-15T09:00:00Z' },
  { id: 'cp-4', name: 'Vinayak Joshi', company: 'Joshi Property Solutions', phone: '+91 98450 44444', email: 'vinayak@joships.in', referralCount: 6, activeDeals: 0, totalCommission: 60000, agencyId: 'ag-1', createdAt: '2024-04-01T09:00:00Z' },
  { id: 'cp-5', name: 'Zara Khan', company: 'Khan Real Estate Referrals', phone: '+91 98450 55555', email: 'zara@khanreferrals.in', referralCount: 10, activeDeals: 2, totalCommission: 110000, agencyId: 'ag-1', createdAt: '2024-03-20T09:00:00Z' },
];

// ============================================================
// AUDIT LOGS
// ============================================================
function generateAuditLogs(): AuditLog[] {
  const actions = [
    { action: 'CREATE', entity: 'Lead', details: 'Created new lead: Amit Singh' },
    { action: 'UPDATE', entity: 'Property', details: 'Updated property price: Prestige Lakeside Habitat' },
    { action: 'DELETE', entity: 'Task', details: 'Deleted task: Follow-up call' },
    { action: 'ASSIGN', entity: 'Lead', details: 'Assigned lead to Priya Patel' },
    { action: 'STATUS_CHANGE', entity: 'Deal', details: 'Changed deal stage from Negotiation to Token' },
    { action: 'LOGIN', entity: 'User', details: 'User logged in' },
    { action: 'CREATE', entity: 'Property', details: 'Created new property: Sobha Dream Acres' },
    { action: 'UPDATE', entity: 'Lead', details: 'Updated lead status to Qualified' },
    { action: 'MERGE', entity: 'Lead', details: 'Merged duplicate leads' },
    { action: 'CREATE', entity: 'SiteVisit', details: 'Scheduled site visit for Prestige Falcon City' },
  ];
  return actions.map((a, i) => ({
    id: `audit-${i + 1}`,
    userId: agents[i % agents.length].id,
    userName: agents[i % agents.length].name,
    action: a.action,
    entity: a.entity,
    entityId: `${a.entity.toLowerCase()}-${i + 1}`,
    details: a.details,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    agencyId: 'ag-1',
  }));
}

export const auditLogs: AuditLog[] = generateAuditLogs();

// ============================================================
// PROPERTY MATCHES — Generated dynamically by matching engine
// ============================================================
function generateMatches(): PropertyMatch[] {
  const matches: PropertyMatch[] = [];
  const topLeads = leads.filter(l => l.score === 'HOT').slice(0, 15);

  topLeads.forEach((lead, i) => {
    const matchingProps = properties.filter(p =>
      p.location === lead.location &&
      p.propertyType === lead.propertyType &&
      p.price >= lead.requirement.minBudget * 0.7 &&
      p.price <= lead.requirement.maxBudget * 1.3
    );

    matchingProps.slice(0, 3).forEach((prop, j) => {
      const reasons: string[] = [];
      const mismatches: string[] = [];
      let matchScore = 0;

      if (prop.location === lead.location) { reasons.push(`Location: ${lead.location}`); matchScore += 20; }
      else mismatches.push(`Location: ${prop.location} vs ${lead.location}`);

      if (prop.price >= lead.requirement.minBudget && prop.price <= lead.requirement.maxBudget) {
        reasons.push(`Budget: ${formatINR(prop.price)}`); matchScore += 25;
      } else if (prop.price >= lead.requirement.minBudget * 0.8 && prop.price <= lead.requirement.maxBudget * 1.2) {
        reasons.push(`Budget: Close match`); matchScore += 15;
      } else mismatches.push(`Budget: ${formatINR(prop.price)}`);

      if (prop.propertyType === lead.propertyType) { reasons.push(`Type: ${prop.propertyType.replace('_', ' ')}`); matchScore += 20; }
      else mismatches.push(`Type: ${prop.propertyType.replace('_', ' ')}`);

      if (prop.bedrooms && lead.bedrooms && prop.bedrooms === lead.bedrooms) { reasons.push(`${prop.bedrooms} BHK`); matchScore += 15; }
      else if (prop.bedrooms && lead.bedrooms && Math.abs(prop.bedrooms - lead.bedrooms) <= 1) { reasons.push(`Bedrooms: Close match`); matchScore += 8; }
      else mismatches.push(`Bedrooms: ${prop.bedrooms || 'N/A'}`);

      if (prop.availability === 'Ready to Move' && lead.requirement.timeline === '1 month') { reasons.push('Ready to Move'); matchScore += 10; }
      else if (prop.availability === 'Ready to Move') { reasons.push('Ready to Move'); matchScore += 5; }

      if (prop.parking && lead.requirement.parking) { reasons.push('Parking Available'); matchScore += 5; }

      const sharedAmenities = prop.amenities.filter(a => lead.requirement.amenities?.includes(a));
      if (sharedAmenities.length > 0) { reasons.push(`${sharedAmenities.length} matching amenities`); matchScore += 5; }

      matches.push({
        id: `match-${i * 3 + j + 1}`,
        leadId: lead.id,
        leadName: lead.name,
        propertyId: prop.id,
        propertyTitle: prop.title,
        propertyLocation: prop.location,
        propertyPrice: prop.price,
        matchPercentage: Math.min(matchScore, 99),
        matchReasons: reasons,
        mismatchReasons: mismatches,
        status: j === 0 ? 'SHARED' : 'NEW',
        createdAt: new Date(Date.now() - (i * 3 + j) * 3600000).toISOString(),
      });
    });
  });

  return matches;
}

export const propertyMatches: PropertyMatch[] = generateMatches();

// ============================================================
// HELPERS
// ============================================================
export function formatINR(amount: number): string {
  if (amount >= 10000000) return `Rs. ${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(0)}K`;
  return `Rs. ${amount}`;
}

export function formatINRFull(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' +
    date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(hours / 24);

  if (days > 30) return formatDate(dateStr);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  const mins = Math.floor(diff / 60000);
  if (mins > 0) return `${mins}m ago`;
  return 'just now';
}

export function isOverdue(dateStr: string): boolean {
  return new Date(dateStr) < new Date(new Date().toDateString());
}
