import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  MessageSquare,
  Users,
  Trophy,
  Megaphone,
  MessageCircle,
  ClipboardList,
  Heart,
  Star,
  Send,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Edit,
  Share,
  Download,
  Pin,
  Bell,
  Image,
  Paperclip,
  Smile,
  Phone,
  Video,
  Settings,
  MoreVertical,
  Gift,
  Award,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Reply,
  Forward,
  Bookmark,
  Flag,
  Hash,
  AtSign,
  Upload,
  FileText,
  Coffee,
  PartyPopper,
  Sparkles,
  Crown,
  Medal,
} from "lucide-react";
import { BackToHRMS } from "@/components/hrms";

// Surveys & Polls Data
const surveys = [
  {
    id: 1,
    title: "Q4 Employee Satisfaction Survey",
    description:
      "Annual satisfaction survey to gather feedback on workplace experience",
    type: "survey",
    status: "active",
    responses: 456,
    totalEmployees: 1248,
    responseRate: 36.5,
    deadline: "2024-12-31",
    createdBy: "HR Team",
    createdDate: "2024-12-01",
    questions: [
      {
        id: 1,
        question: "How satisfied are you with your current role?",
        type: "rating",
        responses: 456,
        avgRating: 4.2,
      },
      {
        id: 2,
        question: "Would you recommend our company as a great place to work?",
        type: "yes_no",
        responses: 456,
        yesCount: 387,
      },
      {
        id: 3,
        question: "What aspects of work-life balance need improvement?",
        type: "multiple_choice",
        responses: 456,
        options: ["Flexible hours", "Remote work", "Workload", "Benefits"],
      },
    ],
  },
  {
    id: 2,
    title: "Office Lunch Preferences Poll",
    description: "Quick poll to decide next month's lunch menu options",
    type: "poll",
    status: "active",
    responses: 234,
    totalEmployees: 1248,
    responseRate: 18.8,
    deadline: "2024-12-25",
    createdBy: "Admin Team",
    createdDate: "2024-12-20",
    questions: [
      {
        id: 1,
        question: "Which cuisine would you prefer for office lunch?",
        type: "multiple_choice",
        responses: 234,
        options: ["North Indian", "South Indian", "Chinese", "Continental"],
        results: [89, 67, 45, 33],
      },
    ],
  },
  {
    id: 3,
    title: "Training Needs Assessment",
    description: "Identify training requirements for professional development",
    type: "survey",
    status: "completed",
    responses: 1156,
    totalEmployees: 1200,
    responseRate: 96.3,
    deadline: "2024-11-30",
    createdBy: "L&D Team",
    createdDate: "2024-11-01",
    questions: [
      {
        id: 1,
        question: "Which skills would you like to develop?",
        type: "multiple_choice",
        responses: 1156,
        options: [
          "Technical Skills",
          "Leadership",
          "Communication",
          "Project Management",
        ],
      },
    ],
  },
];

// Rewards & Recognition Data
const recognitions = [
  {
    id: 1,
    type: "peer_nomination",
    title: "Team Player Award",
    recipient: {
      name: "Priya Sharma",
      department: "Engineering",
      avatar: "/placeholder.svg",
      employeeId: "ENG001",
    },
    nominator: {
      name: "Rahul Kumar",
      department: "Engineering",
      avatar: "/placeholder.svg",
    },
    description:
      "Priya consistently goes above and beyond to help team members and ensure project success. Her collaborative spirit and technical expertise make her an invaluable team player.",
    category: "Teamwork",
    points: 500,
    badge: "Team Champion",
    date: "2024-12-23",
    likes: 45,
    comments: 12,
    status: "approved",
  },
  {
    id: 2,
    type: "manager_recognition",
    title: "Innovation Excellence",
    recipient: {
      name: "Arjun Patel",
      department: "Operations",
      avatar: "/placeholder.svg",
      employeeId: "OPS005",
    },
    nominator: {
      name: "Meera Singh",
      department: "Management",
      avatar: "/placeholder.svg",
    },
    description:
      "Arjun's innovative approach to process optimization resulted in 25% efficiency improvement and significant cost savings for the department.",
    category: "Innovation",
    points: 1000,
    badge: "Innovation Star",
    date: "2024-12-22",
    likes: 67,
    comments: 18,
    status: "approved",
  },
  {
    id: 3,
    type: "milestone_achievement",
    title: "5 Years of Excellence",
    recipient: {
      name: "Deepika Reddy",
      department: "HR",
      avatar: "/placeholder.svg",
      employeeId: "HR003",
    },
    nominator: {
      name: "System",
      department: "HR",
      avatar: "/placeholder.svg",
    },
    description:
      "Celebrating 5 years of dedicated service and outstanding contribution to our organization's growth and culture.",
    category: "Service Anniversary",
    points: 2000,
    badge: "5 Year Veteran",
    date: "2024-12-21",
    likes: 89,
    comments: 24,
    status: "approved",
  },
];

const leaderboard = [
  {
    rank: 1,
    employee: {
      name: "Vikram Agarwal",
      department: "Sales",
      avatar: "/placeholder.svg",
      employeeId: "SAL012",
    },
    totalPoints: 8450,
    monthlyPoints: 1200,
    badges: ["Top Performer", "Customer Champion", "Goal Crusher"],
    level: "Platinum",
  },
  {
    rank: 2,
    employee: {
      name: "Ananya Joshi",
      department: "Engineering",
      avatar: "/placeholder.svg",
      employeeId: "ENG089",
    },
    totalPoints: 7890,
    monthlyPoints: 980,
    badges: ["Innovation Star", "Team Player", "Quality Expert"],
    level: "Gold",
  },
  {
    rank: 3,
    employee: {
      name: "Karan Malhotra",
      department: "Operations",
      avatar: "/placeholder.svg",
      employeeId: "OPS034",
    },
    totalPoints: 7234,
    monthlyPoints: 856,
    badges: ["Efficiency Master", "Safety Champion", "Mentor"],
    level: "Gold",
  },
];

// Employee Announcements Data
const announcements = [
  {
    id: 1,
    title: "Year-End Celebration & Awards Ceremony",
    content:
      "Join us for our annual year-end celebration on December 30th at the main auditorium. We'll be recognizing outstanding performers and celebrating our achievements together. Dinner and entertainment included!",
    type: "event",
    priority: "high",
    author: {
      name: "Rajesh Gupta",
      role: "CEO",
      avatar: "/placeholder.svg",
    },
    department: "All",
    publishDate: "2024-12-23 09:00",
    expiryDate: "2024-12-30",
    views: 892,
    likes: 156,
    comments: 23,
    isPinned: true,
    tags: ["celebration", "awards", "company-wide"],
    attachments: ["event-invitation.pdf", "venue-map.png"],
  },
  {
    id: 2,
    title: "New Health Insurance Benefits Effective January 2025",
    content:
      "We're excited to announce enhanced health insurance coverage starting January 1st, 2025. The new plan includes increased coverage limits, additional wellness benefits, and family coverage options. Please attend the information session on December 28th for complete details.",
    type: "policy",
    priority: "medium",
    author: {
      name: "Sunita Nair",
      role: "HR Director",
      avatar: "/placeholder.svg",
    },
    department: "All",
    publishDate: "2024-12-22 14:30",
    expiryDate: "2025-01-31",
    views: 743,
    likes: 89,
    comments: 34,
    isPinned: true,
    tags: ["benefits", "health insurance", "policy update"],
    attachments: ["benefits-brochure.pdf"],
  },
  {
    id: 3,
    title: "Q1 2025 Project Kickoff Meetings",
    content:
      "All department heads please schedule Q1 project kickoff meetings by January 10th. Project proposals and budget allocations are due by January 15th. Let's start the new year with clear goals and strategic alignment.",
    type: "general",
    priority: "medium",
    author: {
      name: "Amit Sharma",
      role: "Operations Director",
      avatar: "/placeholder.svg",
    },
    department: "Management",
    publishDate: "2024-12-21 11:15",
    expiryDate: "2025-01-15",
    views: 234,
    likes: 18,
    comments: 7,
    isPinned: false,
    tags: ["projects", "planning", "Q1"],
    attachments: [],
  },
];

// Internal Chat Data
const chatChannels = [
  {
    id: 1,
    name: "General",
    description: "Company-wide discussions and updates",
    type: "public",
    members: 1248,
    unreadCount: 5,
    lastMessage: {
      sender: "Priya Sharma",
      content: "Great job everyone on the Q4 targets! 🎉",
      timestamp: "2024-12-23 15:30",
    },
    isOnline: true,
  },
  {
    id: 2,
    name: "Engineering Team",
    description: "Technical discussions and code reviews",
    type: "private",
    members: 285,
    unreadCount: 12,
    lastMessage: {
      sender: "Arjun Patel",
      content: "The new deployment pipeline is ready for testing",
      timestamp: "2024-12-23 14:45",
    },
    isOnline: true,
  },
  {
    id: 3,
    name: "HR Announcements",
    description: "Official HR communications and policies",
    type: "announcement",
    members: 1248,
    unreadCount: 2,
    lastMessage: {
      sender: "Sunita Nair",
      content: "New health insurance enrollment deadline extended",
      timestamp: "2024-12-23 12:20",
    },
    isOnline: false,
  },
  {
    id: 4,
    name: "Random",
    description: "Casual conversations and fun discussions",
    type: "public",
    members: 892,
    unreadCount: 8,
    lastMessage: {
      sender: "Karan Malhotra",
      content: "Coffee anyone? ☕",
      timestamp: "2024-12-23 16:10",
    },
    isOnline: true,
  },
];

const chatMessages = [
  {
    id: 1,
    sender: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg",
      status: "online",
    },
    content: "Great job everyone on the Q4 targets! 🎉",
    timestamp: "2024-12-23 15:30",
    type: "text",
    reactions: [
      { emoji: "👏", count: 15, users: ["Arjun", "Deepika", "others"] },
      { emoji: "🎉", count: 8, users: ["Karan", "Vikram", "others"] },
    ],
    replies: 3,
  },
  {
    id: 2,
    sender: {
      name: "Arjun Patel",
      avatar: "/placeholder.svg",
      status: "online",
    },
    content:
      "The new deployment pipeline is ready for testing. Who wants to help with the QA?",
    timestamp: "2024-12-23 14:45",
    type: "text",
    reactions: [
      { emoji: "🚀", count: 6, users: ["Priya", "Ananya", "others"] },
    ],
    replies: 5,
    attachments: [{ name: "deployment-guide.pdf", size: "2.4 MB" }],
  },
  {
    id: 3,
    sender: {
      name: "Deepika Reddy",
      avatar: "/placeholder.svg",
      status: "away",
    },
    content:
      "Thanks everyone for the anniversary wishes! Feeling grateful to be part of this amazing team ❤️",
    timestamp: "2024-12-23 13:20",
    type: "text",
    reactions: [
      { emoji: "❤️", count: 24, users: ["Rajesh", "Sunita", "others"] },
      { emoji: "🎂", count: 12, users: ["Priya", "Arjun", "others"] },
    ],
    replies: 8,
  },
];

// Bulletin Board Data
const bulletinPosts = [
  {
    id: 1,
    title: "Car Pool Group - Mumbai to Pune Route",
    content:
      "Looking for people interested in carpooling from Mumbai to Pune office. Currently have 2 people, need 2 more. Share petrol costs. Contact me if interested!",
    category: "Transportation",
    author: {
      name: "Rohit Verma",
      department: "Sales",
      avatar: "/placeholder.svg",
      contact: "rohit.verma@company.com",
    },
    postDate: "2024-12-23 10:30",
    expiryDate: "2025-01-23",
    views: 67,
    responses: 8,
    status: "active",
    tags: ["carpool", "mumbai", "pune", "transportation"],
    isPinned: false,
  },
  {
    id: 2,
    title: "Flat for Rent - 2BHK Near Office",
    content:
      "Spacious 2BHK apartment available for rent, just 10 minutes walking distance from office. Fully furnished, parking included. Ideal for office colleagues. ₹25,000/month.",
    category: "Accommodation",
    author: {
      name: "Sneha Kapoor",
      department: "HR",
      avatar: "/placeholder.svg",
      contact: "sneha.kapoor@company.com",
    },
    postDate: "2024-12-22 16:45",
    expiryDate: "2025-02-22",
    views: 156,
    responses: 23,
    status: "active",
    tags: ["rent", "accommodation", "2bhk", "furnished"],
    isPinned: false,
    images: ["flat-image-1.jpg", "flat-image-2.jpg"],
  },
  {
    id: 3,
    title: "Cricket Tournament Registration Open",
    content:
      "Inter-department cricket tournament starting in January! Register your team by December 30th. Entry fee: ₹500 per team. Winners get cash prizes and trophies. Let's make it competitive!",
    category: "Sports & Recreation",
    author: {
      name: "Sports Committee",
      department: "Employee Engagement",
      avatar: "/placeholder.svg",
      contact: "sports@company.com",
    },
    postDate: "2024-12-21 14:20",
    expiryDate: "2024-12-30",
    views: 234,
    responses: 45,
    status: "active",
    tags: ["cricket", "tournament", "sports", "competition"],
    isPinned: true,
    attachments: ["tournament-rules.pdf", "registration-form.pdf"],
  },
  {
    id: 4,
    title: "Book Exchange Program",
    content:
      "Starting a book exchange program! Bring books you've finished reading and exchange them with others. Fiction, non-fiction, technical books - all welcome. Drop-off point at reception.",
    category: "Learning & Development",
    author: {
      name: "Aisha Malik",
      department: "Learning & Development",
      avatar: "/placeholder.svg",
      contact: "aisha.malik@company.com",
    },
    postDate: "2024-12-20 11:30",
    expiryDate: "2025-03-20",
    views: 89,
    responses: 15,
    status: "active",
    tags: ["books", "exchange", "learning", "reading"],
    isPinned: false,
  },
];

export default function EmployeeEngagementCommunication() {
  const [activeTab, setActiveTab] = useState("surveys");
  const [selectedChannel, setSelectedChannel] = useState(chatChannels[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const totalSurveyResponses = surveys.reduce(
    (sum, survey) => sum + survey.responses,
    0,
  );
  const avgResponseRate =
    surveys.reduce((sum, survey) => sum + survey.responseRate, 0) /
    surveys.length;
  const totalRecognitions = recognitions.length;
  const totalAnnouncements = announcements.filter(
    (a) => new Date(a.expiryDate) > new Date(),
  ).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <BackToHRMS />
        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Employee Engagement & Communication
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={MessageSquare}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                Foster collaboration, recognition, and community through
                surveys, rewards, and communication tools
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Bell} animation="bounce" className="mr-2" />
              Notifications
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-construction-500 to-primary relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Post
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover-lift animate-fadeInUp relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Active Surveys</p>
                <AnimatedIcon
                  icon={ClipboardList}
                  animation="pulse"
                  className="text-blue-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter
                  value={surveys.filter((s) => s.status === "active").length}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {totalSurveyResponses} total responses
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Recognitions</p>
                <AnimatedIcon
                  icon={Trophy}
                  animation="glow"
                  className="text-yellow-500"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={totalRecognitions} />
              </div>
              <div className="text-xs text-muted-foreground">This month</div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Active Announcements
                </p>
                <AnimatedIcon
                  icon={Megaphone}
                  animation="bounce"
                  className="text-emerald-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={totalAnnouncements} />
              </div>
              <div className="text-xs text-muted-foreground">
                Company-wide updates
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover-lift animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Chat Channels</p>
                <AnimatedIcon
                  icon={MessageCircle}
                  animation="float"
                  className="text-purple-600"
                />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={chatChannels.length} />
              </div>
              <div className="text-xs text-muted-foreground">
                {chatChannels.reduce(
                  (sum, channel) => sum + channel.unreadCount,
                  0,
                )}{" "}
                unread messages
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="h-auto p-1 bg-muted/50 lg:grid lg:grid-cols-5 w-full overflow-x-auto scrollbar-hide flex lg:flex-none gap-1 lg:gap-0">
            <TabsTrigger
              value="surveys"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={ClipboardList} size="sm" className="mr-2" />
              Surveys & Polls
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Trophy} size="sm" className="mr-2" />
              Rewards & Recognition
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Megaphone} size="sm" className="mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={MessageCircle} size="sm" className="mr-2" />
              Chat & Collaboration
            </TabsTrigger>
            <TabsTrigger
              value="bulletin"
              className="text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 lg:flex-shrink data-[state=active]:bg-white"
            >
              <AnimatedIcon icon={Pin} size="sm" className="mr-2" />
              Bulletin Boards
            </TabsTrigger>
          </TabsList>

          {/* Surveys & Polls Tab */}
          <TabsContent value="surveys" className="space-y-6">
            <div className="grid gap-6">
              {/* Create Survey Section */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Plus}
                        className="text-construction-500"
                      />
                      <CardTitle>Create New Survey or Poll</CardTitle>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Survey
                    </Button>
                  </div>
                  <CardDescription>
                    Gather employee feedback through surveys and quick polls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <ClipboardList className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Employee Survey</h4>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive feedback collection
                          </p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <BarChart3 className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Quick Poll</h4>
                          <p className="text-sm text-muted-foreground">
                            Fast decision making tool
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Active Surveys */}
              <div className="grid gap-4">
                {surveys.map((survey, index) => (
                  <Card
                    key={survey.id}
                    className="hover-lift animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {survey.title}
                              </h3>
                              <Badge
                                variant={
                                  survey.status === "active"
                                    ? "default"
                                    : survey.status === "completed"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {survey.status}
                              </Badge>
                              <Badge variant="outline">
                                {survey.type === "survey" ? "Survey" : "Poll"}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">
                              {survey.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Created by {survey.createdBy}</span>
                              <span>•</span>
                              <span>Deadline: {survey.deadline}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-construction-500">
                              {survey.responseRate.toFixed(1)}%
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Response Rate
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>
                              {survey.responses} of {survey.totalEmployees}{" "}
                              responses
                            </span>
                            <span>{survey.responseRate.toFixed(1)}%</span>
                          </div>
                          <Progress
                            value={survey.responseRate}
                            className="h-2"
                          />
                        </div>

                        {survey.questions.length > 0 && (
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Sample Questions ({survey.questions.length} total)
                            </Label>
                            <div className="space-y-2">
                              {survey.questions.slice(0, 2).map((question) => (
                                <div
                                  key={question.id}
                                  className="p-3 border rounded-lg"
                                >
                                  <p className="text-sm font-medium">
                                    {question.question}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>
                                      Type: {question.type.replace("_", " ")}
                                    </span>
                                    <span>•</span>
                                    <span>{question.responses} responses</span>
                                    {question.avgRating && (
                                      <>
                                        <span>•</span>
                                        <span>Avg: {question.avgRating}/5</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-4 border-t">
                          <Button size="sm" className="hover-lift">
                            <Eye className="h-3 w-3 mr-1" />
                            View Results
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Share className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover-lift"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Export Data
                          </Button>
                          {survey.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover-lift"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Rewards & Recognition Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid gap-6">
              {/* Recognition Actions */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover-lift cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-yellow-500/10">
                        <Heart className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Nominate Peer</h4>
                        <p className="text-sm text-muted-foreground">
                          Recognize a colleague's contribution
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-purple-500/10">
                        <Gift className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Send Rewards</h4>
                        <p className="text-sm text-muted-foreground">
                          Gift points or badges to team members
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-emerald-500/10">
                        <Trophy className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">View Leaderboard</h4>
                        <p className="text-sm text-muted-foreground">
                          See top performers this month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recognition Feed */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Sparkles} className="text-yellow-500" />
                    Recognition Feed
                  </CardTitle>
                  <CardDescription>
                    Recent recognitions and achievements across the organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recognitions.map((recognition, index) => (
                      <Card
                        key={recognition.id}
                        className="p-4 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={recognition.recipient.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-construction-500 text-white">
                                {recognition.recipient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">
                                      {recognition.recipient.name}
                                    </h4>
                                    <Badge variant="outline">
                                      {recognition.recipient.department}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {recognition.recipient.employeeId}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1">
                                    <Crown className="h-4 w-4 text-yellow-500" />
                                    <span className="font-bold text-yellow-600">
                                      {recognition.points} pts
                                    </span>
                                  </div>
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                                    {recognition.badge}
                                  </Badge>
                                </div>
                              </div>

                              <div className="mt-3">
                                <h5 className="font-medium text-construction-500">
                                  {recognition.title}
                                </h5>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {recognition.description}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>
                                    By {recognition.nominator.name} •{" "}
                                    {recognition.date}
                                  </span>
                                  <Badge variant="secondary">
                                    {recognition.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span className="text-sm">
                                      {recognition.likes}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">
                                      {recognition.comments}
                                    </span>
                                  </div>
                                  <Button size="sm" variant="ghost">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    Like
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={Trophy}
                      className="text-construction-500"
                    />
                    Recognition Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top performers this month based on recognition points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((leader, index) => (
                      <div
                        key={leader.rank}
                        className="flex items-center gap-4 p-4 border rounded-lg animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                              leader.rank === 1
                                ? "bg-yellow-500"
                                : leader.rank === 2
                                  ? "bg-gray-400"
                                  : "bg-orange-500"
                            }`}
                          >
                            {leader.rank === 1 ? (
                              <Crown className="h-4 w-4" />
                            ) : leader.rank === 2 ? (
                              <Medal className="h-4 w-4" />
                            ) : (
                              <Award className="h-4 w-4" />
                            )}
                          </div>
                          <span className="font-bold text-lg">
                            #{leader.rank}
                          </span>
                        </div>

                        <Avatar className="h-12 w-12">
                          <AvatarImage src={leader.employee.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-construction-500 text-white">
                            {leader.employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">
                              {leader.employee.name}
                            </h4>
                            <Badge variant="outline">
                              {leader.employee.department}
                            </Badge>
                            <Badge
                              className={`
                              ${
                                leader.level === "Platinum"
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                  : leader.level === "Gold"
                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                    : "bg-gradient-to-r from-gray-400 to-gray-600"
                              } text-white
                            `}
                            >
                              {leader.level}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {leader.badges
                              .slice(0, 3)
                              .map((badge, badgeIndex) => (
                                <Badge
                                  key={badgeIndex}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {badge}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-construction-500">
                            {leader.totalPoints.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            +{leader.monthlyPoints} this month
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employee Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="grid gap-6">
              {/* Create Announcement */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Plus}
                        className="text-construction-500"
                      />
                      <CardTitle>Create Announcement</CardTitle>
                    </div>
                    <Button>
                      <Megaphone className="h-4 w-4 mr-2" />
                      New Announcement
                    </Button>
                  </div>
                  <CardDescription>
                    Share important updates and information with employees
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Announcements Feed */}
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <Card
                    key={announcement.id}
                    className={`hover-lift animate-fadeInUp ${
                      announcement.isPinned
                        ? "border-construction-500 bg-construction-50/30"
                        : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {announcement.isPinned && (
                                <Pin className="h-4 w-4 text-construction-500" />
                              )}
                              <h3 className="text-lg font-semibold">
                                {announcement.title}
                              </h3>
                              <Badge
                                variant={
                                  announcement.priority === "high"
                                    ? "destructive"
                                    : announcement.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {announcement.priority} priority
                              </Badge>
                              <Badge variant="outline">
                                {announcement.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={announcement.author.avatar}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {announcement.author.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  {announcement.author.name}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {announcement.author.role}
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {announcement.publishDate}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Eye className="h-4 w-4" />
                              <span>{announcement.views} views</span>
                            </div>
                          </div>
                        </div>

                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground leading-relaxed">
                            {announcement.content}
                          </p>
                        </div>

                        {announcement.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {announcement.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {announcement.attachments.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Attachments
                            </Label>
                            <div className="flex flex-wrap gap-2">
                              {announcement.attachments.map(
                                (attachment, attachIndex) => (
                                  <Button
                                    key={attachIndex}
                                    variant="outline"
                                    size="sm"
                                    className="hover-lift"
                                  >
                                    <Paperclip className="h-3 w-3 mr-1" />
                                    {attachment}
                                  </Button>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">
                                {announcement.likes}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4 text-emerald-500" />
                              <span className="text-sm">
                                {announcement.comments}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Expires: {announcement.expiryDate}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Like
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Comment
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Internal Chat & Collaboration Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Channel List */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={MessageCircle}
                        className="text-primary"
                      />
                      Channels
                    </CardTitle>
                    <Button size="sm" variant="outline">
                      <Plus className="h-3 w-3 mr-1" />
                      New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {chatChannels.map((channel, index) => (
                      <div
                        key={channel.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors animate-fadeInUp ${
                          selectedChannel.id === channel.id
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-muted/50"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => setSelectedChannel(channel)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">
                              {channel.name}
                            </span>
                            {channel.unreadCount > 0 && (
                              <Badge className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                                {channel.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {channel.isOnline && (
                              <PulsingDot className="scale-50" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {channel.type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {channel.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{channel.members} members</span>
                          <span>{channel.lastMessage.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          <span className="font-medium">
                            {channel.lastMessage.sender}:
                          </span>{" "}
                          {channel.lastMessage.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="hover-lift h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Hash className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>{selectedChannel.name}</CardTitle>
                        <Badge variant="outline">{selectedChannel.type}</Badge>
                        {selectedChannel.isOnline && (
                          <PulsingDot className="scale-75" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {selectedChannel.description} • {selectedChannel.members}{" "}
                      members
                    </CardDescription>
                  </CardHeader>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={message.id}
                        className="animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.sender.avatar} />
                            <AvatarFallback className="text-xs">
                              {message.sender.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {message.sender.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp}
                              </span>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    message.sender.status === "online"
                                      ? "bg-emerald-500"
                                      : message.sender.status === "away"
                                        ? "bg-yellow-500"
                                        : "bg-gray-400"
                                  }`}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {message.sender.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm">{message.content}</div>

                            {message.attachments && (
                              <div className="mt-2">
                                {message.attachments.map(
                                  (attachment, attachIndex) => (
                                    <div
                                      key={attachIndex}
                                      className="flex items-center gap-2 p-2 border rounded bg-muted/30"
                                    >
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">
                                        {attachment.name}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {attachment.size}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                            {message.reactions.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {message.reactions.map(
                                  (reaction, reactionIndex) => (
                                    <Button
                                      key={reactionIndex}
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs"
                                    >
                                      {reaction.emoji} {reaction.count}
                                    </Button>
                                  ),
                                )}
                              </div>
                            )}

                            {message.replies > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs mt-1"
                              >
                                <Reply className="h-3 w-3 mr-1" />
                                {message.replies} replies
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-1 border rounded-lg p-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Image className="h-4 w-4" />
                          </Button>
                          <Input
                            placeholder={`Message #${selectedChannel.name}`}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="border-0 focus-visible:ring-0 flex-1"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Smile className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button size="sm" className="hover-lift">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Bulletin Boards Tab */}
          <TabsContent value="bulletin" className="space-y-6">
            <div className="grid gap-6">
              {/* Create Post */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedIcon
                        icon={Plus}
                        className="text-construction-500"
                      />
                      <CardTitle>Create Bulletin Post</CardTitle>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                  <CardDescription>
                    Share classifieds, announcements, and community updates
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Category Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium">Categories:</Label>
                    <div className="flex gap-2">
                      {[
                        "All",
                        "Transportation",
                        "Accommodation",
                        "Sports & Recreation",
                        "Learning & Development",
                        "Marketplace",
                      ].map((category) => (
                        <Button
                          key={category}
                          variant={category === "All" ? "default" : "outline"}
                          size="sm"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bulletin Posts */}
              <div className="grid gap-4">
                {bulletinPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className={`hover-lift animate-fadeInUp ${
                      post.isPinned ? "border-yellow-500 bg-yellow-50/30" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {post.isPinned && (
                                <Pin className="h-4 w-4 text-yellow-500" />
                              )}
                              <h3 className="text-lg font-semibold">
                                {post.title}
                              </h3>
                              <Badge variant="outline">{post.category}</Badge>
                              <Badge
                                variant={
                                  post.status === "active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {post.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={post.author.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {post.author.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  {post.author.name}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {post.author.department}
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {post.postDate}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Eye className="h-4 w-4" />
                              <span>{post.views} views</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.responses} responses</span>
                            </div>
                          </div>
                        </div>

                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground leading-relaxed">
                            {post.content}
                          </p>
                        </div>

                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {(post.attachments || post.images) && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Attachments
                            </Label>
                            <div className="flex flex-wrap gap-2">
                              {post.attachments?.map(
                                (attachment, attachIndex) => (
                                  <Button
                                    key={attachIndex}
                                    variant="outline"
                                    size="sm"
                                    className="hover-lift"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    {attachment}
                                  </Button>
                                ),
                              )}
                              {post.images?.map((image, imageIndex) => (
                                <Button
                                  key={imageIndex}
                                  variant="outline"
                                  size="sm"
                                  className="hover-lift"
                                >
                                  <Image className="h-3 w-3 mr-1" />
                                  {image}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-xs">
                              Expires: {post.expiryDate}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Contact: {post.author.contact}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Respond
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Bookmark className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
