import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Plus,
  XCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';

const mockRisks = [
  {
    id: 'RISK001',
    supplier: 'BuildMat Industries',
    riskType: 'Financial',
    severity: 'high',
    probability: 85,
    impact: 'High delivery delays expected',
    mitigation: 'Identify backup suppliers',
    status: 'open',
    dueDate: '2024-02-20'
  },
  {
    id: 'RISK002',
    supplier: 'GreenEnergy Components',
    riskType: 'Operational',
    severity: 'medium',
    probability: 65,
    impact: 'Quality issues in recent shipments',
    mitigation: 'Enhanced quality checks',
    status: 'mitigated',
    dueDate: '2024-02-15'
  }
];

const SCMRisk = () => {
  const getRiskBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="default" className="bg-green-100 text-green-800">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Open
        </Badge>;
      case 'mitigated':
        return <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Mitigated
        </Badge>;
      case 'monitoring':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Clock className="h-3 w-3 mr-1" />
          Monitoring
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Risk Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage supply chain risks
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Risk
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Risks</p>
                  <AnimatedCounter value={mockRisks.length} className="text-2xl font-bold" />
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                  <AnimatedCounter 
                    value={mockRisks.filter(r => r.severity === 'high').length} 
                    className="text-2xl font-bold text-red-600" 
                  />
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mitigated</p>
                  <AnimatedCounter 
                    value={mockRisks.filter(r => r.status === 'mitigated').length} 
                    className="text-2xl font-bold text-green-600" 
                  />
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
                  <AnimatedCounter value={72} className="text-2xl font-bold text-yellow-600" />
                  <p className="text-xs text-muted-foreground">out of 100</p>
                </div>
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Items */}
        <div className="grid gap-4">
          {mockRisks.map((risk) => (
            <Card key={risk.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{risk.supplier}</h3>
                      {getRiskBadge(risk.severity)}
                      {getStatusBadge(risk.status)}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium">Risk Type: {risk.riskType}</div>
                        <div className="text-sm text-muted-foreground">{risk.impact}</div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Probability:</span>
                          <span className="font-medium">{risk.probability}%</span>
                        </div>
                        <Progress value={risk.probability} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Mitigation Plan:</div>
                        <div className="text-sm text-muted-foreground">{risk.mitigation}</div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Due Date: {risk.dueDate}
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
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

export default SCMRisk;
