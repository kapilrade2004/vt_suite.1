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
      totalLeads: 0,
      qualifiedLeads: 0,
      activeDeals: 0,
      wonDeals: 0,
      revenueMTD: "₹0",
      conversionRate: "0%"
    },
    leads: [],
    clients: [],
    dealsPipeline: {
      new: [],
      qualification: [],
      proposal: [],
      negotiation: [],
      won: [],
      lost: []
    },
    products: [],
    proposals: []
  },
  hr: {
    stats: {
      totalEmployees: 0,
      presentToday: 0,
      onLeave: 0,
      pendingRequests: 0,
      payrollThisMonth: "₹0"
    },
    employees: [],
    attendanceToday: [],
    leaves: [],
    payroll: []
  },
  projects: {
    stats: {
      activeProjects: 0,
      completedProjects: 0,
      dueSoon: 0,
      totalBudget: "₹0",
      hoursLoggedThisMonth: "0 hrs"
    },
    list: [],
    tasks: [],
    gantt: []
  },
  finance: {
    stats: {
      revenueMTD: "₹0",
      expensesMTD: "₹0",
      netProfit: "₹0",
      outstandingInvoices: "₹0",
      overdueAmount: "₹0"
    },
    invoices: [],
    expenses: []
  },
  workspace: {
    channels: ["general", "sales", "engineering", "announcements"],
    messages: [],
    tickets: [],
    events: []
  }
};
