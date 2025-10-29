-- Eco Hub Database Schema
-- This file contains the complete database schema for the Eco Hub application

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS dashboard_metrics CASCADE;
DROP TABLE IF EXISTS energy_listings CASCADE;

-- Energy Listings Table
-- Stores all renewable energy supply listings from suppliers
CREATE TABLE energy_listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    energy_type VARCHAR(50) NOT NULL CHECK (energy_type IN ('Solar', 'Wind', 'Hydro', 'Biomass', 'Geothermal')),
    quantity_kwh INTEGER NOT NULL CHECK (quantity_kwh > 0),
    price_per_kwh DECIMAL(10,2) NOT NULL CHECK (price_per_kwh > 0),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    location VARCHAR(255) NOT NULL,
    seller_account VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dashboard Metrics Table
-- Stores AI insights and dashboard metrics
CREATE TABLE dashboard_metrics (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL UNIQUE,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_unit VARCHAR(20) NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Predictions Table
-- Stores AI-generated performance predictions
CREATE TABLE performance_predictions (
    id SERIAL PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    consumption_forecast DECIMAL(10,2) NOT NULL,
    renewable_generation DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_energy_listings_status ON energy_listings(status);
CREATE INDEX idx_energy_listings_energy_type ON energy_listings(energy_type);
CREATE INDEX idx_energy_listings_created_at ON energy_listings(created_at);
CREATE INDEX idx_dashboard_metrics_name ON dashboard_metrics(metric_name);

-- Insert initial dashboard metrics
INSERT INTO dashboard_metrics (metric_name, metric_value, metric_unit, description) VALUES
('co2_savings', 1500, 'kg', 'Total CO₂ emissions saved'),
('energy_saved', 2500, 'kWh', 'Total energy saved'),
('energy_bought', 1800, 'kWh', 'Total energy purchased'),
('active_community_members', 156, 'count', 'Number of active community members'),
('households_powered', 89, 'count', 'Households powered by clean energy'),
('environmental_impact_trees', 105, 'trees', 'Equivalent trees planted');

-- Insert sample energy listings
INSERT INTO energy_listings (title, energy_type, quantity_kwh, price_per_kwh, status, location, seller_account, description) VALUES
('I have 10KWh to sell daily', 'Solar', 500, 0.12, 'inactive', 'Plantinum Sqr Road', 'john.doe@email.com', 'Daily solar surplus available'),
('Solar Energy Surplus', 'Solar', 500, 0.12, 'active', 'Tatu city Kiambu', 'jane.smith@email.com', 'Regular solar energy surplus'),
('Wind Power Available', 'Wind', 750, 0.15, 'active', 'Ngong Hills Nairobi', 'wind.farm@email.com', 'Consistent wind power generation'),
('Hydroelectric Excess', 'Hydro', 1200, 0.10, 'active', 'Tana River Basin', 'hydro.kenya@email.com', 'Excess hydroelectric power'),
('Biomass Energy Supply', 'Biomass', 300, 0.18, 'inactive', 'Kakamega County', 'bio.energy@email.com', 'Biomass energy from agricultural waste');

-- Insert sample performance predictions
INSERT INTO performance_predictions (month, consumption_forecast, renewable_generation) VALUES
('Jan', 1200, 1500),
('Feb', 1350, 1650),
('Mar', 1500, 1800),
('Apr', 1650, 1950),
('May', 1800, 2100),
('Jun', 1950, 2250);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_energy_listings_updated_at 
    BEFORE UPDATE ON energy_listings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_metrics_updated_at 
    BEFORE UPDATE ON dashboard_metrics 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;



