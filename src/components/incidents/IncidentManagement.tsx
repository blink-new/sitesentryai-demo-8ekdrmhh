import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  Search, 
  Filter, 
  Plus,
  Clock, 
  User, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  Eye,
  Download,
  Edit
} from 'lucide-react'

const IncidentManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const incidents = [
    {
      id: 'INC-001',
      title: 'Fire Hazard - Electrical Equipment',
      description: 'Smoke detected near electrical equipment in Zone A. Immediate evacuation initiated.',
      site: 'Downtown Construction Hub',
      location: 'Zone A - Electrical Room',
      priority: 'critical',
      status: 'investigating',
      reportedBy: 'John Smith',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-18 14:23:15',
      updatedAt: '2024-01-18 14:45:22',
      category: 'Fire Safety',
      estimatedCost: '$15,000',
      comments: 3,
      attachments: 2
    },
    {
      id: 'INC-002',
      title: 'Unauthorized Access After Hours',
      description: 'Security breach detected at Gate 2. Unknown individual accessed restricted area.',
      site: 'Riverside Development',
      location: 'Gate 2 - Security Checkpoint',
      priority: 'high',
      status: 'resolved',
      reportedBy: 'Security System',
      assignedTo: 'Mike Davis',
      createdAt: '2024-01-18 02:15:33',
      updatedAt: '2024-01-18 08:30:15',
      category: 'Security',
      estimatedCost: '$2,500',
      comments: 5,
      attachments: 1
    },
    {
      id: 'INC-003',
      title: 'Equipment Malfunction - Crane',
      description: 'Tower crane showing irregular movement patterns. Operations suspended.',
      site: 'Metro Tower Project',
      location: 'Floor 12 - Construction Zone',
      priority: 'high',
      status: 'in_progress',
      reportedBy: 'Tom Wilson',
      assignedTo: 'Lisa Chen',
      createdAt: '2024-01-18 09:20:45',
      updatedAt: '2024-01-18 11:15:30',
      category: 'Equipment',
      estimatedCost: '$8,500',
      comments: 2,
      attachments: 3
    },
    {
      id: 'INC-004',
      title: 'Safety Violation - PPE Compliance',
      description: 'Multiple workers observed without required safety equipment in active construction zone.',
      site: 'Harbor Complex',
      location: 'Dock 3 - Loading Area',
      priority: 'medium',
      status: 'resolved',
      reportedBy: 'David Brown',
      assignedTo: 'John Smith',
      createdAt: '2024-01-17 16:45:20',
      updatedAt: '2024-01-18 09:30:10',
      category: 'Safety',
      estimatedCost: '$500',
      comments: 1,
      attachments: 0
    },
    {
      id: 'INC-005',
      title: 'Water Damage - Basement Flooding',
      description: 'Water intrusion detected in basement storage area. Equipment at risk.',
      site: 'Downtown Construction Hub',
      location: 'Basement - Storage Area',
      priority: 'high',
      status: 'open',
      reportedBy: 'Maintenance Team',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-17 14:30:18',
      updatedAt: '2024-01-17 14:30:18',
      category: 'Environmental',
      estimatedCost: '$12,000',
      comments: 0,
      attachments: 4
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'investigating': return 'bg-purple-100 text-purple-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="h-4 w-4" />
      case 'in_progress': return <Clock className="h-4 w-4" />
      case 'investigating': return <Search className="h-4 w-4" />
      case 'resolved': return <CheckCircle className="h-4 w-4" />
      case 'closed': return <XCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const filteredIncidents = incidents.filter(incident => {
    const matchesPriority = selectedPriority === 'all' || incident.priority === selectedPriority
    const matchesStatus = selectedStatus === 'all' || incident.status === selectedStatus
    const matchesSearch = searchTerm === '' || 
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.site.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesPriority && matchesStatus && matchesSearch
  })

  const stats = {
    total: incidents.length,
    open: incidents.filter(i => i.status === 'open').length,
    inProgress: incidents.filter(i => i.status === 'in_progress').length,
    resolved: incidents.filter(i => i.status === 'resolved').length,
    critical: incidents.filter(i => i.priority === 'critical').length
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Incident Management</h1>
          <p className="text-slate-600 mt-1">Track and manage security incidents across all sites</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Incident
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Incidents</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
            <p className="text-sm text-slate-600">Open</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
            <p className="text-sm text-slate-600">In Progress</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
            <p className="text-sm text-slate-600">Resolved</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            <p className="text-sm text-slate-600">Critical</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <Card key={incident.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className={getPriorityColor(incident.priority)}>
                      {incident.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor(incident.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(incident.status)}
                        <span>{incident.status.replace('_', ' ')}</span>
                      </div>
                    </Badge>
                    <Badge variant="outline">
                      {incident.id}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {incident.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{incident.title}</h3>
                  <p className="text-slate-600 mb-4">{incident.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">{incident.site}</p>
                        <p className="text-slate-600">{incident.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">Assigned to</p>
                        <p className="text-slate-600">{incident.assignedTo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">Created</p>
                        <p className="text-slate-600">{incident.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">Est. Cost</p>
                        <p className="text-slate-600">{incident.estimatedCost}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{incident.comments} comments</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{incident.attachments} attachments</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>Reported by {incident.reportedBy}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-6">
                  <Button variant="outline" size="sm" className="w-32">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="w-32">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="w-32">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No incidents found</h3>
            <p className="text-slate-600">Try adjusting your filters or search terms.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default IncidentManagement