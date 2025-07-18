import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Camera, 
  FileText, 
  BarChart3, 
  Users, 
  Settings,
  Shield,
  Bell
} from 'lucide-react'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'risks',
      label: 'Risk Management',
      icon: AlertTriangle,
      badge: '12'
    },
    {
      id: 'cameras',
      label: 'Camera Feeds',
      icon: Camera,
      badge: '8'
    },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: FileText,
      badge: '3'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      badge: null
    }
  ]

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">SiteSentryAI</h1>
            <p className="text-sm text-slate-500">Security Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-12 px-4",
                isActive 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-slate-700 hover:bg-slate-100"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant={isActive ? "secondary" : "default"}
                  className={cn(
                    "ml-2",
                    isActive 
                      ? "bg-blue-500 text-white" 
                      : "bg-red-500 text-white"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 px-4 text-slate-700 hover:bg-slate-100"
          onClick={() => onSectionChange('settings')}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Button>
        
        <div className="bg-slate-50 rounded-lg p-3 mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Bell className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-900">System Status</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">AI Detection</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Camera Network</span>
              <span className="text-green-600 font-medium">8/8 Active</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Last Update</span>
              <span className="text-slate-500">2 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}