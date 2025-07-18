import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Camera,
  Users,
  MapPin,
  Activity,
  Eye,
  AlertCircle
} from 'lucide-react'

export default function DashboardOverview() {
  const stats = [
    {
      title: 'Active Sites',
      value: '12',
      change: '+2 this month',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-5 from yesterday',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Response Time',
      value: '2.3m',
      change: 'Avg response time',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Resolution Rate',
      value: '94%',
      change: '+3% this week',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const recentAlerts = [
    {
      id: 1,
      type: 'Fire Hazard',
      site: 'Downtown Hub - Zone A',
      severity: 'critical',
      time: '2 minutes ago',
      status: 'active',
      camera: 'CAM-001'
    },
    {
      id: 2,
      type: 'Unauthorized Access',
      site: 'Riverside Project - Gate 2',
      severity: 'high',
      time: '15 minutes ago',
      status: 'investigating',
      camera: 'CAM-045'
    },
    {
      id: 3,
      type: 'Equipment Malfunction',
      site: 'Metro Tower - Floor 12',
      severity: 'medium',
      time: '1 hour ago',
      status: 'resolved',
      camera: 'CAM-023'
    },
    {
      id: 4,
      type: 'Safety Violation',
      site: 'Harbor Complex - Dock 3',
      severity: 'high',
      time: '2 hours ago',
      status: 'active',
      camera: 'CAM-067'
    }
  ]

  const siteOverview = [
    {
      name: 'Downtown Construction Hub',
      status: 'active',
      riskScore: 85,
      cameras: 8,
      alerts: 2,
      lastUpdate: '2 min ago'
    },
    {
      name: 'Riverside Development',
      status: 'active',
      riskScore: 72,
      cameras: 12,
      alerts: 1,
      lastUpdate: '5 min ago'
    },
    {
      name: 'Metro Tower Project',
      status: 'maintenance',
      riskScore: 45,
      cameras: 6,
      alerts: 0,
      lastUpdate: '1 hour ago'
    },
    {
      name: 'Harbor Complex',
      status: 'active',
      riskScore: 91,
      cameras: 15,
      alerts: 3,
      lastUpdate: '1 min ago'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800'
      case 'investigating': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600'
    if (score >= 60) return 'text-orange-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">Real-time monitoring and security insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Live View
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Alerts</CardTitle>
                <CardDescription>Latest security incidents and notifications</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-900">{alert.type}</p>
                      <p className="text-sm text-slate-600">{alert.site}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {alert.camera}
                        </Badge>
                        <span className="text-xs text-slate-500">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <Badge variant="secondary" className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Site Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Site Overview</CardTitle>
                <CardDescription>Current status of all monitored sites</CardDescription>
              </div>
              <Button variant="outline" size="sm">Manage Sites</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {siteOverview.map((site, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-900">{site.name}</h4>
                    <p className="text-sm text-slate-600">Last update: {site.lastUpdate}</p>
                  </div>
                  <Badge 
                    variant={site.status === 'active' ? 'default' : 'secondary'}
                    className={site.status === 'active' ? 'bg-green-500' : ''}
                  >
                    {site.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Risk Score</span>
                    <span className={`font-medium ${getRiskScoreColor(site.riskScore)}`}>
                      {site.riskScore}/100
                    </span>
                  </div>
                  <Progress value={site.riskScore} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm pt-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Camera className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">{site.cameras} cameras</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">{site.alerts} alerts</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Camera className="h-6 w-6" />
              <span className="text-sm">View Cameras</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="text-sm">Manage Alerts</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Add User</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Activity className="h-6 w-6" />
              <span className="text-sm">System Health</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Shield className="h-6 w-6" />
              <span className="text-sm">Security Log</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}