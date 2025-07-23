import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { initializeLogger, getLogger } from "./utils/logger";
import {
  metricsMiddleware,
  handleMetricsRequest,
  handleTenantMetricsRequest,
  handleSystemHealthRequest,
  handleBusinessMetricsRequest,
} from "./middleware/metrics";
import {
  auditMiddleware,
  handleAuditEventsRequest,
  handleComplianceReportRequest,
} from "./middleware/audit";

// Initialize logger
const logger = initializeLogger({
  level: "INFO",
  enableConsole: true,
  enableFile: true,
  enableRemote: process.env.REMOTE_LOGGING_ENDPOINT ? true : false,
  remoteEndpoint: process.env.REMOTE_LOGGING_ENDPOINT,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  retentionDays: 90,
  tenantContext: {
    tenantId: "system",
    tenantName: "BuildPro ERP System",
    environment: process.env.NODE_ENV || "development",
    tier: "system",
  },
});

export function createServer() {
  const app = express();

  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "ws:", "wss:"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  // CORS configuration
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS?.split(",") || [
        "http://localhost:5173",
        "http://localhost:3000",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Tenant-ID",
        "X-User-ID",
        "X-Session-ID",
      ],
    }),
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn("RATE_LIMIT", "Rate limit exceeded", {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        url: req.url,
      });
      res.status(429).json({ error: "Rate limit exceeded" });
    },
  });
  app.use(limiter);

  // Body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Custom middleware
  app.use(metricsMiddleware);
  app.use(auditMiddleware);

  // Health check endpoint
  app.get("/health", (req, res) => {
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
    };

    logger.info("HEALTH_CHECK", "Health check requested", health);
    res.json(health);
  });

  // Metrics endpoints
  app.get("/metrics", handleMetricsRequest);
  app.get("/api/metrics/tenants/:tenantId", handleTenantMetricsRequest);
  app.get("/api/metrics/tenants", handleTenantMetricsRequest);
  app.get("/api/metrics/system", handleSystemHealthRequest);
  app.get("/api/metrics/business", handleBusinessMetricsRequest);

  // Audit endpoints
  app.get("/api/audit/events", handleAuditEventsRequest);
  app.get("/api/audit/compliance/:tenantId", handleComplianceReportRequest);
  app.get("/api/audit/compliance", handleComplianceReportRequest);

  // Logging endpoint for client-side logs
  app.post("/api/logs", (req, res) => {
    try {
      const { logs, clientInfo } = req.body;

      for (const log of logs) {
        logger.log(log.level, `CLIENT_${log.component}`, log.message, {
          ...log.metadata,
          clientInfo,
          userAgent: req.get("User-Agent"),
          ip: req.ip,
        });
      }

      res.json({ success: true, count: logs.length });
    } catch (error) {
      logger.error(
        "CLIENT_LOGGING",
        "Failed to process client logs",
        error as Error,
      );
      res.status(500).json({ error: "Failed to process logs" });
    }
  });

  // Demo API endpoints (existing)
  app.get("/api/ping", (req, res) => {
    logger.info("API", "Ping endpoint called");
    res.json({ message: "pong", timestamp: new Date().toISOString() });
  });

  app.get("/api/demo", (req, res) => {
    logger.info("API", "Demo endpoint called");
    res.json({
      message: "Hello from the demo API!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  // Error handling middleware
  app.use(
    (
      error: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      logger.error("SERVER_ERROR", error.message, error, {
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
      });

      if (res.headersSent) {
        return next(error);
      }

      const isDevelopment = process.env.NODE_ENV === "development";
      res.status(500).json({
        error: "Internal Server Error",
        message: isDevelopment ? error.message : "Something went wrong",
        timestamp: new Date().toISOString(),
        ...(isDevelopment && { stack: error.stack }),
      });
    },
  );

  // In production, serve static files from the Vite build output
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    app.use(express.static("dist/spa"));
  }

  // Catch-all handler for client-side routing
  app.get("*", (req, res) => {
    // Skip API routes
    if (
      req.path.startsWith("/api/") ||
      req.path.startsWith("/health") ||
      req.path.startsWith("/metrics")
    ) {
      logger.warn("NOT_FOUND", `Route not found: ${req.method} ${req.url}`, {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
      });

      res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.url} not found`,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // In development, let Vite handle client-side routing
    // In production, serve the React app for all other routes
    if (isProduction) {
      res.sendFile("dist/spa/index.html", { root: process.cwd() });
    } else {
      // In development mode, don't handle client routes here - let Vite handle them
      res.status(404).json({
        error: "Not Found",
        message: "Route not found in development mode",
        timestamp: new Date().toISOString(),
      });
    }
  });

  return app;
}

// Graceful shutdown handling
process.on("SIGTERM", () => {
  logger.info("SERVER", "SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SERVER", "SIGINT received, shutting down gracefully");
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  logger.fatal("SERVER", "Uncaught exception", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.fatal("SERVER", "Unhandled rejection", new Error(String(reason)), {
    promise: promise.toString(),
  });
  process.exit(1);
});

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    logger.info("SERVER", `Server started on port ${port}`, {
      port,
      environment: process.env.NODE_ENV || "development",
      nodeVersion: process.version,
    });
  });
}
