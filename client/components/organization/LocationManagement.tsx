import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedIcon, PulsingDot } from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  MapPin,
  Building,
  Users,
  Plus,
  Edit,
  Trash2,
  Star,
  Phone,
  Mail,
  Calendar,
  Activity,
  TrendingUp,
  Globe,
  Clock,
  Car,
  Coffee,
  Wifi,
  Shield,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { OrgLocation } from "./types";
import { orgLocations } from "./data";

interface LocationManagementProps {
  onLocationSelect?: (location: OrgLocation) => void;
  selectedLocationId?: string;
}

export const LocationManagement = ({
  onLocationSelect,
  selectedLocationId,
}: LocationManagementProps) => {
  const [locations, setLocations] = useState<OrgLocation[]>(orgLocations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<OrgLocation | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.state.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalEmployees = locations.reduce(
    (sum, loc) => sum + loc.employeeCount,
    0,
  );
  const totalCapacity = locations.reduce((sum, loc) => sum + loc.capacity, 0);
  const utilizationRate = (totalEmployees / totalCapacity) * 100;

  const handleAddLocation = (newLocation: Partial<OrgLocation>) => {
    const location: OrgLocation = {
      id: `loc_${Date.now()}`,
      name: newLocation.name || "",
      address: newLocation.address || "",
      city: newLocation.city || "",
      state: newLocation.state || "",
      country: newLocation.country || "",
      postalCode: newLocation.postalCode || "",
      timezone: newLocation.timezone || "Asia/Kolkata",
      isHeadOffice: newLocation.isHeadOffice || false,
      capacity: newLocation.capacity || 0,
      employeeCount: 0,
      facilities: newLocation.facilities || [],
      contactPerson: newLocation.contactPerson || "",
      phone: newLocation.phone || "",
      email: newLocation.email || "",
    };

    setLocations((prev) => [...prev, location]);
    setIsAddDialogOpen(false);
  };

  const handleEditLocation = (updatedLocation: OrgLocation) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === updatedLocation.id ? updatedLocation : loc,
      ),
    );
    setIsEditDialogOpen(false);
    setEditingLocation(null);
  };

  const handleDeleteLocation = (locationId: string) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== locationId));
  };

  const LocationForm = ({
    location,
    onSubmit,
    onCancel,
  }: {
    location?: OrgLocation | null;
    onSubmit: (data: any) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      name: location?.name || "",
      address: location?.address || "",
      city: location?.city || "",
      state: location?.state || "",
      country: location?.country || "India",
      postalCode: location?.postalCode || "",
      timezone: location?.timezone || "Asia/Kolkata",
      isHeadOffice: location?.isHeadOffice || false,
      capacity: location?.capacity || 0,
      contactPerson: location?.contactPerson || "",
      phone: location?.phone || "",
      email: location?.email || "",
      facilities: location?.facilities || [],
    });

    const facilityOptions = [
      "Conference Rooms",
      "Cafeteria",
      "Gym",
      "Parking",
      "Game Room",
      "Library",
      "Medical Room",
      "Prayer Room",
      "Rooftop",
      "Security",
    ];

    return (
      <div className="space-y-4 py-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Location Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter location name"
            />
          </div>
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  capacity: Number(e.target.value),
                }))
              }
              placeholder="Maximum capacity"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="Enter complete address"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder="City"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state: e.target.value }))
              }
              placeholder="State"
            />
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, postalCode: e.target.value }))
              }
              placeholder="Postal code"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactPerson: e.target.value,
                }))
              }
              placeholder="Contact person name"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Phone number"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Location email"
          />
        </div>

        <div>
          <Label>Facilities</Label>
          <div className="grid grid-cols-3 gap-2 mt-2 mb-2">
            {facilityOptions.map((facility) => (
              <label
                key={facility}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(facility)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        facilities: [...prev.facilities, facility],
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        facilities: prev.facilities.filter(
                          (f) => f !== facility,
                        ),
                      }));
                    }
                  }}
                />
                <span>{facility}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isHeadOffice"
            checked={formData.isHeadOffice}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isHeadOffice: e.target.checked,
              }))
            }
          />
          <Label htmlFor="isHeadOffice">Head Office</Label>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSubmit(location ? { ...location, ...formData } : formData)
            }
          >
            {location ? "Update" : "Add"} Location
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Locations
                </p>
                <AnimatedCounter
                  value={locations.length}
                  className="text-2xl font-bold"
                />
              </div>
              <AnimatedIcon icon={Building} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Employees
                </p>
                <AnimatedCounter
                  value={totalEmployees}
                  className="text-2xl font-bold"
                />
              </div>
              <AnimatedIcon icon={Users} className="text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Capacity
                </p>
                <AnimatedCounter
                  value={totalCapacity}
                  className="text-2xl font-bold"
                />
              </div>
              <AnimatedIcon icon={Activity} className="text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Utilization
                </p>
                <div className="text-2xl font-bold">
                  {utilizationRate.toFixed(1)}%
                </div>
              </div>
              <AnimatedIcon icon={TrendingUp} className="text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Location Management</h2>
          <p className="text-muted-foreground">
            Manage office locations and facilities
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-lift">
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>
                Add a new office location with details and facilities
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-2">
              <LocationForm
                onSubmit={handleAddLocation}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLocations.map((location) => (
          <Card
            key={location.id}
            className={`hover-lift cursor-pointer transition-all duration-200 ${
              selectedLocationId === location.id
                ? "ring-2 ring-primary border-primary"
                : ""
            }`}
            onClick={() => onLocationSelect?.(location)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedIcon icon={MapPin} className="text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    {location.isHeadOffice && (
                      <Badge variant="default" className="text-xs mt-1">
                        <Star className="h-3 w-3 mr-1" />
                        Head Office
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingLocation(location);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLocation(location.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1 mb-1">
                  <Building className="h-3 w-3" />
                  {location.address}
                </div>
                <div>
                  {location.city}, {location.state} {location.postalCode}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-emerald-600" />
                    <span>{location.employeeCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-purple-600" />
                    <span>{location.capacity}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {((location.employeeCount / location.capacity) * 100).toFixed(
                    0,
                  )}
                  % utilized
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {location.contactPerson} • {location.phone}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {location.email}
                </div>
              </div>

              {location.facilities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {location.facilities.slice(0, 3).map((facility) => (
                    <Badge
                      key={facility}
                      variant="secondary"
                      className="text-xs"
                    >
                      {facility}
                    </Badge>
                  ))}
                  {location.facilities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{location.facilities.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update location details and facilities
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-2">
            <LocationForm
              location={editingLocation}
              onSubmit={handleEditLocation}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingLocation(null);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationManagement;
