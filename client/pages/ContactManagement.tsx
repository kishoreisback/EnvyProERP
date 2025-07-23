import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Phone,
  Mail,
  Globe,
  MapPin,
  Building,
  Calendar,
  Star,
  Tag,
  Clock,
  Eye,
  Edit,
  Trash2,
  Settings,
  Share2,
  UserPlus,
  FileText,
  Heart,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Target,
  Network,
  Crown,
  Users2,
  Home,
  Briefcase,
  ShoppingCart,
  Zap,
  MessageSquare,
  PlusCircle,
  UserCheck,
  Shield,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  LoadingSpinner,
  GlowingOrb,
} from "@/components/ui/animated-icons";

// Enhanced Contact interface for comprehensive contact management
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  alternatePhone?: string;
  company?: string;
  title: string;
  contactType: "Buyer" | "Contractor" | "Vendor" | "Broker" | "Influencer";
  status: "Active" | "Inactive" | "Prospect" | "Client" | "Former Client";

  // Personal Details
  dateOfBirth?: string;
  anniversary?: string;
  personalEmail?: string;
  profilePicture?: string;

  // Location
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;

  // Business Details
  industry:
    | "Construction"
    | "Real Estate"
    | "Sales & Marketing"
    | "Manufacturing";
  businessType?: string;
  website?: string;
  linkedIn?: string;

  // Financial Information
  budgetRange: string;
  creditScore?: number;
  paymentTerms?: string;
  taxId?: string;

  // Preferences & Timeline
  preferences: string[];
  communicationPreference: "Email" | "Phone" | "WhatsApp" | "SMS";
  bestTimeToContact: string;
  decisionTimeline: string;

  // Role & Hierarchy
  role:
    | "Primary Decision Maker"
    | "Influencer"
    | "Financier"
    | "User"
    | "Gatekeeper";
  hierarchy: number; // 1 = top level, 2 = middle, 3 = junior
  accountId?: string; // For B2B hierarchy
  reportsTo?: string; // Contact ID of supervisor

  // Family/Team Associations (Indian market)
  familyMembers?: FamilyMember[];
  teamMembers?: TeamMember[];
  isPrimaryFamilyContact?: boolean;

  // Tags and Classification
  tags: string[];
  priority: "Low" | "Medium" | "High" | "Critical";
  sourceOfContact: string;

  // Tracking
  createdAt: string;
  updatedAt: string;
  lastContactDate: string;
  nextFollowUpDate?: string;
  contactFrequency: number; // interactions per month

  // Indian-specific
  panNumber?: string;
  aadhaarLast4?: string;
  gstNumber?: string;

  // Account relationships
  accounts?: string[]; // Account IDs this contact belongs to
  isAccountPrimary?: boolean;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: "Spouse" | "Father" | "Mother" | "Son" | "Daughter" | "Other";
  role: "Decision Maker" | "Influencer" | "Beneficiary";
  phone?: string;
  email?: string;
  dateOfBirth?: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  role: "Decision Maker" | "Influencer" | "User" | "Technical Expert";
  phone?: string;
  email?: string;
}

interface Account {
  id: string;
  name: string;
  type: "Individual" | "Family" | "Corporate" | "Partnership" | "Government";
  industry:
    | "Construction"
    | "Real Estate"
    | "Sales & Marketing"
    | "Manufacturing";
  status: "Active" | "Inactive" | "Prospect" | "Client";

  // Business Details
  website?: string;
  revenue?: string;
  employeeCount?: string;
  establishedYear?: number;

  // Location
  headquarters: string;
  branches?: string[];

  // Relationships
  primaryContactId: string;
  contacts: string[]; // Contact IDs
  parentAccountId?: string; // For subsidiary relationships
  childAccounts?: string[]; // Subsidiary account IDs

  // Financial
  creditLimit?: number;
  paymentTerms?: string;
  taxId: string;
  gstNumber?: string;

  // Tracking
  createdAt: string;
  updatedAt: string;
  lastActivityDate: string;
  totalValue: number;

  // Tags
  tags: string[];
  priority: "Low" | "Medium" | "High" | "Critical";
}

export default function ContactManagement() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactTypeFilter, setContactTypeFilter] = useState("All");
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    reset: resetContact,
    control: controlContact,
    formState: { errors: errorsContact, isSubmitting: isSubmittingContact },
  } = useForm<Partial<Contact>>();

  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    reset: resetAccount,
    control: controlAccount,
    formState: { errors: errorsAccount, isSubmitting: isSubmittingAccount },
  } = useForm<Partial<Account>>();

  // State for contacts and accounts
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@email.com",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      alternatePhone: "+91 99123 45678",
      company: "Sharma Family",
      title: "Head of Family",
      contactType: "Buyer",
      status: "Active",
      address: "A-204, Golden Heights, Sector 12",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400012",
      country: "India",
      industry: "Real Estate",
      budgetRange: "₹1Cr - ₹2Cr",
      preferences: ["2-3 BHK", "High Floor", "Sea View", "Good School Nearby"],
      communicationPreference: "WhatsApp",
      bestTimeToContact: "Evening 6-8 PM",
      decisionTimeline: "Within 6 months",
      role: "Primary Decision Maker",
      hierarchy: 1,
      familyMembers: [
        {
          id: "f1",
          name: "Priya Sharma",
          relationship: "Spouse",
          role: "Influencer",
          phone: "+91 98765 43211",
          email: "priya.sharma@email.com",
        },
        {
          id: "f2",
          name: "Aarav Sharma",
          relationship: "Son",
          role: "Beneficiary",
          dateOfBirth: "2015-03-15",
        },
      ],
      isPrimaryFamilyContact: true,
      tags: ["Hot Buyer", "Family Purchase", "Premium Segment"],
      priority: "High",
      sourceOfContact: "MagicBricks Portal",
      createdAt: "2024-03-10",
      updatedAt: "2024-03-15",
      lastContactDate: "2024-03-14",
      nextFollowUpDate: "2024-03-20",
      contactFrequency: 8,
      panNumber: "ABCDE1234F",
      accounts: ["acc1"],
    },
    {
      id: "2",
      name: "Michael Johnson",
      email: "mjohnson@premierconstruction.com",
      phone: "+91 99876 54321",
      company: "Premier Construction Ltd",
      title: "Project Director",
      contactType: "Contractor",
      status: "Client",
      address: "Office 501, Business Hub, Bandra-Kurla Complex",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      country: "India",
      industry: "Construction",
      businessType: "General Contractor",
      website: "www.premierconstruction.com",
      budgetRange: "₹5Cr+",
      preferences: [
        "Commercial Projects",
        "Residential Townships",
        "Infrastructure",
      ],
      communicationPreference: "Email",
      bestTimeToContact: "Business Hours 9 AM - 6 PM",
      decisionTimeline: "Project-based (3-12 months)",
      role: "Primary Decision Maker",
      hierarchy: 1,
      teamMembers: [
        {
          id: "t1",
          name: "Sarah Williams",
          position: "Site Engineer",
          department: "Operations",
          role: "Technical Expert",
          phone: "+91 98765 11111",
        },
        {
          id: "t2",
          name: "David Chen",
          position: "Purchase Manager",
          department: "Procurement",
          role: "Influencer",
          email: "david.chen@premierconstruction.com",
        },
      ],
      tags: ["Enterprise Client", "Repeat Customer", "High Volume"],
      priority: "Critical",
      sourceOfContact: "Direct Business Development",
      createdAt: "2024-02-15",
      updatedAt: "2024-03-15",
      lastContactDate: "2024-03-13",
      contactFrequency: 12,
      gstNumber: "27ABCDE1234F1Z5",
      accountId: "acc2",
      accounts: ["acc2"],
    },
    {
      id: "3",
      name: "Anjali Patel",
      email: "anjali@smartbrokers.in",
      phone: "+91 97654 32109",
      whatsapp: "+91 97654 32109",
      company: "Smart Brokers Network",
      title: "Senior Property Consultant",
      contactType: "Broker",
      status: "Active",
      address: "203, Business Square, FC Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411016",
      country: "India",
      industry: "Real Estate",
      businessType: "Property Broker",
      budgetRange: "Commission-based",
      preferences: [
        "Residential Properties",
        "Commercial Leasing",
        "Investment Properties",
      ],
      communicationPreference: "WhatsApp",
      bestTimeToContact: "Anytime 9 AM - 9 PM",
      decisionTimeline: "Quick Decision (1-2 weeks)",
      role: "Influencer",
      hierarchy: 2,
      tags: ["Channel Partner", "High Performer", "Trusted Broker"],
      priority: "High",
      sourceOfContact: "Broker Network",
      createdAt: "2024-03-05",
      updatedAt: "2024-03-15",
      lastContactDate: "2024-03-15",
      contactFrequency: 15,
      panNumber: "PQRST5678G",
      accounts: ["acc3"],
    },
  ]);

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "acc1",
      name: "Sharma Family Account",
      type: "Family",
      industry: "Real Estate",
      status: "Active",
      headquarters: "Mumbai, Maharashtra",
      primaryContactId: "1",
      contacts: ["1"],
      creditLimit: 25000000, // ₹2.5 Cr
      totalValue: 15000000, // ₹1.5 Cr
      createdAt: "2024-03-10",
      updatedAt: "2024-03-15",
      lastActivityDate: "2024-03-14",
      tags: ["Premium Family", "High Net Worth"],
      priority: "High",
      taxId: "PANAB1234F",
    },
    {
      id: "acc2",
      name: "Premier Construction Ltd",
      type: "Corporate",
      industry: "Construction",
      status: "Client",
      website: "www.premierconstruction.com",
      revenue: "₹100+ Crores",
      employeeCount: "500-1000",
      establishedYear: 2010,
      headquarters: "Mumbai, Maharashtra",
      branches: ["Delhi", "Bangalore", "Pune"],
      primaryContactId: "2",
      contacts: ["2"],
      creditLimit: 500000000, // ₹50 Cr
      paymentTerms: "Net 30",
      totalValue: 750000000, // ₹75 Cr
      createdAt: "2024-02-15",
      updatedAt: "2024-03-15",
      lastActivityDate: "2024-03-13",
      tags: ["Enterprise", "Construction", "Multi-Location"],
      priority: "Critical",
      taxId: "PANCD5678G",
      gstNumber: "27ABCDE1234F1Z5",
    },
    {
      id: "acc3",
      name: "Smart Brokers Network",
      type: "Corporate",
      industry: "Real Estate",
      status: "Active",
      revenue: "₹5-10 Crores",
      employeeCount: "50-100",
      establishedYear: 2018,
      headquarters: "Pune, Maharashtra",
      primaryContactId: "3",
      contacts: ["3"],
      totalValue: 5000000, // ₹50 Lakhs
      createdAt: "2024-03-05",
      updatedAt: "2024-03-15",
      lastActivityDate: "2024-03-15",
      tags: ["Channel Partner", "Broker Network"],
      priority: "High",
      taxId: "PANEF9012H",
    },
  ]);

  // Handler for adding new contact
  const handleAddContact = async (data: Partial<Contact>) => {
    try {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp,
        alternatePhone: data.alternatePhone,
        company: data.company,
        title: data.title || "",
        contactType: data.contactType || "Buyer",
        status: "Active",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
        country: "India",
        industry: data.industry || "Real Estate",
        businessType: data.businessType,
        website: data.website,
        budgetRange: data.budgetRange || "",
        preferences: data.preferences || [],
        communicationPreference: data.communicationPreference || "Phone",
        bestTimeToContact: data.bestTimeToContact || "",
        decisionTimeline: data.decisionTimeline || "",
        role: data.role || "Primary Decision Maker",
        hierarchy: 1,
        accountId: data.accountId,
        familyMembers: [],
        teamMembers: [],
        tags: data.tags || [],
        priority: determinePriority(data),
        sourceOfContact: data.sourceOfContact || "Direct",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        lastContactDate: new Date().toISOString().split("T")[0],
        contactFrequency: 0,
        panNumber: data.panNumber,
        aadhaarLast4: data.aadhaarLast4,
        gstNumber: data.gstNumber,
        accounts: data.accountId ? [data.accountId] : [],
      };

      setContacts((prev) => [newContact, ...prev]);
      setShowAddContactModal(false);
      resetContact();
      alert(`Contact "${newContact.name}" added successfully!`);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // Handler for adding new account
  const handleAddAccount = async (data: Partial<Account>) => {
    try {
      const newAccount: Account = {
        id: `acc${Date.now()}`,
        name: data.name || "",
        type: data.type || "Individual",
        industry: data.industry || "Real Estate",
        status: "Active",
        website: data.website,
        revenue: data.revenue,
        employeeCount: data.employeeCount,
        establishedYear: data.establishedYear,
        headquarters: data.headquarters || "",
        branches: data.branches || [],
        primaryContactId: "", // Will be set when contact is assigned
        contacts: [],
        creditLimit: data.creditLimit,
        paymentTerms: data.paymentTerms,
        totalValue: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        lastActivityDate: new Date().toISOString().split("T")[0],
        tags: data.tags || [],
        priority: data.priority || "Medium",
        taxId: data.taxId || "",
        gstNumber: data.gstNumber,
      };

      setAccounts((prev) => [newAccount, ...prev]);
      setShowAddAccountModal(false);
      resetAccount();
      alert(`Account "${newAccount.name}" created successfully!`);
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  const determinePriority = (
    contact: Partial<Contact>,
  ): "Low" | "Medium" | "High" | "Critical" => {
    if (
      contact.contactType === "Contractor" ||
      contact.budgetRange?.includes("5Cr+")
    ) {
      return "Critical";
    }
    if (
      contact.budgetRange?.includes("1Cr") ||
      contact.contactType === "Broker"
    ) {
      return "High";
    }
    if (contact.budgetRange?.includes("50L")) {
      return "Medium";
    }
    return "Low";
  };

  const getContactTypeColor = (type: Contact["contactType"]) => {
    switch (type) {
      case "Buyer":
        return "bg-blue-100 text-blue-800";
      case "Contractor":
        return "bg-orange-100 text-orange-800";
      case "Vendor":
        return "bg-green-100 text-green-800";
      case "Broker":
        return "bg-purple-100 text-purple-800";
      case "Influencer":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Client":
        return "bg-blue-100 text-blue-800";
      case "Prospect":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Former Client":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: Contact["role"]) => {
    switch (role) {
      case "Primary Decision Maker":
        return Crown;
      case "Influencer":
        return Star;
      case "Financier":
        return DollarSign;
      case "User":
        return Users;
      case "Gatekeeper":
        return Shield;
      default:
        return Users;
    }
  };

  // Filter contacts based on search and type
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      contactTypeFilter === "All" || contact.contactType === contactTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/crm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to CRM
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Contact & Account Management
            </h1>
            <p className="text-muted-foreground">
              Complete contact lifecycle with B2B hierarchies and family
              associations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <PulsingDot className="text-green-500" />
              {contacts.length} Active Contacts
            </Badge>
            <Button onClick={() => setShowAddContactModal(true)}>
              <AnimatedIcon icon={UserPlus} className="mr-2" />
              Add Contact
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAddAccountModal(true)}
            >
              <AnimatedIcon icon={Building} className="mr-2" />
              Add Account
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="hierarchy" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Hierarchy
            </TabsTrigger>
            <TabsTrigger value="families" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Families
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={contactTypeFilter}
                onValueChange={setContactTypeFilter}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Buyer">Buyers</SelectItem>
                  <SelectItem value="Contractor">Contractors</SelectItem>
                  <SelectItem value="Vendor">Vendors</SelectItem>
                  <SelectItem value="Broker">Brokers</SelectItem>
                  <SelectItem value="Influencer">Influencers</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredContacts.map((contact) => {
                const RoleIcon = getRoleIcon(contact.role);
                return (
                  <Card
                    key={contact.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {contact.name}
                            <RoleIcon className="h-4 w-4 text-yellow-600" />
                          </CardTitle>
                          <CardDescription>{contact.title}</CardDescription>
                          {contact.company && (
                            <p className="text-sm text-gray-600">
                              {contact.company}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge
                            className={getContactTypeColor(contact.contactType)}
                          >
                            {contact.contactType}
                          </Badge>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {contact.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          {contact.city}, {contact.state}
                        </div>
                      </div>

                      {/* Budget & Priority */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">Budget: </span>
                          <span className="text-green-600">
                            {contact.budgetRange}
                          </span>
                        </div>
                        <Badge
                          variant={
                            contact.priority === "Critical"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {contact.priority}
                        </Badge>
                      </div>

                      {/* Family/Team Info */}
                      {contact.familyMembers &&
                        contact.familyMembers.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <Home className="h-4 w-4 text-blue-500" />
                            <span>
                              {contact.familyMembers.length} Family Members
                            </span>
                          </div>
                        )}
                      {contact.teamMembers &&
                        contact.teamMembers.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users2 className="h-4 w-4 text-purple-500" />
                            <span>
                              {contact.teamMembers.length} Team Members
                            </span>
                          </div>
                        )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {contact.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{contact.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <Card
                  key={account.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-600" />
                          {account.name}
                        </CardTitle>
                        <CardDescription>
                          {account.type} • {account.industry}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(account.status)}>
                        {account.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {account.headquarters}
                      </div>
                      {account.website && (
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-gray-500" />
                          {account.website}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500" />
                        {account.contacts.length} Contacts
                      </div>
                    </div>

                    {/* Financial Info */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Total Value:</span>
                        <span className="font-medium text-green-600">
                          ₹{(account.totalValue / 10000000).toFixed(1)}Cr
                        </span>
                      </div>
                      {account.revenue && (
                        <div className="flex justify-between text-sm">
                          <span>Revenue:</span>
                          <span>{account.revenue}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {account.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hierarchy Tab */}
          <TabsContent value="hierarchy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Network} animation="pulse" />
                  B2B Account Hierarchies
                </CardTitle>
                <CardDescription>
                  Visualize organizational structures and decision-making chains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {accounts
                    .filter((acc) => acc.type === "Corporate")
                    .map((account) => (
                      <div key={account.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {account.name}
                        </h3>
                        <div className="grid gap-3">
                          {account.contacts.map((contactId) => {
                            const contact = contacts.find(
                              (c) => c.id === contactId,
                            );
                            if (!contact) return null;
                            const RoleIcon = getRoleIcon(contact.role);
                            return (
                              <div
                                key={contactId}
                                className="flex items-center gap-3 p-3 border rounded-lg"
                              >
                                <RoleIcon className="h-5 w-5 text-yellow-600" />
                                <div className="flex-1">
                                  <div className="font-medium">
                                    {contact.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {contact.title}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {contact.role}
                                  </div>
                                </div>
                                <Badge
                                  className={getContactTypeColor(
                                    contact.contactType,
                                  )}
                                >
                                  {contact.contactType}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Families Tab */}
          <TabsContent value="families" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AnimatedIcon icon={Home} animation="float" />
                  Family Associations
                </CardTitle>
                <CardDescription>
                  Manage family-based decision making for Indian home buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contacts
                    .filter(
                      (c) => c.familyMembers && c.familyMembers.length > 0,
                    )
                    .map((contact) => (
                      <div key={contact.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          {contact.name} Family
                          {contact.isPrimaryFamilyContact && (
                            <Badge variant="outline">Primary Contact</Badge>
                          )}
                        </h3>
                        <div className="grid gap-3 md:grid-cols-2">
                          {contact.familyMembers?.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center gap-3 p-3 border rounded-lg"
                            >
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-gray-600">
                                  {member.relationship}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {member.role}
                                </div>
                              </div>
                              {member.phone && (
                                <Button size="sm" variant="outline">
                                  <Phone className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">
                        {contacts.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Contacts
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Building className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">
                        {accounts.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Accounts
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Crown className="h-8 w-8 text-yellow-600" />
                    <div>
                      <div className="text-2xl font-bold">
                        {
                          contacts.filter(
                            (c) => c.role === "Primary Decision Maker",
                          ).length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Decision Makers
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Home className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">
                        {
                          contacts.filter(
                            (c) =>
                              c.familyMembers && c.familyMembers.length > 0,
                          ).length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Family Accounts
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Buyer",
                    "Contractor",
                    "Vendor",
                    "Broker",
                    "Influencer",
                  ].map((type) => {
                    const count = contacts.filter(
                      (c) => c.contactType === type,
                    ).length;
                    const percentage = (count / contacts.length) * 100;
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{type}</span>
                          <span>
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact & Account Settings</CardTitle>
                <CardDescription>
                  Configure contact management preferences and automation rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Auto-assign family members
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically link family members when similar details
                        detected
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">B2B hierarchy detection</h4>
                      <p className="text-sm text-muted-foreground">
                        Auto-detect organizational relationships from email
                        domains
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Duplicate contact alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Alert when potential duplicate contacts are detected
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Priority auto-assignment</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign priority based on budget and
                        contact type
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Contacts
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Contact Modal */}
      <Dialog open={showAddContactModal} onOpenChange={setShowAddContactModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AnimatedIcon icon={UserPlus} className="text-blue-600" />
              Add New Contact
            </DialogTitle>
            <DialogDescription>
              Create a comprehensive contact profile with role mapping and
              relationships
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitContact(handleAddContact)}
            className="space-y-6"
          >
            {/* Basic Information */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...registerContact("name", {
                      required: "Name is required",
                    })}
                    placeholder="Enter full name"
                  />
                  {errorsContact.name && (
                    <p className="text-sm text-red-600">
                      {errorsContact.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerContact("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter email address"
                  />
                  {errorsContact.email && (
                    <p className="text-sm text-red-600">
                      {errorsContact.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...registerContact("phone", {
                      required: "Phone is required",
                    })}
                    placeholder="+91 98765 43210"
                  />
                  {errorsContact.phone && (
                    <p className="text-sm text-red-600">
                      {errorsContact.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    {...registerContact("whatsapp")}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    {...registerContact("company")}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Job Title/Position *</Label>
                  <Input
                    id="title"
                    {...registerContact("title", {
                      required: "Title is required",
                    })}
                    placeholder="Enter job title"
                  />
                  {errorsContact.title && (
                    <p className="text-sm text-red-600">
                      {errorsContact.title.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Classification */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Contact Classification</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="contactType">Contact Type *</Label>
                  <Controller
                    name="contactType"
                    control={controlContact}
                    rules={{ required: "Contact type is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Buyer">
                            Buyer (Individual/Family)
                          </SelectItem>
                          <SelectItem value="Contractor">
                            Contractor (B2B)
                          </SelectItem>
                          <SelectItem value="Vendor">
                            Vendor (Supplier)
                          </SelectItem>
                          <SelectItem value="Broker">
                            Broker (Channel Partner)
                          </SelectItem>
                          <SelectItem value="Influencer">
                            Influencer (Consultant)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsContact.contactType && (
                    <p className="text-sm text-red-600">
                      {errorsContact.contactType.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Controller
                    name="industry"
                    control={controlContact}
                    rules={{ required: "Industry is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Real Estate">
                            Real Estate
                          </SelectItem>
                          <SelectItem value="Construction">
                            Construction
                          </SelectItem>
                          <SelectItem value="Manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="Sales & Marketing">
                            Sales & Marketing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsContact.industry && (
                    <p className="text-sm text-red-600">
                      {errorsContact.industry.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="role">Role in Decision Making *</Label>
                  <Controller
                    name="role"
                    control={controlContact}
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Primary Decision Maker">
                            Primary Decision Maker
                          </SelectItem>
                          <SelectItem value="Influencer">Influencer</SelectItem>
                          <SelectItem value="Financier">Financier</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Gatekeeper">Gatekeeper</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsContact.role && (
                    <p className="text-sm text-red-600">
                      {errorsContact.role.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Location Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    {...registerContact("address", {
                      required: "Address is required",
                    })}
                    placeholder="Enter complete address"
                    rows={2}
                  />
                  {errorsContact.address && (
                    <p className="text-sm text-red-600">
                      {errorsContact.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...registerContact("city", {
                      required: "City is required",
                    })}
                    placeholder="Mumbai, Delhi, Bangalore..."
                  />
                  {errorsContact.city && (
                    <p className="text-sm text-red-600">
                      {errorsContact.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Controller
                    name="state"
                    control={controlContact}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maharashtra">
                            Maharashtra
                          </SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="Gujarat">Gujarat</SelectItem>
                          <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="West Bengal">
                            West Bengal
                          </SelectItem>
                          <SelectItem value="Uttar Pradesh">
                            Uttar Pradesh
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsContact.state && (
                    <p className="text-sm text-red-600">
                      {errorsContact.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    {...registerContact("pincode")}
                    placeholder="400001"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Budget & Preferences */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Budget & Preferences</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="budgetRange">Budget Range</Label>
                  <Controller
                    name="budgetRange"
                    control={controlContact}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="₹10L - ₹25L">
                            ₹10L - ₹25L
                          </SelectItem>
                          <SelectItem value="₹25L - ₹50L">
                            ₹25L - ��50L
                          </SelectItem>
                          <SelectItem value="₹50L - ₹1Cr">
                            ₹50L - ₹1Cr
                          </SelectItem>
                          <SelectItem value="₹1Cr - ₹2Cr">
                            ₹1Cr - ₹2Cr
                          </SelectItem>
                          <SelectItem value="₹2Cr - ₹5Cr">
                            ₹2Cr - ₹5Cr
                          </SelectItem>
                          <SelectItem value="₹5Cr+">₹5Cr+</SelectItem>
                          <SelectItem value="Commission-based">
                            Commission-based
                          </SelectItem>
                          <SelectItem value="Project-based">
                            Project-based
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="decisionTimeline">Decision Timeline</Label>
                  <Controller
                    name="decisionTimeline"
                    control={controlContact}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediate (< 1 month)">
                            Immediate (&lt; 1 month)
                          </SelectItem>
                          <SelectItem value="Within 3 months">
                            Within 3 months
                          </SelectItem>
                          <SelectItem value="Within 6 months">
                            Within 6 months
                          </SelectItem>
                          <SelectItem value="Within 12 months">
                            Within 12 months
                          </SelectItem>
                          <SelectItem value="Long-term (> 1 year)">
                            Long-term (&gt; 1 year)
                          </SelectItem>
                          <SelectItem value="Just exploring">
                            Just exploring
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="communicationPreference">
                    Communication Preference
                  </Label>
                  <Controller
                    name="communicationPreference"
                    control={controlContact}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                          <SelectItem value="Phone">Phone Call</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="SMS">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="bestTimeToContact">
                    Best Time to Contact
                  </Label>
                  <Input
                    id="bestTimeToContact"
                    {...registerContact("bestTimeToContact")}
                    placeholder="e.g., Morning 10-12 PM, Evening 6-8 PM"
                  />
                </div>
              </div>
            </div>

            {/* Identity Information */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">
                Identity Information (Optional)
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    {...registerContact("panNumber", {
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: "Invalid PAN format",
                      },
                    })}
                    placeholder="ABCDE1234F"
                    style={{ textTransform: "uppercase" }}
                  />
                  {errorsContact.panNumber && (
                    <p className="text-sm text-red-600">
                      {errorsContact.panNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="aadhaarLast4">Aadhaar (Last 4 digits)</Label>
                  <Input
                    id="aadhaarLast4"
                    {...registerContact("aadhaarLast4", {
                      pattern: {
                        value: /^[0-9]{4}$/,
                        message: "Enter last 4 digits only",
                      },
                    })}
                    placeholder="1234"
                    maxLength={4}
                  />
                  {errorsContact.aadhaarLast4 && (
                    <p className="text-sm text-red-600">
                      {errorsContact.aadhaarLast4.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number (for business)</Label>
                  <Input
                    id="gstNumber"
                    {...registerContact("gstNumber")}
                    placeholder="27ABCDE1234F1Z5"
                    style={{ textTransform: "uppercase" }}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddContactModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmittingContact}>
                {isSubmittingContact ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Contact
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Account Modal */}
      <Dialog open={showAddAccountModal} onOpenChange={setShowAddAccountModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AnimatedIcon icon={Building} className="text-blue-600" />
              Create New Account
            </DialogTitle>
            <DialogDescription>
              Create an account for B2B relationships and family structures
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitAccount(handleAddAccount)}
            className="space-y-6"
          >
            {/* Basic Account Information */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Account Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="accountName">Account Name *</Label>
                  <Input
                    id="accountName"
                    {...registerAccount("name", {
                      required: "Account name is required",
                    })}
                    placeholder="Enter account name"
                  />
                  {errorsAccount.name && (
                    <p className="text-sm text-red-600">
                      {errorsAccount.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Controller
                    name="type"
                    control={controlAccount}
                    rules={{ required: "Account type is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Family">Family</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsAccount.type && (
                    <p className="text-sm text-red-600">
                      {errorsAccount.type.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="accountIndustry">Industry *</Label>
                  <Controller
                    name="industry"
                    control={controlAccount}
                    rules={{ required: "Industry is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Real Estate">
                            Real Estate
                          </SelectItem>
                          <SelectItem value="Construction">
                            Construction
                          </SelectItem>
                          <SelectItem value="Manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="Sales & Marketing">
                            Sales & Marketing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsAccount.industry && (
                    <p className="text-sm text-red-600">
                      {errorsAccount.industry.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="headquarters">Headquarters/Location *</Label>
                  <Input
                    id="headquarters"
                    {...registerAccount("headquarters", {
                      required: "Location is required",
                    })}
                    placeholder="Enter primary location"
                  />
                  {errorsAccount.headquarters && (
                    <p className="text-sm text-red-600">
                      {errorsAccount.headquarters.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">
                Business Details (Optional)
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    {...registerAccount("website")}
                    placeholder="https://www.company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Controller
                    name="revenue"
                    control={controlAccount}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="₹1-5 Crores">
                            ₹1-5 Crores
                          </SelectItem>
                          <SelectItem value="₹5-10 Crores">
                            ₹5-10 Crores
                          </SelectItem>
                          <SelectItem value="₹10-50 Crores">
                            ₹10-50 Crores
                          </SelectItem>
                          <SelectItem value="₹50-100 Crores">
                            ₹50-100 Crores
                          </SelectItem>
                          <SelectItem value="₹100+ Crores">
                            ₹100+ Crores
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="employeeCount">Employee Count</Label>
                  <Controller
                    name="employeeCount"
                    control={controlAccount}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-100">51-100</SelectItem>
                          <SelectItem value="101-500">101-500</SelectItem>
                          <SelectItem value="500-1000">500-1000</SelectItem>
                          <SelectItem value="1000+">1000+</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    {...registerAccount("establishedYear")}
                    placeholder="2010"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddAccountModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmittingAccount}>
                {isSubmittingAccount ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
