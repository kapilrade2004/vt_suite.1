export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  value: string;
  assigned: string;
  date: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  projectsCount: number;
  totalInvoiced: string;
  location: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  amount: string;
  prob: string;
  date: string;
  owner: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  tax: string;
  status: string;
}

export interface Proposal {
  id: string;
  title: string;
  client: string;
  total: string;
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Approved';
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  dept: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joinDate: string;
  salary: string;
}

export interface AttendanceRecord {
  empId: string;
  name: string;
  timeIn: string;
  timeOut: string;
  location: string;
  status: 'Present' | 'Late' | 'On Leave' | 'Absent';
}

export interface LeaveRequest {
  id: string;
  employee: string;
  empId: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PayrollRecord {
  empId: string;
  name: string;
  dept: string;
  basic: string;
  allowance: string;
  deduction: string;
  net: string;
  status: 'Processed' | 'Pending';
}

export interface Project {
  id: string;
  title: string;
  client: string;
  manager: string;
  deadline: string;
  budget: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  teamCount: number;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
}

export interface GanttItem {
  id: number;
  name: string;
  start: string;
  end: string;
  progress: number;
  color: string;
}

export interface Invoice {
  id: string;
  client: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
}

export interface Expense {
  id: string;
  category: string;
  vendor: string;
  amount: string;
  date: string;
  status: 'Approved' | 'Pending';
}

export interface ChatMessage {
  id: number;
  sender: string;
  avatar: string;
  channel: string;
  text: string;
  time: string;
}

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  priority: string;
  status: 'Open' | 'In Progress' | 'Waiting' | 'Resolved';
  date: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  host: string;
}

export interface SuiteData {
  crm: {
    stats: {
      totalLeads: number;
      qualifiedLeads: number;
      activeDeals: number;
      wonDeals: number;
      revenueMTD: string;
      conversionRate: string;
    };
    leads: Lead[];
    clients: Client[];
    dealsPipeline: Record<string, Deal[]>;
    products: Product[];
    proposals: Proposal[];
  };
  hr: {
    stats: {
      totalEmployees: number;
      presentToday: number;
      onLeave: number;
      pendingRequests: number;
      payrollThisMonth: string;
    };
    employees: Employee[];
    attendanceToday: AttendanceRecord[];
    leaves: LeaveRequest[];
    payroll: PayrollRecord[];
  };
  projects: {
    stats: {
      activeProjects: number;
      completedProjects: number;
      dueSoon: number;
      totalBudget: string;
      hoursLoggedThisMonth: string;
    };
    list: Project[];
    tasks: Task[];
    gantt: GanttItem[];
  };
  finance: {
    stats: {
      revenueMTD: string;
      expensesMTD: string;
      netProfit: string;
      outstandingInvoices: string;
      overdueAmount: string;
    };
    invoices: Invoice[];
    expenses: Expense[];
  };
  workspace: {
    channels: string[];
    messages: ChatMessage[];
    tickets: Ticket[];
    events: CalendarEvent[];
  };
}

export const initialMockData: SuiteData = {
  crm: {
    stats: {
      totalLeads: 148,
      qualifiedLeads: 84,
      activeDeals: 36,
      wonDeals: 62,
      revenueMTD: "₹6,84,320",
      conversionRate: "24.8%"
    },
    leads: [
      { id: "LD-101", name: "Aarav Sharma", company: "Apex Digital Solutions", email: "aarav@apexdigital.com", phone: "+91 98765 43210", source: "Website", status: "Qualified", value: "₹1,25,000", assigned: "Rhea Nair", date: "2026-08-18" },
      { id: "LD-102", name: "Priya Patel", company: "Bright Path Realty", email: "priya@brightpath.in", phone: "+91 98123 45678", source: "Referral", status: "New", value: "₹2,80,000", assigned: "Dev Kulkarni", date: "2026-08-20" },
      { id: "LD-103", name: "Vikram Mehta", company: "Solace Health Group", email: "v.mehta@solacehealth.org", phone: "+91 99000 11223", source: "LinkedIn", status: "Proposal", value: "₹4,50,000", assigned: "Sana Merchant", date: "2026-08-15" },
      { id: "LD-104", name: "Ananya Iyer", company: "Everline Retail", email: "ananya@everline.com", phone: "+91 97654 32109", source: "Webinar", status: "Negotiation", value: "₹1,84,000", assigned: "Rhea Nair", date: "2026-08-12" },
      { id: "LD-105", name: "Rajesh Rao", company: "Kestrel Manufacturing", email: "rrao@kestrelmfg.com", phone: "+91 98450 67890", source: "Direct", status: "Won", value: "₹6,40,000", assigned: "Dev Kulkarni", date: "2026-08-10" }
    ],
    clients: [
      { id: "CL-01", name: "Kestrel Manufacturing", industry: "Industrial Engineering", contact: "Rajesh Rao", email: "rrao@kestrelmfg.com", phone: "+91 98450 67890", status: "Active", projectsCount: 4, totalInvoiced: "₹12,40,000", location: "Mumbai, India" },
      { id: "CL-02", name: "Everline Retail Corp", industry: "E-Commerce", contact: "Ananya Iyer", email: "ananya@everline.com", phone: "+91 97654 32109", status: "Active", projectsCount: 3, totalInvoiced: "₹8,65,000", location: "Bengaluru, India" },
      { id: "CL-03", name: "Solace Health Group", industry: "Healthcare & Pharma", contact: "Vikram Mehta", email: "v.mehta@solacehealth.org", phone: "+91 99000 11223", status: "Active", projectsCount: 2, totalInvoiced: "₹15,00,000", location: "Hyderabad, India" },
      { id: "CL-04", name: "Northbridge Logistics", industry: "Freight & Supply Chain", contact: "Kabir Das", email: "kabir@northbridge.com", phone: "+91 98220 54321", status: "Active", projectsCount: 5, totalInvoiced: "₹21,00,000", location: "Delhi NCR, India" }
    ],
    dealsPipeline: {
      new: [
        { id: "D-201", title: "CRM Customization Package", company: "Bright Path Realty", amount: "₹2,80,000", prob: "30%", date: "Sep 15", owner: "Dev Kulkarni" },
        { id: "D-202", title: "Cloud Portal Migration", company: "Nexus Dynamics", amount: "₹1,50,000", prob: "25%", date: "Sep 20", owner: "Sana Merchant" }
      ],
      qualification: [
        { id: "D-203", title: "Enterprise ERP Expansion", company: "Apex Digital Solutions", amount: "₹3,50,000", prob: "45%", date: "Sep 10", owner: "Rhea Nair" },
        { id: "D-204", title: "API Integration License", company: "Zenith Tech Labs", amount: "₹92,000", prob: "50%", date: "Sep 05", owner: "Sana Merchant" }
      ],
      proposal: [
        { id: "D-205", title: "HR & Payroll Suite Deployment", company: "Solace Health Group", amount: "₹4,50,000", prob: "70%", date: "Aug 30", owner: "Sana Merchant" }
      ],
      negotiation: [
        { id: "D-206", title: "Multi-branch POS & Inventory", company: "Everline Retail", amount: "₹1,84,000", prob: "85%", date: "Aug 25", owner: "Rhea Nair" }
      ],
      won: [
        { id: "D-207", title: "Factory Workflow Automation", company: "Kestrel Manufacturing", amount: "₹6,40,000", prob: "100%", date: "Aug 10", owner: "Dev Kulkarni" }
      ],
      lost: [
        { id: "D-208", title: "Legacy DB Backup Solution", company: "OldGuard Inc", amount: "₹75,000", prob: "0%", date: "Aug 02", owner: "Rhea Nair" }
      ]
    },
    products: [
      { id: "PRD-01", name: "VasifyTech Core License", category: "Software", price: "₹2,999/mo", tax: "18% GST", status: "Active" },
      { id: "PRD-02", name: "Custom API Integration", category: "Services", price: "₹25,000", tax: "18% GST", status: "Active" },
      { id: "PRD-03", name: "Dedicated HR Onboarding", category: "Consulting", price: "₹12,000", tax: "18% GST", status: "Active" }
    ],
    proposals: [
      { id: "PR-501", title: "ERP & HR Suite Implementation", client: "Solace Health Group", total: "₹4,50,000", validUntil: "2026-09-15", status: "Sent" },
      { id: "PR-502", title: "Retail Inventory System", client: "Everline Retail", total: "₹18,40,000", validUntil: "2026-09-01", status: "Approved" }
    ]
  },
  hr: {
    stats: {
      totalEmployees: 42,
      presentToday: 38,
      onLeave: 3,
      pendingRequests: 4,
      payrollThisMonth: "₹12,64,000"
    },
    employees: [
      { id: "EMP-001", name: "Rhea Nair", role: "Operations Lead", dept: "Operations", email: "rhea@vasifytech.com", phone: "+91 98765 11111", status: "Active", joinDate: "2023-03-15", salary: "₹45,000/mo" },
      { id: "EMP-002", name: "Dev Kulkarni", role: "Finance Manager", dept: "Finance", email: "dev@vasifytech.com", phone: "+91 98765 22222", status: "Active", joinDate: "2022-08-01", salary: "₹52,000/mo" },
      { id: "EMP-003", name: "Sana Merchant", role: "Sales Director", dept: "Sales", email: "sana@vasifytech.com", phone: "+91 98765 33333", status: "Active", joinDate: "2021-11-10", salary: "₹58,000/mo" },
      { id: "EMP-004", name: "Karan Verma", role: "Lead Full-Stack Eng", dept: "Engineering", email: "karan@vasifytech.com", phone: "+91 98765 44444", status: "Active", joinDate: "2024-01-20", salary: "₹48,000/mo" },
      { id: "EMP-005", name: "Meera Josh", role: "UI/UX Designer", dept: "Design", email: "meera@vasifytech.com", phone: "+91 98765 55555", status: "Active", joinDate: "2024-05-12", salary: "₹39,000/mo" }
    ],
    attendanceToday: [
      { empId: "EMP-001", name: "Rhea Nair", timeIn: "09:05 AM", timeOut: "—", location: "HQ Office (GPS Verified)", status: "Present" },
      { empId: "EMP-002", name: "Dev Kulkarni", timeIn: "09:12 AM", timeOut: "—", location: "HQ Office", status: "Present" },
      { empId: "EMP-003", name: "Sana Merchant", timeIn: "08:58 AM", timeOut: "—", location: "Remote (Client Site)", status: "Present" }
    ],
    leaves: [
      { id: "LV-301", employee: "Rohan Kapoor", empId: "EMP-006", type: "Casual Leave", startDate: "2026-08-21", endDate: "2026-08-23", days: 3, reason: "Family event", status: "Approved" },
      { id: "LV-302", employee: "Meera Josh", empId: "EMP-005", type: "Sick Leave", startDate: "2026-08-25", endDate: "2026-08-26", days: 2, reason: "Medical appointment", status: "Pending" }
    ],
    payroll: [
      { empId: "EMP-001", name: "Rhea Nair", dept: "Operations", basic: "₹32,000", allowance: "₹13,000", deduction: "₹3,000", net: "₹42,000", status: "Processed" },
      { empId: "EMP-002", name: "Dev Kulkarni", dept: "Finance", basic: "₹38,000", allowance: "₹14,000", deduction: "₹4,000", net: "₹48,000", status: "Processed" }
    ]
  },
  projects: {
    stats: {
      activeProjects: 14,
      completedProjects: 28,
      dueSoon: 3,
      totalBudget: "₹34,00,000",
      hoursLoggedThisMonth: "1,240 hrs"
    },
    list: [
      { id: "PRJ-101", title: "Kestrel Factory IoT Suite", client: "Kestrel Manufacturing", manager: "Karan Verma", deadline: "2026-09-30", budget: "₹6,40,000", progress: 78, status: "In Progress", priority: "High", teamCount: 6 },
      { id: "PRJ-102", title: "Solace HR Portal Migration", client: "Solace Health Group", manager: "Rhea Nair", deadline: "2026-10-15", budget: "₹4,50,000", progress: 42, status: "In Progress", priority: "Medium", teamCount: 4 }
    ],
    tasks: [
      { id: "TSK-801", title: "Design responsive dashboard widget layout", project: "Kestrel Factory IoT Suite", assignee: "Meera Josh", priority: "High", dueDate: "2026-08-25", status: "In Progress" },
      { id: "TSK-802", title: "Setup OAuth 2.0 & JWT token auth", project: "Solace HR Portal Migration", assignee: "Karan Verma", priority: "Urgent", dueDate: "2026-08-24", status: "To Do" }
    ],
    gantt: [
      { id: 1, name: "Requirements & Specs", start: "2026-08-01", end: "2026-08-10", progress: 100, color: "#1DA851" },
      { id: 2, name: "UI/UX Wireframes & Mockups", start: "2026-08-08", end: "2026-08-18", progress: 100, color: "#17c15c" },
      { id: 3, name: "Frontend Component Dev", start: "2026-08-15", end: "2026-09-05", progress: 65, color: "#128a41" }
    ]
  },
  finance: {
    stats: {
      revenueMTD: "₹6,84,320",
      expensesMTD: "₹2,32,150",
      netProfit: "₹4,52,170",
      outstandingInvoices: "₹2,28,400",
      overdueAmount: "₹1,14,200"
    },
    invoices: [
      { id: "INV-1042", client: "Kestrel Manufacturing", issueDate: "2026-08-01", dueDate: "2026-08-15", amount: "₹3,20,000", status: "Paid" },
      { id: "INV-1043", client: "Everline Retail", issueDate: "2026-08-05", dueDate: "2026-08-19", amount: "₹1,42,000", status: "Overdue" }
    ],
    expenses: [
      { id: "EXP-901", category: "Cloud Servers (AWS)", vendor: "Amazon Web Services", amount: "₹24,500", date: "2026-08-15", status: "Approved" }
    ]
  },
  workspace: {
    channels: ["general", "sales", "engineering", "announcements"],
    messages: [
      { id: 1, sender: "Sana Merchant", avatar: "SM", channel: "sales", text: "Great news team! Kestrel Manufacturing just signed the final SOW for $64k! 🎉", time: "10:15 AM" },
      { id: 2, sender: "Dev Kulkarni", avatar: "DK", channel: "sales", text: "Awesome work Sana! Deposit invoice #1042 has already been generated and paid.", time: "10:18 AM" }
    ],
    tickets: [
      { id: "TCK-401", subject: "Unable to sync Google Calendar with HR Leave", customer: "Apex Digital Solutions", priority: "Medium", status: "In Progress", date: "2026-08-20" }
    ],
    events: [
      { id: 1, title: "Product Roadmap Alignment", date: "2026-08-22", time: "11:00 AM - 12:00 PM", type: "Meeting", host: "Rhea Nair" }
    ]
  }
};
