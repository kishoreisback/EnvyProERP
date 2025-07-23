import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Plus
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';

const mockShipments = [
  {
    id: 'SH001',
    description: 'Construction Materials Delivery',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    status: 'in_transit',
    eta: '2024-02-15',
    carrier: 'FastTruck Logistics',
    value: 125000
  },
  {
    id: 'SH002',
    description: 'Safety Equipment Shipment',
    origin: 'Denver, CO',
    destination: 'Austin, TX',
    status: 'delivered',
    eta: '2024-02-10',
    carrier: 'SafeShip Express',
    value: 45000
  }
];

const SCMLogistics = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Logistics Management</h1>
            <p className="text-muted-foreground">
              Track and manage shipments and deliveries
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Shipment
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                  <AnimatedCounter 
                    value={mockShipments.filter(s => s.status === 'in_transit').length} 
                    className="text-2xl font-bold" 
                  />
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Packages</p>
                  <AnimatedCounter value={mockShipments.length} className="text-2xl font-bold" />
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">On-Time Rate</p>
                  <AnimatedCounter value={95} suffix="%" className="text-2xl font-bold text-green-600" />
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <AnimatedCounter 
                    value={mockShipments.reduce((sum, s) => sum + s.value, 0)} 
                    prefix="$"
                    className="text-2xl font-bold text-purple-600" 
                  />
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipments */}
        <div className="grid gap-4">
          {mockShipments.map((shipment) => (
            <Card key={shipment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{shipment.description}</h3>
                      <Badge variant={shipment.status === 'delivered' ? 'default' : 'secondary'}>
                        {shipment.status === 'delivered' ? 'Delivered' : 'In Transit'}
                      </Badge>
                    </div>
                    
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {shipment.origin} → {shipment.destination}
                      </div>
                      <span>Carrier: {shipment.carrier}</span>
                      <span>ETA: {shipment.eta}</span>
                      <span>Value: ${shipment.value.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default SCMLogistics;
