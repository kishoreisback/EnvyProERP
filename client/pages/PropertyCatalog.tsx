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
  Building,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Home,
  MapPin,
  Compass,
  Calculator,
  Calendar,
  Star,
  Tag,
  Clock,
  Eye,
  Edit,
  Trash2,
  Settings,
  Share2,
  FileText,
  Image,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
  BarChart3,
  PieChart,
  LineChart,
  Grid,
  List,
  Layers,
  Navigation,
  Maximize,
  Car,
  Trees,
  Dumbbell,
  Waves,
  Wifi,
  Shield,
  Zap,
  Phone,
  Mail,
  Globe,
  Target,
  Bookmark,
  Heart,
  X,
  Check,
  Info,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Copy,
  ExternalLink,
} from "lucide-react";
import {
  AnimatedIcon,
  PulsingDot,
  LoadingSpinner,
  GlowingOrb,
} from "@/components/ui/animated-icons";

// Property interfaces for comprehensive real estate management
interface Property {
  id: string;
  name: string;
  propertyType:
    | "1BHK"
    | "2BHK"
    | "3BHK"
    | "4BHK"
    | "Penthouse"
    | "Villa"
    | "Plot"
    | "Commercial";
  projectName: string;
  towerBlock: string;
  floor: number;
  unitNumber: string;

  // Area details (in sq ft)
  carpetArea: number;
  builtUpArea: number;
  superBuiltUpArea: number;

  // Location & Direction
  facing:
    | "North"
    | "South"
    | "East"
    | "West"
    | "North-East"
    | "North-West"
    | "South-East"
    | "South-West";
  view:
    | "Garden"
    | "Pool"
    | "Main Road"
    | "Club House"
    | "Hill"
    | "City"
    | "Courtyard"
    | "Open Sky";

  // Pricing
  basePrice: number; // in ₹
  pricePerSqFt: number;
  currentPrice: number; // after discounts
  registrationCharges: number;
  maintenanceDeposit: number;
  parkingCharges: number;

  // Status
  status: "Available" | "Hold" | "Sold" | "Blocked" | "Under Construction";
  availabilityDate: string;
  bookingDate?: string;

  // Features
  balconies: number;
  bathrooms: number;
  parkingSpaces: number;
  furnishing: "Unfurnished" | "Semi-Furnished" | "Fully Furnished";

  // Amenities access
  amenities: string[];

  // Documents
  floorPlan?: string;
  brochures: string[];
  specifications?: string;

  // Tracking
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  enquiryCount: number;

  // CRM Integration
  leadIds: string[];
  dealIds: string[];
  assignedAgent?: string;

  // Additional details
  tags: string[];
  priority: "Low" | "Medium" | "High" | "Critical";
  specialOffers?: string[];
}

interface Tower {
  id: string;
  name: string;
  projectName: string;
  totalFloors: number;
  unitsPerFloor: number;
  totalUnits: number;

  // Construction details
  constructionStatus:
    | "Planning"
    | "Foundation"
    | "Structure"
    | "Finishing"
    | "Ready"
    | "Completed";
  launchDate: string;
  possessionDate: string;

  // Amenities specific to tower
  amenities: string[];
  elevators: number;
  staircases: number;

  // Parking
  parkingLevels: number;
  totalParkingSpaces: number;

  // Units summary
  availableUnits: number;
  soldUnits: number;
  blockedUnits: number;

  // Property types in this tower
  unitTypes: {
    type: string;
    count: number;
    priceRange: string;
  }[];
}

interface PriceSheet {
  id: string;
  propertyType: string;
  towerBlock: string;
  floor: string; // "1-5", "6-10", etc.

  // Base pricing
  baseRate: number; // per sq ft
  carpetAreaRate: number;
  builtUpAreaRate: number;

  // Charges
  registrationCharges: number;
  maintenanceCharges: number; // per sq ft per month
  parkingCharges: number;

  // Discounts & Offers
  discounts: {
    name: string;
    type: "percentage" | "fixed";
    value: number;
    conditions: string;
    validTill: string;
  }[];

  // Payment plans
  paymentPlans: {
    name: string;
    structure: {
      milestone: string;
      percentage: number;
      timing: string;
    }[];
  }[];

  // Price validity
  validFrom: string;
  validTill: string;

  // Approvals
  approvedBy: string;
  approvalDate: string;
}

interface ProjectAmenity {
  id: string;
  name: string;
  category:
    | "Sports"
    | "Recreation"
    | "Convenience"
    | "Security"
    | "Wellness"
    | "Kids"
    | "Senior Living";
  description: string;
  availability: "Available" | "Under Construction" | "Planned";
  location: string; // "Tower A", "Common Area", etc.
  charges?: number; // Additional charges if any
  timings?: string;
  capacity?: number;
}

export default function PropertyCatalog() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [selectedTower, setSelectedTower] = useState<Tower | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [towerFilter, setTowerFilter] = useState("All");
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showAddTowerModal, setShowAddTowerModal] = useState(false);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    register: registerProperty,
    handleSubmit: handleSubmitProperty,
    reset: resetProperty,
    control: controlProperty,
    formState: { errors: errorsProperty, isSubmitting: isSubmittingProperty },
  } = useForm<Partial<Property>>();

  const {
    register: registerTower,
    handleSubmit: handleSubmitTower,
    reset: resetTower,
    control: controlTower,
    formState: { errors: errorsTower, isSubmitting: isSubmittingTower },
  } = useForm<Partial<Tower>>();

  // Sample data
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      name: "Skyline Residency A-1201",
      propertyType: "3BHK",
      projectName: "Skyline Residency",
      towerBlock: "Tower A",
      floor: 12,
      unitNumber: "A-1201",
      carpetArea: 1250,
      builtUpArea: 1450,
      superBuiltUpArea: 1650,
      facing: "North-East",
      view: "Garden",
      basePrice: 18500000, // ₹1.85 Cr
      pricePerSqFt: 11212,
      currentPrice: 17500000, // After discount
      registrationCharges: 925000,
      maintenanceDeposit: 185000,
      parkingCharges: 350000,
      status: "Available",
      availabilityDate: "2024-06-15",
      balconies: 2,
      bathrooms: 3,
      parkingSpaces: 2,
      furnishing: "Semi-Furnished",
      amenities: [
        "Swimming Pool",
        "Gym",
        "Clubhouse",
        "Children's Play Area",
        "Security",
      ],
      floorPlan: "floor-plan-3bhk-type-a.pdf",
      brochures: ["skyline-brochure.pdf", "amenities-guide.pdf"],
      createdAt: "2024-03-01",
      updatedAt: "2024-03-15",
      viewCount: 45,
      enquiryCount: 12,
      leadIds: ["lead1", "lead3", "lead7"],
      dealIds: ["deal2"],
      assignedAgent: "Priya Sharma",
      tags: ["Premium", "Corner Unit", "High Floor", "Garden Facing"],
      priority: "High",
      specialOffers: ["Early Bird Discount 5%", "Free 2-Wheeler Parking"],
    },
    {
      id: "2",
      name: "Golden Heights B-0804",
      propertyType: "2BHK",
      projectName: "Golden Heights",
      towerBlock: "Tower B",
      floor: 8,
      unitNumber: "B-0804",
      carpetArea: 925,
      builtUpArea: 1100,
      superBuiltUpArea: 1250,
      facing: "South-West",
      view: "Pool",
      basePrice: 12500000, // ₹1.25 Cr
      pricePerSqFt: 10000,
      currentPrice: 12200000, // After discount
      registrationCharges: 625000,
      maintenanceDeposit: 125000,
      parkingCharges: 250000,
      status: "Hold",
      availabilityDate: "2024-04-01",
      balconies: 2,
      bathrooms: 2,
      parkingSpaces: 1,
      furnishing: "Unfurnished",
      amenities: ["Swimming Pool", "Gym", "Jogging Track", "Security"],
      floorPlan: "floor-plan-2bhk-type-b.pdf",
      brochures: ["golden-heights-brochure.pdf"],
      createdAt: "2024-02-15",
      updatedAt: "2024-03-10",
      viewCount: 32,
      enquiryCount: 8,
      leadIds: ["lead2", "lead5"],
      dealIds: [],
      assignedAgent: "Rajesh Kumar",
      tags: ["Value for Money", "Pool View", "Ready to Move"],
      priority: "Medium",
      specialOffers: ["Monsoon Special 3%"],
    },
    {
      id: "3",
      name: "Elite Towers C-1505",
      propertyType: "4BHK",
      projectName: "Elite Towers",
      towerBlock: "Tower C",
      floor: 15,
      unitNumber: "C-1505",
      carpetArea: 1850,
      builtUpArea: 2100,
      superBuiltUpArea: 2350,
      facing: "North",
      view: "City",
      basePrice: 32500000, // ₹3.25 Cr
      pricePerSqFt: 13829,
      currentPrice: 31000000, // After discount
      registrationCharges: 1625000,
      maintenanceDeposit: 325000,
      parkingCharges: 500000,
      status: "Available",
      availabilityDate: "2024-08-01",
      balconies: 3,
      bathrooms: 4,
      parkingSpaces: 3,
      furnishing: "Fully Furnished",
      amenities: [
        "Swimming Pool",
        "Gym",
        "Spa",
        "Concierge",
        "Valet Parking",
        "Business Center",
      ],
      floorPlan: "floor-plan-4bhk-elite.pdf",
      brochures: ["elite-towers-brochure.pdf", "luxury-amenities.pdf"],
      createdAt: "2024-01-20",
      updatedAt: "2024-03-12",
      viewCount: 78,
      enquiryCount: 22,
      leadIds: ["lead4", "lead6", "lead8", "lead9"],
      dealIds: ["deal1", "deal3"],
      assignedAgent: "Anjali Patel",
      tags: ["Luxury", "Penthouse Style", "City View", "Premium Amenities"],
      priority: "Critical",
      specialOffers: ["Luxury Package 7%", "Free Home Automation"],
    },
  ]);

  const [towers, setTowers] = useState<Tower[]>([
    {
      id: "1",
      name: "Tower A",
      projectName: "Skyline Residency",
      totalFloors: 20,
      unitsPerFloor: 4,
      totalUnits: 80,
      constructionStatus: "Ready",
      launchDate: "2023-01-15",
      possessionDate: "2024-06-30",
      amenities: ["Swimming Pool", "Gym", "Clubhouse", "Children's Play Area"],
      elevators: 2,
      staircases: 2,
      parkingLevels: 3,
      totalParkingSpaces: 120,
      availableUnits: 15,
      soldUnits: 58,
      blockedUnits: 7,
      unitTypes: [
        { type: "2BHK", count: 25, priceRange: "₹95L - ₹1.2Cr" },
        { type: "3BHK", count: 45, priceRange: "₹1.4Cr - ₹1.8Cr" },
        { type: "4BHK", count: 10, priceRange: "₹2.2Cr - ₹2.8Cr" },
      ],
    },
    {
      id: "2",
      name: "Tower B",
      projectName: "Golden Heights",
      totalFloors: 15,
      unitsPerFloor: 6,
      totalUnits: 90,
      constructionStatus: "Finishing",
      launchDate: "2023-06-01",
      possessionDate: "2024-12-31",
      amenities: [
        "Swimming Pool",
        "Gym",
        "Jogging Track",
        "Multi-purpose Hall",
      ],
      elevators: 2,
      staircases: 2,
      parkingLevels: 2,
      totalParkingSpaces: 108,
      availableUnits: 35,
      soldUnits: 48,
      blockedUnits: 7,
      unitTypes: [
        { type: "1BHK", count: 20, priceRange: "₹65L - ₹85L" },
        { type: "2BHK", count: 50, priceRange: "₹1.1Cr - ₹1.4Cr" },
        { type: "3BHK", count: 20, priceRange: "₹1.6Cr - ₹2.0Cr" },
      ],
    },
    {
      id: "3",
      name: "Tower C",
      projectName: "Elite Towers",
      totalFloors: 25,
      unitsPerFloor: 3,
      totalUnits: 75,
      constructionStatus: "Structure",
      launchDate: "2024-01-01",
      possessionDate: "2025-12-31",
      amenities: [
        "Infinity Pool",
        "Spa",
        "Wine Cellar",
        "Private Theatre",
        "Concierge",
      ],
      elevators: 3,
      staircases: 2,
      parkingLevels: 4,
      totalParkingSpaces: 150,
      availableUnits: 68,
      soldUnits: 5,
      blockedUnits: 2,
      unitTypes: [
        { type: "3BHK", count: 25, priceRange: "₹2.5Cr - ₹3.2Cr" },
        { type: "4BHK", count: 40, priceRange: "₹3.8Cr - ₹4.8Cr" },
        { type: "Penthouse", count: 10, priceRange: "₹6.5Cr - ₹9.2Cr" },
      ],
    },
  ]);

  const [priceSheets, setPriceSheets] = useState<PriceSheet[]>([
    {
      id: "1",
      propertyType: "2BHK",
      towerBlock: "Tower A",
      floor: "1-10",
      baseRate: 9500,
      carpetAreaRate: 10500,
      builtUpAreaRate: 9000,
      registrationCharges: 50000,
      maintenanceCharges: 3.5,
      parkingCharges: 250000,
      discounts: [
        {
          name: "Early Bird Discount",
          type: "percentage",
          value: 5,
          conditions: "Booking within 30 days",
          validTill: "2024-04-30",
        },
        {
          name: "Cash Payment Discount",
          type: "percentage",
          value: 3,
          conditions: "100% payment upfront",
          validTill: "2024-12-31",
        },
      ],
      paymentPlans: [
        {
          name: "Construction Linked Plan",
          structure: [
            { milestone: "Booking", percentage: 10, timing: "On booking" },
            {
              milestone: "Foundation",
              percentage: 15,
              timing: "Foundation completion",
            },
            {
              milestone: "Structure",
              percentage: 25,
              timing: "Structure completion",
            },
            {
              milestone: "Finishing",
              percentage: 30,
              timing: "Finishing start",
            },
            {
              milestone: "Possession",
              percentage: 20,
              timing: "On possession",
            },
          ],
        },
        {
          name: "Flexi Payment Plan",
          structure: [
            { milestone: "Booking", percentage: 20, timing: "On booking" },
            { milestone: "EMI Start", percentage: 60, timing: "12 EMIs" },
            {
              milestone: "Possession",
              percentage: 20,
              timing: "On possession",
            },
          ],
        },
      ],
      validFrom: "2024-03-01",
      validTill: "2024-06-30",
      approvedBy: "Sales Head",
      approvalDate: "2024-02-28",
    },
  ]);

  const [projectAmenities] = useState<ProjectAmenity[]>([
    {
      id: "1",
      name: "Swimming Pool",
      category: "Recreation",
      description: "Olympic size swimming pool with separate kids pool",
      availability: "Available",
      location: "Common Area",
      timings: "5:00 AM - 10:00 PM",
      capacity: 50,
    },
    {
      id: "2",
      name: "Gymnasium",
      category: "Wellness",
      description:
        "Fully equipped gym with cardio and strength training equipment",
      availability: "Available",
      location: "Tower A & B",
      charges: 2000, // Monthly
      timings: "24/7 Access",
      capacity: 30,
    },
    {
      id: "3",
      name: "Business Center",
      category: "Convenience",
      description:
        "Co-working space with meeting rooms and high-speed internet",
      availability: "Under Construction",
      location: "Tower C",
      charges: 500, // Per hour
      capacity: 25,
    },
  ]);

  // Handlers
  const handleAddProperty = async (data: Partial<Property>) => {
    try {
      const newProperty: Property = {
        id: Date.now().toString(),
        name: `${data.projectName} ${data.towerBlock}-${data.unitNumber}`,
        propertyType: data.propertyType || "2BHK",
        projectName: data.projectName || "",
        towerBlock: data.towerBlock || "",
        floor: data.floor || 1,
        unitNumber: data.unitNumber || "",
        carpetArea: data.carpetArea || 1000,
        builtUpArea: data.builtUpArea || 1200,
        superBuiltUpArea: data.superBuiltUpArea || 1400,
        facing: data.facing || "North",
        view: data.view || "Garden",
        basePrice: data.basePrice || 10000000,
        pricePerSqFt: Math.round(
          (data.basePrice || 10000000) / (data.carpetArea || 1000),
        ),
        currentPrice: data.currentPrice || data.basePrice || 10000000,
        registrationCharges: Math.round((data.basePrice || 10000000) * 0.05),
        maintenanceDeposit: Math.round((data.basePrice || 10000000) * 0.01),
        parkingCharges: data.parkingCharges || 250000,
        status: "Available",
        availabilityDate:
          data.availabilityDate || new Date().toISOString().split("T")[0],
        balconies: data.balconies || 2,
        bathrooms: data.bathrooms || 2,
        parkingSpaces: data.parkingSpaces || 1,
        furnishing: data.furnishing || "Unfurnished",
        amenities: data.amenities || [],
        brochures: [],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        viewCount: 0,
        enquiryCount: 0,
        leadIds: [],
        dealIds: [],
        tags: data.tags || [],
        priority: determinePriority(data),
      };

      setProperties((prev) => [newProperty, ...prev]);
      setShowAddPropertyModal(false);
      resetProperty();
      alert(`Property "${newProperty.name}" added successfully!`);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleAddTower = async (data: Partial<Tower>) => {
    try {
      const newTower: Tower = {
        id: Date.now().toString(),
        name: data.name || "",
        projectName: data.projectName || "",
        totalFloors: data.totalFloors || 10,
        unitsPerFloor: data.unitsPerFloor || 4,
        totalUnits: (data.totalFloors || 10) * (data.unitsPerFloor || 4),
        constructionStatus: data.constructionStatus || "Planning",
        launchDate: data.launchDate || new Date().toISOString().split("T")[0],
        possessionDate: data.possessionDate || "",
        amenities: data.amenities || [],
        elevators: data.elevators || 2,
        staircases: data.staircases || 2,
        parkingLevels: data.parkingLevels || 2,
        totalParkingSpaces: data.totalParkingSpaces || 100,
        availableUnits: (data.totalFloors || 10) * (data.unitsPerFloor || 4),
        soldUnits: 0,
        blockedUnits: 0,
        unitTypes: [],
      };

      setTowers((prev) => [newTower, ...prev]);
      setShowAddTowerModal(false);
      resetTower();
      alert(`Tower "${newTower.name}" created successfully!`);
    } catch (error) {
      console.error("Error adding tower:", error);
    }
  };

  const determinePriority = (
    property: Partial<Property>,
  ): "Low" | "Medium" | "High" | "Critical" => {
    const price = property.basePrice || 0;
    if (price > 30000000) return "Critical"; // > ₹3 Cr
    if (price > 15000000) return "High"; // > ₹1.5 Cr
    if (price > 8000000) return "Medium"; // > ₹80 L
    return "Low";
  };

  const getStatusColor = (status: Property["status"]) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Hold":
        return "bg-yellow-100 text-yellow-800";
      case "Sold":
        return "bg-red-100 text-red-800";
      case "Blocked":
        return "bg-gray-100 text-gray-800";
      case "Under Construction":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConstructionStatusColor = (status: Tower["constructionStatus"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Ready":
        return "bg-blue-100 text-blue-800";
      case "Finishing":
        return "bg-purple-100 text-purple-800";
      case "Structure":
        return "bg-orange-100 text-orange-800";
      case "Foundation":
        return "bg-yellow-100 text-yellow-800";
      case "Planning":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)}Cr`;
    }
    return `₹${(price / 100000).toFixed(0)}L`;
  };

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.unitNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      propertyTypeFilter === "All" ||
      property.propertyType === propertyTypeFilter;
    const matchesStatus =
      statusFilter === "All" || property.status === statusFilter;
    const matchesTower =
      towerFilter === "All" || property.towerBlock === towerFilter;
    return matchesSearch && matchesType && matchesStatus && matchesTower;
  });

  // Calculate inventory stats
  const inventoryStats = {
    total: properties.length,
    available: properties.filter((p) => p.status === "Available").length,
    sold: properties.filter((p) => p.status === "Sold").length,
    hold: properties.filter((p) => p.status === "Hold").length,
    blocked: properties.filter((p) => p.status === "Blocked").length,
  };

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
              Property & Asset Catalog
            </h1>
            <p className="text-muted-foreground">
              Complete inventory management with pricing, availability, and CRM
              integration
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <PulsingDot className="text-green-500" />
              {inventoryStats.available} Available Units
            </Badge>
            <Button onClick={() => setShowAddPropertyModal(true)}>
              <AnimatedIcon icon={Plus} className="mr-2" />
              Add Property
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAddTowerModal(true)}
            >
              <AnimatedIcon icon={Building} className="mr-2" />
              Add Tower
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="towers" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Towers
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="availability"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Availability
            </TabsTrigger>
            <TabsTrigger
              value="integration"
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              CRM Integration
            </TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            {/* Filters and Controls */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties by name, project, or unit number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={propertyTypeFilter}
                onValueChange={setPropertyTypeFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="1BHK">1BHK</SelectItem>
                  <SelectItem value="2BHK">2BHK</SelectItem>
                  <SelectItem value="3BHK">3BHK</SelectItem>
                  <SelectItem value="4BHK">4BHK</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Hold">Hold</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>

              <Select value={towerFilter} onValueChange={setTowerFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tower/Block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Towers</SelectItem>
                  {towers.map((tower) => (
                    <SelectItem key={tower.id} value={tower.name}>
                      {tower.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            {/* Inventory Stats */}
            <div className="grid gap-4 md:grid-cols-5">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <div className="text-2xl font-bold">
                        {inventoryStats.total}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Units
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div>
                      <div className="text-2xl font-bold">
                        {inventoryStats.available}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Available
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div>
                      <div className="text-2xl font-bold">
                        {inventoryStats.sold}
                      </div>
                      <div className="text-sm text-muted-foreground">Sold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div>
                      <div className="text-2xl font-bold">
                        {inventoryStats.hold}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        On Hold
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <div>
                      <div className="text-2xl font-bold">
                        {inventoryStats.blocked}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Blocked
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Properties Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {property.name}
                          </CardTitle>
                          <CardDescription>
                            {property.propertyType} • Floor {property.floor}
                          </CardDescription>
                          <p className="text-sm text-gray-600">
                            {property.projectName}
                          </p>
                        </div>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Area Details */}
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="font-medium">
                            {property.carpetArea}
                          </div>
                          <div className="text-gray-500">Carpet</div>
                        </div>
                        <div>
                          <div className="font-medium">
                            {property.builtUpArea}
                          </div>
                          <div className="text-gray-500">Built-up</div>
                        </div>
                        <div>
                          <div className="font-medium">
                            {property.superBuiltUpArea}
                          </div>
                          <div className="text-gray-500">Super</div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {formatPrice(property.currentPrice)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{property.pricePerSqFt.toLocaleString()}/sq ft
                          </div>
                        </div>
                        <Badge
                          variant={
                            property.priority === "Critical"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {property.priority}
                        </Badge>
                      </div>

                      {/* Features */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4 text-gray-500" />
                          {property.facing}
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="h-4 w-4 text-gray-500" />
                          {property.view}
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="h-4 w-4 text-gray-500" />
                          {property.parkingSpaces}
                        </div>
                      </div>

                      {/* CRM Integration */}
                      {(property.leadIds.length > 0 ||
                        property.dealIds.length > 0) && (
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-blue-500" />
                          <span>{property.leadIds.length} leads</span>
                          <span>•</span>
                          <span>{property.dealIds.length} deals</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {property.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {property.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.tags.length - 3}
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
                          <Calculator className="h-3 w-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Hold Unit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Target className="mr-2 h-4 w-4" />
                              Link to Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Clone Unit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Tower/Floor</TableHead>
                      <TableHead>Area (sq ft)</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>CRM Links</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{property.name}</div>
                            <div className="text-sm text-gray-500">
                              {property.projectName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {property.propertyType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {property.towerBlock} / {property.floor}F
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>C: {property.carpetArea}</div>
                            <div>B: {property.builtUpArea}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {formatPrice(property.currentPrice)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ₹{property.pricePerSqFt.toLocaleString()}/sq ft
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(property.status)}>
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{property.leadIds.length} leads</div>
                            <div>{property.dealIds.length} deals</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Hold</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Link to Lead
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Price Sheets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={DollarSign} animation="pulse" />
                    Active Price Sheets
                  </CardTitle>
                  <CardDescription>
                    Current pricing for different property types and floors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {priceSheets.map((sheet) => (
                    <div key={sheet.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">
                            {sheet.propertyType} - {sheet.towerBlock}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Floor {sheet.floor}
                          </p>
                        </div>
                        <Badge variant="outline">
                          Valid till {sheet.validTill}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Base Rate:</span>
                          <span className="ml-2 font-medium">
                            ₹{sheet.baseRate.toLocaleString()}/sq ft
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Parking:</span>
                          <span className="ml-2 font-medium">
                            ₹{sheet.parkingCharges.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {sheet.discounts.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-green-600">
                            Active Offers:
                          </p>
                          {sheet.discounts.map((discount, idx) => (
                            <div key={idx} className="text-xs text-green-600">
                              • {discount.name}: {discount.value}% off
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Price Sheet
                  </Button>
                </CardContent>
              </Card>

              {/* Price Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Calculator} animation="bounce" />
                    Price Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate total cost including all charges and discounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label>Property Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2BHK">2BHK</SelectItem>
                          <SelectItem value="3BHK">3BHK</SelectItem>
                          <SelectItem value="4BHK">4BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Carpet Area (sq ft)</Label>
                      <Input type="number" placeholder="1200" />
                    </div>

                    <div>
                      <Label>Floor Preference</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select floor range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 Floor</SelectItem>
                          <SelectItem value="6-10">6-10 Floor</SelectItem>
                          <SelectItem value="11-15">11-15 Floor</SelectItem>
                          <SelectItem value="16+">16+ Floor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Cost:</span>
                      <span className="font-medium">₹1,14,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registration:</span>
                      <span className="font-medium">₹5,70,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parking (1 space):</span>
                      <span className="font-medium">₹2,50,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Early Bird Discount (5%):</span>
                      <span className="font-medium">-₹5,70,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Cost:</span>
                      <span>₹1,16,50,000</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate & Generate Quote
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Payment Plans */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Plans</CardTitle>
                <CardDescription>
                  Flexible payment options for different customer segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {priceSheets[0]?.paymentPlans.map((plan, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">{plan.name}</h4>
                      <div className="space-y-2">
                        {plan.structure.map((milestone, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm"
                          >
                            <div>
                              <div className="font-medium">
                                {milestone.milestone}
                              </div>
                              <div className="text-gray-500">
                                {milestone.timing}
                              </div>
                            </div>
                            <div className="font-medium">
                              {milestone.percentage}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Towers Tab */}
          <TabsContent value="towers" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {towers.map((tower) => (
                <Card
                  key={tower.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-600" />
                          {tower.name}
                        </CardTitle>
                        <CardDescription>{tower.projectName}</CardDescription>
                      </div>
                      <Badge
                        className={getConstructionStatusColor(
                          tower.constructionStatus,
                        )}
                      >
                        {tower.constructionStatus}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Tower Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{tower.totalFloors}</div>
                        <div className="text-gray-500">Floors</div>
                      </div>
                      <div>
                        <div className="font-medium">{tower.totalUnits}</div>
                        <div className="text-gray-500">Total Units</div>
                      </div>
                      <div>
                        <div className="font-medium">{tower.unitsPerFloor}</div>
                        <div className="text-gray-500">Units/Floor</div>
                      </div>
                      <div>
                        <div className="font-medium">{tower.elevators}</div>
                        <div className="text-gray-500">Elevators</div>
                      </div>
                    </div>

                    {/* Availability Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sales Progress</span>
                        <span>
                          {Math.round(
                            (tower.soldUnits / tower.totalUnits) * 100,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(tower.soldUnits / tower.totalUnits) * 100}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{tower.soldUnits} sold</span>
                        <span>{tower.availableUnits} available</span>
                      </div>
                    </div>

                    {/* Unit Types */}
                    <div>
                      <p className="text-sm font-medium mb-2">Unit Types:</p>
                      {tower.unitTypes.map((type, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-xs mb-1"
                        >
                          <span>
                            {type.type} ({type.count})
                          </span>
                          <span className="text-green-600">
                            {type.priceRange}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Launch:</span>
                        <span>{tower.launchDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Possession:</span>
                        <span>{tower.possessionDate}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        View Units
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Floor Plans */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={FileText} animation="float" />
                    Floor Plans
                  </CardTitle>
                  <CardDescription>
                    Upload and manage floor plans for different unit types
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop floor plans here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Floor Plans
                    </Button>
                  </div>

                  {/* Existing Floor Plans */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Plans:</p>
                    {[
                      {
                        name: "2BHK Type A Floor Plan.pdf",
                        size: "2.4 MB",
                        type: "2BHK",
                      },
                      {
                        name: "3BHK Type B Floor Plan.pdf",
                        size: "3.1 MB",
                        type: "3BHK",
                      },
                      {
                        name: "4BHK Penthouse Plan.pdf",
                        size: "4.7 MB",
                        type: "4BHK",
                      },
                    ].map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="text-sm font-medium">
                              {file.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {file.size} • {file.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Brochures & Marketing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Image} animation="pulse" />
                    Brochures & Marketing
                  </CardTitle>
                  <CardDescription>
                    Marketing materials, brochures, and project specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload brochures, images, and marketing materials
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Materials
                    </Button>
                  </div>

                  {/* Document Categories */}
                  <div className="space-y-3">
                    {[
                      {
                        category: "Project Brochures",
                        count: 5,
                        icon: FileText,
                      },
                      { category: "Amenity Images", count: 12, icon: Image },
                      { category: "Location Maps", count: 3, icon: MapPin },
                      {
                        category: "Specification Sheets",
                        count: 8,
                        icon: FileText,
                      },
                    ].map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-sm font-medium">
                                {category.category}
                              </div>
                              <div className="text-xs text-gray-500">
                                {category.count} files
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Document Library */}
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>
                  Centralized repository of all property-related documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Property/Tower</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Skyline Residency Master Brochure.pdf",
                        type: "PDF",
                        category: "Marketing",
                        property: "Skyline Residency",
                        date: "2024-03-15",
                      },
                      {
                        name: "Tower A Floor Plans.dwg",
                        type: "CAD",
                        category: "Technical",
                        property: "Tower A",
                        date: "2024-03-10",
                      },
                      {
                        name: "Amenities Overview.jpg",
                        type: "Image",
                        category: "Marketing",
                        property: "All Projects",
                        date: "2024-03-08",
                      },
                    ].map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            {doc.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>{doc.category}</TableCell>
                        <TableCell>{doc.property}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Real-time Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={BarChart3} animation="pulse" />
                    Real-time Availability
                  </CardTitle>
                  <CardDescription>
                    Live inventory status across all projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {towers.map((tower) => (
                    <div key={tower.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{tower.name}</h4>
                        <Badge
                          className={getConstructionStatusColor(
                            tower.constructionStatus,
                          )}
                        >
                          {tower.constructionStatus}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-3 text-center text-sm">
                        <div className="p-2 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">
                            {tower.availableUnits}
                          </div>
                          <div className="text-green-600">Available</div>
                        </div>
                        <div className="p-2 bg-red-50 rounded">
                          <div className="text-lg font-bold text-red-600">
                            {tower.soldUnits}
                          </div>
                          <div className="text-red-600">Sold</div>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded">
                          <div className="text-lg font-bold text-yellow-600">
                            {tower.blockedUnits}
                          </div>
                          <div className="text-yellow-600">Hold</div>
                        </div>
                        <div className="p-2 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">
                            {tower.totalUnits}
                          </div>
                          <div className="text-blue-600">Total</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Progress
                          value={(tower.soldUnits / tower.totalUnits) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>
                            {Math.round(
                              (tower.soldUnits / tower.totalUnits) * 100,
                            )}
                            % sold
                          </span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Sales Velocity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={TrendingUp} animation="glow" />
                    Sales Velocity
                  </CardTitle>
                  <CardDescription>
                    Track sales performance and trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-500">
                        Units This Month
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ₹18.5Cr
                      </div>
                      <div className="text-sm text-gray-500">
                        Monthly Revenue
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Property Type Performance</h4>
                    {[
                      {
                        type: "2BHK",
                        sold: 8,
                        revenue: "₹9.6Cr",
                        trend: "+15%",
                      },
                      {
                        type: "3BHK",
                        sold: 3,
                        revenue: "₹5.4Cr",
                        trend: "+8%",
                      },
                      {
                        type: "4BHK",
                        sold: 1,
                        revenue: "₹3.2Cr",
                        trend: "-5%",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{item.type}</div>
                          <div className="text-sm text-gray-500">
                            {item.sold} units sold
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{item.revenue}</div>
                          <div
                            className={`text-sm ${item.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                          >
                            {item.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hold Management */}
            <Card>
              <CardHeader>
                <CardTitle>Hold Management</CardTitle>
                <CardDescription>
                  Manage units on hold and their expiry dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Hold Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        property: "Golden Heights B-0804",
                        customer: "Rajesh Kumar",
                        holdDate: "2024-03-10",
                        expiry: "2024-03-25",
                        status: "Active",
                      },
                      {
                        property: "Skyline Residency A-0905",
                        customer: "Priya Sharma",
                        holdDate: "2024-03-08",
                        expiry: "2024-03-23",
                        status: "Expiring Soon",
                      },
                    ].map((hold, index) => (
                      <TableRow key={index}>
                        <TableCell>{hold.property}</TableCell>
                        <TableCell>{hold.customer}</TableCell>
                        <TableCell>{hold.holdDate}</TableCell>
                        <TableCell>{hold.expiry}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              hold.status === "Expiring Soon"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {hold.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <X className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Clock className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CRM Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Lead-Property Matching */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={Target} animation="bounce" />
                    Lead-Property Matching
                  </CardTitle>
                  <CardDescription>
                    Auto-match properties with lead preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        lead: "Rajesh Kumar Sharma",
                        preference: "3BHK, North-facing, Budget: ₹1.5-2Cr",
                        matches: 3,
                        bestMatch: "Skyline Residency A-1201",
                        score: "95%",
                      },
                      {
                        lead: "Priya Patel",
                        preference: "2BHK, High floor, Budget: ₹1-1.3Cr",
                        matches: 5,
                        bestMatch: "Golden Heights B-1104",
                        score: "88%",
                      },
                    ].map((match, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{match.lead}</h4>
                            <p className="text-sm text-gray-600">
                              {match.preference}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {match.matches} matches
                          </Badge>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-green-800">
                                Best Match:
                              </p>
                              <p className="text-sm text-green-700">
                                {match.bestMatch}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                {match.score}
                              </p>
                              <p className="text-xs text-green-600">
                                Match Score
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="flex-1">
                            <Target className="mr-1 h-3 w-3" />
                            Link Property
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Deal Pipeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AnimatedIcon icon={PieChart} animation="pulse" />
                    Deal Pipeline
                  </CardTitle>
                  <CardDescription>
                    Properties linked to active deals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        property: "Elite Towers C-1505",
                        deal: "High-value corporate deal",
                        stage: "Negotiation",
                        value: "₹3.1Cr",
                        probability: 75,
                        agent: "Anjali Patel",
                      },
                      {
                        property: "Skyline Residency A-1201",
                        deal: "Family home purchase",
                        stage: "Site Visit Completed",
                        value: "₹1.75Cr",
                        probability: 60,
                        agent: "Priya Sharma",
                      },
                    ].map((deal, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{deal.property}</h4>
                            <p className="text-sm text-gray-600">{deal.deal}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              {deal.value}
                            </div>
                            <div className="text-sm text-gray-500">
                              {deal.probability}% probability
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="outline">{deal.stage}</Badge>
                          <span className="text-gray-500">
                            Agent: {deal.agent}
                          </span>
                        </div>

                        <div className="mt-3">
                          <Progress value={deal.probability} className="h-2" />
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View Deal
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integration Settings */}
            <Card>
              <CardHeader>
                <CardTitle>CRM Integration Settings</CardTitle>
                <CardDescription>
                  Configure how properties integrate with CRM workflows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Auto-match leads to properties
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically suggest properties based on lead
                        preferences
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Property availability alerts
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Notify agents when preferred properties become available
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Price change notifications
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Alert linked leads when property prices change
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Inventory sync with deals</h4>
                      <p className="text-sm text-muted-foreground">
                        Auto-update property status when deals close
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <Button className="w-full">
                    <Target className="mr-2 h-4 w-4" />
                    Bulk Link Properties
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Integration Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Property Modal */}
      <Dialog
        open={showAddPropertyModal}
        onOpenChange={setShowAddPropertyModal}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AnimatedIcon icon={Plus} className="text-blue-600" />
              Add New Property
            </DialogTitle>
            <DialogDescription>
              Create a new property listing with complete details
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitProperty(handleAddProperty)}
            className="space-y-6"
          >
            {/* Basic Information */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    {...registerProperty("projectName", {
                      required: "Project name is required",
                    })}
                    placeholder="Skyline Residency"
                  />
                  {errorsProperty.projectName && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.projectName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="towerBlock">Tower/Block *</Label>
                  <Input
                    id="towerBlock"
                    {...registerProperty("towerBlock", {
                      required: "Tower/Block is required",
                    })}
                    placeholder="Tower A"
                  />
                  {errorsProperty.towerBlock && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.towerBlock.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="unitNumber">Unit Number *</Label>
                  <Input
                    id="unitNumber"
                    {...registerProperty("unitNumber", {
                      required: "Unit number is required",
                    })}
                    placeholder="A-1201"
                  />
                  {errorsProperty.unitNumber && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.unitNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Controller
                    name="propertyType"
                    control={controlProperty}
                    rules={{ required: "Property type is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1BHK">1BHK</SelectItem>
                          <SelectItem value="2BHK">2BHK</SelectItem>
                          <SelectItem value="3BHK">3BHK</SelectItem>
                          <SelectItem value="4BHK">4BHK</SelectItem>
                          <SelectItem value="Penthouse">Penthouse</SelectItem>
                          <SelectItem value="Villa">Villa</SelectItem>
                          <SelectItem value="Plot">Plot</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsProperty.propertyType && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.propertyType.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="floor">Floor *</Label>
                  <Input
                    id="floor"
                    type="number"
                    {...registerProperty("floor", {
                      required: "Floor is required",
                      min: 0,
                      max: 100,
                    })}
                    placeholder="12"
                  />
                  {errorsProperty.floor && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.floor.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="availabilityDate">Availability Date</Label>
                  <Input
                    id="availabilityDate"
                    type="date"
                    {...registerProperty("availabilityDate")}
                  />
                </div>
              </div>
            </div>

            {/* Area Details */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Area Details (sq ft)</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="carpetArea">Carpet Area *</Label>
                  <Input
                    id="carpetArea"
                    type="number"
                    {...registerProperty("carpetArea", {
                      required: "Carpet area is required",
                      min: 100,
                    })}
                    placeholder="1250"
                  />
                  {errorsProperty.carpetArea && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.carpetArea.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="builtUpArea">Built-up Area *</Label>
                  <Input
                    id="builtUpArea"
                    type="number"
                    {...registerProperty("builtUpArea", {
                      required: "Built-up area is required",
                      min: 100,
                    })}
                    placeholder="1450"
                  />
                  {errorsProperty.builtUpArea && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.builtUpArea.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="superBuiltUpArea">
                    Super Built-up Area *
                  </Label>
                  <Input
                    id="superBuiltUpArea"
                    type="number"
                    {...registerProperty("superBuiltUpArea", {
                      required: "Super built-up area is required",
                      min: 100,
                    })}
                    placeholder="1650"
                  />
                  {errorsProperty.superBuiltUpArea && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.superBuiltUpArea.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location & Features */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Location & Features</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label htmlFor="facing">Facing *</Label>
                  <Controller
                    name="facing"
                    control={controlProperty}
                    rules={{ required: "Facing is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select facing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="North">North</SelectItem>
                          <SelectItem value="South">South</SelectItem>
                          <SelectItem value="East">East</SelectItem>
                          <SelectItem value="West">West</SelectItem>
                          <SelectItem value="North-East">North-East</SelectItem>
                          <SelectItem value="North-West">North-West</SelectItem>
                          <SelectItem value="South-East">South-East</SelectItem>
                          <SelectItem value="South-West">South-West</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errorsProperty.facing && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.facing.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="view">View</Label>
                  <Controller
                    name="view"
                    control={controlProperty}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Garden">Garden</SelectItem>
                          <SelectItem value="Pool">Pool</SelectItem>
                          <SelectItem value="Main Road">Main Road</SelectItem>
                          <SelectItem value="Club House">Club House</SelectItem>
                          <SelectItem value="Hill">Hill</SelectItem>
                          <SelectItem value="City">City</SelectItem>
                          <SelectItem value="Courtyard">Courtyard</SelectItem>
                          <SelectItem value="Open Sky">Open Sky</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="balconies">Balconies</Label>
                  <Input
                    id="balconies"
                    type="number"
                    {...registerProperty("balconies", { min: 0, max: 10 })}
                    placeholder="2"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    {...registerProperty("bathrooms", { min: 1, max: 10 })}
                    placeholder="3"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                  <Input
                    id="parkingSpaces"
                    type="number"
                    {...registerProperty("parkingSpaces", { min: 0, max: 10 })}
                    placeholder="2"
                  />
                </div>
                <div>
                  <Label htmlFor="furnishing">Furnishing Status</Label>
                  <Controller
                    name="furnishing"
                    control={controlProperty}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select furnishing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Unfurnished">
                            Unfurnished
                          </SelectItem>
                          <SelectItem value="Semi-Furnished">
                            Semi-Furnished
                          </SelectItem>
                          <SelectItem value="Fully Furnished">
                            Fully Furnished
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Pricing Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="basePrice">Base Price (₹) *</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    {...registerProperty("basePrice", {
                      required: "Base price is required",
                      min: 1000000,
                    })}
                    placeholder="18500000"
                  />
                  {errorsProperty.basePrice && (
                    <p className="text-sm text-red-600">
                      {errorsProperty.basePrice.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="currentPrice">Current Price (₹)</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    {...registerProperty("currentPrice", { min: 1000000 })}
                    placeholder="17500000"
                  />
                </div>
                <div>
                  <Label htmlFor="parkingCharges">Parking Charges (₹)</Label>
                  <Input
                    id="parkingCharges"
                    type="number"
                    {...registerProperty("parkingCharges", { min: 0 })}
                    placeholder="350000"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddPropertyModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmittingProperty}>
                {isSubmittingProperty ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Tower Modal */}
      <Dialog open={showAddTowerModal} onOpenChange={setShowAddTowerModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AnimatedIcon icon={Building} className="text-blue-600" />
              Add New Tower/Block
            </DialogTitle>
            <DialogDescription>
              Create a new tower or building block for project management
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitTower(handleAddTower)}
            className="space-y-6"
          >
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Tower Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="towerName">Tower/Block Name *</Label>
                  <Input
                    id="towerName"
                    {...registerTower("name", {
                      required: "Tower name is required",
                    })}
                    placeholder="Tower A"
                  />
                  {errorsTower.name && (
                    <p className="text-sm text-red-600">
                      {errorsTower.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="towerProjectName">Project Name *</Label>
                  <Input
                    id="towerProjectName"
                    {...registerTower("projectName", {
                      required: "Project name is required",
                    })}
                    placeholder="Skyline Residency"
                  />
                  {errorsTower.projectName && (
                    <p className="text-sm text-red-600">
                      {errorsTower.projectName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="totalFloors">Total Floors *</Label>
                  <Input
                    id="totalFloors"
                    type="number"
                    {...registerTower("totalFloors", {
                      required: "Total floors is required",
                      min: 1,
                      max: 100,
                    })}
                    placeholder="20"
                  />
                  {errorsTower.totalFloors && (
                    <p className="text-sm text-red-600">
                      {errorsTower.totalFloors.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="unitsPerFloor">Units Per Floor *</Label>
                  <Input
                    id="unitsPerFloor"
                    type="number"
                    {...registerTower("unitsPerFloor", {
                      required: "Units per floor is required",
                      min: 1,
                      max: 20,
                    })}
                    placeholder="4"
                  />
                  {errorsTower.unitsPerFloor && (
                    <p className="text-sm text-red-600">
                      {errorsTower.unitsPerFloor.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Construction Timeline</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="constructionStatus">
                    Construction Status
                  </Label>
                  <Controller
                    name="constructionStatus"
                    control={controlTower}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="Foundation">Foundation</SelectItem>
                          <SelectItem value="Structure">Structure</SelectItem>
                          <SelectItem value="Finishing">Finishing</SelectItem>
                          <SelectItem value="Ready">Ready</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="launchDate">Launch Date</Label>
                  <Input
                    id="launchDate"
                    type="date"
                    {...registerTower("launchDate")}
                  />
                </div>
                <div>
                  <Label htmlFor="possessionDate">Expected Possession</Label>
                  <Input
                    id="possessionDate"
                    type="date"
                    {...registerTower("possessionDate")}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Infrastructure Details</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label htmlFor="elevators">Elevators</Label>
                  <Input
                    id="elevators"
                    type="number"
                    {...registerTower("elevators", { min: 1, max: 10 })}
                    placeholder="2"
                  />
                </div>
                <div>
                  <Label htmlFor="staircases">Staircases</Label>
                  <Input
                    id="staircases"
                    type="number"
                    {...registerTower("staircases", { min: 1, max: 5 })}
                    placeholder="2"
                  />
                </div>
                <div>
                  <Label htmlFor="parkingLevels">Parking Levels</Label>
                  <Input
                    id="parkingLevels"
                    type="number"
                    {...registerTower("parkingLevels", { min: 1, max: 10 })}
                    placeholder="3"
                  />
                </div>
                <div>
                  <Label htmlFor="totalParkingSpaces">Total Parking</Label>
                  <Input
                    id="totalParkingSpaces"
                    type="number"
                    {...registerTower("totalParkingSpaces", { min: 10 })}
                    placeholder="120"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddTowerModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmittingTower}>
                {isSubmittingTower ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Tower
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
