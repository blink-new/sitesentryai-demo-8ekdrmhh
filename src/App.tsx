import React, { useState } from 'react'
import { AuthProvider } from '@/context/AuthProvider'
import { useAuth } from '@/hooks/useAuth'
import LoginPage from '@/components/auth/LoginPage'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import RiskManagement from '@/components/risks/RiskManagement'
import CameraFeeds from '@/components/cameras/CameraFeeds'
import IncidentManagement from '@/components/incidents/IncidentManagement'
import { Toaster } from '@/components/ui/toaster'
import './App.css'

const AppContent: React.FC = () => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')

  if (!user) {
    return <LoginPage />
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'risks':
        return <RiskManagement />
      case 'cameras':
        return <CameraFeeds />
      case 'incidents':
        return <IncidentManagement />
      case 'analytics':
        return (
          <div className="p-6 bg-slate-50 min-h-full">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Analytics & Reports</h2>
              <p className="text-slate-600">Coming soon - Advanced analytics and reporting dashboard</p>
            </div>
          </div>
        )
      case 'users':
        return (
          <div className="p-6 bg-slate-50 min-h-full">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">User Management</h2>
              <p className="text-slate-600">Coming soon - User roles and permissions management</p>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="p-6 bg-slate-50 min-h-full">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Settings</h2>
              <p className="text-slate-600">Coming soon - System configuration and preferences</p>
            </div>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  )
}

export default App