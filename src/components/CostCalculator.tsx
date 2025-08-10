'use client';

import { useMemo, useState } from 'react';

type HostingModel = 'cloud' | 'onprem';
type SecurityTier = 'baseline' | 'enhanced' | 'regulated';

export default function CostCalculator() {
  const [numScreens, setNumScreens] = useState(12);
  const [numIntegrations, setNumIntegrations] = useState(2);
  const [hosting, setHosting] = useState<HostingModel>('cloud');
  const [security, setSecurity] = useState<SecurityTier>('regulated');
  const [hasMobile, setHasMobile] = useState(true);
  const [supportMonths, setSupportMonths] = useState(6);

  const estimate = useMemo(() => calculateEstimate({
    numScreens,
    numIntegrations,
    hosting,
    security,
    hasMobile,
    supportMonths,
  }), [numScreens, numIntegrations, hosting, security, hasMobile, supportMonths]);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">Software Cost Calculator</h3>
      <p className="mt-1 text-gray-600">Quick ballpark based on scope, integrations, security, and support.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <NumberField
          label="UI screens / pages"
          value={numScreens}
          min={1}
          max={200}
          onChange={setNumScreens}
        />

        <NumberField
          label="Integrations (EHR, payment, HL7/FHIR, etc.)"
          value={numIntegrations}
          min={0}
          max={25}
          onChange={setNumIntegrations}
        />

        <div>
          <Label>Hosting model</Label>
          <div className="mt-2 flex gap-3">
            <RadioButton
              name="hosting"
              checked={hosting === 'cloud'}
              onChange={() => setHosting('cloud')}
              label="Cloud (AWS/Azure/GCP)"
            />
            <RadioButton
              name="hosting"
              checked={hosting === 'onprem'}
              onChange={() => setHosting('onprem')}
              label="On‑premises"
            />
          </div>
        </div>

        <div>
          <Label>Security & compliance</Label>
          <div className="mt-2 flex flex-wrap gap-3">
            <RadioButton
              name="security"
              checked={security === 'baseline'}
              onChange={() => setSecurity('baseline')}
              label="Baseline"
            />
            <RadioButton
              name="security"
              checked={security === 'enhanced'}
              onChange={() => setSecurity('enhanced')}
              label="Enhanced"
            />
            <RadioButton
              name="security"
              checked={security === 'regulated'}
              onChange={() => setSecurity('regulated')}
              label="Regulated (HIPAA/GxP)"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input id="hasMobile" type="checkbox" className="h-4 w-4" checked={hasMobile} onChange={(e) => setHasMobile(e.target.checked)} />
          <label htmlFor="hasMobile" className="text-sm text-gray-700">Include mobile apps</label>
        </div>

        <NumberField
          label="Support & maintenance (months)"
          value={supportMonths}
          min={0}
          max={24}
          onChange={setSupportMonths}
        />
      </div>

      <hr className="my-6" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Kpi label="Build (one‑time)" value={formatCurrency(estimate.build)} />
        <Kpi label="Monthly run" value={formatCurrency(estimate.monthly)} />
        <Kpi label="12‑month TCO" value={formatCurrency(estimate.tco12)} />
      </div>

      <p className="mt-3 text-sm text-gray-500">This is a directional estimate. Actual scope and constraints can change costs. Contact us for a detailed proposal.</p>
    </div>
  );
}

function NumberField({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
}

function RadioButton({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-gray-800">{children}</div>;
}

function Kpi({ label, value }: { label: string; value: string }) {
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
  hasMobile,
  supportMonths,
}: {
  numScreens: number;
  numIntegrations: number;
  hosting: HostingModel;
  security: SecurityTier;
  hasMobile: boolean;
  supportMonths: number;
}) {
  // Base multipliers (tunable assumptions)
  const costPerScreen = 1800; // design + FE + QA per screen
  const costPerIntegration = 12000; // average per 3rd‑party integration
  const mobileMultiplier = hasMobile ? 1.6 : 1.0; // mobile effort multiplier

  const securityMultiplier = security === 'baseline' ? 1.0 : security === 'enhanced' ? 1.25 : 1.5;
  const hostingSetup = hosting === 'cloud' ? 8000 : 15000; // infra setup

  const build = Math.round(
    (numScreens * costPerScreen + numIntegrations * costPerIntegration + hostingSetup) *
      mobileMultiplier * securityMultiplier,
  );

  // Monthly run rates (ops, hosting, observability)
  const baseMonthly = hosting === 'cloud' ? 1800 : 3000;
  const integrationsMonthly = numIntegrations * 200;
  const securityMonthly = security === 'baseline' ? 400 : security === 'enhanced' ? 800 : 1200;
  const monthly = Math.round((baseMonthly + integrationsMonthly + securityMonthly) * (hasMobile ? 1.2 : 1.0));

  const supportMonthly = Math.round(build * 0.06); // 6% of build as support retainer
  const supportTotal = supportMonths * supportMonthly;

  const tco12 = build + monthly * 12 + supportTotal;

  return { build, monthly, tco12 };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}


