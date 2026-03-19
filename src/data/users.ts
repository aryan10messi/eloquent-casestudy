export interface User {
  id: string;
  name: string;
  email: string;
  segment: "Enterprise" | "SME" | "Startup" | "Individual";
  joinDate: string;
  status: "active" | "inactive";
  lifetimeValueOverride?: number;
  transactionCountOverride?: number;
  lastActivityOverride?: string;
}

export const users: User[] = [
  { id: "u1", name: "Acme Corp", email: "contact@acme.com", segment: "Enterprise", joinDate: "2023-01-15", status: "active" },
  { id: "u2", name: "TechStart Inc", email: "admin@techstart.io", segment: "Startup", joinDate: "2023-03-10", status: "active" },
  { id: "u3", name: "John Doe Designs", email: "john@doe.design", segment: "Individual", joinDate: "2023-05-22", status: "active" },
  { id: "u4", name: "Global Logistics", email: "info@glogistics.com", segment: "Enterprise", joinDate: "2022-11-05", status: "active" },
  { id: "u5", name: "FastFood Chain", email: "supply@fastfood.com", segment: "SME", joinDate: "2023-02-18", status: "inactive" },
  { id: "u6", name: "Crypto Bros", email: "moon@crypto.com", segment: "Startup", joinDate: "2023-08-01", status: "active" },
  { id: "u7", name: "Sarah Smith", email: "sarah@smith.com", segment: "Individual", joinDate: "2023-09-12", status: "active" },
  { id: "u8", name: "MegaCorp", email: "it@megacorp.com", segment: "Enterprise", joinDate: "2021-06-30", status: "active" },
  { id: "u10", name: "DevShop Agency", email: "team@devshop.co", segment: "SME", joinDate: "2023-04-20", status: "active" },
  { id: "u11", name: "FinTech Innovations", email: "contact@fintech-inn.com", segment: "Startup", joinDate: "2023-07-05", status: "active" },
  { id: "u12", name: "Maria Garcia", email: "maria@garcia.com", segment: "Individual", joinDate: "2023-10-01", status: "active" },
  { id: "u13", name: "RetailPro Systems", email: "sales@retailpro.com", segment: "Enterprise", joinDate: "2022-03-22", status: "active" },
  { id: "u14", name: "Green Energy Co", email: "info@greenenergy.com", segment: "SME", joinDate: "2023-06-15", status: "active" },
  { id: "u17", name: "Healthcare Plus", email: "admin@healthcareplus.com", segment: "Enterprise", joinDate: "2022-01-18", status: "active" },
  { id: "u23", name: "RoboTech Startup", email: "hello@robotech.io", segment: "Startup", joinDate: "2023-10-14", status: "active" },
];
