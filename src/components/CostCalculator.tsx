"use client";

import { useMemo, useState } from "react";
import type { JSX } from "react";

type HostingModel = "cloud" | "onprem" | "hybrid" | "multi-cloud";
type SecurityTier = "baseline" | "enhanced" | "regulated" | "enterprise" | "government";
type EnterpriseTier = "mid-market" | "enterprise" | "fortune-500" | "government";
type ArchitectureType =
  | "monolithic"
  | "microservices"
  | "event-driven"
  | "serverless"
  | "distributed";

export default function CostCalculator(): JSX.Element {
  const [numScreens, setNumScreens] = useState(12);
  const [numIntegrations, setNumIntegrations] = useState(2);
  const [hosting, setHosting] = useState<HostingModel>("cloud");
  const [security, setSecurity] = useState<SecurityTier>("regulated");
  const [enterpriseTier, setEnterpriseTier] = useState<EnterpriseTier>("enterprise");
  const [architecture, setArchitecture] = useState<ArchitectureType>("microservices");
  const [hasMobile, setHasMobile] = useState(true);
  const [hasWebApp, setHasWebApp] = useState(true);
  const [supportMonths, setSupportMonths] = useState(6);
  const [teamSize, setTeamSize] = useState(8);
  const [projectDuration, setProjectDuration] = useState(12);
  const [dataVolume, setDataVolume] = useState(1000);
  const [userCount, setUserCount] = useState(1000);
  const [complianceLevel, setComplianceLevel] = useState(3);
  const [aiFeatures, setAiFeatures] = useState(0);
  const [customizationLevel, setCustomizationLevel] = useState(2);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const estimate = useMemo(
    () =>
      calculateEstimate({
        numScreens,
        numIntegrations,
        hosting,
        security,
        enterpriseTier,
        architecture,
        hasMobile,
        hasWebApp,
        supportMonths,
        teamSize,
        projectDuration,
        dataVolume,
        userCount,
        complianceLevel,
        aiFeatures,
        customizationLevel,
      }),
    [
      numScreens,
      numIntegrations,
      hosting,
      security,
      enterpriseTier,
      architecture,
      hasMobile,
      hasWebApp,
      supportMonths,
      teamSize,
      projectDuration,
      dataVolume,
      userCount,
      complianceLevel,
      aiFeatures,
      customizationLevel,
    ],
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">Enterprise Software Cost Calculator</h3>
      <p className="mt-1 text-gray-600">
        Comprehensive cost estimation for enterprise software projects ($1M - $50M+ budgets)
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <NumberField
          label="UI screens / pages"
          value={numScreens}
          min={1}
          max={500}
          onChange={setNumScreens}
        />

        <NumberField
          label="Integrations (EHR, payment, HL7/FHIR, etc.)"
          value={numIntegrations}
          min={0}
          max={50}
          onChange={setNumIntegrations}
        />

        <div>
          <Label>Enterprise Tier</Label>
          <div className="mt-2 flex flex-wrap gap-3">
            <RadioButton
              name="enterpriseTier"
              checked={enterpriseTier === "mid-market"}
              onChange={() => setEnterpriseTier("mid-market")}
              label="Mid-Market ($1M-5M)"
            />
            <RadioButton
              name="enterpriseTier"
              checked={enterpriseTier === "enterprise"}
              onChange={() => setEnterpriseTier("enterprise")}
              label="Enterprise ($5M-15M)"
            />
            <RadioButton
              name="enterpriseTier"
              checked={enterpriseTier === "fortune-500"}
              onChange={() => setEnterpriseTier("fortune-500")}
              label="Fortune 500 ($15M-50M+)"
            />
            <RadioButton
              name="enterpriseTier"
              checked={enterpriseTier === "government"}
              onChange={() => setEnterpriseTier("government")}
              label="Government ($20M-100M+)"
            />
          </div>
        </div>

        <div>
          <Label>Architecture Type</Label>
          <div className="mt-2 flex flex-wrap gap-3">
            <RadioButton
              name="architecture"
              checked={architecture === "monolithic"}
              onChange={() => setArchitecture("monolithic")}
              label="Monolithic"
            />
            <RadioButton
              name="architecture"
              checked={architecture === "microservices"}
              onChange={() => setArchitecture("microservices")}
              label="Microservices"
            />
            <RadioButton
              name="architecture"
              checked={architecture === "event-driven"}
              onChange={() => setArchitecture("event-driven")}
              label="Event-Driven"
            />
            <RadioButton
              name="architecture"
              checked={architecture === "serverless"}
              onChange={() => setArchitecture("serverless")}
              label="Serverless"
            />
            <RadioButton
              name="architecture"
              checked={architecture === "distributed"}
              onChange={() => setArchitecture("distributed")}
              label="Distributed"
            />
          </div>
        </div>

        <div>
          <Label>Hosting model</Label>
          <div className="mt-2 flex flex-wrap gap-3">
            <RadioButton
              name="hosting"
              checked={hosting === "cloud"}
              onChange={() => setHosting("cloud")}
              label="Cloud (AWS/Azure/GCP)"
            />
            <RadioButton
              name="hosting"
              checked={hosting === "onprem"}
              onChange={() => setHosting("onprem")}
              label="On‑premises"
            />
            <RadioButton
              name="hosting"
              checked={hosting === "hybrid"}
              onChange={() => setHosting("hybrid")}
              label="Hybrid Cloud"
            />
            <RadioButton
              name="hosting"
              checked={hosting === "multi-cloud"}
              onChange={() => setHosting("multi-cloud")}
              label="Multi-Cloud"
            />
          </div>
        </div>

        <div>
          <Label>Security & compliance</Label>
          <div className="mt-2 flex flex-wrap gap-3">
            <RadioButton
              name="security"
              checked={security === "baseline"}
              onChange={() => setSecurity("baseline")}
              label="Baseline"
            />
            <RadioButton
              name="security"
              checked={security === "enhanced"}
              onChange={() => setSecurity("enhanced")}
              label="Enhanced"
            />
            <RadioButton
              name="security"
              checked={security === "regulated"}
              onChange={() => setSecurity("regulated")}
              label="Regulated (HIPAA/GxP)"
            />
            <RadioButton
              name="security"
              checked={security === "enterprise"}
              onChange={() => setSecurity("enterprise")}
              label="Enterprise (SOC2/ISO27001)"
            />
            <RadioButton
              name="security"
              checked={security === "government"}
              onChange={() => setSecurity("government")}
              label="Government (FedRAMP/IL5)"
            />
          </div>
        </div>

        <NumberField
          label="Team size (developers + architects)"
          value={teamSize}
          min={3}
          max={100}
          onChange={setTeamSize}
        />

        <NumberField
          label="Project duration (months)"
          value={projectDuration}
          min={6}
          max={48}
          onChange={setProjectDuration}
        />

        <NumberField
          label="Data volume (GB/month)"
          value={dataVolume}
          min={100}
          max={100000}
          onChange={setDataVolume}
        />

        <NumberField
          label="User count (concurrent)"
          value={userCount}
          min={100}
          max={100000}
          onChange={setUserCount}
        />

        <NumberField
          label="Compliance requirements (1-5 scale)"
          value={complianceLevel}
          min={1}
          max={5}
          onChange={setComplianceLevel}
        />

        <NumberField
          label="AI/ML features count"
          value={aiFeatures}
          min={0}
          max={20}
          onChange={setAiFeatures}
        />

        <NumberField
          label="Customization level (1-5 scale)"
          value={customizationLevel}
          min={1}
          max={5}
          onChange={setCustomizationLevel}
        />

        <div className="flex items-center gap-3">
          <input
            id="hasMobile"
            type="checkbox"
            className="h-4 w-4"
            checked={hasMobile}
            onChange={(e) => setHasMobile(e.target.checked)}
          />
          <label htmlFor="hasMobile" className="text-sm text-gray-700">
            Include mobile apps (iOS/Android)
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="hasWebApp"
            type="checkbox"
            className="h-4 w-4"
            checked={hasWebApp}
            onChange={(e) => setHasWebApp(e.target.checked)}
          />
          <label htmlFor="hasWebApp" className="text-sm text-gray-700">
            Include web application
          </label>
        </div>

        <NumberField
          label="Support & maintenance (months)"
          value={supportMonths}
          min={0}
          max={60}
          onChange={setSupportMonths}
        />
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Options
        </button>
      </div>

      {showAdvanced && (
        <div className="mt-4 rounded-lg border bg-gray-50 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Advanced Enterprise Features</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="text-sm text-gray-600">
              <p>
                <strong>Architecture Complexity:</strong> {getArchitectureComplexity(architecture)}
              </p>
              <p>
                <strong>Security Overhead:</strong> {getSecurityOverhead(security)}
              </p>
              <p>
                <strong>Compliance Burden:</strong> {getComplianceBurden(complianceLevel)}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Team Scaling Factor:</strong> {getTeamScalingFactor(teamSize)}
              </p>
              <p>
                <strong>Data Processing Cost:</strong>{" "}
                {formatCurrency(getDataProcessingCost(dataVolume))}/month
              </p>
              <p>
                <strong>AI/ML Infrastructure:</strong>{" "}
                {formatCurrency(getAiInfrastructureCost(aiFeatures))}/month
              </p>
            </div>
          </div>
        </div>
      )}

      <hr className="my-6" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Kpi label="Development Cost" value={formatCurrency(estimate.build)} />
        <Kpi label="Monthly Operations" value={formatCurrency(estimate.monthly)} />
        <Kpi label="12-Month TCO" value={formatCurrency(estimate.tco12)} />
        <Kpi label="5-Year TCO" value={formatCurrency(estimate.tco60)} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Kpi label="Cost per User/Month" value={formatCurrency(estimate.costPerUser)} />
        <Kpi label="Cost per Screen" value={formatCurrency(estimate.costPerScreen)} />
        <Kpi label="ROI Timeline" value={`${estimate.roiMonths} months`} />
      </div>

      <div className="mt-6 rounded-lg border bg-blue-50 p-4">
        <h4 className="font-medium text-blue-900 mb-2">Enterprise Value Propositions</h4>
        <div className="text-sm text-blue-800">
          <p>
            • <strong>Scalability:</strong> Built for {userCount.toLocaleString()}+ concurrent users
          </p>
          <p>
            • <strong>Compliance:</strong> {getComplianceDescription(complianceLevel)}
          </p>
          <p>
            • <strong>Architecture:</strong> {getArchitectureDescription(architecture)}
          </p>
          <p>
            • <strong>Security:</strong> {getSecurityDescription(security)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        This is a comprehensive enterprise estimate. Actual costs may vary based on specific
        requirements, team composition, and market conditions. Contact us for a detailed technical
        proposal and ROI analysis.
      </p>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
  id,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  id?: string;
}): JSX.Element {
  const inputId =
    id ??
    `number-${label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;
  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        id={inputId}
        type="number"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => {
          const next = Number.parseInt(e.target.value, 10);
          if (Number.isNaN(next)) {
            onChange(min);
            return;
          }
          const clamped = Math.max(min, Math.min(max, next));
          onChange(clamped);
        }}
        className="mt-2 w-full rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
}

function RadioButton({
  name,
  checked,
  onChange,
  label,
}: { name: string; checked: boolean; onChange: () => void; label: string }): JSX.Element {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}

function Label({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="text-sm font-medium text-gray-800">{children}</div>;
}

function Kpi({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <div className="text-xs font-medium text-gray-600">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function calculateEstimate({
  numScreens,
  numIntegrations,
  hosting,
  security,
  enterpriseTier,
  architecture,
  hasMobile,
  hasWebApp,
  supportMonths,
  teamSize,
  projectDuration,
  dataVolume,
  userCount,
  complianceLevel,
  aiFeatures,
  customizationLevel,
}: {
  numScreens: number;
  numIntegrations: number;
  hosting: HostingModel;
  security: SecurityTier;
  enterpriseTier: EnterpriseTier;
  architecture: ArchitectureType;
  hasMobile: boolean;
  hasWebApp: boolean;
  supportMonths: number;
  teamSize: number;
  projectDuration: number;
  dataVolume: number;
  userCount: number;
  complianceLevel: number;
  aiFeatures: number;
  customizationLevel: number;
}): {
  build: number;
  monthly: number;
  tco12: number;
  tco60: number;
  costPerUser: number;
  costPerScreen: number;
  roiMonths: number;
} {
  // Enterprise tier multipliers
  const enterpriseMultiplier =
    enterpriseTier === "mid-market"
      ? 1.0
      : enterpriseTier === "enterprise"
        ? 1.4
        : enterpriseTier === "fortune-500"
          ? 2.0
          : enterpriseTier === "government"
            ? 2.5
            : 1.0;

  // Architecture complexity multipliers
  const architectureMultiplier =
    architecture === "monolithic"
      ? 1.0
      : architecture === "microservices"
        ? 1.3
        : architecture === "event-driven"
          ? 1.4
          : architecture === "serverless"
            ? 1.2
            : architecture === "distributed"
              ? 1.6
              : 1.0;

  // Enhanced base calculations
  const baseCostPerScreen = 2500 + customizationLevel * 500; // Enhanced per-screen cost
  const costPerIntegration = 15000 + complianceLevel * 5000; // Compliance-aware integration cost
  const mobileMultiplier = hasMobile ? 1.8 : 1.0;
  const webAppMultiplier = hasWebApp ? 1.0 : 0.8;

  // Security multipliers
  const securityMultiplier =
    security === "baseline"
      ? 1.0
      : security === "enhanced"
        ? 1.3
        : security === "regulated"
          ? 1.6
          : security === "enterprise"
            ? 2.0
            : security === "government"
              ? 2.5
              : 1.0;

  // Hosting setup costs
  const hostingSetup =
    hosting === "cloud"
      ? 15000
      : hosting === "onprem"
        ? 25000
        : hosting === "hybrid"
          ? 35000
          : hosting === "multi-cloud"
            ? 45000
            : 15000;

  // Team scaling factor
  const teamScalingFactor = teamSize ** 0.8; // Diminishing returns for large teams

  // AI/ML infrastructure costs
  const aiInfrastructureCost = aiFeatures * 5000;

  // Data processing costs
  const dataProcessingCost = (dataVolume / 1000) ** 0.8 * 2000;

  // Base build calculation
  const baseBuild =
    (numScreens * baseCostPerScreen +
      numIntegrations * costPerIntegration +
      hostingSetup +
      aiInfrastructureCost) *
    mobileMultiplier *
    webAppMultiplier *
    securityMultiplier *
    architectureMultiplier *
    enterpriseMultiplier;

  // Team efficiency factor
  const teamEfficiencyFactor = Math.min(teamScalingFactor / 8, 2.0); // Normalize to 8-person team
  const build = Math.round(baseBuild * teamEfficiencyFactor);

  // Monthly operational costs
  const baseMonthly =
    hosting === "cloud"
      ? 3000
      : hosting === "onprem"
        ? 5000
        : hosting === "hybrid"
          ? 6000
          : hosting === "multi-cloud"
            ? 8000
            : 3000;

  const integrationsMonthly = numIntegrations * 300;
  const securityMonthly =
    security === "baseline"
      ? 800
      : security === "enhanced"
        ? 1500
        : security === "regulated"
          ? 2500
          : security === "enterprise"
            ? 4000
            : security === "government"
              ? 6000
              : 800;

  const monthly = Math.round(
    (baseMonthly + integrationsMonthly + securityMonthly + dataProcessingCost) *
      (hasMobile ? 1.3 : 1.0) *
      enterpriseMultiplier,
  );

  // Support costs (enterprise rates)
  const supportMonthly = Math.round(build * 0.08); // 8% of build as enterprise support
  const supportTotal = supportMonths * supportMonthly;

  const tco12 = build + monthly * 12 + supportTotal;
  const tco60 = build + monthly * 60 + supportTotal * 5;

  // Cost metrics
  const costPerUser = Math.round(monthly / userCount);
  const costPerScreen = Math.round(build / numScreens);

  // ROI calculation (simplified)
  const roiMonths = Math.round(build / (monthly * 0.3)); // Assuming 30% monthly savings

  return {
    build,
    monthly,
    tco12,
    tco60,
    costPerUser,
    costPerScreen,
    roiMonths,
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getArchitectureComplexity(architecture: ArchitectureType): string {
  switch (architecture) {
    case "monolithic":
      return "Low - Simple deployment and maintenance";
    case "microservices":
      return "Medium - Modular and scalable";
    case "event-driven":
      return "Medium-High - Complex event handling";
    case "serverless":
      return "Medium - Auto-scaling with vendor lock-in";
    case "distributed":
      return "High - Complex distributed system";
    default:
      return "Unknown";
  }
}

function getSecurityOverhead(security: SecurityTier): string {
  switch (security) {
    case "baseline":
      return "5-10% additional development time";
    case "enhanced":
      return "15-25% additional development time";
    case "regulated":
      return "30-40% additional development time";
    case "enterprise":
      return "45-60% additional development time";
    case "government":
      return "70-100% additional development time";
    default:
      return "Unknown";
  }
}

function getComplianceBurden(level: number): string {
  switch (level) {
    case 1:
      return "Minimal - Basic security practices";
    case 2:
      return "Low - Industry standard compliance";
    case 3:
      return "Medium - Regulatory compliance (HIPAA, SOC2)";
    case 4:
      return "High - Multi-regulatory compliance";
    case 5:
      return "Very High - Government-level compliance";
    default:
      return "Unknown";
  }
}

function getTeamScalingFactor(teamSize: number): string {
  if (teamSize <= 8) return "Optimal - High efficiency";
  if (teamSize <= 15) return "Good - Manageable coordination";
  if (teamSize <= 25) return "Moderate - Coordination overhead";
  if (teamSize <= 50) return "High - Significant overhead";
  return "Very High - Consider breaking into smaller teams";
}

function getDataProcessingCost(dataVolume: number): number {
  return (dataVolume / 1000) ** 0.8 * 2000;
}

function getAiInfrastructureCost(aiFeatures: number): number {
  return aiFeatures * 5000;
}

function getComplianceDescription(level: number): string {
  switch (level) {
    case 1:
      return "Basic security standards";
    case 2:
      return "Industry best practices";
    case 3:
      return "HIPAA, SOC2, ISO27001";
    case 4:
      return "Multi-regulatory framework";
    case 5:
      return "Government-grade security";
    default:
      return "Unknown";
  }
}

function getArchitectureDescription(architecture: ArchitectureType): string {
  switch (architecture) {
    case "monolithic":
      return "Single application deployment";
    case "microservices":
      return "Modular service architecture";
    case "event-driven":
      return "Asynchronous event processing";
    case "serverless":
      return "Auto-scaling cloud functions";
    case "distributed":
      return "Multi-node distributed system";
    default:
      return "Unknown";
  }
}

function getSecurityDescription(security: SecurityTier): string {
  switch (security) {
    case "baseline":
      return "Standard security practices";
    case "enhanced":
      return "Advanced security measures";
    case "regulated":
      return "HIPAA/GxP compliance";
    case "enterprise":
      return "Enterprise security framework";
    case "government":
      return "Government security standards";
    default:
      return "Unknown";
  }
}
