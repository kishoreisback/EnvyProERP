import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Phone,
  Video,
  Calendar,
  Megaphone,
  Bell,
  Users,
  Settings,
  Send,
  Paperclip,
  Smile,
  Search,
  Plus,
  PhoneCall,
  VideoIcon,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Star,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  MoreHorizontal,
  Edit,
  Trash2,
  Forward,
  Reply,
  Archive,
  Flag,
  Pin,
  Hash,
  AtSign,
  Bookmark,
  Download,
  Upload,
  FileText,
  Image,
  FileVideo,
  MapPin,
  Filter,
  SortAsc,
  Zap,
  Globe,
  Shield,
  UserPlus,
  UserMinus,
  Crown,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Copy,
  Share2,
  RefreshCw,
  History,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Briefcase,
  Building2,
  Home,
  Mail,
  PhoneIcon,
  MessageCircle,
  CalendarDays,
  BellRing,
  Notification,
} from "lucide-react";

// Sample data for the communications system
const currentUser = {
  id: "USR001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@company.com",
  avatar: "/api/placeholder/40/40",
  role: "Project Manager",
  department: "Construction",
  status: "online",
  lastSeen: new Date(),
};

const teams = [
  {
    id: "TEAM001",
    name: "Sunrise Residency Project",
    description: "Main project team for Sunrise Residency development",
    members: 15,
    type: "project",
    avatar: "/api/placeholder/40/40",
    status: "active",
    lastActivity: new Date(Date.now() - 2 * 60 * 1000),
    unreadCount: 3,
  },
  {
    id: "TEAM002",
    name: "Sales & Marketing",
    description: "Sales team for all property sales and marketing activities",
    members: 8,
    type: "department",
    avatar: "/api/placeholder/40/40",
    status: "active",
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    unreadCount: 7,
  },
  {
    id: "TEAM003",
    name: "Site Supervisors",
    description: "On-site supervision and quality control team",
    members: 12,
    type: "functional",
    avatar: "/api/placeholder/40/40",
    status: "active",
    lastActivity: new Date(Date.now() - 45 * 60 * 1000),
    unreadCount: 0,
  },
  {
    id: "TEAM004",
    name: "Finance & Accounts",
    description: "Financial management and accounting team",
    members: 6,
    type: "department",
    avatar: "/api/placeholder/40/40",
    status: "active",
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1,
  },
];

const contacts = [
  {
    id: "USR002",
    name: "Priya Sharma",
    role: "Site Engineer",
    department: "Construction",
    email: "priya.sharma@company.com",
    phone: "+91 98765 43210",
    avatar: "/api/placeholder/40/40",
    status: "online",
    lastSeen: new Date(),
    teams: ["TEAM001", "TEAM003"],
  },
  {
    id: "USR003",
    name: "Amit Patel",
    role: "Sales Manager",
    department: "Sales",
    email: "amit.patel@company.com",
    phone: "+91 98765 43211",
    avatar: "/api/placeholder/40/40",
    status: "away",
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
    teams: ["TEAM002"],
  },
  {
    id: "USR004",
    name: "Sunita Gupta",
    role: "Finance Manager",
    department: "Finance",
    email: "sunita.gupta@company.com",
    phone: "+91 98765 43212",
    avatar: "/api/placeholder/40/40",
    status: "busy",
    lastSeen: new Date(Date.now() - 10 * 60 * 1000),
    teams: ["TEAM004"],
  },
  {
    id: "USR005",
    name: "Vikram Singh",
    role: "HR Manager",
    department: "Human Resources",
    email: "vikram.singh@company.com",
    phone: "+91 98765 43213",
    avatar: "/api/placeholder/40/40",
    status: "offline",
    lastSeen: new Date(Date.now() - 8 * 60 * 60 * 1000),
    teams: [],
  },
];

const messages = [
  {
    id: "MSG001",
    sender: "USR002",
    content:
      "The foundation work for Block A is completed. Starting with the first floor construction tomorrow.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    type: "text",
    teamId: "TEAM001",
    attachments: [],
    reactions: [{ emoji: "👍", users: ["USR001", "USR003"] }],
    isRead: true,
  },
  {
    id: "MSG002",
    sender: "USR003",
    content:
      "Great progress! We have 3 new inquiries for the project. Setting up site visits for this weekend.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: "text",
    teamId: "TEAM002",
    attachments: [],
    reactions: [],
    isRead: false,
  },
  {
    id: "MSG003",
    sender: "USR004",
    content:
      "Invoice for cement suppliers has been processed. Payment scheduled for tomorrow.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    type: "text",
    teamId: "TEAM001",
    attachments: [
      {
        id: "ATT001",
        name: "cement_invoice_march.pdf",
        type: "pdf",
        size: "2.4 MB",
        url: "/api/placeholder/document",
      },
    ],
    reactions: [{ emoji: "✅", users: ["USR001"] }],
    isRead: true,
  },
];

// Video conferencing platform configurations
const videoConferencingPlatforms = {
  teams: {
    name: "Microsoft Teams",
    icon: "🟦",
    color: "bg-blue-600",
    isConfigured: true,
    apiConnected: true,
    lastSync: new Date(Date.now() - 30 * 60 * 1000),
  },
  meet: {
    name: "Google Meet",
    icon: "🟢",
    color: "bg-green-600",
    isConfigured: true,
    apiConnected: true,
    lastSync: new Date(Date.now() - 15 * 60 * 1000),
  },
  zoom: {
    name: "Zoom",
    icon: "🔵",
    color: "bg-blue-500",
    isConfigured: true,
    apiConnected: false,
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  internal: {
    name: "Internal Video Call",
    icon: "📹",
    color: "bg-purple-600",
    isConfigured: true,
    apiConnected: true,
    lastSync: new Date(),
  },
};

const meetings = [
  {
    id: "MEET001",
    title: "Project Review - Sunrise Residency",
    description:
      "Weekly project review meeting to discuss progress, challenges, and next steps",
    organizer: "USR001",
    participants: ["USR002", "USR003", "USR004"],
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    type: "video",
    platform: "teams",
    status: "scheduled",
    location: "Microsoft Teams",
    meetingUrl: "https://teams.microsoft.com/l/meetup-join/...",
    meetingId: "123-456-789",
    agenda: [
      "Review construction progress",
      "Discuss budget utilization",
      "Sales pipeline update",
      "Next week planning",
    ],
    attachments: [],
  },
  {
    id: "MEET002",
    title: "Site Safety Training",
    description: "Monthly safety training session for all site workers",
    organizer: "USR005",
    participants: ["USR002", "USR003"],
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
    type: "in-person",
    platform: "internal",
    status: "scheduled",
    location: "Site Office - Sunrise Residency",
    agenda: [
      "Safety protocol review",
      "New equipment training",
      "Incident reporting procedures",
    ],
    attachments: [],
  },
  {
    id: "MEET003",
    title: "Client Presentation - Metro Mall",
    description: "Present final designs and cost estimates to client",
    organizer: "USR001",
    participants: ["USR003", "USR004"],
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    type: "video",
    platform: "zoom",
    status: "scheduled",
    location: "Zoom Meeting",
    meetingUrl: "https://zoom.us/j/123456789",
    meetingId: "123-456-789",
    agenda: [
      "Design presentation",
      "Cost breakdown",
      "Timeline discussion",
      "Q&A session",
    ],
    attachments: [],
  },
  {
    id: "MEET004",
    title: "Weekly Team Standup",
    description: "Daily standup meeting for development team",
    organizer: "USR001",
    participants: ["USR002", "USR003"],
    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 6.5 * 60 * 60 * 1000),
    type: "video",
    platform: "meet",
    status: "scheduled",
    location: "Google Meet",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    meetingId: "abc-defg-hij",
    agenda: [
      "Yesterday's progress",
      "Today's plans",
      "Blockers and challenges",
    ],
    attachments: [],
  },
];

const circulars = [
  {
    id: "CIR001",
    title: "Updated Safety Protocols - Effective Immediately",
    content:
      "New safety protocols have been implemented across all construction sites. All team members must comply with the updated guidelines.",
    author: "USR005",
    category: "Safety",
    priority: "high",
    recipients: ["all"],
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    attachments: [
      {
        id: "ATT002",
        name: "safety_protocols_v2.pdf",
        type: "pdf",
        size: "1.8 MB",
        url: "/api/placeholder/document",
      },
    ],
    readBy: ["USR001", "USR002"],
    acknowledgedBy: ["USR001"],
    status: "active",
  },
  {
    id: "CIR002",
    title: "Holiday Calendar 2024 - Updated",
    content:
      "Please find the updated holiday calendar for 2024. Note the changes in festival dates and plan your projects accordingly.",
    author: "USR005",
    category: "HR",
    priority: "medium",
    recipients: ["all"],
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    attachments: [],
    readBy: ["USR001", "USR003", "USR004"],
    acknowledgedBy: ["USR001", "USR003"],
    status: "active",
  },
];

const notifications = [
  {
    id: "NOTIF001",
    title: "New Project Assignment",
    message: "You have been assigned to Metro Mall Commercial Complex project",
    type: "assignment",
    priority: "high",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
    actionUrl: "/projects/metro-mall",
    sender: "USR005",
  },
  {
    id: "NOTIF002",
    title: "Meeting Reminder",
    message: "Project Review meeting starts in 2 hours",
    type: "reminder",
    priority: "medium",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    isRead: true,
    actionUrl: "/communications?tab=meetings",
    sender: "system",
  },
  {
    id: "NOTIF003",
    title: "Document Review Required",
    message: "Safety protocol document requires your review and acknowledgment",
    type: "approval",
    priority: "high",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    actionUrl: "/communications?tab=circulars",
    sender: "USR005",
  },
];

export default function Communications() {
  const params = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(params["*"] || "overview");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [showNewCircular, setShowNewCircular] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("teams");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/communications/${value}`);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    const colors = {
      online: "bg-green-500",
      away: "bg-yellow-500",
      busy: "bg-red-500",
      offline: "bg-gray-400",
    };
    return colors[status as keyof typeof colors] || "bg-gray-400";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "text-red-600 bg-red-50 border-red-200",
      medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
      low: "text-green-600 bg-green-50 border-green-200",
    };
    return (
      colors[priority as keyof typeof colors] ||
      "text-gray-600 bg-gray-50 border-gray-200"
    );
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      teams: "🟦",
      meet: "🟢",
      zoom: "🔵",
      internal: "📹",
    };
    return icons[platform as keyof typeof icons] || "📹";
  };

  const getPlatformName = (platform: string) => {
    return (
      videoConferencingPlatforms[
        platform as keyof typeof videoConferencingPlatforms
      ]?.name || "Internal"
    );
  };

  const launchMeeting = (meeting: any) => {
    if (meeting.meetingUrl) {
      window.open(meeting.meetingUrl, "_blank");
    } else {
      // Handle internal meeting launch
      console.log("Launching internal meeting:", meeting.title);
    }
  };

  const createInstantMeeting = (platform: string) => {
    switch (platform) {
      case "teams":
        window.open("https://teams.microsoft.com/start", "_blank");
        break;
      case "meet":
        window.open("https://meet.google.com/new", "_blank");
        break;
      case "zoom":
        window.open("https://zoom.us/start/videomeeting", "_blank");
        break;
      default:
        console.log("Starting internal meeting");
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;
  const totalUnreadMessages = teams.reduce(
    (sum, team) => sum + team.unreadCount,
    0,
  );

  return (
    <MainLayout>
      <div className="space-y-6 p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">Communications Hub</h1>
            </div>
            <p className="text-muted-foreground">
              Internal communications, messaging, meetings, and notifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {totalUnreadMessages} unread
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bell className="h-3 w-3" />
              {unreadNotifications} alerts
            </Badge>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="calls" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Calls
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Meetings
            </TabsTrigger>
            <TabsTrigger value="circulars" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              Circulars
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="directory" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {totalUnreadMessages}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Unread Messages
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{meetings.length}</p>
                      <p className="text-sm text-muted-foreground">
                        Upcoming Meetings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {unreadNotifications}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        New Notifications
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {contacts.filter((c) => c.status === "online").length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Online Now
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common communication actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button
                    onClick={() => setActiveTab("chat")}
                    className="h-20 flex-col gap-2"
                    variant="outline"
                  >
                    <MessageSquare className="h-6 w-6" />
                    Start Chat
                  </Button>
                  <Button
                    onClick={() => setShowNewMeeting(true)}
                    className="h-20 flex-col gap-2"
                    variant="outline"
                  >
                    <Calendar className="h-6 w-6" />
                    Schedule Meeting
                  </Button>
                  <Button
                    onClick={() => setShowNewCircular(true)}
                    className="h-20 flex-col gap-2"
                    variant="outline"
                  >
                    <Megaphone className="h-6 w-6" />
                    Send Circular
                  </Button>
                  <Button
                    onClick={() => setActiveTab("directory")}
                    className="h-20 flex-col gap-2"
                    variant="outline"
                  >
                    <Users className="h-6 w-6" />
                    Find Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Platform Quick Launch */}
            <Card>
              <CardHeader>
                <CardTitle>Video Conferencing Platforms</CardTitle>
                <CardDescription>
                  Launch instant meetings on integrated platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(videoConferencingPlatforms).map(
                    ([key, platform]) => (
                      <Button
                        key={key}
                        onClick={() => createInstantMeeting(key)}
                        className={`h-20 flex-col gap-2 ${platform.color} hover:opacity-80 text-white`}
                        disabled={!platform.isConfigured}
                      >
                        <span className="text-2xl">{platform.icon}</span>
                        <span className="text-sm">{platform.name}</span>
                        {!platform.apiConnected && (
                          <Badge variant="secondary" className="text-xs">
                            Offline
                          </Badge>
                        )}
                      </Button>
                    ),
                  )}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    Click any platform to start an instant meeting. Configure
                    platforms in Settings.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest team communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.slice(0, 3).map((message) => {
                      const sender = contacts.find(
                        (c) => c.id === message.sender,
                      );
                      const team = teams.find((t) => t.id === message.teamId);
                      return (
                        <div
                          key={message.id}
                          className="flex items-start gap-3 p-3 border rounded"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={sender?.avatar} />
                            <AvatarFallback>
                              {sender?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium">
                                {sender?.name}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {team?.name}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                  <CardDescription>
                    Scheduled meetings and calls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="flex items-start gap-3 p-3 border rounded"
                      >
                        <div className="flex-shrink-0">
                          {meeting.type === "video" ? (
                            <Video className="h-6 w-6 text-blue-600" />
                          ) : (
                            <MapPin className="h-6 w-6 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{meeting.title}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            {meeting.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {meeting.startTime.toLocaleDateString()} at{" "}
                            {meeting.startTime.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Chat List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Teams & Channels
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        className={`flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedChat === team.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedChat(team.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={team.avatar} />
                          <AvatarFallback>
                            {team.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{team.name}</p>
                            {team.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {team.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {team.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {team.members} members
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(team.lastActivity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2">
                {selectedChat ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                teams.find((t) => t.id === selectedChat)?.avatar
                              }
                            />
                            <AvatarFallback>
                              {teams
                                .find((t) => t.id === selectedChat)
                                ?.name.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">
                              {teams.find((t) => t.id === selectedChat)?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {
                                teams.find((t) => t.id === selectedChat)
                                  ?.members
                              }{" "}
                              members
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      {/* Messages */}
                      <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages
                          .filter((m) => m.teamId === selectedChat)
                          .map((message) => {
                            const sender = contacts.find(
                              (c) => c.id === message.sender,
                            );
                            return (
                              <div
                                key={message.id}
                                className="flex items-start gap-3"
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={sender?.avatar} />
                                  <AvatarFallback>
                                    {sender?.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-medium">
                                      {sender?.name}
                                    </p>
                                    <span className="text-xs text-muted-foreground">
                                      {formatTime(message.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-sm">{message.content}</p>
                                  {message.attachments.length > 0 && (
                                    <div className="mt-2 p-2 border rounded bg-muted/50">
                                      {message.attachments.map((attachment) => (
                                        <div
                                          key={attachment.id}
                                          className="flex items-center gap-2"
                                        >
                                          <FileText className="h-4 w-4" />
                                          <span className="text-sm">
                                            {attachment.name}
                                          </span>
                                          <Badge
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            {attachment.size}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {message.reactions.length > 0 && (
                                    <div className="flex items-center gap-1 mt-2">
                                      {message.reactions.map(
                                        (reaction, index) => (
                                          <Button
                                            key={index}
                                            size="sm"
                                            variant="ghost"
                                            className="h-6 px-2"
                                          >
                                            {reaction.emoji}{" "}
                                            {reaction.users.length}
                                          </Button>
                                        ),
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      {/* Message Input */}
                      <div className="border-t p-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Input
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button size="sm" variant="ghost">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Choose a team or channel to start messaging
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Calls Tab */}
          <TabsContent value="calls" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Call</CardTitle>
                  <CardDescription>
                    Start an instant call or video conference
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select
                      value={selectedPlatform}
                      onValueChange={setSelectedPlatform}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(videoConferencingPlatforms).map(
                          ([key, platform]) => (
                            <SelectItem
                              key={key}
                              value={key}
                              disabled={!platform.isConfigured}
                            >
                              <div className="flex items-center gap-2">
                                <span>{platform.icon}</span>
                                {platform.name}
                                {!platform.apiConnected && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs ml-2"
                                  >
                                    Offline
                                  </Badge>
                                )}
                              </div>
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button
                      className="h-20 flex-col gap-2"
                      onClick={() => createInstantMeeting(selectedPlatform)}
                    >
                      <Phone className="h-6 w-6" />
                      Voice Call
                    </Button>
                    <Button
                      className="h-20 flex-col gap-2"
                      variant="outline"
                      onClick={() => createInstantMeeting(selectedPlatform)}
                    >
                      <Video className="h-6 w-6" />
                      Video Call
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Select participants</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose team members" />
                      </SelectTrigger>
                      <SelectContent>
                        {contacts.map((contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${getStatusColor(contact.status)}`}
                              />
                              {contact.name} - {contact.role}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Call History</CardTitle>
                  <CardDescription>
                    Recent calls and conferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        caller: "Priya Sharma",
                        type: "video",
                        duration: "15:30",
                        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                        status: "completed",
                      },
                      {
                        id: 2,
                        caller: "Team Meeting",
                        type: "voice",
                        duration: "45:20",
                        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                        status: "completed",
                      },
                      {
                        id: 3,
                        caller: "Amit Patel",
                        type: "video",
                        duration: "00:00",
                        timestamp: new Date(
                          Date.now() - 3 * 24 * 60 * 60 * 1000,
                        ),
                        status: "missed",
                      },
                    ].map((call) => (
                      <div
                        key={call.id}
                        className="flex items-center gap-3 p-3 border rounded"
                      >
                        <div className="flex-shrink-0">
                          {call.type === "video" ? (
                            <Video
                              className={`h-5 w-5 ${call.status === "missed" ? "text-red-500" : "text-blue-500"}`}
                            />
                          ) : (
                            <Phone
                              className={`h-5 w-5 ${call.status === "missed" ? "text-red-500" : "text-green-500"}`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{call.caller}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{formatTime(call.timestamp)}</span>
                            <span>��</span>
                            <span>{call.duration}</span>
                            <Badge
                              variant={
                                call.status === "missed"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {call.status}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <PhoneCall className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Meetings & Calendar</h2>
              <Button onClick={() => setShowNewMeeting(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {meetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {meeting.type === "video" ? (
                            <Video className="h-5 w-5 text-blue-600" />
                          ) : (
                            <MapPin className="h-5 w-5 text-green-600" />
                          )}
                          {meeting.title}
                        </CardTitle>
                        <CardDescription>{meeting.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{meeting.status}</Badge>
                        {meeting.platform && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <span>{getPlatformIcon(meeting.platform)}</span>
                            {getPlatformName(meeting.platform)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {meeting.startTime.toLocaleDateString()} at{" "}
                          {meeting.startTime.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{meeting.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {meeting.participants.length + 1} participants
                        </span>
                      </div>
                      {meeting.meetingId && (
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-xs">
                            {meeting.meetingId}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              navigator.clipboard.writeText(meeting.meetingId)
                            }
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Agenda</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {meeting.agenda.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      {meeting.type === "video" && meeting.meetingUrl && (
                        <Button
                          size="sm"
                          onClick={() => launchMeeting(meeting)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Join {getPlatformName(meeting.platform)}
                        </Button>
                      )}
                      {meeting.meetingUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigator.clipboard.writeText(meeting.meetingUrl)
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Circulars Tab */}
          <TabsContent value="circulars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Company Circulars</h2>
              <Button onClick={() => setShowNewCircular(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Circular
              </Button>
            </div>

            <div className="space-y-4">
              {circulars.map((circular) => (
                <Card key={circular.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Megaphone className="h-5 w-5 text-orange-600" />
                          {circular.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            className={getPriorityColor(circular.priority)}
                          >
                            {circular.priority} priority
                          </Badge>
                          <Badge variant="secondary">{circular.category}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Published {formatTime(circular.publishedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            circular.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {circular.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{circular.content}</p>

                    {circular.attachments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Attachments</h4>
                        {circular.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center gap-2 p-2 border rounded bg-muted/50"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="text-sm flex-1">
                              {attachment.name}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {attachment.size}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {circular.readBy.length}
                        </p>
                        <p className="text-sm text-muted-foreground">Read</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {circular.acknowledgedBy.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Acknowledged
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {Math.round(
                            (circular.acknowledgedBy.length /
                              circular.readBy.length) *
                              100,
                          ) || 0}
                          %
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Response Rate
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notifications & Alerts</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Mark All Read
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`${!notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/50" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {notification.type === "assignment" && (
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        )}
                        {notification.type === "reminder" && (
                          <Clock className="h-5 w-5 text-orange-600" />
                        )}
                        {notification.type === "approval" && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getPriorityColor(
                                notification.priority,
                              )}
                            >
                              {notification.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex gap-2">
                          {notification.actionUrl && (
                            <Button size="sm" variant="outline">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          )}
                          {!notification.isRead && (
                            <Button size="sm" variant="ghost">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Directory Tab */}
          <TabsContent value="directory" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Employee Directory</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredContacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.role}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contact.department}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div
                            className={`w-2 h-2 rounded-full ${getStatusColor(contact.status)}`}
                          />
                          <span className="text-xs text-muted-foreground capitalize">
                            {contact.status}
                          </span>
                          {contact.status !== "online" && (
                            <>
                              <span className="text-xs text-muted-foreground">
                                •
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(contact.lastSeen)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                    </div>

                    {contact.teams.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          Teams:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {contact.teams.slice(0, 2).map((teamId) => {
                            const team = teams.find((t) => t.id === teamId);
                            return (
                              <Badge
                                key={teamId}
                                variant="secondary"
                                className="text-xs"
                              >
                                {team?.name.split(" ")[0]}
                              </Badge>
                            );
                          })}
                          {contact.teams.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{contact.teams.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">Communication Settings</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Customize how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS for urgent messages
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Meeting Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminders before meetings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your privacy and availability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status Visibility</Label>
                    <Select defaultValue="team">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="team">Team Members Only</SelectItem>
                        <SelectItem value="managers">Managers Only</SelectItem>
                        <SelectItem value="nobody">Nobody</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Last Seen</Label>
                      <p className="text-sm text-muted-foreground">
                        Let others see when you were last active
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Read Receipts</Label>
                      <p className="text-sm text-muted-foreground">
                        Show when you've read messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chat Settings</CardTitle>
                  <CardDescription>
                    Customize your chat experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Message Theme</Label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sound Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Play sound for new messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Video Conferencing Platforms</CardTitle>
                  <CardDescription>
                    Configure external meeting platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(videoConferencingPlatforms).map(
                    ([key, platform]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{platform.icon}</span>
                          <div>
                            <Label>{platform.name}</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <div
                                className={`w-2 h-2 rounded-full ${platform.apiConnected ? "bg-green-500" : "bg-red-500"}`}
                              />
                              <span className="text-sm text-muted-foreground">
                                {platform.apiConnected
                                  ? "Connected"
                                  : "Disconnected"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                • Last sync: {formatTime(platform.lastSync)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={platform.isConfigured} />
                          <Button size="sm" variant="outline">
                            {platform.apiConnected ? "Reconfigure" : "Connect"}
                          </Button>
                        </div>
                      </div>
                    ),
                  )}
                  <div className="mt-4 p-3 bg-muted/50 rounded">
                    <p className="text-sm text-muted-foreground">
                      💡 Connect your organization's accounts to enable seamless
                      meeting creation and management across all platforms.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integration Settings</CardTitle>
                  <CardDescription>Connect with other modules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Project Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Sync with project management
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>CRM Integration</Label>
                      <p className="text-sm text-muted-foreground">
                        Connect with customer data
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Calendar Sync</Label>
                      <p className="text-sm text-muted-foreground">
                        Sync meetings with calendar
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* New Meeting Dialog */}
        <Dialog open={showNewMeeting} onOpenChange={setShowNewMeeting}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Create a new meeting or conference call
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Meeting Title</Label>
                <Input placeholder="Enter meeting title" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Meeting description and agenda" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Conference</SelectItem>
                      <SelectItem value="voice">Voice Call</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(videoConferencingPlatforms).map(
                        ([key, platform]) => (
                          <SelectItem
                            key={key}
                            value={key}
                            disabled={!platform.isConfigured}
                          >
                            <div className="flex items-center gap-2">
                              <span>{platform.icon}</span>
                              {platform.name}
                              {!platform.apiConnected && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs ml-2"
                                >
                                  Offline
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Schedule Meeting</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewMeeting(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Circular Dialog */}
        <Dialog open={showNewCircular} onOpenChange={setShowNewCircular}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Circular</DialogTitle>
              <DialogDescription>
                Send company-wide announcements
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Circular title" />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  placeholder="Circular content and details"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Recipients</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    <SelectItem value="construction">
                      Construction Team
                    </SelectItem>
                    <SelectItem value="sales">Sales Team</SelectItem>
                    <SelectItem value="finance">Finance Team</SelectItem>
                    <SelectItem value="management">Management Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Publish Circular</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewCircular(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
