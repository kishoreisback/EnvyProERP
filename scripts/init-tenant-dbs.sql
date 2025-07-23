-- Multi-Tenant Database Initialization Script
-- This script sets up the database schema for BuildPro ERP multi-tenant architecture

-- Create main application database if not exists
CREATE DATABASE IF NOT EXISTS buildpro_main;

-- Create individual tenant databases
CREATE DATABASE IF NOT EXISTS buildpro_buildcorp;
CREATE DATABASE IF NOT EXISTS buildpro_metrorealty;
CREATE DATABASE IF NOT EXISTS buildpro_skyline;
CREATE DATABASE IF NOT EXISTS buildpro_techcorp;

-- Create test databases
CREATE DATABASE IF NOT EXISTS buildpro_buildcorp_test;
CREATE DATABASE IF NOT EXISTS buildpro_metrorealty_test;
CREATE DATABASE IF NOT EXISTS buildpro_skyline_test;
CREATE DATABASE IF NOT EXISTS buildpro_techcorp_test;

-- Connect to main database
\c buildpro_main;

-- Create tenant management tables
CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    tier VARCHAR(20) DEFAULT 'basic',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    -- Contact Information
    primary_contact_name VARCHAR(255),
    primary_contact_email VARCHAR(255),
    primary_contact_phone VARCHAR(50),
    primary_contact_role VARCHAR(100),
    
    -- Company Details
    company_name VARCHAR(255),
    company_industry VARCHAR(100),
    company_size VARCHAR(20),
    company_address_street TEXT,
    company_address_city VARCHAR(100),
    company_address_state VARCHAR(100),
    company_address_country VARCHAR(100),
    company_address_zip VARCHAR(20),
    company_website VARCHAR(255),
    company_description TEXT,
    
    -- Configuration
    config JSONB DEFAULT '{}',
    
    -- Usage & Limits
    usage JSONB DEFAULT '{}',
    limits JSONB DEFAULT '{}',
    
    -- Features & Permissions
    features JSONB DEFAULT '{}',
    
    -- Branding
    branding JSONB DEFAULT '{}',
    
    -- Security Settings
    security JSONB DEFAULT '{}',
    
    -- Analytics
    analytics JSONB DEFAULT '{}'
);

-- Create audit trail table
CREATE TABLE IF NOT EXISTS audit_events (
    id VARCHAR(100) PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    tenant_id VARCHAR(50) REFERENCES tenants(id),
    user_id VARCHAR(100),
    session_id VARCHAR(100),
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    method VARCHAR(10) NOT NULL,
    endpoint TEXT NOT NULL,
    user_agent TEXT,
    ip_address INET,
    request_data JSONB,
    response_status INTEGER,
    duration INTEGER,
    changes JSONB,
    metadata JSONB,
    compliance JSONB,
    risk_level VARCHAR(20),
    INDEX idx_audit_tenant_id (tenant_id),
    INDEX idx_audit_timestamp (timestamp),
    INDEX idx_audit_user_id (user_id),
    INDEX idx_audit_risk_level (risk_level)
);

-- Create metrics table
CREATE TABLE IF NOT EXISTS tenant_metrics (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) REFERENCES tenants(id),
    metric_date DATE NOT NULL,
    metrics JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_metrics_tenant_date (tenant_id, metric_date)
);

-- Create compliance tracking table
CREATE TABLE IF NOT EXISTS compliance_assessments (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) REFERENCES tenants(id),
    framework VARCHAR(50) NOT NULL,
    assessment_date DATE NOT NULL,
    score INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    requirements JSONB NOT NULL,
    evidence JSONB,
    assessor VARCHAR(255),
    next_assessment DATE,
    certification_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_compliance_tenant_framework (tenant_id, framework)
);

-- Insert initial tenant data
INSERT INTO tenants (
    id, name, subdomain, tier, status,
    primary_contact_name, primary_contact_email,
    company_name, company_industry, company_size,
    features, limits
) VALUES 
(
    'tenant_buildcorp',
    'BuildCorp Constructions',
    'buildcorp',
    'enterprise',
    'active',
    'John Smith',
    'john.smith@buildcorp.com',
    'BuildCorp Constructions Ltd.',
    'construction',
    'large',
    '{"projectManagement": true, "crm": true, "hrms": true, "accounting": true, "aiAgents": true, "sso": true, "customBranding": true}',
    '{"users": -1, "projects": -1, "storage": -1}'
),
(
    'tenant_metrorealty',
    'Metro Realty Group',
    'metrorealty',
    'professional',
    'active',
    'Sarah Johnson',
    'sarah.johnson@metrorealty.com',
    'Metro Realty Group Inc.',
    'real_estate',
    'medium',
    '{"projectManagement": true, "crm": true, "hrms": true, "accounting": true, "aiAgents": true, "sso": false, "customBranding": false}',
    '{"users": 50, "projects": 25, "storage": 10240}'
),
(
    'tenant_skyline',
    'Skyline Developers',
    'skyline',
    'basic',
    'active',
    'Mike Davis',
    'mike.davis@skyline.com',
    'Skyline Developers LLC',
    'construction',
    'small',
    '{"projectManagement": true, "crm": true, "hrms": false, "accounting": false, "aiAgents": false, "sso": false, "customBranding": false}',
    '{"users": 10, "projects": 5, "storage": 1024}'
),
(
    'tenant_techcorp',
    'TechCorp Solutions',
    'techcorp',
    'enterprise',
    'active',
    'Emily Chen',
    'emily.chen@techcorp.com',
    'TechCorp Solutions Ltd.',
    'technology',
    'large',
    '{"projectManagement": true, "crm": true, "hrms": true, "accounting": true, "aiAgents": true, "sso": true, "customBranding": true}',
    '{"users": -1, "projects": -1, "storage": -1}'
);

-- Create functions for tenant data isolation
CREATE OR REPLACE FUNCTION ensure_tenant_isolation()
RETURNS trigger AS $$
BEGIN
    -- Ensure tenant_id is set for all operations
    IF NEW.tenant_id IS NULL THEN
        RAISE EXCEPTION 'tenant_id cannot be null';
    END IF;
    
    -- Add timestamp
    NEW.updated_at = CURRENT_TIMESTAMP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create tenant-specific schemas and tables for each tenant
DO $$
DECLARE
    tenant_record RECORD;
    schema_name TEXT;
BEGIN
    FOR tenant_record IN SELECT id FROM tenants LOOP
        schema_name := 'tenant_' || tenant_record.id;
        
        -- Create schema for tenant
        EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || quote_ident(schema_name);
        
        -- Create tenant-specific tables
        EXECUTE format('
            CREATE TABLE IF NOT EXISTS %I.leads (
                id SERIAL PRIMARY KEY,
                tenant_id VARCHAR(50) DEFAULT %L,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(50),
                status VARCHAR(50) DEFAULT ''new'',
                source VARCHAR(100),
                assigned_to VARCHAR(100),
                expected_value DECIMAL(15,2),
                probability INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )', schema_name || '.leads', tenant_record.id);
            
        EXECUTE format('
            CREATE TABLE IF NOT EXISTS %I.customers (
                id SERIAL PRIMARY KEY,
                tenant_id VARCHAR(50) DEFAULT %L,
                company_name VARCHAR(255),
                contact_name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(50),
                address TEXT,
                status VARCHAR(50) DEFAULT ''active'',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )', schema_name || '.customers', tenant_record.id);
            
        EXECUTE format('
            CREATE TABLE IF NOT EXISTS %I.projects (
                id SERIAL PRIMARY KEY,
                tenant_id VARCHAR(50) DEFAULT %L,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(50) DEFAULT ''planning'',
                start_date DATE,
                end_date DATE,
                budget DECIMAL(15,2),
                project_manager VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )', schema_name || '.projects', tenant_record.id);
            
        EXECUTE format('
            CREATE TABLE IF NOT EXISTS %I.financial_accounts (
                id SERIAL PRIMARY KEY,
                tenant_id VARCHAR(50) DEFAULT %L,
                account_code VARCHAR(50) NOT NULL,
                account_name VARCHAR(255) NOT NULL,
                account_type VARCHAR(50) NOT NULL,
                parent_account_id INTEGER,
                opening_balance DECIMAL(15,2) DEFAULT 0,
                currency VARCHAR(3) DEFAULT ''INR'',
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )', schema_name || '.financial_accounts', tenant_record.id);
            
        EXECUTE format('
            CREATE TABLE IF NOT EXISTS %I.transactions (
                id SERIAL PRIMARY KEY,
                tenant_id VARCHAR(50) DEFAULT %L,
                transaction_date DATE NOT NULL,
                transaction_type VARCHAR(50) NOT NULL,
                reference VARCHAR(100),
                description TEXT,
                total_amount DECIMAL(15,2) NOT NULL,
                status VARCHAR(50) DEFAULT ''draft'',
                created_by VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )', schema_name || '.transactions', tenant_record.id);
    END LOOP;
END $$;

-- Create Row Level Security policies
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for tenant isolation
CREATE POLICY tenant_isolation_policy ON audit_events
    FOR ALL TO PUBLIC
    USING (tenant_id = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_metrics_policy ON tenant_metrics
    FOR ALL TO PUBLIC
    USING (tenant_id = current_setting('app.current_tenant_id', true));

CREATE POLICY compliance_policy ON compliance_assessments
    FOR ALL TO PUBLIC
    USING (tenant_id = current_setting('app.current_tenant_id', true));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);
CREATE INDEX IF NOT EXISTS idx_audit_events_tenant_timestamp ON audit_events(tenant_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_tenant_metrics_date ON tenant_metrics(tenant_id, metric_date DESC);

-- Create views for reporting
CREATE OR REPLACE VIEW tenant_summary AS
SELECT 
    t.id,
    t.name,
    t.tier,
    t.status,
    t.created_at,
    COUNT(ae.id) as total_audit_events,
    COUNT(CASE WHEN ae.risk_level = 'HIGH' OR ae.risk_level = 'CRITICAL' THEN 1 END) as high_risk_events,
    MAX(ae.timestamp) as last_activity
FROM tenants t
LEFT JOIN audit_events ae ON t.id = ae.tenant_id
GROUP BY t.id, t.name, t.tier, t.status, t.created_at;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO PUBLIC;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO PUBLIC;

-- Set up automated cleanup job (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-old-audit-logs', '0 2 * * 0', 
--     'DELETE FROM audit_events WHERE timestamp < NOW() - INTERVAL ''90 days''');
