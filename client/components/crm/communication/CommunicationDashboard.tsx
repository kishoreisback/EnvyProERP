import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  MessageSquare,
  Mail,
  Phone,
  Users,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  FileText,
  Settings,
  Plus,
  Activity,
  DollarSign,
  Target,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "../../ui/animated-counter";
import { communicationAnalytics } from "./data";
import { MessageHistory } from "./MessageHistory";
import { Templates } from "./Templates";
import { BulkCommunication } from "./BulkCommunication";
import { AutoCommunication } from "./AutoCommunication";
import { Integrations } from "./Integrations";
import { SendMessage } from "./SendMessage";

export function CommunicationDashboard() {
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            to="/crm/dashboard"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to CRM
          </Link>
          <span>/</span>
          <span>Communication Center</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Communication Center</h1>
            <p className="text-muted-foreground">
              Manage SMS, Email, and WhatsApp communications with your leads and
              customers
            </p>
          </div>
          <Button onClick={() => setShowSendMessage(true)} className="gap-2">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={communicationAnalytics.totalSent} />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={communicationAnalytics.deliveryRate}
                suffix="%"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.8%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={communicationAnalytics.openRate}
                suffix="%"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> vs industry avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $<AnimatedCounter value={communicationAnalytics.totalCost} />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Communication Type Breakdown */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </CardTitle>
            <Badge variant="secondary">
              {communicationAnalytics.email.sent}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Delivered:</span>
              <span className="font-medium">
                {communicationAnalytics.email.delivered}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Opened:</span>
              <span className="font-medium">
                {communicationAnalytics.email.opened}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Clicked:</span>
              <span className="font-medium">
                {communicationAnalytics.email.clicked}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cost:</span>
              <span className="font-medium">
                ${communicationAnalytics.email.cost}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              SMS
            </CardTitle>
            <Badge variant="secondary">{communicationAnalytics.sms.sent}</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Delivered:</span>
              <span className="font-medium">
                {communicationAnalytics.sms.delivered}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Failed:</span>
              <span className="font-medium">
                {communicationAnalytics.sms.failed}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Success Rate:</span>
              <span className="font-medium">
                {(
                  (communicationAnalytics.sms.delivered /
                    communicationAnalytics.sms.sent) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cost:</span>
              <span className="font-medium">
                ${communicationAnalytics.sms.cost}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </CardTitle>
            <Badge variant="secondary">
              {communicationAnalytics.whatsapp.sent}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Delivered:</span>
              <span className="font-medium">
                {communicationAnalytics.whatsapp.delivered}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Read:</span>
              <span className="font-medium">
                {communicationAnalytics.whatsapp.opened}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Read Rate:</span>
              <span className="font-medium">
                {(
                  (communicationAnalytics.whatsapp.opened /
                    communicationAnalytics.whatsapp.delivered) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cost:</span>
              <span className="font-medium">
                ${communicationAnalytics.whatsapp.cost}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Send</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Bulk SMS Campaign completed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      285 messages sent • 2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Welcome email triggered
                    </p>
                    <p className="text-xs text-muted-foreground">
                      For Rajesh Kumar • 5 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      WhatsApp proposal sent
                    </p>
                    <p className="text-xs text-muted-foreground">
                      To Mohammed Ali • 15 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New template created</p>
                    <p className="text-xs text-muted-foreground">
                      "Payment Reminder" • 1 hour ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Top Performing Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {communicationAnalytics.topTemplates.map((template) => (
                  <div
                    key={template.templateId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {template.templateName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {template.type.toUpperCase()}
                        </Badge>
                        <span>{template.sent} sent</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {template.openRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">open rate</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Quickly perform common communication tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => setShowSendMessage(true)}
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab("templates")}
                >
                  <FileText className="h-5 w-5" />
                  Create Template
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab("bulk")}
                >
                  <Users className="h-5 w-5" />
                  Bulk Campaign
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab("automation")}
                >
                  <Zap className="h-5 w-5" />
                  Setup Automation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <MessageHistory />
        </TabsContent>

        <TabsContent value="templates">
          <Templates />
        </TabsContent>

        <TabsContent value="bulk">
          <BulkCommunication />
        </TabsContent>

        <TabsContent value="automation">
          <AutoCommunication />
        </TabsContent>

        <TabsContent value="integrations">
          <Integrations />
        </TabsContent>
      </Tabs>

      {/* Send Message Dialog */}
      {showSendMessage && (
        <SendMessage onClose={() => setShowSendMessage(false)} />
      )}
    </div>
  );
}
