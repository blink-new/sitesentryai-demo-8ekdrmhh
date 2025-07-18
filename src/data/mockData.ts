import { Site, Camera, Alert, Incident, User, Analytics } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@insurance.com',
    name: 'John Doe',
    role: 'insurance_company',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'sarah.smith@contractor.com',
    name: 'Sarah Smith',
    role: 'general_contractor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  }
];

export const mockSites: Site[] = [
  {
    id: '1',
    name: 'Downtown Office Complex',
    address: '123 Main St, Downtown',
    status: 'active',
    riskScore: 85,
    lastInspection: '2024-01-15',
    cameras: []
  },
  {
    id: '2',
    name: 'Residential Tower A',
    address: '456 Oak Ave, Midtown',
    status: 'active',
    riskScore: 72,
    lastInspection: '2024-01-14',
    cameras: []
  },
  {
    id: '3',
    name: 'Industrial Warehouse',
    address: '789 Industrial Blvd',
    status: 'maintenance',
    riskScore: 91,
    lastInspection: '2024-01-12',
    cameras: []
  }
];

export const mockCameras: Camera[] = [
  {
    id: '1',
    name: 'Main Entrance',
    location: 'Building A - Entrance',
    status: 'online'
  },
  {
    id: '2',
    name: 'Construction Zone',
    location: 'Building A - Floor 5',
    status: 'online'
  },
  {
    id: '3',
    name: 'Equipment Storage',
    location: 'Building B - Ground Level',
    status: 'offline'
  },
  {
    id: '4',
    name: 'Parking Area',
    location: 'Exterior - North Side',
    status: 'online'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'fire',
    severity: 'critical',
    title: 'Fire Hazard Detected',
    description: 'Smoke detected near welding area on Floor 5',
    timestamp: '2024-01-18T14:30:00Z',
    cameraId: '2',
    siteId: '1',
    status: 'new'
  },
  {
    id: '2',
    type: 'unsafe_equipment',
    severity: 'high',
    title: 'Unsafe Equipment Operation',
    description: 'Crane operating without proper safety protocols',
    timestamp: '2024-01-18T13:15:00Z',
    cameraId: '2',
    siteId: '1',
    status: 'acknowledged',
    assignedTo: 'Sarah Smith'
  },
  {
    id: '3',
    type: 'unauthorized_access',
    severity: 'medium',
    title: 'Unauthorized Personnel',
    description: 'Person without hard hat detected in construction zone',
    timestamp: '2024-01-18T12:45:00Z',
    cameraId: '1',
    siteId: '1',
    status: 'resolved',
    resolvedBy: 'John Doe',
    resolvedAt: '2024-01-18T13:00:00Z'
  },
  {
    id: '4',
    type: 'water_intrusion',
    severity: 'high',
    title: 'Water Leak Detected',
    description: 'Water accumulation detected in basement level',
    timestamp: '2024-01-18T11:20:00Z',
    cameraId: '3',
    siteId: '2',
    status: 'in_progress',
    assignedTo: 'Mike Johnson'
  },
  {
    id: '5',
    type: 'fall_hazard',
    severity: 'high',
    title: 'Fall Hazard Risk',
    description: 'Missing safety barriers detected on scaffolding',
    timestamp: '2024-01-18T10:30:00Z',
    cameraId: '2',
    siteId: '1',
    status: 'escalated'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Fire Safety Incident',
    description: 'Multiple fire hazards detected across construction zones',
    severity: 'critical',
    status: 'in_progress',
    reportedBy: 'AI System',
    assignedTo: 'Sarah Smith',
    createdAt: '2024-01-18T14:30:00Z',
    updatedAt: '2024-01-18T15:00:00Z',
    siteId: '1',
    alerts: [mockAlerts[0]],
    comments: [
      {
        id: '1',
        text: 'Fire department has been notified. Evacuating affected areas.',
        author: 'Sarah Smith',
        timestamp: '2024-01-18T14:45:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Equipment Safety Violation',
    description: 'Crane operation without proper safety protocols',
    severity: 'high',
    status: 'resolved',
    reportedBy: 'AI System',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-01-18T13:15:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
    siteId: '1',
    alerts: [mockAlerts[1]],
    comments: [
      {
        id: '2',
        text: 'Crane operator has been retrained. Safety protocols updated.',
        author: 'Mike Johnson',
        timestamp: '2024-01-18T16:30:00Z'
      }
    ]
  }
];

export const mockAnalytics: Analytics = {
  totalAlerts: 156,
  resolvedAlerts: 142,
  averageResponseTime: 23, // minutes
  riskTrends: [
    { date: '2024-01-01', riskScore: 75 },
    { date: '2024-01-02', riskScore: 78 },
    { date: '2024-01-03', riskScore: 82 },
    { date: '2024-01-04', riskScore: 79 },
    { date: '2024-01-05', riskScore: 85 },
    { date: '2024-01-06', riskScore: 88 },
    { date: '2024-01-07', riskScore: 84 }
  ],
  alertsByType: [
    { type: 'fire', count: 23 },
    { type: 'unsafe_equipment', count: 45 },
    { type: 'unauthorized_access', count: 32 },
    { type: 'water_intrusion', count: 18 },
    { type: 'fall_hazard', count: 28 },
    { type: 'structural_damage', count: 6 },
    { type: 'weather_hazard', count: 3 },
    { type: 'security_breach', count: 1 }
  ],
  sitePerformance: [
    {
      siteId: '1',
      siteName: 'Downtown Office Complex',
      riskScore: 85,
      alertCount: 67,
      responseTime: 18
    },
    {
      siteId: '2',
      siteName: 'Residential Tower A',
      riskScore: 72,
      alertCount: 45,
      responseTime: 25
    },
    {
      siteId: '3',
      siteName: 'Industrial Warehouse',
      riskScore: 91,
      alertCount: 44,
      responseTime: 31
    }
  ]
};