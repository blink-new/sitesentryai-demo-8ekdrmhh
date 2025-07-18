import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Camera, 
  Play, 
  Pause, 
  Maximize, 
  AlertTriangle,
  Wifi,
  WifiOff,
  Settings
} from 'lucide-react';
import { mockCameras, mockAlerts } from '../../data/mockData';

export default function CameraFeeds() {
  const [selectedCamera, setSelectedCamera] = useState(mockCameras[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="h-4 w-4" />;
      case 'offline': return <WifiOff className="h-4 w-4" />;
      case 'maintenance': return <Settings className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  // Mock camera feed URLs (using placeholder images)
  const getCameraFeedUrl = (cameraId: string) => {
    const feeds = {
      '1': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
      '2': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
      '3': 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
      '4': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
    };
    return feeds[cameraId as keyof typeof feeds] || feeds['1'];
  };

  const getCameraAlerts = (cameraId: string) => {
    return mockAlerts.filter(alert => alert.cameraId === cameraId && alert.status !== 'resolved');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Camera Feeds</h1>
          <p className="text-gray-600">Monitor live feeds from all construction site cameras</p>
        </div>
        <Button>
          <Camera className="mr-2 h-4 w-4" />
          Add Camera
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Camera List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Camera List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {mockCameras.map((camera) => {
                  const alerts = getCameraAlerts(camera.id);
                  return (
                    <button
                      key={camera.id}
                      onClick={() => setSelectedCamera(camera)}
                      className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                        selectedCamera.id === camera.id ? 'bg-sky-50 border-sky-200' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{camera.name}</h3>
                        <Badge className={getStatusColor(camera.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(camera.status)}
                            <span>{camera.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{camera.location}</p>
                      {alerts.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-600">{alerts.length} active alert{alerts.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>{selectedCamera.name}</span>
                    <Badge className={getStatusColor(selectedCamera.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(selectedCamera.status)}
                        <span>{selectedCamera.status}</span>
                      </div>
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedCamera.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-black rounded-lg overflow-hidden">
                {selectedCamera.status === 'online' ? (
                  <div className="relative">
                    <img
                      src={getCameraFeedUrl(selectedCamera.id)}
                      alt={`${selectedCamera.name} feed`}
                      className="w-full h-96 object-cover"
                    />
                    {/* Live indicator */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span>LIVE</span>
                    </div>
                    {/* Timestamp */}
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                      {new Date().toLocaleString()}
                    </div>
                    {/* AI Detection Overlay */}
                    {getCameraAlerts(selectedCamera.id).length > 0 && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>AI ALERT</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Camera {selectedCamera.status}</p>
                      <p className="text-sm">Feed unavailable</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Alerts for this camera */}
              {getCameraAlerts(selectedCamera.id).length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
                  <div className="space-y-3">
                    {getCameraAlerts(selectedCamera.id).map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-900">{alert.title}</p>
                            <p className="text-sm text-red-700">{alert.description}</p>
                            <p className="text-xs text-red-600 mt-1">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-red-100 text-red-800">
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Acknowledge
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Camera Grid View */}
      <Card>
        <CardHeader>
          <CardTitle>All Cameras Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCameras.map((camera) => {
              const alerts = getCameraAlerts(camera.id);
              return (
                <div key={camera.id} className="relative">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    {camera.status === 'online' ? (
                      <img
                        src={getCameraFeedUrl(camera.id)}
                        alt={`${camera.name} feed`}
                        className="w-full h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedCamera(camera)}
                      />
                    ) : (
                      <div className="h-32 flex items-center justify-center text-gray-400 bg-gray-100">
                        <Camera className="h-8 w-8" />
                      </div>
                    )}
                    {alerts.length > 0 && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {alerts.length}
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-gray-900">{camera.name}</h4>
                      <Badge className={`${getStatusColor(camera.status)} text-xs`}>
                        {camera.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{camera.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};