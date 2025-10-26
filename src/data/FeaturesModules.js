// src/data/featureModules.js
import {
  ChartBarIcon,
  TicketIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/solid";

export const featureModules = [
  {
    moduleNum: 1,
    title: "Real-time performance metrics and overview",
    sectionTitle: "Dashboard",
    Icon: ChartBarIcon,
    keyFeatures: [
      { text: "Real-time KPI visualization" },
      { text: "Pending ticket count and status" },
      { text: "SLA breach warnings (Red/Yellow)" },
      { text: "Agent performance metrics" },
    ],
    detailedFeatures: [
      { id: "1.1", description: "Interactive charts for ticket flow analysis" },
      { id: "1.2", description: "Filter and sort data by team, severity, or date" },
      { id: "1.3", description: "One-click access to open tickets and queues" },
      { id: "1.4", description: "Fully customizable widgets and layouts" },
    ],
  },
  {
    moduleNum: 2,
    title: "End-to-end ticket creation and lifecycle management",
    sectionTitle: "Ticketing",
    Icon: TicketIcon,
    keyFeatures: [
      { text: "Multi-channel input (Email, Portal, API)" },
      { text: "Automated categorization and routing" },
      { text: "Escalation paths management" },
      { text: "Complete audit trail and activity log" },
    ],
    detailedFeatures: [
      { id: "2.1", description: "Dynamic ticket submission forms with logic" },
      { id: "2.2", description: "Agent-to-agent assignment and transfer" },
      { id: "2.3", description: "In-app collaboration via notes and mentions" },
      { id: "2.4", description: "Bulk ticket action processing" },
    ],
  },
  {
    moduleNum: 3,
    title: "Empower users with powerful knowledge search",
    sectionTitle: "Self-Service",
    Icon: BookOpenIcon,
    keyFeatures: [
      { text: "Integrated knowledge article search" },
      { text: "Public-facing ticket status updates" },
      { text: "Guided troubleshooting workflows" },
      { text: "User profile and request history management" },
    ],
    detailedFeatures: [
      { id: "3.1", description: "Searchable content hierarchy and versioning" },
      { id: "3.2", description: "Article creation and publishing tool for agents" },
      { id: "3.3", description: "User feedback and rating on articles" },
      { id: "3.4", description: "AI-powered article suggestions during ticket creation" },
    ],
  },
  {
    moduleNum: 4,
    title: "Configure, audit, and manage the entire platform",
    sectionTitle: "Admin",
    Icon: Cog6ToothIcon,
    keyFeatures: [
      { text: "Custom report builder with CSV/PDF export" },
      { text: "SLA configuration management" },
      { text: "User and role-based access control (RBAC)" },
      { text: "System health and integration monitoring" },
    ],
    detailedFeatures: [
      { id: "4.1", description: "Define and manage user roles (Agent, Manager, Admin)" },
      { id: "4.2", description: "Schedule automated report delivery" },
      { id: "4.3", description: "Integrate with external systems via APIs" },
      { id: "4.4", description: "Configure custom fields and ticket templates" },
    ],
  },
];
