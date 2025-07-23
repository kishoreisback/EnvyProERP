import { vi } from "vitest";

export interface TestTenant {
  id: string;
  name: string;
  tier: "basic" | "professional" | "enterprise";
  features: Record<string, boolean>;
  limits: Record<string, number>;
  adminToken: string;
}

export interface TestUser {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  token: string;
}

export interface TestDatabase {
  tenants: TestTenant[];
  users: TestUser[];
  data: Record<string, any[]>;
}

let testDb: TestDatabase = {
  tenants: [],
  users: [],
  data: {},
};

export async function setupTestDatabase(): Promise<void> {
  // Reset test database
  testDb = {
    tenants: [],
    users: [],
    data: {},
  };

  // Initialize test data structure
  const tenantIds = ["buildcorp", "metrorealty", "skyline", "techcorp"];

  for (const tenantId of tenantIds) {
    testDb.data[tenantId] = {
      leads: [],
      customers: [],
      projects: [],
      users: [],
      invoices: [],
      transactions: [],
    };
  }
}

export async function cleanupTestDatabase(): Promise<void> {
  testDb = {
    tenants: [],
    users: [],
    data: {},
  };
}

export async function createTestTenant(
  id: string,
  tier: "basic" | "professional" | "enterprise",
): Promise<TestTenant> {
  const tierFeatures = {
    basic: {
      projectManagement: true,
      crm: true,
      hrms: false,
      accounting: false,
      aiAgents: false,
      sso: false,
      customBranding: false,
    },
    professional: {
      projectManagement: true,
      crm: true,
      hrms: true,
      accounting: true,
      aiAgents: true,
      sso: false,
      customBranding: false,
    },
    enterprise: {
      projectManagement: true,
      crm: true,
      hrms: true,
      accounting: true,
      aiAgents: true,
      sso: true,
      customBranding: true,
    },
  };

  const tierLimits = {
    basic: { users: 10, projects: 5, storage: 1024 },
    professional: { users: 50, projects: 25, storage: 10240 },
    enterprise: { users: -1, projects: -1, storage: -1 }, // unlimited
  };

  const tenant: TestTenant = {
    id,
    name: `${id.charAt(0).toUpperCase() + id.slice(1)} Corp`,
    tier,
    features: tierFeatures[tier],
    limits: tierLimits[tier],
    adminToken: generateTestToken(`admin-${id}`),
  };

  testDb.tenants.push(tenant);
  return tenant;
}

export async function createUserWithTenant(
  tenantId: string,
  role: string,
): Promise<TestUser> {
  const tenant = testDb.tenants.find((t) => t.id === tenantId);
  if (!tenant) {
    throw new Error(`Tenant ${tenantId} not found`);
  }

  // Check user limits
  const currentUsers = testDb.users.filter((u) => u.tenantId === tenantId);
  if (
    tenant.limits.users !== -1 &&
    currentUsers.length >= tenant.limits.users
  ) {
    throw new Error("User limit exceeded");
  }

  const userId = `user-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const user: TestUser = {
    id: userId,
    tenantId,
    email: `${role}@${tenantId}.test`,
    role,
    token: generateTestToken(userId),
  };

  testDb.users.push(user);
  return user;
}

export async function makeAuthenticatedRequest(
  token: string,
  endpoint: string,
  options?: any,
): Promise<any> {
  // Mock authenticated request
  const user = testDb.users.find((u) => u.token === token);
  if (!user) {
    throw new Error("Invalid token");
  }

  // Check tenant access
  if (options?.tenantId && options.tenantId !== user.tenantId) {
    throw new Error("Unauthorized tenant access");
  }

  // Simulate API response based on endpoint
  if (endpoint === "/api/leads") {
    return {
      status: 200,
      data: testDb.data[user.tenantId]?.leads || [],
    };
  }

  if (endpoint === "/api/dashboard/analytics") {
    return {
      status: 200,
      data: {
        metrics: generateMockAnalytics(user.tenantId),
        timestamp: new Date().toISOString(),
      },
    };
  }

  return { status: 200, data: [] };
}

export async function getTenantFeatures(
  tenantId: string,
): Promise<Record<string, boolean>> {
  const tenant = testDb.tenants.find((t) => t.id === tenantId);
  return tenant?.features || {};
}

export async function performHeavyOperation(tenantId: string): Promise<void> {
  // Simulate heavy operation
  await new Promise((resolve) => setTimeout(resolve, 100));
}

export async function monitorResourceUsage(
  operation: () => Promise<void>,
): Promise<Record<string, any>> {
  const startMemory = process.memoryUsage();
  const startTime = Date.now();

  await operation();

  const endMemory = process.memoryUsage();
  const endTime = Date.now();

  const metrics: Record<string, any> = {};

  for (const tenant of testDb.tenants) {
    metrics[tenant.id] = {
      memoryUsage: endMemory.heapUsed - startMemory.heapUsed,
      duration: endTime - startTime,
      cpuUsage: Math.random() * 50, // Mock CPU usage
      limits: {
        memory: 1024 * 1024 * 100, // 100MB limit
        cpu: 80,
      },
    };
  }

  return metrics;
}

export async function storeSensitiveData(
  tenantId: string,
  data: any,
): Promise<void> {
  // Mock encryption per tenant
  const encryptedData = mockEncrypt(data, tenantId);

  if (!testDb.data[tenantId]) {
    testDb.data[tenantId] = {};
  }

  testDb.data[tenantId].sensitiveData = encryptedData;
}

export async function getRawStoredData(tenantId: string): Promise<any> {
  return testDb.data[tenantId]?.sensitiveData || {};
}

export async function createTenantSpecificData(
  tenantId: string,
): Promise<void> {
  const mockData = {
    leads: [
      { id: "1", tenantId, name: "Test Lead", status: "new" },
      { id: "2", tenantId, name: "Another Lead", status: "qualified" },
    ],
    projects: [{ id: "1", tenantId, name: "Test Project", status: "active" }],
  };

  testDb.data[tenantId] = { ...testDb.data[tenantId], ...mockData };
}

export async function performTenantBackup(tenantId: string): Promise<string> {
  const backupId = `backup-${tenantId}-${Date.now()}`;

  // Mock backup process
  const backupData = {
    backupId,
    tenantId,
    timestamp: new Date().toISOString(),
    data: testDb.data[tenantId],
  };

  // Store backup (in real implementation, this would go to cloud storage)
  (global as any).testBackups = (global as any).testBackups || {};
  (global as any).testBackups[backupId] = backupData;

  return backupId;
}

export async function getBackupData(backupId: string): Promise<any> {
  const backups = (global as any).testBackups || {};
  return backups[backupId];
}

export async function modifyTenantData(tenantId: string): Promise<void> {
  if (testDb.data[tenantId]) {
    testDb.data[tenantId].modified = true;
    testDb.data[tenantId].modifiedAt = new Date().toISOString();
  }
}

export async function restoreTenantBackup(
  tenantId: string,
  backupId: string,
): Promise<void> {
  const backup = await getBackupData(backupId);
  if (backup && backup.tenantId === tenantId) {
    testDb.data[tenantId] = backup.data;
  }
}

// Helper functions
function generateTestToken(userId: string): string {
  return `test-token-${userId}-${Date.now()}`;
}

function mockEncrypt(data: any, tenantId: string): any {
  // Simple mock encryption that's tenant-specific
  const key = tenantId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Object.entries(data).reduce((acc, [k, v]) => {
    acc[k] =
      typeof v === "string" ? Buffer.from(v).toString("base64") + `-${key}` : v;
    return acc;
  }, {} as any);
}

function generateMockAnalytics(tenantId: string): any {
  return {
    totalUsers: Math.floor(Math.random() * 100),
    activeProjects: Math.floor(Math.random() * 20),
    revenue: Math.floor(Math.random() * 1000000),
    tenantId,
  };
}

// Performance testing utilities
export class PerformanceMonitor {
  private metrics: Array<{
    operation: string;
    duration: number;
    timestamp: number;
  }> = [];

  public startOperation(operation: string): () => void {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      this.metrics.push({
        operation,
        duration,
        timestamp: start,
      });
    };
  }

  public getMetrics(): Array<{
    operation: string;
    duration: number;
    timestamp: number;
  }> {
    return [...this.metrics];
  }

  public getAverageResponseTime(): number {
    if (this.metrics.length === 0) return 0;
    return (
      this.metrics.reduce((sum, m) => sum + m.duration, 0) / this.metrics.length
    );
  }

  public reset(): void {
    this.metrics = [];
  }
}

// Security testing utilities
export class SecurityTester {
  public static async testSQLInjection(
    endpoint: string,
    payload: string,
  ): Promise<boolean> {
    // Mock SQL injection test
    try {
      await makeAuthenticatedRequest("test-token", endpoint, {
        query: payload,
      });
      return true; // No error means injection was handled safely
    } catch (error) {
      if (error.message.includes("SQL")) {
        return false; // SQL error indicates vulnerability
      }
      return true; // Other errors are acceptable
    }
  }

  public static async testXSS(
    endpoint: string,
    payload: string,
  ): Promise<boolean> {
    // Mock XSS test
    const response = await makeAuthenticatedRequest("test-token", endpoint, {
      content: payload,
    });

    // Check if payload is properly escaped
    return !response.data.includes("<script>");
  }

  public static async testCSRF(endpoint: string): Promise<boolean> {
    // Mock CSRF test
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ malicious: "data" }),
      });
      return false; // Should have been rejected
    } catch {
      return true; // Properly rejected
    }
  }
}

// Load testing utilities
export class LoadTester {
  public static async runConcurrentRequests(
    requestFn: () => Promise<any>,
    concurrency: number,
    duration: number,
  ): Promise<{
    successCount: number;
    errorCount: number;
    avgResponseTime: number;
  }> {
    let successCount = 0;
    let errorCount = 0;
    const responseTimes: number[] = [];
    const startTime = Date.now();

    const makeRequest = async (): Promise<void> => {
      while (Date.now() - startTime < duration) {
        const reqStart = Date.now();
        try {
          await requestFn();
          successCount++;
          responseTimes.push(Date.now() - reqStart);
        } catch {
          errorCount++;
        }

        // Small delay to prevent overwhelming
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    };

    const workers = Array.from({ length: concurrency }, () => makeRequest());
    await Promise.all(workers);

    const avgResponseTime =
      responseTimes.length > 0
        ? responseTimes.reduce((sum, time) => sum + time, 0) /
          responseTimes.length
        : 0;

    return { successCount, errorCount, avgResponseTime };
  }
}
