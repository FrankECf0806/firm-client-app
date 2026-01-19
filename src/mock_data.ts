import { Case } from "./types/case";
import { Client } from "./types/client";
import { Invoice } from "./types/invoice";
import { Meeting } from "./types/meeting";
import { Document } from "./types/document";

export const user = {
  firstName: "Fernando",
  lastName: "Cruz",
  role: "ATTORNEY",
  src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
};

export const firm = {
  id: "firm_123",
  name: "LawFirm",
};

export const companyData = {
  id: "company_456",
  name: "TechCorp",
  log: "https://techcorp.com/logo.png",
  description:
    "TechCorp is a leading technology company specializing in innovative solutions.",
  shortDescription: "Leading technology solutions provider.",
  branding: "Process Manager",
  address: "123 Tech Street, Silicon Valley, CA",
  phone: "+1 (555) 123-4567",
  email: "info@techcorp.com",
};
export enum CaseTypes {
  CIVIL_LITIGATION = "Civil Litigation",
  CORPORATE = "Corporate",
  CRIMINAL_DEFENSE = "Criminal Defense",
  ESTATE_PLANNING = "Estate Planning",
  FAMILY_LAW = "Family Law",
  INMIGRATION = "Immigration",
  INTELLECTUAL_PROPERTY = "Intellectual Property",
  REAL_ESTATE = "Real Estate",
}

export enum PriorityLevels {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export const mockCases: Case[] = [
  {
    id: "1",
    title: "Smith vs. Johnson Corp",
    client: "Robert Smith",
    clientId: "c1",
    status: "active",
    practiceArea: "Civil Litigation",
    openDate: "2024-08-15",
    nextDeadline: "2024-12-28",
    description:
      "Civil litigation case involving breach of contract dispute with Johnson Corporation.",
    notes: [
      {
        id: "n1",
        content:
          "Initial consultation completed. Client provided all relevant documents.",
        timestamp: "2024-08-15T10:00:00",
        author: "John Attorney",
      },
      {
        id: "n2",
        content: "Filed initial complaint with the court.",
        timestamp: "2024-08-20T14:30:00",
        author: "John Attorney",
      },
    ],
  },
  {
    id: "2",
    title: "Estate of Williams",
    client: "Sarah Williams",
    clientId: "c2",
    status: "pending",
    practiceArea: "Estate Planning",
    openDate: "2024-09-01",
    nextDeadline: "2024-12-30",
    description:
      "Estate planning and will preparation for the Williams family.",
    notes: [],
  },
  {
    id: "3",
    title: "Davis Corp Merger",
    client: "Davis Corporation",
    clientId: "c3",
    status: "active",
    practiceArea: "Corporate Law",
    openDate: "2024-07-10",
    nextDeadline: "2025-01-15",
    description:
      "Handling merger and acquisition documentation for Davis Corporation.",
    notes: [],
  },
  {
    id: "4",
    title: "Thompson Divorce",
    client: "Michael Thompson",
    clientId: "c4",
    status: "closed",
    practiceArea: "Family Law",
    openDate: "2024-03-20",
    nextDeadline: "2024-11-30",
    description: "Divorce proceedings and asset division for Michael Thompson.",
    notes: [],
  },
  {
    id: "5",
    title: "Garcia Immigration",
    client: "Maria Garcia",
    clientId: "c5",
    status: "active",
    practiceArea: "Immigration",
    openDate: "2024-10-05",
    nextDeadline: "2025-02-20",
    description: "Immigration visa application and documentation.",
    notes: [],
  },
  {
    id: "6",
    title: "Brown Property Sale",
    client: "Emily Brown",
    clientId: "c6",
    status: "pending",
    practiceArea: "Real Estate",
    openDate: "2024-11-01",
    nextDeadline: "2025-01-10",
    description: "Commercial property sale documentation and closing.",
    notes: [],
  },
];

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Robert Smith",
    company: "Smith Enterprises",
    email: "robert@smithent.com",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    casesCount: 2,
    status: "active",
  },
  {
    id: "c2",
    name: "Sarah Williams",
    company: "Williams Family Trust",
    email: "sarah.williams@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    casesCount: 1,
    status: "active",
  },
  {
    id: "c3",
    name: "Davis Corporation",
    company: "Davis Corporation",
    email: "legal@daviscorp.com",
    phone: "(555) 345-6789",
    address: "789 Corporate Blvd, Chicago, IL 60601",
    casesCount: 1,
    status: "active",
  },
  {
    id: "c4",
    name: "Michael Thompson",
    company: "",
    email: "michael.t@email.com",
    phone: "(555) 456-7890",
    address: "321 Pine St, Houston, TX 77001",
    casesCount: 1,
    status: "inactive",
  },
  {
    id: "c5",
    name: "Maria Garcia",
    company: "",
    email: "maria.garcia@email.com",
    phone: "(555) 567-8901",
    address: "654 Elm St, Phoenix, AZ 85001",
    casesCount: 1,
    status: "active",
  },
  {
    id: "c6",
    name: "Emily Brown",
    company: "Brown Investments",
    email: "emily@browninvest.com",
    phone: "(555) 678-9012",
    address: "987 Maple Dr, Philadelphia, PA 19101",
    casesCount: 1,
    status: "active",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv1",
    invoiceNumber: "INV-2024-001",
    clientName: "Robert Smith",
    clientId: "c1",
    caseReference: "Smith vs. Johnson Corp",
    caseId: "1",
    amount: 5500,
    issueDate: "2024-11-15",
    dueDate: "2024-12-15",
    status: "paid",
    lineItems: [
      {
        id: "li1",
        description: "Initial Consultation",
        hours: 2,
        rate: 250,
        amount: 500,
      },
      {
        id: "li2",
        description: "Document Review",
        hours: 10,
        rate: 200,
        amount: 2000,
      },
      {
        id: "li3",
        description: "Court Filing Preparation",
        hours: 15,
        rate: 200,
        amount: 3000,
      },
    ],
    subtotal: 5500,
    tax: 0,
    discount: 0,
    total: 5500,
    notes: "Payment received via wire transfer.",
  },
  {
    id: "inv2",
    invoiceNumber: "INV-2024-002",
    clientName: "Davis Corporation",
    clientId: "c3",
    caseReference: "Davis Corp Merger",
    caseId: "3",
    amount: 15000,
    issueDate: "2024-12-01",
    dueDate: "2024-12-31",
    status: "unpaid",
    lineItems: [
      {
        id: "li4",
        description: "Merger Due Diligence",
        hours: 40,
        rate: 300,
        amount: 12000,
      },
      {
        id: "li5",
        description: "Contract Drafting",
        hours: 10,
        rate: 300,
        amount: 3000,
      },
    ],
    subtotal: 15000,
    tax: 0,
    discount: 0,
    total: 15000,
    notes: "Net 30 payment terms.",
  },
  {
    id: "inv3",
    invoiceNumber: "INV-2024-003",
    clientName: "Emily Brown",
    clientId: "c6",
    caseReference: "Brown Property Sale",
    caseId: "6",
    amount: 3500,
    issueDate: "2024-11-20",
    dueDate: "2024-12-20",
    status: "overdue",
    lineItems: [
      {
        id: "li6",
        description: "Property Title Search",
        hours: 5,
        rate: 200,
        amount: 1000,
      },
      {
        id: "li7",
        description: "Contract Review",
        hours: 10,
        rate: 200,
        amount: 2000,
      },
      {
        id: "li8",
        description: "Closing Preparation",
        hours: 2.5,
        rate: 200,
        amount: 500,
      },
    ],
    subtotal: 3500,
    tax: 0,
    discount: 0,
    total: 3500,
    notes: "Follow up required for payment.",
  },
];

export const mockDocuments: Document[] = [
  {
    id: "d1",
    name: "Complaint_Filed.pdf",
    caseId: "1",
    caseName: "Smith vs. Johnson Corp",
    uploadDate: "2024-08-20",
    size: "2.4 MB",
    type: "Legal Filing",
  },
  {
    id: "d2",
    name: "Contract_Exhibit_A.pdf",
    caseId: "1",
    caseName: "Smith vs. Johnson Corp",
    uploadDate: "2024-08-22",
    size: "1.2 MB",
    type: "Evidence",
  },
  {
    id: "d3",
    name: "Will_Draft_v2.docx",
    caseId: "2",
    caseName: "Estate of Williams",
    uploadDate: "2024-09-05",
    size: "456 KB",
    type: "Draft",
  },
  {
    id: "d4",
    name: "Merger_Agreement.pdf",
    caseId: "3",
    caseName: "Davis Corp Merger",
    uploadDate: "2024-07-15",
    size: "5.8 MB",
    type: "Contract",
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: "m1",
    caseId: "1",
    date: "2024-12-10",
    type: "meeting",
    summary: "Strategy discussion with client regarding settlement options",
    duration: "1.5 hours",
  },
  {
    id: "m2",
    caseId: "1",
    date: "2024-12-05",
    type: "call",
    summary: "Phone call with opposing counsel",
    duration: "30 mins",
  },
  {
    id: "m3",
    caseId: "3",
    date: "2024-12-08",
    type: "meeting",
    summary: "Board presentation on merger terms",
    duration: "2 hours",
  },
];

// Chart data
export const revenueData = [
  { month: "Jul", revenue: 42000 },
  { month: "Aug", revenue: 38000 },
  { month: "Sep", revenue: 52000 },
  { month: "Oct", revenue: 48000 },
  { month: "Nov", revenue: 55000 },
  { month: "Dec", revenue: 48250 },
];

export const casesByPracticeArea = [
  { area: "Civil Litigation", count: 8, fill: "hsl(210, 100%, 63%)" },
  { area: "Estate Planning", count: 5, fill: "hsl(145, 63%, 49%)" },
  { area: "Corporate Law", count: 6, fill: "hsl(35, 91%, 62%)" },
  { area: "Family Law", count: 4, fill: "hsl(0, 86%, 69%)" },
  { area: "Real Estate", count: 5, fill: "hsl(270, 60%, 60%)" },
];

export const caseStatusData = [
  { name: "Active", value: 12, fill: "hsl(210, 100%, 63%)" },
  { name: "Pending", value: 6, fill: "hsl(35, 91%, 62%)" },
  { name: "Closed", value: 6, fill: "hsl(145, 63%, 49%)" },
];

export const upcomingDeadlines = [
  {
    id: "1",
    task: "Motion Response",
    case: "Smith vs. Johnson Corp",
    caseId: "1",
    dueDate: "2024-12-23",
    daysUntil: 0,
  },
  {
    id: "2",
    task: "Document Filing",
    case: "Estate of Williams",
    caseId: "2",
    dueDate: "2024-12-24",
    daysUntil: 1,
  },
  {
    id: "3",
    task: "Discovery Deadline",
    case: "Davis Corp Merger",
    caseId: "3",
    dueDate: "2024-12-28",
    daysUntil: 5,
  },
  {
    id: "4",
    task: "Court Hearing",
    case: "Garcia Immigration",
    caseId: "5",
    dueDate: "2025-01-05",
    daysUntil: 13,
  },
];
