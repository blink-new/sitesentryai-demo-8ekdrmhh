export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 
  | 'insurance_company'
  | 'broker'
  | 'general_contractor'
  | 'site_contractor'
  | 'inspector'
  | 'developer'
  | 'investor';

export interface Site {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive' | 'maintenance';
  riskScore: number;
  lastInspection: string;
  cameras: Camera[];
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastAlert?: Alert;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  cameraId: string;
  siteId: string;
  status: 'new' | 'acknowledged' | 'resolved' | 'escalated';
  assignedTo?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export type AlertType = 
  | 'fire'
  | 'water_intrusion'
  | 'unsafe_equipment'
  | 'unauthorized_access'
  | 'fall_hazard'
  | 'structural_damage'
  | 'weather_hazard'
  | 'security_breach';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  siteId: string;
  alerts: Alert[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface Analytics {
  totalAlerts: number;
  resolvedAlerts: number;
  averageResponseTime: number;
  riskTrends: RiskTrend[];
  alertsByType: AlertTypeCount[];
  sitePerformance: SitePerformance[];
}

export interface RiskTrend {
  date: string;
  riskScore: number;
}

export interface AlertTypeCount {
  type: AlertType;
  count: number;
}

export interface SitePerformance {
  siteId: string;
  siteName: string;
  riskScore: number;
  alertCount: number;
  responseTime: number;
}