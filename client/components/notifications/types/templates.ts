// Unified Notification System - Templates & Analytics Types

import {
  NotificationType,
  NotificationCategory,
  NotificationChannel,
  NotificationPriority,
  UserType,
  TemplateVariable,
  LocalizedContent,
  NotificationAction,
  WorkflowContext,
} from "./core";

// Template Management
export interface NotificationTemplate {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  version: number;

  // Template categorization
  type: NotificationType;
  category: NotificationCategory;
  subCategory?: string;

  // Content structure
  content: TemplateContent;

  // Configuration
  defaultChannels: NotificationChannel[];
  defaultPriority: NotificationPriority;
  supportedUserTypes: UserType[];

  // Template behavior
  variables: TemplateVariable[];
  actions: TemplateAction[];
  rules: TemplateRule[];

  // Workflow integration
  workflowCompatible: boolean;
  workflowSteps?: string[];
  triggerEvents?: string[];

  // Personalization & Localization
  personalization: PersonalizationConfig;
  localization: LocalizationConfig;

  // Approval & Governance
  requiresApproval: boolean;
  approvalStatus: TemplateApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;

  // Usage & Analytics
  isActive: boolean;
  usageCount: number;
  lastUsedAt?: string;
  performanceMetrics: TemplatePerformanceMetrics;

  // Access control
  permissions: TemplatePermissions;

  // Metadata
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface TemplateContent {
  // Basic content
  subject?: string;
  title: string;
  shortText: string;
  fullText?: string;

  // Rich content
  htmlContent?: string;
  richContent?: RichTemplateContent;

  // Media
  images?: TemplateImage[];
  videos?: TemplateVideo[];
  attachments?: TemplateAttachment[];

  // Layout & Styling
  layout: TemplateLayout;
  styling: TemplateStyle;

  // Dynamic content
  conditionalBlocks?: ConditionalBlock[];
  dynamicSections?: DynamicSection[];
}

export interface RichTemplateContent {
  blocks: ContentBlock[];
  components: TemplateComponent[];
  variables: VariableReference[];
}

export interface ContentBlock {
  id: string;
  type:
    | "text"
    | "image"
    | "video"
    | "button"
    | "list"
    | "table"
    | "chart"
    | "divider"
    | "spacer";
  content: any;
  style?: BlockStyle;
  conditions?: BlockCondition[];
  order: number;
}

export interface BlockStyle {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  border?: string;
  borderRadius?: string;
  customCSS?: string;
}

export interface BlockCondition {
  field: string;
  operator: string;
  value: any;
  hideOnMatch?: boolean;
}

export interface TemplateComponent {
  id: string;
  name: string;
  type:
    | "header"
    | "footer"
    | "sidebar"
    | "content"
    | "action_bar"
    | "signature";
  template: string;
  variables: string[];
  isReusable: boolean;
}

export interface VariableReference {
  name: string;
  placeholder: string;
  defaultValue?: any;
  isRequired: boolean;
}

export interface TemplateImage {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  position: "inline" | "header" | "footer" | "background";
  responsive: boolean;
  fallbackUrl?: string;
}

export interface TemplateVideo {
  id: string;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  autoplay: boolean;
  controls: boolean;
  fallbackImage?: string;
}

export interface TemplateAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  isRequired: boolean;
  downloadable: boolean;
}

export interface TemplateLayout {
  type: "single_column" | "two_column" | "three_column" | "sidebar" | "custom";
  width: "fixed" | "fluid" | "responsive";
  maxWidth?: string;
  alignment: "left" | "center" | "right";
  spacing: "compact" | "normal" | "loose";
}

export interface TemplateStyle {
  theme: "light" | "dark" | "brand" | "custom";
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  linkColor?: string;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  customCSS?: string;
}

export interface ConditionalBlock {
  id: string;
  condition: TemplateCondition;
  content: any;
  fallbackContent?: any;
}

export interface TemplateCondition {
  field: string;
  operator: string;
  value: any;
  logicalOperator?: "AND" | "OR";
}

export interface DynamicSection {
  id: string;
  name: string;
  dataSource: string;
  template: string;
  maxItems?: number;
  groupBy?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface TemplateAction {
  id: string;
  type: "button" | "link" | "form" | "download";
  label: string;
  style: ActionStyle;
  behavior: ActionBehavior;
  conditions?: ActionCondition[];
  tracking: ActionTracking;
}

export interface ActionStyle {
  type: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size: "small" | "medium" | "large";
  variant: "solid" | "outline" | "ghost" | "link";
  customStyle?: Record<string, string>;
}

export interface ActionBehavior {
  type: "navigate" | "api_call" | "download" | "modal" | "external_link";
  target: string;
  parameters?: Record<string, any>;
  openInNewTab?: boolean;
  requiresAuth?: boolean;
}

export interface ActionCondition {
  field: string;
  operator: string;
  value: any;
  userType?: UserType;
  permission?: string;
}

export interface ActionTracking {
  trackClicks: boolean;
  trackConversions: boolean;
  goals?: TrackingGoal[];
  customEvents?: CustomEvent[];
}

export interface TrackingGoal {
  name: string;
  type: "click" | "form_submit" | "page_view" | "purchase" | "signup";
  value?: number;
  currency?: string;
}

export interface CustomEvent {
  name: string;
  parameters: Record<string, any>;
  conditions?: ActionCondition[];
}

export interface TemplateRule {
  id: string;
  name: string;
  type: "validation" | "transformation" | "routing" | "approval";
  conditions: TemplateCondition[];
  actions: RuleAction[];
  isActive: boolean;
  priority: number;
}

export interface RuleAction {
  type:
    | "modify_content"
    | "change_priority"
    | "add_recipient"
    | "require_approval"
    | "delay_sending";
  parameters: Record<string, any>;
}

export interface PersonalizationConfig {
  enabled: boolean;
  rules: PersonalizationRule[];
  dynamicContent: DynamicContentConfig;
  abTesting: ABTestingConfig;
}

export interface PersonalizationRule {
  id: string;
  name: string;
  conditions: TemplateCondition[];
  contentOverride: Partial<TemplateContent>;
  priority: number;
  isActive: boolean;
}

export interface DynamicContentConfig {
  enabled: boolean;
  dataSources: DataSource[];
  contentRules: ContentRule[];
}

export interface DataSource {
  id: string;
  name: string;
  type: "api" | "database" | "file" | "function";
  configuration: any;
  cacheSettings?: CacheSettings;
}

export interface CacheSettings {
  enabled: boolean;
  ttlMinutes: number;
  keyPattern: string;
  invalidationRules?: string[];
}

export interface ContentRule {
  id: string;
  trigger: string;
  dataSource: string;
  contentMapping: Record<string, string>;
  fallbackContent?: any;
}

export interface ABTestingConfig {
  enabled: boolean;
  tests: ABTest[];
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: "draft" | "running" | "paused" | "completed";
  variants: ABVariant[];
  trafficSplit: number[];
  startDate: string;
  endDate?: string;
  successMetrics: ABMetric[];
  results?: ABTestResults;
}

export interface ABVariant {
  id: string;
  name: string;
  description: string;
  contentOverride: Partial<TemplateContent>;
  isControl: boolean;
}

export interface ABMetric {
  name: string;
  type: "conversion" | "engagement" | "revenue" | "custom";
  goal: number;
  weight: number;
}

export interface ABTestResults {
  totalSent: number;
  variantResults: VariantResult[];
  winningVariant?: string;
  confidence: number;
  significance: number;
}

export interface VariantResult {
  variantId: string;
  sent: number;
  conversions: number;
  conversionRate: number;
  revenue?: number;
  customMetrics?: Record<string, number>;
}

export interface LocalizationConfig {
  enabled: boolean;
  defaultLocale: string;
  supportedLocales: string[];
  translations: Record<string, LocalizedTemplate>;
  autoTranslation: AutoTranslationConfig;
}

export interface LocalizedTemplate {
  locale: string;
  content: TemplateContent;
  variables?: Record<string, string>;
  isComplete: boolean;
  lastUpdated: string;
}

export interface AutoTranslationConfig {
  enabled: boolean;
  provider: "google" | "azure" | "aws" | "custom";
  quality: "basic" | "premium" | "human";
  autoApprove: boolean;
}

export type TemplateApprovalStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "rejected"
  | "needs_revision"
  | "published"
  | "archived";

export interface TemplatePerformanceMetrics {
  // Usage metrics
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;

  // Rates
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  unsubscribeRate: number;

  // Engagement
  averageTimeToOpen: number;
  averageEngagementTime: number;
  forwardRate: number;
  replyRate: number;

  // Channel performance
  channelMetrics: ChannelPerformanceMetric[];

  // Time-based metrics
  dailyMetrics: DailyTemplateMetric[];
  weeklyTrends: WeeklyTemplateTrend[];

  // Quality metrics
  errorRate: number;
  bounceRate: number;
  complaintsRate: number;

  // Business impact
  revenueGenerated?: number;
  conversionsGenerated?: number;
  leadsGenerated?: number;
}

export interface ChannelPerformanceMetric {
  channel: NotificationChannel;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
}

export interface DailyTemplateMetric {
  date: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  revenue?: number;
  conversions?: number;
}

export interface WeeklyTemplateTrend {
  week: string;
  sent: number;
  openRate: number;
  clickRate: number;
  growth: number;
  topPerformingVariant?: string;
}

export interface TemplatePermissions {
  canView: string[];
  canEdit: string[];
  canClone: string[];
  canDelete: string[];
  canPublish: string[];
  canApprove: string[];

  // Template-specific permissions
  canUseInWorkflows: boolean;
  canCreateVariants: boolean;
  canRunABTests: boolean;
  canTranslate: boolean;

  // Tenant restrictions
  tenantRestrictions?: TemplateRestriction[];
}

export interface TemplateRestriction {
  tenantId: string;
  allowedOperations: string[];
  restrictedFeatures: string[];
  customLimits?: Record<string, number>;
}

// Analytics Types
export interface NotificationAnalytics {
  // Overview metrics
  totalNotifications: number;
  totalSent: number;
  totalDelivered: number;
  totalRead: number;
  totalClicked: number;
  totalAcknowledged: number;

  // Performance rates
  deliveryRate: number;
  readRate: number;
  clickRate: number;
  acknowledgmentRate: number;
  responseRate: number;
  engagementScore: number;

  // Time-based analytics
  averageResponseTime: number;
  averageDeliveryTime: number;
  peakEngagementHours: number[];

  // Channel analytics
  channelMetrics: ChannelAnalytics[];
  channelPreferences: ChannelPreference[];

  // Category analytics
  categoryMetrics: CategoryAnalytics[];

  // User analytics
  userEngagement: UserEngagementAnalytics[];
  userPreferences: UserPreferenceAnalytics[];

  // Template analytics
  templatePerformance: TemplateAnalytics[];

  // Workflow analytics
  workflowMetrics: WorkflowAnalytics[];

  // Business impact
  businessMetrics: BusinessMetrics;

  // Time series data
  timeSeriesData: TimeSeriesData;

  // Comparative analytics
  comparativeMetrics: ComparativeMetrics;

  // Predictive analytics
  predictions: PredictiveAnalytics;
}

export interface ChannelAnalytics {
  channel: NotificationChannel;
  totalSent: number;
  totalDelivered: number;
  totalRead: number;
  totalClicked: number;
  totalFailed: number;

  // Performance metrics
  deliveryRate: number;
  readRate: number;
  clickRate: number;
  failureRate: number;
  averageDeliveryTime: number;
  averageResponseTime: number;

  // Cost metrics
  costPerNotification?: number;
  totalCost?: number;
  costPerEngagement?: number;

  // Reliability metrics
  uptime: number;
  errorRate: number;
  retryRate: number;

  // User preferences
  optInRate: number;
  optOutRate: number;
  unsubscribeRate: number;
}

export interface ChannelPreference {
  channel: NotificationChannel;
  userCount: number;
  percentage: number;
  engagementRate: number;
  satisfactionScore: number;
}

export interface CategoryAnalytics {
  category: NotificationCategory;
  totalSent: number;
  totalRead: number;
  totalAcknowledged: number;
  averageEngagement: number;
  topPerformingTypes: TypePerformance[];
  userSatisfaction: number;
  businessImpact: number;
}

export interface TypePerformance {
  type: NotificationType;
  count: number;
  engagementRate: number;
  conversionRate: number;
  averageResponseTime: number;
}

export interface UserEngagementAnalytics {
  userType: UserType;
  totalUsers: number;
  activeUsers: number;
  engagementRate: number;
  averageResponseTime: number;
  preferredChannels: NotificationChannel[];
  topCategories: NotificationCategory[];
  satisfactionScore: number;
}

export interface UserPreferenceAnalytics {
  userType: UserType;
  channelPreferences: Record<NotificationChannel, number>;
  categoryPreferences: Record<NotificationCategory, number>;
  frequencyPreferences: Record<string, number>;
  timePreferences: TimePreferenceData;
}

export interface TimePreferenceData {
  preferredHours: number[];
  quietHoursUsage: number;
  weekdayVsWeekend: {
    weekday: number;
    weekend: number;
  };
}

export interface TemplateAnalytics {
  templateId: string;
  templateName: string;
  usageCount: number;
  performanceScore: number;
  conversionRate: number;
  userSatisfaction: number;
  abTestResults?: ABTestResults;
}

export interface WorkflowAnalytics {
  workflowId: string;
  workflowName: string;
  executionCount: number;
  successRate: number;
  averageExecutionTime: number;
  notificationsSent: number;
  engagementRate: number;
  businessImpact: number;
}

export interface BusinessMetrics {
  // Revenue impact
  revenueGenerated: number;
  revenuePerNotification: number;
  conversionValue: number;

  // Customer metrics
  customerAcquisition: number;
  customerRetention: number;
  customerSatisfaction: number;

  // Operational metrics
  processEfficiency: number;
  responseTimeImprovement: number;
  automationSavings: number;

  // Quality metrics
  errorReduction: number;
  complianceScore: number;
  riskMitigation: number;
}

export interface TimeSeriesData {
  hourlyData: HourlyData[];
  dailyData: DailyData[];
  weeklyData: WeeklyData[];
  monthlyData: MonthlyData[];
}

export interface HourlyData {
  timestamp: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  engagementRate: number;
}

export interface DailyData {
  date: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  acknowledged: number;
  engagementRate: number;
  userGrowth: number;
  revenue?: number;
}

export interface WeeklyData {
  week: string;
  sent: number;
  engagementRate: number;
  userGrowth: number;
  topCategory: NotificationCategory;
  topChannel: NotificationChannel;
}

export interface MonthlyData {
  month: string;
  sent: number;
  engagementRate: number;
  userGrowth: number;
  revenue: number;
  newFeatures: string[];
  businessGoals: GoalProgress[];
}

export interface GoalProgress {
  goalName: string;
  target: number;
  achieved: number;
  progress: number;
}

export interface ComparativeMetrics {
  // Period comparisons
  previousPeriod: PeriodComparison;
  yearOverYear: PeriodComparison;

  // Benchmarks
  industryBenchmarks?: BenchmarkData;
  internalBenchmarks: BenchmarkData;

  // Cohort analysis
  cohortAnalysis: CohortData[];
}

export interface PeriodComparison {
  current: PeriodData;
  previous: PeriodData;
  change: number;
  changePercentage: number;
  trend: "up" | "down" | "stable";
}

export interface PeriodData {
  period: string;
  sent: number;
  engagementRate: number;
  conversionRate: number;
  revenue: number;
  userCount: number;
}

export interface BenchmarkData {
  deliveryRate: number;
  readRate: number;
  clickRate: number;
  engagementRate: number;
  responseTime: number;
  source: string;
  lastUpdated: string;
}

export interface CohortData {
  cohortName: string;
  cohortSize: number;
  engagementRates: number[];
  retentionRates: number[];
  periods: string[];
}

export interface PredictiveAnalytics {
  // Engagement predictions
  engagementForecast: ForecastData[];
  optimalSendTimes: OptimalSendTime[];

  // User behavior predictions
  churnPrediction: ChurnPrediction[];
  engagementPrediction: EngagementPrediction[];

  // Performance predictions
  channelPerformanceForecast: ChannelForecast[];
  templatePerformancePrediction: TemplatePerformancePrediction[];

  // Business predictions
  revenueImpactForecast: RevenueImpactForecast[];

  // Model information
  modelAccuracy: number;
  lastTrainingDate: string;
  dataQualityScore: number;
}

export interface ForecastData {
  period: string;
  predicted: number;
  confidence: number;
  trend: "up" | "down" | "stable";
}

export interface OptimalSendTime {
  userType: UserType;
  channel: NotificationChannel;
  optimalHour: number;
  optimalDay: string;
  expectedEngagement: number;
  confidence: number;
}

export interface ChurnPrediction {
  userId: string;
  churnProbability: number;
  riskFactors: string[];
  recommendedActions: string[];
  timeframe: string;
}

export interface EngagementPrediction {
  userId: string;
  engagementScore: number;
  preferredChannels: NotificationChannel[];
  preferredCategories: NotificationCategory[];
  optimalFrequency: string;
}

export interface ChannelForecast {
  channel: NotificationChannel;
  predictedPerformance: ForecastData[];
  growthProjection: number;
  recommendedActions: string[];
}

export interface TemplatePerformancePrediction {
  templateId: string;
  predictedEngagement: number;
  successProbability: number;
  recommendedOptimizations: string[];
}

export interface RevenueImpactForecast {
  period: string;
  predictedRevenue: number;
  revenueFromEngagement: number;
  costSavings: number;
  roi: number;
}
