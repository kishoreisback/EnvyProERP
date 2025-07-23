# 🏗️ Domain-Specific Components

## Overview

Domain-specific components are specialized, reusable components tailored for specific business domains within the ERP system. Unlike generic shared components, these are designed with deep understanding of domain-specific business logic, data structures, and user workflows.

## 🎯 **Benefits of Domain Components**

1. **Business Logic Integration**: Components understand domain-specific rules and processes
2. **Optimized UX**: Tailored user experiences for specific business contexts
3. **Reduced Development Time**: Pre-built components with domain expertise
4. **Consistency**: Standardized patterns within each business domain
5. **Maintainability**: Centralized domain logic and UI patterns

## 📁 **Domain Structure**

```
client/components/domain/
├── construction/          # Construction & Project Management
├── financial/            # Financial & Accounting
├── hr/                   # HR & Employee Management
├── crm/                  # CRM & Sales
└── index.ts             # Main export file
```

---

## 🏗️ **Construction Domain**

### **Components Available:**

- **ProjectTimeline** - Visual project timeline with events and milestones
- **MilestoneTracker** - Track construction phases and progress
- **ProgressChart** - Visual progress tracking charts
- **SitePhotosGallery** - Organize and display site photos
- **ContractorCard** - Display contractor information and performance
- **MaterialUsageChart** - Track material consumption and waste
- **QualityCheckList** - Quality control checklists and results
- **SafetyMetrics** - Safety KPIs and incident tracking
- **ConstructionKPIs** - Overall construction performance metrics

### **Usage Example:**

```typescript
import { ProjectTimeline, MilestoneTracker } from "@/components/domain/construction";

// Timeline with events
<ProjectTimeline
  events={constructionEvents}
  showActions={true}
  onViewEvent={handleViewEvent}
  onEditEvent={handleEditEvent}
/>

// Milestone tracking
<MilestoneTracker
  milestones={projectMilestones}
  showCosts={true}
  onAddMilestone={handleAddMilestone}
  onEditMilestone={handleEditMilestone}
/>
```

### **Key Features:**

- **Phase-based tracking** (Foundation → Structure ��� Finishing)
- **Dependency management** between milestones
- **Cost tracking** with budget vs actual comparisons
- **Team assignment** and responsibility tracking
- **Progress visualization** with Gantt-like views
- **Quality and safety integration**

---

## 💰 **Financial Domain**

### **Components Available:**

- **FinancialMetrics** - Revenue, profit, expense tracking with trends
- **CashFlowChart** - Cash inflow/outflow visualization
- **RevenueBreakdown** - Revenue analysis by source/category
- **ExpenseTracker** - Expense categorization and budget tracking
- **ProfitLossWidget** - P&L statement visualization
- **BudgetComparison** - Budget vs actual analysis
- **PaymentStatusCard** - Payment tracking and reminders
- **TaxCalculator** - Tax calculations and compliance
- **FinancialKPIs** - Key financial performance indicators

### **Usage Example:**

```typescript
import { FinancialMetrics } from "@/components/domain/financial";

<FinancialMetrics
  data={monthlyFinancialData}
  showTrends={true}
  showTargets={true}
  targets={{
    revenue: 15000000,
    profit: 4500000,
    margin: 35,
  }}
/>
```

### **Key Features:**

- **Indian financial formats** (₹, Lakhs, Crores)
- **Trend analysis** with period-over-period comparisons
- **Target tracking** with progress indicators
- **Tax compliance** integration
- **Cash flow management**
- **Budget variance analysis**

---

## 👥 **HR Domain**

### **Components Available:**

- **EmployeeCard** - Comprehensive employee information display
- **AttendanceWidget** - Attendance tracking and patterns
- **PerformanceMetrics** - Employee performance visualization
- **LeaveCalendar** - Leave management and calendar view
- **PayrollSummary** - Payroll processing and summaries
- **OrganizationChart** - Hierarchical organization structure
- **EmployeeDirectory** - Searchable employee directory
- **HRKPIs** - HR performance metrics
- **RecruitmentFunnel** - Hiring pipeline tracking

### **Usage Example:**

```typescript
import { EmployeeCard, PerformanceMetrics } from "@/components/domain/hr";

<EmployeeCard
  employee={employeeData}
  showSalary={true}
  showPerformance={true}
  onView={handleViewEmployee}
  onEdit={handleEditEmployee}
  onMessage={handleMessageEmployee}
/>
```

### **Key Features:**

- **Performance ratings** with star visualization
- **Salary information** with role-based visibility
- **Skills and competencies** tracking
- **Reporting hierarchy** visualization
- **Contact integration** (email, phone, messaging)
- **Status indicators** (active, on-leave, etc.)

---

## 🎯 **CRM Domain**

### **Components Available:**

- **LeadFunnel** - Sales funnel visualization with conversion rates
- **CustomerCard** - Customer information and history
- **SalesPipeline** - Deal progression tracking
- **DealTracker** - Individual deal management
- **SalesKPIs** - Sales performance metrics
- **PropertyCard** - Real estate property display
- **ContactCard** - Contact management
- **OpportunityWidget** - Opportunity tracking
- **SalesActivity** - Activity logging and tracking

### **Usage Example:**

```typescript
import { LeadFunnel, CustomerCard } from "@/components/domain/crm";

<LeadFunnel
  leads={salesLeads}
  showValues={true}
  showConversionRates={true}
/>

<CustomerCard
  customer={customerData}
  showPurchaseHistory={true}
  showLTV={true}
  onContact={handleContact}
/>
```

### **Key Features:**

- **Conversion tracking** through sales stages
- **Lead scoring** and qualification
- **Property-specific** CRM for real estate
- **Customer lifetime value** calculations
- **Activity timeline** tracking
- **Revenue attribution** and forecasting

---

## 🚀 **Implementation Guidelines**

### **1. Domain Component Structure**

Each domain component should:

- Use domain-specific types and interfaces
- Include business logic relevant to the domain
- Provide configurable display options
- Support domain-specific actions and callbacks
- Include proper error handling and loading states

### **2. Data Integration**

```typescript
// Domain-specific types
interface Employee {
  id: string;
  name: string;
  department: string;
  performanceRating: number;
  // ... other HR-specific fields
}

// Component with domain logic
export function EmployeeCard({ employee, showSalary = false }) {
  const getRatingColor = (rating: number) => {
    // HR-specific rating logic
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    // ...
  };
}
```

### **3. Customization Options**

```typescript
interface FinancialMetricsProps {
  data: FinancialData[];
  showTrends?: boolean;
  showTargets?: boolean;
  targets?: FinancialTargets;
  className?: string;
}
```

### **4. Action Integration**

```typescript
<ProjectTimeline
  events={events}
  onViewEvent={(event) => navigate(`/projects/events/${event.id}`)}
  onEditEvent={(event) => openEditModal(event)}
  onDeleteEvent={(event) => confirmDelete(event)}
/>
```

---

## 📊 **Usage Patterns**

### **1. Dashboard Integration**

```typescript
// Construction Dashboard
export function ConstructionDashboard() {
  return (
    <div className="space-y-6">
      <ConstructionKPIs metrics={kpiData} />
      <div className="grid gap-6 lg:grid-cols-2">
        <MilestoneTracker milestones={milestones} />
        <ProjectTimeline events={recentEvents} />
      </div>
    </div>
  );
}
```

### **2. Module Pages**

```typescript
// HRMS Module
export function HRMSPage() {
  const tabs = [
    {
      value: "employees",
      content: (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees.map(emp => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      )
    }
  ];

  return <ModuleTabs tabs={tabs} />;
}
```

### **3. Report Generation**

```typescript
// Financial Reports
<FinancialMetrics
  data={reportData}
  showTrends={true}
  targets={budgetTargets}
  onExport={() => generateReport()}
/>
```

---

## 🎨 **Design Principles**

### **1. Domain Expertise**

Components encode business knowledge and best practices specific to each domain.

### **2. Flexibility**

Configurable options allow adaptation to different use cases within the domain.

### **3. Integration Ready**

Built-in support for common actions like view, edit, delete, and navigation.

### **4. Performance Optimized**

Efficient rendering and data handling for domain-specific scenarios.

### **5. Accessibility**

Proper ARIA labels and keyboard navigation for domain-specific workflows.

---

## 🔄 **Migration Strategy**

### **Phase 1: Identify Patterns**

- Analyze existing modules for domain-specific patterns
- Extract common layouts and business logic
- Define domain-specific interfaces

### **Phase 2: Create Components**

- Build domain components with extracted patterns
- Include comprehensive prop interfaces
- Add proper TypeScript types

### **Phase 3: Replace Existing Code**

- Gradually replace duplicated code with domain components
- Update modules to use new components
- Remove obsolete code

### **Phase 4: Enhance**

- Add advanced features to domain components
- Improve performance and accessibility
- Expand customization options

---

## 📈 **Expected Benefits**

1. **Development Speed**: 50-70% faster module development
2. **Code Quality**: Consistent, tested, and maintained components
3. **User Experience**: Domain-optimized interfaces and workflows
4. **Maintainability**: Centralized domain logic and bug fixes
5. **Scalability**: Easy to extend and enhance domain functionality

Domain-specific components represent the next level of code reusability, providing specialized tools that understand and optimize for specific business contexts while maintaining the flexibility needed for diverse use cases.
