'use client';

import Image from 'next/image';
import React, {
  ComponentPropsWithoutRef,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore
} from 'react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CheckCheck,
  CheckCircle2,
  Clock,
  Command,
  Copy,
  CornerDownLeft,
  CreditCard,
  Database,
  Eye,
  FileText,
  Globe,
  Layers,
  Lock,
  type LucideIcon,
  Mail,
  MapPin,
  Moon,
  Play,
  Printer,
  RotateCcw,
  Search,
  Send,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  UserCheck,
  Wallet,
  Workflow,
  X
} from 'lucide-react';
import portrait from '../../public/Freedom_Pic.jpg';

function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type ProjectId = 'swiftdrop' | 'northbridge' | 'aura' | 'nairova';
type ProjectMode = 'impact' | 'architecture' | 'simulation';
type Theme = 'dark' | 'light';
type RoleId = 'Customer' | 'Rider' | 'Admin';

interface ProjectMetric {
  value: string;
  label: string;
}

interface FlowNode {
  node: string;
  detail: string;
  tag: string;
}

interface SimulationStep {
  stage: string;
  status: string;
  detail: string;
}

interface Project {
  id: ProjectId;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  domain: string;
  liveUrl: string | null;
  repoUrl: string;
  summary: string;
  metrics: ProjectMetric[];
  highlights: string[];
  architecture: {
    pattern: string;
    database: string;
    auth: string;
    flow: FlowNode[];
    simulationSteps: SimulationStep[];
    codeSnippet: string;
  };
  stack: string[];
}

interface KpiMetric {
  numeric: number;
  prefix: string;
  suffix: string;
  label: string;
}

interface SandboxRole {
  id: RoleId;
  userId: string;
  tenantId: string;
  scopes: string[];
}

interface SandboxEndpoint {
  id: string;
  method: string;
  path: string;
  requiredScope: string;
  description: string;
  sqlGuard: string;
  successResponse: {
    status: number;
    statusText: string;
    tag: string;
    body: Record<string, string | number | boolean>;
  };
  deniedResponse: {
    status: number;
    statusText: string;
    tag: string;
    body: Record<string, string | number | boolean>;
  };
}

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
}

interface DeliveryStep {
  step: string;
  title: string;
  detail: string;
}

interface CommandAction {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon | typeof GithubIcon;
  action: () => void;
}

// ============================================================================
// 1. SHIPPED ENGINEERING PROJECTS (VERIFIED AGAINST REPOS & READMES)
// ============================================================================
const PROJECTS: Project[] = [
  {
    id: 'swiftdrop',
    index: '01',
    title: 'SwiftDrop',
    subtitle: 'Multi-Role Logistics & Delivery Platform',
    category: 'Multi-Role & RBAC',
    badge: '• LIVE ON VERCEL',
    domain: 'swiftdrop-liart.vercel.app',
    liveUrl: 'https://swiftdrop-liart.vercel.app',
    repoUrl: 'https://github.com/Devfreedom/swiftdrop',
    summary:
      'Full-stack delivery-management platform separating Customer, Rider, and Admin workflows with explicit state progression, admin-confirmed cash settlement, and public aggregate fleet stats.',
    metrics: [
      { value: '3', label: 'Distinct User Roles' },
      { value: '5-Stage', label: 'Delivery Lifecycle' },
      { value: '60s', label: 'Cached Public /api/stats' }
    ],
    highlights: [
      'Built separate Customer, Rider, and Admin flows where new rider accounts start INACTIVE until approved by an Admin.',
      'Exposed unauthenticated GET /api/stats returning aggregate delivery and rider counts (cached in memory for 60s) with no PII.',
      'Separated instant CARD/TRANSFER payments from CASH payments that stay PENDING until confirmed by an Admin before rider assignment.'
    ],
    architecture: {
      pattern: 'React + Vite SPA → Express REST API',
      database: 'PostgreSQL + Sequelize ORM (Migrations & Seeders)',
      auth: 'JWT Authentication + Role-Scoped Guards',
      flow: [
        { node: 'Client Portal', detail: 'Customer / Rider / Admin Views', tag: 'UI' },
        { node: 'Role Middleware', detail: 'JWT & Role Assertion', tag: 'RBAC' },
        { node: 'Delivery Lifecycle', detail: 'Pending → Assigned → Transit → Delivered', tag: 'STATE' },
        { node: 'PostgreSQL', detail: 'Sequelize Models & Migrations', tag: 'DB' }
      ],
      simulationSteps: [
        {
          stage: 'POST /api/deliveries',
          status: '201 CREATED',
          detail: 'Customer creates delivery; cash payment stays PENDING until admin confirmation'
        },
        {
          stage: 'Admin::confirmAndAssign',
          status: 'VERIFIED',
          detail: 'Admin confirms cash payment and assigns an approved ACTIVE rider'
        },
        {
          stage: 'Middleware::verifyRole("RIDER")',
          status: 'AUTHORIZED',
          detail: 'Assigned rider picks up parcel and advances status to IN_TRANSIT'
        },
        {
          stage: 'PATCH Delivery → DELIVERED',
          status: '200 OK',
          detail: 'PostgreSQL updated and aggregate counts reflected in /api/stats'
        }
      ],
      codeSnippet: `// Illustrative pattern — role-scoped delivery state transition (Express + Sequelize)
export const advanceDeliveryState = async (req, res) => {
  const { orderId, nextStatus } = req.body;
  const delivery = await Delivery.findByPk(orderId);
  if (!delivery || delivery.riderId !== req.user.id) {
    return res.status(403).json({ error: 'FORBIDDEN_ASSIGNMENT' });
  }
  if (delivery.paymentMethod === 'CASH' && !delivery.paymentConfirmed) {
    return res.status(409).json({ error: 'CASH_CONFIRMATION_REQUIRED' });
  }
  await delivery.update({ status: nextStatus });
  return res.json({ ok: true, status: delivery.status });
};`
    },
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'REST API']
  },
  {
    id: 'northbridge',
    index: '02',
    title: 'Northbridge Health',
    subtitle: 'Healthcare Platform & Resilient Auth Handling',
    category: 'Auth & Resilience',
    badge: '• FRONTEND ON VERCEL',
    domain: 'medical-healthcare-platform-tan.vercel.app',
    liveUrl: 'https://medical-healthcare-platform-tan.vercel.app',
    repoUrl: 'https://github.com/Devfreedom/northbridge-health',
    summary:
      'Healthcare platform pairing a deployed React + Vite frontend with a local Express + PostgreSQL API, built around deterministic 401 session handling and reproducible SQL migrations.',
    metrics: [
      { value: '401 Only', label: 'Session Eviction Policy' },
      { value: 'JWT', label: 'Bearer Auth + SQL Migrations' },
      { value: '2 Suites', label: 'Node Built-in Test Runner' }
    ],
    highlights: [
      'Implemented session handling (pinned by session.test.js) that keeps the user signed in across network drops and 5xx errors, clearing tokens only on confirmed HTTP 401.',
      'Built transactional registration in POST /api/auth/register creating user, profile, conversation, and welcome message together in PostgreSQL.',
      'Verified backend auth and validation routes with Node built-in test suites alongside reproducible SQL migrations.'
    ],
    architecture: {
      pattern: 'React + Vite SPA (Vercel) + Local Express API',
      database: 'PostgreSQL via pg pool + Reproducible SQL Migrations',
      auth: 'JWT Bearer + Confirmed-401 Session Eviction',
      flow: [
        { node: 'API Client', detail: 'Keeps token on network / 5xx errors', tag: 'CLIENT' },
        { node: 'Auth Middleware', detail: 'Bearer JWT Verification', tag: 'AUTH' },
        { node: 'Route Handlers', detail: 'Profile, Conversations & Health', tag: 'API' },
        { node: 'PostgreSQL', detail: 'Transactional Registration & Messages', tag: 'DB' }
      ],
      simulationSteps: [
        {
          stage: 'POST /api/auth/register',
          status: '201 CREATED',
          detail: 'Creates user, profile, conversation, and welcome message transactionally'
        },
        {
          stage: 'Network::transientErrorCheck',
          status: 'SESSION KEPT',
          detail: '5xx or offline failure preserves saved token for retry'
        },
        {
          stage: 'Response::status === 401',
          status: 'SESSION CLEARED',
          detail: 'Confirmed unauthorized response clears client auth state cleanly'
        },
        {
          stage: 'GET /api/health',
          status: '200 OK',
          detail: 'Returns { status: "ok", db: "ok" } verifying PostgreSQL liveness'
        }
      ],
      codeSnippet: `// Illustrative pattern — clear saved session strictly on confirmed HTTP 401
export async function handleApiResponse(response) {
  if (response.status === 401) {
    sessionStore.clearToken();
    throw new AuthError('SESSION_UNAUTHORIZED');
  }
  if (!response.ok) {
    // Preserve token on 5xx / transient server errors so user can retry
    throw new ApiError(response.status);
  }
  return response.json();
}`
    },
    stack: ['React', 'Vite', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'REST API']
  },
  {
    id: 'nairova',
    index: '03',
    title: 'Nairova',
    subtitle: 'Classroom Banking Demo & PostgreSQL API',
    category: 'Banking Demo & Auth',
    badge: '• CLASSROOM DEMO',
    domain: 'github.com/Devfreedom/Nairova',
    liveUrl: null,
    repoUrl: 'https://github.com/Devfreedom/Nairova',
    summary:
      'Classroom banking application (simulated funds only — no real money) built with a PostgreSQL-backed Express API, transaction PIN authorization, and ownership-checked account history.',
    metrics: [
      { value: 'PIN Auth', label: 'Transaction Confirmation' },
      { value: 'Advisory', label: 'Ordered DB Migrations' },
      { value: 'Simulated', label: 'Classroom Test Funds' }
    ],
    highlights: [
      'Built banking_api strictly backed by PostgreSQL (no in-memory fallback) with ordered migrations guarded by advisory locks.',
      'Implemented customer registration, transaction PIN setup, and simulated peer-to-peer transfers between registered accounts.',
      'Added ownership checks on transaction records so customers only inspect their own history, plus admin views for crediting test funds.'
    ],
    architecture: {
      pattern: 'React + Vite + Tailwind → Express banking_api',
      database: 'PostgreSQL (schema_migrations + Advisory Lock)',
      auth: 'JWT Session + Transaction PIN + Ownership Checks',
      flow: [
        { node: 'Transfer UI', detail: 'Account Lookup & PIN Input', tag: 'CLIENT' },
        { node: 'Owner & PIN Guard', detail: 'JWT Subject + PIN Verification', tag: 'AUTH' },
        { node: 'Transfer Service', detail: 'Simulated Balance Debit & Credit', tag: 'TX' },
        { node: 'PostgreSQL', detail: 'Accounts & Ownership-Scoped History', tag: 'DB' }
      ],
      simulationSteps: [
        {
          stage: 'POST /api/transfers',
          status: 'INITIATED',
          detail: 'Customer submits simulated transfer with account target & PIN'
        },
        {
          stage: 'Security::verifyTransactionPin',
          status: 'MATCHED',
          detail: 'Transaction PIN verified for authenticated account owner'
        },
        {
          stage: 'PostgreSQL::updateBalances',
          status: 'COMMITTED',
          detail: 'Sender and recipient simulated balances updated atomically'
        },
        {
          stage: 'GET /api/transactions',
          status: '200 OK',
          detail: 'Ownership filter returns only records belonging to req.user.id'
        }
      ],
      codeSnippet: `// Illustrative pattern — ownership & transaction PIN guard on simulated transfer
export const executeSimulatedTransfer = async (req, res) => {
  const account = await getOwnedAccount(req.user.id);
  const pinOk = await verifyTransactionPin(account.id, req.body.pin);
  if (!pinOk) return res.status(403).json({ error: 'INVALID_PIN' });
  if (account.balance < req.body.amount) {
    return res.status(400).json({ error: 'INSUFFICIENT_SIMULATED_FUNDS' });
  }
  const receipt = await transferWithinTransaction(account.id, req.body);
  return res.json({ ok: true, receipt });
};`
    },
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'REST API']
  },
  {
    id: 'aura',
    index: '04',
    title: 'Aura Suites & Apartments',
    subtitle: 'Hospitality Booking & Paystack Checkout Platform',
    category: 'Bookings & Payments',
    badge: '• LIVE ON VERCEL',
    domain: 'aura-suites-and-apartments.vercel.app',
    liveUrl: 'https://aura-suites-and-apartments.vercel.app/',
    repoUrl: 'https://github.com/Devfreedom/aura-suites-and-apartments',
    summary:
      'Full-stack Next.js hospitality platform featuring suite showcases, date-overlap availability checks, Paystack checkout & HMAC webhook verification, Supabase guest/admin dashboards, and automated email confirmations.',
    metrics: [
      { value: 'Supabase', label: 'PostgreSQL + SSR + RLS' },
      { value: 'Paystack', label: 'HMAC-SHA512 Webhooks' },
      { value: '2 Portals', label: 'Guest & Admin Consoles' }
    ],
    highlights: [
      'Built Paystack initialization, verification, and constant-time HMAC-SHA512 webhook signature validation (crypto.timingSafeEqual) in Next.js Route Handlers.',
      'Connected Supabase Auth & PostgreSQL RLS policies across guest reservations (/dashboard) and admin inventory/transaction management (/admin).',
      'Wired availability overlap checks, transactional confirmation emails via Brevo, and scheduled cron payment reminders via Vercel.'
    ],
    architecture: {
      pattern: 'Next.js 16 App Router + Route Handlers & Server Actions',
      database: 'Supabase PostgreSQL + Row Level Security (RLS)',
      auth: 'Supabase SSR Sessions + Admin Role Gate',
      flow: [
        { node: 'Booking Flow', detail: 'Suite Search & Overlap Check API', tag: 'UI/API' },
        { node: 'Paystack Gate', detail: 'Initialize, Verify & HMAC Webhook', tag: 'PAY' },
        { node: 'Supabase RLS', detail: 'Reservations, Guests & Transactions', tag: 'DB' },
        { node: 'Notifications', detail: 'Brevo Confirmations & Cron Reminders', tag: 'ASYNC' }
      ],
      simulationSteps: [
        {
          stage: 'GET /api/availability/check',
          status: '200 AVAILABLE',
          detail: 'Checks check-in/check-out date overlap for the selected suite'
        },
        {
          stage: 'POST /api/paystack/initialize',
          status: '200 AUTHORIZED',
          detail: 'Creates Paystack payment reference tied to stay dates & guest metadata'
        },
        {
          stage: 'POST /api/paystack/webhook',
          status: 'HMAC VERIFIED',
          detail: 'crypto.timingSafeEqual validates SHA-512 signature before persistence'
        },
        {
          stage: 'POST /api/booking/confirm',
          status: '201 CONFIRMED',
          detail: 'Marks booking PAID in Supabase, records transaction & triggers Brevo email'
        }
      ],
      codeSnippet: `// Illustrative pattern — constant-time Paystack webhook verification (Next.js Route Handler)
export async function verifyPaystackWebhook(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { valid: false };
  }
  return { valid: true };
}`
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Paystack', 'Brevo']
  }
];

// ============================================================================
// 2. ROTATING HERO WORDS, FACTUAL KPIS & TECH MARQUEE
// ============================================================================
const ROTATING_VERBS = ['scale.', 'ship.', 'think.', 'sell.'];

const KPI_METRICS: KpiMetric[] = [
  { numeric: 4, prefix: '', suffix: '', label: 'Full-Stack & Web Apps Built' },
  { numeric: 3, prefix: '', suffix: '', label: 'User Roles in SwiftDrop' },
  { numeric: 5, prefix: '', suffix: '', label: 'Delivery Lifecycle States' },
  { numeric: 3, prefix: '', suffix: '', label: 'Live Vercel Frontends' }
];

type ContactScope =
  | 'Full-Stack Web App'
  | 'SaaS MVP'
  | 'Booking / E-Commerce'
  | 'API & Database Architecture';

type ContactTimeline =
  | '2–4 Weeks'
  | '1–2 Months'
  | 'Full-Time / Ongoing Role';

const CONTACT_SCOPES: ContactScope[] = [
  'Full-Stack Web App',
  'SaaS MVP',
  'Booking / E-Commerce',
  'API & Database Architecture'
];

const CONTACT_TIMELINES: ContactTimeline[] = [
  '2–4 Weeks',
  '1–2 Months',
  'Full-Time / Ongoing Role'
];

function getSprintEstimateLabel(
  scopes: ContactScope[],
  timeline: ContactTimeline
): string {
  if (timeline === 'Full-Time / Ongoing Role') {
    return 'Estimated kickoff: Next Monday · Ongoing Full-Stack Collaboration';
  }
  if (timeline === '1–2 Months') {
    return scopes.includes('Booking / E-Commerce')
      ? 'Estimated kickoff: Next Monday · End-to-End Booking + Payment Build'
      : 'Estimated kickoff: Next Monday · Full Architecture, UI & DB Delivery';
  }
  return scopes.includes('API & Database Architecture') && scopes.length === 1
    ? 'Estimated kickoff: Next Monday · Schema, Auth & REST API Sprint'
    : 'Estimated kickoff: Next Monday · Architecture + MVP Sprint';
}

const BRIEF_NOTES_MARKER = 'Project Notes:';

function mergeScopedBrief(
  existingText: string,
  scopes: ContactScope[],
  timeline: ContactTimeline
): string {
  const header = `Scope: ${scopes.join(' + ')}\nTimeline: ${timeline}`;
  const trimmed = existingText.trim();

  if (!trimmed) {
    return `${header}\n\n${BRIEF_NOTES_MARKER}\n`;
  }

  const markerIndex = existingText.indexOf(BRIEF_NOTES_MARKER);
  if (markerIndex !== -1) {
    const preservedNotes = existingText
      .slice(markerIndex + BRIEF_NOTES_MARKER.length)
      .replace(/^\r?\n/, '');
    return `${header}\n\n${BRIEF_NOTES_MARKER}\n${preservedNotes}`;
  }

  // Strip only an existing structured Scope/Timeline header if user manually tweaked spacing
  const stripped = trimmed
    .replace(/^Scope:.*(\r?\nTimeline:.*)?(\r?\n)*/i, '')
    .trim();

  return stripped
    ? `${header}\n\n${BRIEF_NOTES_MARKER}\n${stripped}`
    : `${header}\n\n${BRIEF_NOTES_MARKER}\n`;
}

interface XRayCallout {
  tag: string;
  label: string;
  detail: string;
}

const PROJECT_XRAY_CALLOUTS: Record<ProjectId, XRayCallout[]> = {
  swiftdrop: [
    {
      tag: 'LIFECYCLE',
      label: 'POST /api/deliveries → 5-Stage Lifecycle',
      detail: 'Strict Pending → Assigned → Transit → Delivered state transitions'
    },
    {
      tag: 'AUTH & RBAC',
      label: 'JWT RBAC: Customer | Rider | Admin',
      detail: 'Riders start INACTIVE until admin approval before assignment'
    },
    {
      tag: 'SETTLEMENT',
      label: 'PostgreSQL Cash-Confirmation Gate',
      detail: 'Admin confirms cash payment prior to rider dispatch'
    },
    {
      tag: 'PUBLIC STATS',
      label: 'GET /api/stats (60s Memory Cache)',
      detail: 'Aggregate delivery & fleet metrics returned with zero PII'
    }
  ],
  northbridge: [
    {
      tag: 'SQL & POOL',
      label: 'pg pool.query() + SQL Migrations',
      detail: 'Reproducible schema setup & parameterized Express routes'
    },
    {
      tag: 'RESILIENCE',
      label: 'Confirmed-401 Session Eviction',
      detail: 'Keeps auth token across 5xx & offline drops (session.test.js)'
    },
    {
      tag: 'TRANSACTION',
      label: 'Transactional POST /api/auth/register',
      detail: 'Creates user, profile, conversation & welcome row atomically'
    },
    {
      tag: 'HEALTHCHECK',
      label: 'GET /api/health Database Liveness',
      detail: 'Verifies live PostgreSQL query execution before serving traffic'
    }
  ],
  aura: [
    {
      tag: 'INVENTORY',
      label: 'GET /api/availability/check',
      detail: 'Date-overlap guard blocks double-booked suite stays'
    },
    {
      tag: 'PAYMENTS',
      label: 'Paystack HMAC-SHA512 Webhooks',
      detail: 'Constant-time crypto.timingSafeEqual signature validation'
    },
    {
      tag: 'DATA ACCESS',
      label: 'Supabase PostgreSQL + RLS Portals',
      detail: 'Row Level Security across /dashboard and /admin consoles'
    },
    {
      tag: 'NOTIFICATIONS',
      label: 'Brevo Confirmations & Cron Reminders',
      detail: 'Automated booking receipts and scheduled payment reminders'
    }
  ],
  nairova: [
    {
      tag: 'MIGRATIONS',
      label: 'Ordered schema_migrations + Advisory Lock',
      detail: 'Strict PostgreSQL persistence with serialized boot migrations'
    },
    {
      tag: 'TRANSFER AUTH',
      label: 'Transaction PIN Verification Guard',
      detail: 'Verifies account PIN before simulated peer balance updates'
    },
    {
      tag: 'SCOPING',
      label: 'Ownership-Checked GET /api/transactions',
      detail: 'Filters account history strictly to authenticated req.user.id'
    },
    {
      tag: 'ADMIN CONSOLE',
      label: 'Simulated Test-Fund Crediting',
      detail: 'Admin views inspect user accounts and credit classroom test funds'
    }
  ]
};

const TECH_MARQUEE_ITEMS = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Sequelize',
  'JWT Auth',
  'Tailwind CSS',
  'Git',
  'Vercel'
];

// ============================================================================
// 3. ILLUSTRATIVE 3-COLUMN RBAC & POSTGRESQL SANDBOX MATRIX
// ============================================================================
const SANDBOX_ROLES: SandboxRole[] = [
  {
    id: 'Customer',
    userId: 'usr_cust_8841',
    tenantId: 'role_customer',
    scopes: ['deliveries:create', 'deliveries:read:own', 'transfers:execute']
  },
  {
    id: 'Rider',
    userId: 'usr_ridr_2049',
    tenantId: 'role_rider',
    scopes: ['deliveries:read:assigned', 'deliveries:advance:transit']
  },
  {
    id: 'Admin',
    userId: 'usr_admn_0007',
    tenantId: 'role_admin',
    scopes: ['*']
  }
];

const SANDBOX_ENDPOINTS: SandboxEndpoint[] = [
  {
    id: 'POST /api/deliveries',
    method: 'POST',
    path: '/api/deliveries',
    requiredScope: 'deliveries:create',
    description: 'Create new delivery order (Customer / Admin)',
    sqlGuard: `INSERT INTO deliveries (id, customer_id, status)
VALUES (gen_random_uuid(), $1, 'PENDING')
RETURNING id, status, created_at;`,
    successResponse: {
      status: 201,
      statusText: '201 CREATED',
      tag: 'SIMULATED',
      body: {
        ok: true,
        deliveryId: 'dlv_99481a',
        status: 'PENDING',
        guard: 'RBAC_SCOPE_VERIFIED'
      }
    },
    deniedResponse: {
      status: 403,
      statusText: '403 FORBIDDEN',
      tag: 'BLOCKED',
      body: {
        ok: false,
        error: 'RoleMismatchError',
        message: 'Requires scope [deliveries:create]'
      }
    }
  },
  {
    id: 'PATCH /api/deliveries/:id/transit',
    method: 'PATCH',
    path: '/api/deliveries/:id/transit',
    requiredScope: 'deliveries:advance:transit',
    description: 'Advance assigned parcel to IN_TRANSIT (Rider / Admin)',
    sqlGuard: `UPDATE deliveries
SET status = 'IN_TRANSIT', updated_at = NOW()
WHERE id = $1 AND rider_id = $2
RETURNING id, status;`,
    successResponse: {
      status: 200,
      statusText: '200 OK',
      tag: 'SIMULATED',
      body: {
        ok: true,
        deliveryId: 'dlv_88210c',
        status: 'IN_TRANSIT',
        ownership: 'RIDER_MATCHED'
      }
    },
    deniedResponse: {
      status: 403,
      statusText: '403 FORBIDDEN',
      tag: 'BLOCKED',
      body: {
        ok: false,
        error: 'RoleMismatchError',
        message: 'Requires scope [deliveries:advance:transit]'
      }
    }
  },
  {
    id: 'POST /api/transfers/execute',
    method: 'POST',
    path: '/api/transfers/execute',
    requiredScope: 'transfers:execute',
    description: 'Simulated P2P account transfer (Customer / Admin)',
    sqlGuard: `BEGIN;
SELECT balance FROM accounts WHERE user_id = $1 FOR UPDATE;
UPDATE accounts SET balance = balance - $2 WHERE user_id = $1;
COMMIT;`,
    successResponse: {
      status: 200,
      statusText: '200 OK',
      tag: 'SIMULATED',
      body: {
        ok: true,
        txRef: 'TX-SIM-77319',
        ownershipCheck: 'PASSED',
        simulatedAmount: 25000
      }
    },
    deniedResponse: {
      status: 403,
      statusText: '403 FORBIDDEN',
      tag: 'BLOCKED',
      body: {
        ok: false,
        error: 'RoleMismatchError',
        message: 'Requires scope [transfers:execute]'
      }
    }
  }
];

// ============================================================================
// 4. SERVICES & 4-STEP DELIVERY PROCESS DATA
// ============================================================================
const SERVICES_LIST: ServiceItem[] = [
  {
    icon: Layers,
    title: 'Full-Stack Web Applications',
    description:
      'Responsive React and Next.js frontends built with TypeScript and Tailwind CSS, connected to clean Node.js and Express APIs.',
    bullets: [
      'Responsive, accessible UI across viewports',
      'Small, readable components & clean state flows',
      'Frontend deployments on Vercel'
    ]
  },
  {
    icon: ShieldCheck,
    title: 'Multi-Role Portals',
    description:
      'Applications with distinct Customer, Rider/Staff, and Admin flows, role-scoped route guards, and clear status progression.',
    bullets: [
      'Explicit role-based access & route checks',
      'Order, payment, and approval state workflows',
      'Admin operational views & verification gates'
    ]
  },
  {
    icon: Database,
    title: 'REST APIs & PostgreSQL',
    description:
      'Relational PostgreSQL schemas, tracked migrations, JWT authentication, and predictable HTTP error handling.',
    bullets: [
      'Deterministic 401 session eviction handling',
      'Parameterized queries & ownership validation',
      'Clean REST endpoints & Node test coverage'
    ]
  }
];

const DELIVERY_STEPS: DeliveryStep[] = [
  {
    step: '01',
    title: 'Scope',
    detail: 'Map user roles, API endpoints, and PostgreSQL schemas before writing feature code.'
  },
  {
    step: '02',
    title: 'Prototype',
    detail: 'Build interactive React screens and validate key user journeys early.'
  },
  {
    step: '03',
    title: 'Build in phases',
    detail: 'Ship vertical slices—auth guards, database migrations, and UI flows—step by step.'
  },
  {
    step: '04',
    title: 'Launch and support',
    detail: 'Deploy cleanly, test edge cases manually, and refine what is not clear.'
  }
];

// ============================================================================
// 5. REUSABLE MAGNETIC CURSOR-PULL WRAPPER
// ============================================================================
function MagneticElement({
  children,
  className = '',
  strength = 0.25
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 0.12s ease-out'
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 6. CURSOR-TRACKING SPOTLIGHT CARD (THEME-AWARE)
// ============================================================================
interface SpotlightCardProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
  isDark?: boolean;
}

function SpotlightCard({
  children,
  className = '',
  isDark = true,
  onMouseMove: externalOnMouseMove,
  ...restProps
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      externalOnMouseMove?.(e);

      if (
        typeof window !== 'undefined' &&
        (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          window.matchMedia('(pointer: coarse)').matches)
      ) {
        return;
      }

      const node = cardRef.current;
      if (!node) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
        node.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
        rafRef.current = null;
      });
    },
    [externalOnMouseMove]
  );

  return (
    <div
      ref={cardRef}
      {...restProps}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isDark
          ? 'border-white/[0.09] bg-[#0D1017] hover:border-blue-500/35'
          : 'border-slate-200/90 bg-white shadow-sm hover:border-blue-500/40'
      } ${className}`}
    >
      {/* Ambient Radial Spotlight */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isDark ? 'spotlight-surface' : 'spotlight-surface-light'
        }`}
      />
      {/* Border Radial Highlight */}
      <div
        aria-hidden="true"
        className="spotlight-border-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// ============================================================================
// 7. SCROLL-TRIGGERED VIEWPORT REVEAL WRAPPER
// ============================================================================
function RevealSection({
  children,
  className = '',
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-6 opacity-0 blur-[3px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 8. ANIMATED KPI COUNTER ITEM
// ============================================================================
function AnimatedKpiItem({
  metric,
  isDark
}: {
  metric: KpiMetric;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const completedRef = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (completedRef.current || hasAnimated.current) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      hasAnimated.current = true;
      completedRef.current = true;
      const id = requestAnimationFrame(() => setCount(metric.numeric));
      return () => cancelAnimationFrame(id);
    }

    let rafId = 0;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      let startTimestamp: number | null = null;
      const duration = 1150;

      const step = (timestamp: number) => {
        if (startTimestamp === null) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * metric.numeric));
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          completedRef.current = true;
        }
      };

      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (!completedRef.current) {
        hasAnimated.current = false;
      }
    };
  }, [metric.numeric]);

  return (
    <div ref={ref} className="px-4 py-5 sm:px-6">
      <div
        className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {metric.prefix}
        {count}
        <span className="text-blue-500">{metric.suffix}</span>
      </div>
      <div
        className={`mt-1.5 text-xs font-medium sm:text-sm ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        {metric.label}
      </div>
    </div>
  );
}

// ============================================================================
// 9. FRAMED BROWSER MOCKUP PREVIEW FOR CASE STUDIES (LIVE WEB APP SCREENS)
// ============================================================================
const PROJECT_SCREENSHOTS: Partial<
  Record<ProjectId, { src: string; alt: string }>
> = {
  swiftdrop: {
    src: '/projects/swiftdrop.png',
    alt: 'SwiftDrop — Multi-Role Logistics & Delivery Platform'
  },
  northbridge: {
    src: '/projects/northbridge.png',
    alt: 'Northbridge Health — Healthcare Platform'
  },
  aura: {
    src: '/projects/aura-suites.png',
    alt: 'Aura Suites & Apartments — Hospitality Booking Platform'
  }
};

function ProjectBrowserMockup({
  project,
  isDark
}: {
  project: Project;
  isDark: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'ui' | 'xray'>('ui');
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltRafRef = useRef<number | null>(null);

  const screenshot = PROJECT_SCREENSHOTS[project.id];
  const showScreenshot = Boolean(screenshot && failedSrc !== screenshot.src);
  const targetUrl = project.liveUrl || project.repoUrl;
  const xrayCallouts = PROJECT_XRAY_CALLOUTS[project.id];

  useEffect(() => {
    return () => {
      if (tiltRafRef.current !== null) {
        cancelAnimationFrame(tiltRafRef.current);
      }
    };
  }, []);

  const handleTiltMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(pointer: coarse)').matches)
    ) {
      return;
    }

    const node = frameRef.current;
    if (!node) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (tiltRafRef.current !== null) {
      cancelAnimationFrame(tiltRafRef.current);
    }

    tiltRafRef.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((clientY - rect.top) / rect.height - 0.5) * 2;
      const clampDeg = (val: number) => Math.max(-3.5, Math.min(3.5, val));
      const rotateY = clampDeg(normX * 3.5);
      const rotateX = clampDeg(-normY * 3.5);
      node.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      tiltRafRef.current = null;
    });
  }, []);

  const handleTiltReset = useCallback(() => {
    if (tiltRafRef.current !== null) {
      cancelAnimationFrame(tiltRafRef.current);
      tiltRafRef.current = null;
    }
    if (frameRef.current) {
      frameRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  }, []);

  const uiPreviewBody =
    showScreenshot && screenshot ? (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className={`object-cover object-top transition-transform duration-500 ${
            viewMode === 'ui' ? 'group-hover/preview:scale-[1.03]' : 'scale-[1.01] opacity-25 blur-[2px]'
          }`}
          onError={() => setFailedSrc(screenshot.src)}
        />
      </div>
    ) : (
      /* Nairova Visual Fintech UI Preview */
      <div
        className={`bg-slate-50 text-slate-900 transition-opacity duration-300 sm:aspect-[16/10] ${
          viewMode === 'xray' ? 'opacity-20 blur-[2px]' : 'opacity-100'
        }`}
      >
        <div className="grid h-full grid-cols-12">
          {/* App Mini Sidebar */}
          <div className="col-span-3 hidden flex-col justify-between bg-slate-900 p-3 text-white sm:flex">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500 text-white">
                  <Wallet className="h-3 w-3" />
                </span>
                <span className="text-[11px] font-bold">Nairova</span>
              </div>
              <div className="mt-4 space-y-1.5 text-[10px] text-slate-400">
                <div className="rounded bg-white/10 px-2 py-1 font-semibold text-white">
                  Accounts
                </div>
                <div className="px-2 py-1">Transfers</div>
                <div className="px-2 py-1">History</div>
                <div className="px-2 py-1">Admin</div>
              </div>
            </div>
            <div className="rounded bg-amber-400/15 px-2 py-1 text-[9px] font-semibold text-amber-300">
              Simulated Demo
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="col-span-12 p-4 sm:col-span-9">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  Account Overview
                </div>
                <div className="text-[10px] text-slate-500">
                  Classroom Banking Core · Simulated Funds
                </div>
              </div>
              <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold text-white">
                Send Transfer
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {/* Visual Virtual Card */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 p-3.5 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-indigo-200">
                    Nairova Demo
                  </span>
                  <CreditCard className="h-4 w-4 text-indigo-200" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-5 w-7 rounded bg-amber-300/85" />
                  <span className="font-mono text-[10px] tracking-widest text-indigo-100">
                    •••• •••• 4018
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="text-indigo-200">PostgreSQL Ledger</span>
                  <span className="font-semibold text-emerald-300">PIN Protected</span>
                </div>
              </div>

              {/* Quick Transfer & History Panel */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3">
                <div className="text-[10px] font-bold text-slate-900">
                  Recent Activity (Owner-Scoped)
                </div>
                <div className="mt-2 space-y-1.5 text-[10px]">
                  <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-1">
                    <span className="text-slate-600">Peer Transfer</span>
                    <span className="font-semibold text-indigo-600">PIN Verified</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-1">
                    <span className="text-slate-600">Admin Credit</span>
                    <span className="font-semibold text-emerald-600">Test Funds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div
      ref={frameRef}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltReset}
      style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
      className={`group/preview browser-tilt-frame overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 ${
        isDark
          ? 'border-white/[0.12] bg-[#0B0E15] shadow-2xl shadow-black/60 hover:border-blue-500/45'
          : 'border-slate-200 bg-white shadow-xl shadow-slate-200/80 hover:border-blue-400'
      }`}
    >
      {/* macOS Browser Top Chrome + UI / X-Ray Segmented Toggle */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b px-3.5 py-2.5 ${
          isDark
            ? 'border-white/[0.08] bg-[#111520]'
            : 'border-slate-200 bg-slate-100'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
        </div>

        <div
          className={`hidden max-w-[44%] items-center gap-1.5 rounded-md border px-2.5 py-0.5 font-mono text-[10px] sm:flex ${
            isDark
              ? 'border-white/[0.08] bg-[#07090F] text-slate-300'
              : 'border-slate-200 bg-white text-slate-600'
          }`}
        >
          <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
          <span className="truncate">{project.domain}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* UI | X-Ray Segmented Toggle */}
          <div
            role="group"
            aria-label={`${project.title} preview mode`}
            className={`inline-flex items-center rounded-lg border p-0.5 font-mono text-[10px] ${
              isDark
                ? 'border-white/[0.1] bg-[#07090F]'
                : 'border-slate-200 bg-white'
            }`}
          >
            <button
              type="button"
              aria-pressed={viewMode === 'ui'}
              onClick={() => setViewMode('ui')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold transition ${
                viewMode === 'ui'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="h-2.5 w-2.5" />
              <span>UI</span>
            </button>
            <button
              type="button"
              aria-pressed={viewMode === 'xray'}
              onClick={() => setViewMode('xray')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold transition ${
                viewMode === 'xray'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="h-2.5 w-2.5" />
              <span>X-Ray</span>
            </button>
          </div>

          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} (${project.domain}) in a new tab`}
            className={`inline-flex h-6 w-6 items-center justify-center rounded-md border transition ${
              isDark
                ? 'border-blue-500/30 bg-blue-500/15 text-blue-400 hover:border-blue-400 hover:bg-blue-600 hover:text-white'
                : 'border-blue-200 bg-blue-50 text-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Viewport + Behind-the-UI X-Ray Blueprint Overlay */}
      <div className="relative">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={viewMode === 'xray' ? -1 : 0}
          aria-hidden={viewMode === 'xray'}
          aria-label={`Visit ${project.title}`}
          className="block"
        >
          {uiPreviewBody}
        </a>

        {/* Architectural X-Ray Overlay */}
        <div
          aria-hidden={viewMode !== 'xray'}
          className={`xray-blueprint-grid absolute inset-0 flex flex-col justify-between overflow-y-auto bg-[#070B14]/88 p-3.5 backdrop-blur-md transition-all duration-300 sm:p-4 ${
            viewMode === 'xray'
              ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none translate-y-1 scale-[0.98] opacity-0'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-500/20 pb-2">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>ARCHITECTURE X-RAY // {project.architecture.pattern}</span>
            </div>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={viewMode === 'xray' ? 0 : -1}
              className="inline-flex items-center gap-1 rounded-full border border-blue-400/35 bg-blue-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-blue-300 transition hover:bg-blue-500 hover:text-white"
            >
              <span>{project.liveUrl ? 'Open Live' : 'View Repo'}</span>
              <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          </div>

          <div className="my-auto grid grid-cols-1 gap-2 py-2 sm:grid-cols-2">
            {xrayCallouts.map((callout) => (
              <div
                key={callout.label}
                className="rounded-xl border border-blue-400/25 bg-[#0C1220]/95 p-2.5 shadow-lg shadow-black/40"
              >
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-sky-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{callout.tag}</span>
                </div>
                <div className="mt-1 font-mono text-[11px] font-semibold leading-snug text-white">
                  {callout.label}
                </div>
                <div className="mt-0.5 text-[10px] leading-relaxed text-slate-400">
                  {callout.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-blue-500/20 pt-2 font-mono text-[10px] text-slate-400">
            <span className="truncate">DB: {project.architecture.database}</span>
            <span className="text-emerald-400">Auth: {project.architecture.auth}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 10. HERO 3D TILTED DUAL-COLUMN VISUAL BROWSER REEL
// ============================================================================
interface HeroReelCard {
  id: ProjectId;
  title: string;
  subtitle: string;
  domain: string;
  href: string;
  imageSrc?: string;
  objectPosition?: string;
  fallbackVariant: 'nairova-wallet' | 'nairova-ledger' | 'swiftdrop' | 'northbridge' | 'aura';
}

function HeroDualPreviewReel({ isDark }: { isDark: boolean }) {
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const handleImageError = useCallback((src: string) => {
    setBrokenImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);

  const columnUpCards: HeroReelCard[] = [
    {
      id: 'swiftdrop',
      title: 'SwiftDrop',
      subtitle: 'Multi-Role Delivery Platform',
      domain: 'swiftdrop-liart.vercel.app',
      href: 'https://swiftdrop-liart.vercel.app',
      imageSrc: '/projects/swiftdrop.png',
      fallbackVariant: 'swiftdrop'
    },
    {
      id: 'aura',
      title: 'Aura Suites',
      subtitle: 'Hospitality Booking & Paystack',
      domain: 'aura-suites-and-apartments.vercel.app',
      href: 'https://aura-suites-and-apartments.vercel.app/',
      imageSrc: '/projects/aura-suites.png',
      fallbackVariant: 'aura'
    },
    {
      id: 'northbridge',
      title: 'Northbridge Health',
      subtitle: 'Clinical Care & Patient Portal',
      domain: 'medical-healthcare-platform-tan.vercel.app',
      href: 'https://medical-healthcare-platform-tan.vercel.app',
      imageSrc: '/projects/northbridge.png',
      fallbackVariant: 'northbridge'
    },
    {
      id: 'nairova',
      title: 'Nairova',
      subtitle: 'Wallet Transfers & PIN Auth',
      domain: 'github.com/Devfreedom/Nairova',
      href: 'https://github.com/Devfreedom/Nairova',
      fallbackVariant: 'nairova-wallet'
    }
  ];

  const columnDownCards: HeroReelCard[] = [
    {
      id: 'northbridge',
      title: 'Northbridge Health',
      subtitle: 'Evidence-Based Care Platform',
      domain: 'medical-healthcare-platform-tan.vercel.app',
      href: 'https://medical-healthcare-platform-tan.vercel.app',
      imageSrc: '/projects/northbridge.png',
      fallbackVariant: 'northbridge'
    },
    {
      id: 'nairova',
      title: 'Nairova',
      subtitle: 'PostgreSQL Ledger & Migrations',
      domain: 'github.com/Devfreedom/Nairova',
      href: 'https://github.com/Devfreedom/Nairova',
      fallbackVariant: 'nairova-ledger'
    },
    {
      id: 'swiftdrop',
      title: 'SwiftDrop',
      subtitle: 'Live Dispatch & Rider Tracking',
      domain: 'swiftdrop-liart.vercel.app',
      href: 'https://swiftdrop-liart.vercel.app',
      imageSrc: '/projects/swiftdrop.png',
      fallbackVariant: 'swiftdrop'
    },
    {
      id: 'aura',
      title: 'Aura Suites',
      subtitle: 'Executive Suites & Reservations',
      domain: 'aura-suites-and-apartments.vercel.app',
      href: 'https://aura-suites-and-apartments.vercel.app/',
      imageSrc: '/projects/aura-suites.png',
      fallbackVariant: 'aura'
    }
  ];

  const renderReelCard = (card: HeroReelCard, key: string) => {
    const showScreenshot =
      Boolean(card.imageSrc) && !brokenImages[card.imageSrc as string];

    return (
      <a
        key={key}
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${card.title} (${card.domain}) in a new tab`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-[#0B0F17] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-blue-500/80 hover:shadow-[0_0_28px_rgba(59,130,246,0.35)] hover:scale-[1.015]"
      >
        {/* Full-Bleed 16:10 App Screenshot or Rich Fintech UI Preview */}
        {showScreenshot && card.imageSrc ? (
          <Image
            src={card.imageSrc}
            alt={`${card.title} — ${card.subtitle}`}
            fill
            sizes="(max-width: 1024px) 48vw, 360px"
            className="h-full w-full object-cover object-top"
            onError={() => handleImageError(card.imageSrc as string)}
          />
        ) : card.fallbackVariant === 'aura' ? (
          <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#0F2137] via-[#132944] to-[#0A1422] p-4 text-white">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-amber-300">
              <span>Aura Suites</span>
              <span className="rounded bg-amber-400/15 px-2 py-0.5 text-amber-200">
                Supabase + Paystack
              </span>
            </div>
            <div className="my-auto text-sm font-extrabold leading-tight text-white">
              {card.subtitle}
            </div>
            <div className="flex items-center gap-2 text-[9px] font-semibold">
              <span className="rounded bg-amber-400 px-2.5 py-1 text-slate-950">
                Reserve a Suite
              </span>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col justify-between bg-[#080D1B] p-3 text-white">
            {/* Slim Fintech App Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-indigo-600 text-[9px] font-bold">
                  N
                </span>
                <span className="text-[10px] font-bold tracking-tight text-white">
                  Nairova Demo
                </span>
              </div>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 font-mono text-[8px] font-semibold text-indigo-300">
                SIMULATED TEST FUNDS
              </span>
            </div>

            {/* Balance Card + PIN Modal + Transaction Ledger Rows */}
            <div className="my-auto grid grid-cols-12 gap-2 pt-2">
              <div className="col-span-6 flex flex-col justify-between rounded-xl bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 p-2.5 shadow-lg">
                <div>
                  <div className="text-[7px] font-semibold uppercase tracking-wider text-indigo-200">
                    Test Balance
                  </div>
                  <div className="mt-0.5 font-mono text-xs font-extrabold text-white">
                    ₦482,500
                  </div>
                </div>
                <div className="mt-2 rounded-lg border border-white/15 bg-black/35 p-1.5 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-[7px] text-slate-300">
                    <span>Confirm PIN</span>
                    <Lock className="h-2 w-2 text-emerald-400" />
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-widest text-white">
                      ••••
                    </span>
                    <span className="rounded bg-emerald-500 px-1.5 py-0.5 text-[7px] font-bold text-slate-950">
                      Send
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 flex flex-col justify-between rounded-xl border border-white/10 bg-[#0F172A] p-2">
                <div className="flex items-center justify-between text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                  <span>Ledger History</span>
                  <span className="text-emerald-400">pg SQL</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center justify-between rounded bg-white/[0.04] px-1.5 py-1 text-[8px]">
                    <span className="text-slate-300">Admin Credit</span>
                    <span className="font-mono font-semibold text-emerald-400">+₦50k</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-white/[0.04] px-1.5 py-1 text-[8px]">
                    <span className="text-slate-300">Peer Transfer</span>
                    <span className="font-mono font-semibold text-sky-400">-₦12k</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-white/[0.04] px-1.5 py-1 text-[8px]">
                    <span className="text-slate-300">Migration</span>
                    <span className="font-mono text-indigo-300">Locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subtle bottom legibility gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Bottom-left dark frosted-glass project name pill */}
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/75 px-3 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span>{card.title}</span>
        </div>
      </a>
    );
  };

  return (
    <div className="reel-wrapper relative h-[580px] w-full overflow-y-hidden overflow-x-visible xl:h-[640px]">
      <div
        className="reel-edge-mask h-full w-full overflow-y-hidden overflow-x-visible px-2 py-4 sm:px-4"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)'
        }}
      >
        <div className="reel-tilt-grid grid h-full w-[108%] grid-cols-2 gap-4 sm:gap-5">
          {/* Column 1 scrolling UP */}
          <div className="reel-column">
            <div className="animate-reel-up space-y-4 sm:space-y-5">
              {[...columnUpCards, ...columnUpCards].map((c, idx) =>
                renderReelCard(c, `up-${idx}`)
              )}
            </div>
          </div>

          {/* Column 2 scrolling DOWN (vertically offset) */}
          <div className="reel-column -mt-12">
            <div className="animate-reel-down space-y-4 sm:space-y-5">
              {[...columnDownCards, ...columnDownCards].map((c, idx) =>
                renderReelCard(c, `down-${idx}`)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frosted-Glass Floating Badge in Bottom-Left Corner */}
      <div
        className={`absolute bottom-4 left-4 z-30 flex items-center gap-2.5 rounded-xl border px-3.5 py-2 shadow-xl backdrop-blur-md ${
          isDark
            ? 'border-white/[0.14] bg-[#0D1017]/90 text-white'
            : 'border-slate-200 bg-white/95 text-slate-900'
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 font-display text-xs font-extrabold text-white">
          4
        </span>
        <div className="text-[11px] leading-tight">
          <div className="font-semibold">4 Shipped projects</div>
          <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            3 Live on Vercel
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 11. ANIMATED SVG BRUSH-STROKE UNDERLINE (DRAWS ON SCROLL)
// ============================================================================
function AnimatedBrushUnderline() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const id = requestAnimationFrame(() => setDrawn(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 22"
      fill="none"
      className="mt-1 h-4 w-56 sm:w-72"
      aria-hidden="true"
    >
      <path
        d="M4 15.5C78 6.5 212 4.5 316 13.5"
        stroke="#2563EB"
        strokeWidth="5.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 330,
          strokeDashoffset: drawn ? 0 : 330,
          transition: 'stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      />
      <path
        d="M28 19C112 13 224 12.5 294 17.5"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 280,
          strokeDashoffset: drawn ? 0 : 280,
          transition: 'stroke-dashoffset 1.25s cubic-bezier(0.22, 1, 0.36, 1) 0.18s'
        }}
      />
    </svg>
  );
}

// ============================================================================
// 12. MAIN APPLICATION COMPONENT
// ============================================================================
const subscribeNoop = () => () => {};

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');
  const isDark = theme === 'dark';

  const currentYear = useSyncExternalStore(
    subscribeNoop,
    () => new Date().getFullYear(),
    () => 2026
  );

  // Hero cycling italic serif word state
  const [verbIndex, setVerbIndex] = useState(0);

  // Live Abuja / WAT clock
  const [watTime, setWatTime] = useState('');

  // Project architecture drawer & simulation states
  const [expandedProject, setExpandedProject] = useState<ProjectId | null>(null);
  const [projectMode, setProjectMode] = useState<Record<ProjectId, ProjectMode>>({
    swiftdrop: 'architecture',
    northbridge: 'impact',
    aura: 'impact',
    nairova: 'impact'
  });
  const [projectSimStep, setProjectSimStep] = useState<Partial<Record<ProjectId, number>>>({});

  // Interactive 3-column RBAC & PostgreSQL Sandbox state
  const [selectedRole, setSelectedRole] = useState<RoleId>('Customer');
  const [selectedEndpoint, setSelectedEndpoint] = useState('POST /api/deliveries');
  const [sandboxExecuted, setSandboxExecuted] = useState(true);
  const [sandboxRunning, setSandboxRunning] = useState(false);

  // Hero Engineering Telemetry pill state
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [telemetryPinned, setTelemetryPinned] = useState(false);
  const telemetryRef = useRef<HTMLDivElement>(null);

  // Contact form & 2-Minute Project Scoper state
  const [selectedScopes, setSelectedScopes] = useState<ContactScope[]>([
    'Full-Stack Web App'
  ]);
  const [selectedTimeline, setSelectedTimeline] =
    useState<ContactTimeline>('2–4 Weeks');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactBrief, setContactBrief] = useState(() =>
    mergeScopedBrief('', ['Full-Stack Web App'], '2–4 Weeks')
  );
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Modals, clipboard & toast state
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const [cmdSelectedIndex, setCmdSelectedIndex] = useState(0);

  const email = 'editorfreedom@gmail.com';

  // Cycle hero italic verb every 2.5 seconds
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setVerbIndex((prev) => (prev + 1) % ROTATING_VERBS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Live Abuja WAT (UTC+1) Clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setWatTime(`${formatted} WAT`);
      } catch {
        setWatTime('UTC+1');
      }
    };
    const initialTimer = setTimeout(updateClock, 0);
    const interval = setInterval(updateClock, 1000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const triggerToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 2800);
  }, []);

  // Close Hero telemetry popover on outside click
  useEffect(() => {
    if (!telemetryOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        telemetryRef.current &&
        !telemetryRef.current.contains(event.target as Node)
      ) {
        setTelemetryOpen(false);
        setTelemetryPinned(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [telemetryOpen]);

  useEffect(() => {
    if (!copiedEmail) return;
    const timer = setTimeout(() => setCopiedEmail(false), 2000);
    return () => clearTimeout(timer);
  }, [copiedEmail]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard?.writeText(email);
    setCopiedEmail(true);
    triggerToast(`Copied ${email} to clipboard`);
  }, [email, triggerToast]);

  const scrollToSection = useCallback((id: string) => {
    setCmdOpen(false);
    setCmdSelectedIndex(0);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Toggle project architecture drawer and align card when switching from sticky to normal flow
  const handleToggleArchitecture = (projectId: ProjectId) => {
    const isClosing = expandedProject === projectId;
    setExpandedProject(isClosing ? null : projectId);

    if (!isClosing) {
      requestAnimationFrame(() => {
        document
          .getElementById(`project-${projectId}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  // Run project flow simulation
  const runProjectSimulation = (projectId: ProjectId, totalSteps: number) => {
    setProjectSimStep((prev) => ({ ...prev, [projectId]: 0 }));
    for (let i = 1; i < totalSteps; i++) {
      setTimeout(() => {
        setProjectSimStep((prev) => ({ ...prev, [projectId]: i }));
      }, i * 350);
    }
  };

  // Evaluate Sandbox Authorization
  const activeRoleObj = useMemo(
    () => SANDBOX_ROLES.find((r) => r.id === selectedRole) || SANDBOX_ROLES[0],
    [selectedRole]
  );

  const activeEndpointObj = useMemo(
    () =>
      SANDBOX_ENDPOINTS.find((e) => e.id === selectedEndpoint) ||
      SANDBOX_ENDPOINTS[0],
    [selectedEndpoint]
  );

  const isSandboxAuthorized = useMemo(() => {
    if (activeRoleObj.scopes.includes('*')) return true;
    return activeRoleObj.scopes.includes(activeEndpointObj.requiredScope);
  }, [activeRoleObj, activeEndpointObj]);

  const handleExecuteSandbox = () => {
    setSandboxRunning(true);
    setSandboxExecuted(false);
    setTimeout(() => {
      setSandboxRunning(false);
      setSandboxExecuted(true);
    }, 320);
  };

  // 2-Minute Project Scoper handlers (update brief header while preserving custom user notes)
  const handleToggleScope = (scope: ContactScope) => {
    const nextScopes: ContactScope[] = selectedScopes.includes(scope)
      ? selectedScopes.length > 1
        ? selectedScopes.filter((item) => item !== scope)
        : selectedScopes
      : [...selectedScopes, scope];
    setSelectedScopes(nextScopes);
    setContactBrief((prev) =>
      mergeScopedBrief(prev, nextScopes, selectedTimeline)
    );
  };

  const handleSelectTimeline = (timeline: ContactTimeline) => {
    setSelectedTimeline(timeline);
    setContactBrief((prev) =>
      mergeScopedBrief(prev, selectedScopes, timeline)
    );
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactBrief.trim()) {
      triggerToast('Please fill in your name, email, and project brief.');
      return;
    }
    setContactSubmitted(true);
    triggerToast('Inquiry prepared — ready for direct dispatch!');
  };

  // Command Palette Actions
  const commandActions = useMemo<CommandAction[]>(() => {
    const base: CommandAction[] = [
      {
        id: 'toggle-theme',
        label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
        hint: 'Theme',
        icon: isDark ? Sun : Moon,
        action: () => {
          setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
          setCmdOpen(false);
        }
      },
      {
        id: 'copy-email',
        label: `Copy Email Address (${email})`,
        hint: 'Clipboard',
        icon: Copy,
        action: () => {
          handleCopyEmail();
          setCmdOpen(false);
        }
      },
      {
        id: 'open-resume',
        label: 'View Engineering Summary',
        hint: 'Modal',
        icon: FileText,
        action: () => {
          setCmdOpen(false);
          setResumeOpen(true);
        }
      },
      {
        id: 'nav-work',
        label: 'Jump to Selected Work (Projects)',
        hint: 'Section',
        icon: Server,
        action: () => scrollToSection('work')
      },
      {
        id: 'nav-sandbox',
        label: 'Jump to Interactive RBAC & PostgreSQL Sandbox',
        hint: 'Section',
        icon: ShieldCheck,
        action: () => scrollToSection('sandbox')
      },
      {
        id: 'nav-services',
        label: 'Jump to Capabilities & Build Process',
        hint: 'Section',
        icon: Layers,
        action: () => scrollToSection('services')
      },
      {
        id: 'nav-about',
        label: 'Jump to About Freedom',
        hint: 'Section',
        icon: UserCheck,
        action: () => scrollToSection('about')
      },
      {
        id: 'nav-contact',
        label: 'Jump to Contact & Project Inquiry',
        hint: 'Section',
        icon: Mail,
        action: () => scrollToSection('contact')
      },
      {
        id: 'ext-github',
        label: 'Open GitHub Profile (@Devfreedom)',
        hint: 'github.com',
        icon: GithubIcon,
        action: () => {
          setCmdOpen(false);
          window.open('https://github.com/Devfreedom', '_blank', 'noopener,noreferrer');
        }
      },
      {
        id: 'ext-swiftdrop',
        label: 'Open SwiftDrop Live App',
        hint: 'Vercel',
        icon: Globe,
        action: () => {
          setCmdOpen(false);
          window.open('https://swiftdrop-liart.vercel.app', '_blank', 'noopener,noreferrer');
        }
      },
      {
        id: 'ext-northbridge',
        label: 'Open Northbridge Health Preview',
        hint: 'Vercel',
        icon: Globe,
        action: () => {
          setCmdOpen(false);
          window.open(
            'https://medical-healthcare-platform-tan.vercel.app',
            '_blank',
            'noopener,noreferrer'
          );
        }
      },
      {
        id: 'ext-aura',
        label: 'Open Aura Suites Live',
        hint: 'Vercel',
        icon: Globe,
        action: () => {
          setCmdOpen(false);
          window.open(
            'https://aura-suites-and-apartments.vercel.app/',
            '_blank',
            'noopener,noreferrer'
          );
        }
      }
    ];
    if (!cmdQuery.trim()) return base;
    return base.filter(
      (item) =>
        item.label.toLowerCase().includes(cmdQuery.toLowerCase()) ||
        item.hint.toLowerCase().includes(cmdQuery.toLowerCase())
    );
  }, [cmdQuery, email, handleCopyEmail, isDark, scrollToSection]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K + Arrow navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
        setCmdSelectedIndex(0);
        return;
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setResumeOpen(false);
        setTelemetryOpen(false);
        setTelemetryPinned(false);
        return;
      }
      if (!cmdOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCmdSelectedIndex((prev) =>
          commandActions.length > 0 ? (prev + 1) % commandActions.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCmdSelectedIndex((prev) =>
          commandActions.length > 0
            ? (prev - 1 + commandActions.length) % commandActions.length
            : 0
        );
      } else if (e.key === 'Enter' && commandActions[cmdSelectedIndex]) {
        e.preventDefault();
        commandActions[cmdSelectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cmdOpen, commandActions, cmdSelectedIndex]);

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-300 selection:bg-blue-600/25 ${
        isDark
          ? 'bg-[#06070B] text-slate-100 selection:text-blue-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:text-blue-900'
      }`}
    >
      {/* Subtle Grid & Radial Glow Backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-[0.16]' : 'opacity-[0.35]'}`}
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 85% 65% at 50% 10%, black 45%, transparent 100%)'
          }}
        />
        <div
          className={`absolute -top-36 left-1/4 h-[460px] w-[460px] rounded-full blur-[135px] ${
            isDark ? 'bg-blue-600/[0.11]' : 'bg-blue-500/[0.08]'
          }`}
        />
        <div
          className={`absolute top-40 right-1/5 h-[360px] w-[360px] rounded-full blur-[135px] ${
            isDark ? 'bg-cyan-500/[0.07]' : 'bg-sky-400/[0.08]'
          }`}
        />
      </div>

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border px-4 py-2.5 font-mono text-xs shadow-2xl backdrop-blur-md ${
            isDark
              ? 'border-blue-500/35 bg-[#0D1017]/95 text-blue-300'
              : 'border-blue-200 bg-white/95 text-blue-700'
          }`}
        >
          <CheckCircle2 className="h-4 w-4 text-blue-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 1. STICKY TOP GLASS NAVIGATION BAR                                    */}
      {/* ===================================================================== */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${
          isDark
            ? 'border-white/[0.08] bg-[#06070B]/80'
            : 'border-slate-200/80 bg-[#F8FAFC]/85'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Brand Emblem ('F') + Name */}
          <a href="#" className="group flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-display text-sm font-extrabold text-white shadow-md shadow-blue-600/25 transition group-hover:bg-blue-500">
              F
            </span>
            <div className="leading-tight">
              <div
                className={`text-sm font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Freedom Chukwudi
              </div>
              <div className="font-mono text-[10px] text-slate-500">
                Full-stack engineer
              </div>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className={`hidden items-center gap-7 text-sm font-medium md:flex ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <button
              type="button"
              onClick={() => scrollToSection('work')}
              className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sandbox')}
              className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}
            >
              Sandbox
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}
            >
              Capabilities
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}
            >
              Contact
            </button>
          </nav>

          {/* Right Controls: Theme Toggle, Cmd+K, Start a Project Pill */}
          <div className="flex items-center gap-2">
            {/* Dark/Light Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                isDark
                  ? 'border-white/[0.1] bg-[#0D1017] text-slate-300 hover:border-blue-500/40 hover:text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-slate-950'
              }`}
              aria-label="Toggle Dark or Light Mode"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => {
                setCmdSelectedIndex(0);
                setCmdOpen(true);
              }}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition ${
                isDark
                  ? 'border-white/[0.1] bg-[#0D1017] text-slate-300 hover:border-blue-500/40 hover:text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-slate-950'
              }`}
              aria-label="Open Command Palette"
            >
              <Command className="h-3.5 w-3.5 text-blue-500" />
              <span className="hidden sm:inline">⌘K</span>
            </button>

            {/* Resume Modal Trigger */}
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className={`hidden items-center gap-1 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:inline-flex ${
                isDark
                  ? 'border-white/[0.12] bg-[#0D1017] text-slate-200 hover:border-blue-500/40 hover:text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-slate-950'
              }`}
            >
              <span>Resume</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
            </button>

            {/* Primary Pill CTA */}
            <MagneticElement strength={0.22}>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 sm:text-sm"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </MagneticElement>
          </div>
        </div>
      </header>

      <main id="main" className="relative z-10 pb-24 pt-10 sm:pt-14">
        {/* =================================================================== */}
        {/* 2. KINETIC HERO SECTION (CYCLING SERIF VERB + 3D BROWSER REEL)     */}
        {/* =================================================================== */}
        <section className="mx-auto grid max-w-[1380px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-10">
          {/* Left Column */}
          <div className="relative z-30">
            {/* Live Engineering Telemetry Pill + Frosted Frosted-Glass Popover */}
            <div
              ref={telemetryRef}
              className="animate-hero-1 relative inline-block"
              onMouseEnter={() => setTelemetryOpen(true)}
              onMouseLeave={() => {
                if (!telemetryPinned) setTelemetryOpen(false);
              }}
            >
              <button
                type="button"
                aria-expanded={telemetryOpen}
                aria-controls={telemetryOpen ? 'hero-telemetry-popover' : undefined}
                onClick={() => {
                  const nextPinned = !telemetryPinned;
                  setTelemetryPinned(nextPinned);
                  setTelemetryOpen(nextPinned);
                }}
                className={`inline-flex flex-wrap items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                  isDark
                    ? 'border-emerald-500/30 bg-emerald-500/[0.09] text-emerald-400 hover:border-emerald-400/60 hover:bg-emerald-500/[0.14]'
                    : 'border-emerald-600/25 bg-emerald-50 text-emerald-700 hover:border-emerald-500/50'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-semibold">Available for Q4/Q1 builds</span>
                <span className="opacity-40">•</span>
                <span
                  className={`tabular-nums ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  {watTime || 'UTC+1'}
                </span>
              </button>

              {telemetryOpen && (
                <div
                  id="hero-telemetry-popover"
                  role="region"
                  aria-label="Engineering telemetry details"
                  className="absolute left-0 top-full z-40 w-[min(22rem,calc(100vw-2rem))] pt-2.5"
                >
                  <div
                    className={`rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
                      isDark
                        ? 'border-white/[0.14] bg-[#0B0F1A]/90 text-slate-200 shadow-black/80'
                        : 'border-slate-200/90 bg-white/95 text-slate-800 shadow-slate-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-blue-500/15 pb-2.5 font-mono text-[10px] uppercase tracking-wider">
                      <span className="font-semibold text-blue-400">
                        LIVE TELEMETRY // UTC+1
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Online
                      </span>
                    </div>

                    <div className="mt-3 space-y-2.5 text-xs">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                            Location &amp; Overlap
                          </div>
                          <div
                            className={`mt-0.5 font-medium ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            Abuja, Nigeria (UTC+1 · Full EU/UK overlap, strong US East overlap)
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                            Avg. Response Time
                          </div>
                          <div
                            className={`mt-0.5 font-mono font-semibold ${
                              isDark ? 'text-emerald-300' : 'text-emerald-700'
                            }`}
                          >
                            &lt; 2 hrs
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Server className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                            Current Focus
                          </div>
                          <div
                            className={`mt-0.5 font-medium ${
                              isDark ? 'text-slate-200' : 'text-slate-800'
                            }`}
                          >
                            Next.js 16, Node.js/Express &amp; PostgreSQL systems
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={`mt-3.5 flex w-full items-center justify-between rounded-xl border px-3 py-2 font-mono text-[11px] font-semibold transition ${
                        copiedEmail
                          ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-400'
                          : isDark
                          ? 'border-white/[0.12] bg-[#111726] text-slate-200 hover:border-blue-500/50 hover:text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-500'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 truncate">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                        <span className="truncate">{email}</span>
                      </span>
                      <span className="ml-2 inline-flex shrink-0 items-center gap-1">
                        {copiedEmail ? (
                          <>
                            <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bold Inter Headline + Cycling Blue Italic Instrument Serif Word */}
            <h1
              className={`animate-hero-2 font-display mt-6 text-4xl font-extrabold sm:text-6xl lg:text-[64px] lg:leading-[1.03] ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              I build full-stack web apps that{' '}
              <span className="relative inline-block min-w-[170px] sm:min-w-[235px]">
                <span
                  key={ROTATING_VERBS[verbIndex]}
                  className="animate-verb-swap font-serif-italic relative inline-block bg-gradient-to-r from-blue-400 via-sky-400 to-blue-600 bg-clip-text pb-1.5 pr-3 text-[1.12em] text-transparent"
                >
                  {ROTATING_VERBS[verbIndex]}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1 left-0 right-3 h-[2px] rounded-full bg-blue-500/85"
                  />
                </span>
              </span>
            </h1>

            {/* Concise Engineering Positioning Subheadline */}
            <p
              className={`animate-hero-3 mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              I&apos;m{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                Freedom Chukwudi
              </strong>
              , a full-stack developer building real projects across the stack:
              responsive{' '}
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                React &amp; Next.js
              </span>{' '}
              interfaces, the{' '}
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                Node.js &amp; Express
              </span>{' '}
              APIs behind them, and{' '}
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                PostgreSQL
              </span>{' '}
              databases enforcing role checks and persistent state.
            </p>

            {/* Triple-Tier CTAs */}
            <div className="animate-hero-4 mt-8 flex flex-wrap items-center gap-3">
              {/* Primary Electric-Blue Magnetic Pill */}
              <MagneticElement strength={0.25}>
                <button
                  type="button"
                  onClick={() => scrollToSection('work')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500 active:scale-[0.98]"
                >
                  <span>Explore projects</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </MagneticElement>

              {/* Secondary Outline CTA */}
              <MagneticElement strength={0.2}>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    isDark
                      ? 'border-white/[0.14] bg-[#0D1017] text-slate-200 hover:border-blue-500/40 hover:text-white'
                      : 'border-slate-300 bg-white text-slate-800 hover:border-blue-500 hover:text-slate-950'
                  }`}
                >
                  <span>Get in touch</span>
                </button>
              </MagneticElement>

              {/* Subtle View Summary Modal Trigger */}
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition ${
                  isDark
                    ? 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                    : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-950'
                }`}
              >
                <FileText className="h-4 w-4 text-blue-500" />
                <span>View summary</span>
              </button>
            </div>

            {/* Subtle Location & Verified Channels Row */}
            <div className="animate-hero-4 mt-7 flex flex-wrap items-center gap-4 font-mono text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-blue-500" />
                OPEN TO REMOTE COLLABORATION
              </span>
              <span>•</span>
              <a
                href="https://github.com/Devfreedom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition hover:text-blue-400"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/freedom_web2dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition hover:text-blue-400"
              >
                <span>X / Twitter</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dual-Column Vertical Counter-Scrolling Preview Reel */}
          <div className="min-w-0">
            <HeroDualPreviewReel isDark={isDark} />
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. ANIMATED KPI COUNTER STRIP + HORIZONTAL TECH STACK MARQUEE       */}
        {/* =================================================================== */}
        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div
            className={`grid grid-cols-2 divide-y rounded-2xl border sm:grid-cols-4 sm:divide-x sm:divide-y-0 ${
              isDark
                ? 'divide-white/[0.08] border-white/[0.09] bg-[#0D1017]/80'
                : 'divide-slate-200 border-slate-200 bg-white shadow-sm'
            }`}
          >
            {KPI_METRICS.map((metric) => (
              <AnimatedKpiItem key={metric.label} metric={metric} isDark={isDark} />
            ))}
          </div>
        </section>

        {/* Full-Width Single-Line Horizontal Tech Stack Marquee */}
        <div
          className={`marquee-shell relative mt-8 w-full overflow-hidden border-y py-4 ${
            isDark ? 'border-white/10 bg-[#090B11]/60' : 'border-slate-200 bg-white/70'
          }`}
        >
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${
              isDark ? 'from-[#06070B] to-transparent' : 'from-[#F8FAFC] to-transparent'
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${
              isDark ? 'from-[#06070B] to-transparent' : 'from-[#F8FAFC] to-transparent'
            }`}
          />

          <div
            className="animate-tech-marquee font-mono text-xs font-semibold tracking-wider"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              width: 'max-content',
              alignItems: 'center',
              gap: '2.5rem',
              animation: 'techMarquee 28s linear infinite'
            }}
          >
            {[...TECH_MARQUEE_ITEMS, ...TECH_MARQUEE_ITEMS].map((tech, idx) => (
              <div
                key={`${tech}-${idx}`}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap"
              >
                <span
                  className={`transition-colors ${
                    isDark
                      ? 'text-slate-300 hover:text-blue-400'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {tech}
                </span>
                <span className="text-blue-500/70" aria-hidden="true">
                  ·
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. SPLIT-CARD SELECTED WORK SHOWCASES                               */}
        {/* =================================================================== */}
        <section id="work" className="mx-auto max-w-6xl scroll-mt-24 overflow-visible px-4 pt-16 pb-20 sm:px-6">
          <RevealSection>
            <div className="flex flex-col justify-between gap-4 border-b border-blue-500/15 pb-6 lg:flex-row lg:items-end">
              <div>
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-500">
                  SELECTED WORK
                </div>
                <h2
                  className={`font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  Shipped, live,{' '}
                  <span className="font-serif-italic pr-2 text-blue-500">
                    used.
                  </span>
                </h2>
              </div>
              <p
                className={`max-w-md text-sm leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Each project connects a React frontend to an Express API and a
                PostgreSQL database. Click{' '}
                <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>
                  Inspect architecture
                </strong>{' '}
                on any card to explore the flow and illustrative guard patterns.
              </p>
            </div>
          </RevealSection>

          <div className="mt-10 space-y-10 overflow-visible pb-6">
            {PROJECTS.map((project, idx) => {
              const isExpanded = expandedProject === project.id;
              const hasExpandedProject = expandedProject !== null;
              const currentMode = projectMode[project.id] || 'architecture';
              const activeSimIdx =
                projectSimStep[project.id] !== undefined
                  ? projectSimStep[project.id]!
                  : project.architecture.simulationSteps.length - 1;

              const stickyStackClasses = [
                'sticky top-[88px] z-10',
                'sticky top-[106px] z-20',
                'sticky top-[124px] z-30',
                'sticky top-[142px] z-40'
              ];

              return (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  className={`${
                    hasExpandedProject
                      ? 'relative z-10'
                      : stickyStackClasses[idx] || 'sticky top-[142px] z-40'
                  } scroll-mt-24`}
                >
                  <SpotlightCard
                    isDark={isDark}
                    className={
                      isDark
                        ? '!bg-[#0B0F17] shadow-[0_-20px_50px_rgba(0,0,0,0.85)]'
                        : '!bg-white shadow-[0_-16px_40px_rgba(15,23,42,0.12)]'
                    }
                  >
                    {/* Main Horizontal Split Row */}
                    <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
                      {/* Left Column: Status, Title, Summary, Mini-Metrics, Stack & CTAs (6 Cols) */}
                      <div className="lg:col-span-6">
                        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
                          <span className="uppercase tracking-wider text-slate-500">
                            {project.category}
                          </span>
                          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-semibold text-emerald-400">
                            {project.badge}
                          </span>
                        </div>

                        <h3
                          className={`font-display mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl ${
                            isDark ? 'text-white' : 'text-slate-950'
                          }`}
                        >
                          {project.title}
                        </h3>

                        <p
                          className={`mt-2.5 text-sm leading-relaxed sm:text-[15px] ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {project.summary}
                        </p>

                        {/* 3 Bold Mini-Metrics */}
                        <div className="mt-5 grid grid-cols-3 gap-3">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className={`rounded-xl border p-3 ${
                                isDark
                                  ? 'border-white/[0.07] bg-[#080A0F]'
                                  : 'border-slate-200 bg-slate-50'
                              }`}
                            >
                              <div
                                className={`font-display text-lg font-extrabold sm:text-xl ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {m.value}
                              </div>
                              <div className="mt-0.5 text-[11px] text-slate-500">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${
                                isDark
                                  ? 'border-white/[0.08] bg-[#121621] text-slate-300'
                                  : 'border-slate-200 bg-slate-100 text-slate-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons: Inspect Architecture Drawer + Live App / Source */}
                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleToggleArchitecture(project.id)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                              isExpanded
                                ? 'border-blue-500 bg-blue-600/15 text-blue-400'
                                : isDark
                                ? 'border-white/[0.14] bg-[#121621] text-white hover:border-blue-500/45'
                                : 'border-slate-300 bg-white text-slate-900 hover:border-blue-500'
                            }`}
                          >
                            <Workflow className="h-3.5 w-3.5" />
                            <span>
                              {isExpanded
                                ? 'Hide architecture'
                                : 'Inspect architecture'}
                            </span>
                          </button>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500 sm:text-sm"
                            >
                              <span>Open live preview</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-mono text-xs transition ${
                              isDark
                                ? 'border-white/[0.1] text-slate-300 hover:border-white/[0.25] hover:text-white'
                                : 'border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-950'
                            }`}
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            <span>Source code</span>
                          </a>
                        </div>
                      </div>

                      {/* Right Column: Framed macOS Browser Window Preview (6 Cols) */}
                      <div className="lg:col-span-6">
                        <ProjectBrowserMockup project={project} isDark={isDark} />
                      </div>
                    </div>

                    {/* Expandable Engineering Drawer with 3 Modes */}
                    {isExpanded && (
                      <div
                        className={`border-t p-6 sm:p-8 ${
                          isDark
                            ? 'border-white/[0.08] bg-[#080A0F]'
                            : 'border-slate-200 bg-slate-50/90'
                        }`}
                      >
                        {/* 3-Tab Switcher inside Drawer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-500/15 pb-4">
                          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-500">
                            ENGINEERING NOTES // {project.title.toUpperCase()}
                          </div>

                          <div
                            className={`flex flex-wrap rounded-xl border p-1 font-mono text-xs ${
                              isDark
                                ? 'border-white/[0.08] bg-[#0D1017]'
                                : 'border-slate-200 bg-white'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setProjectMode((prev) => ({
                                  ...prev,
                                  [project.id]: 'impact'
                                }))
                              }
                              className={`rounded-lg px-3 py-1.5 transition ${
                                currentMode === 'impact'
                                  ? 'bg-blue-600 text-white'
                                  : isDark
                                  ? 'text-slate-400 hover:text-white'
                                  : 'text-slate-600 hover:text-slate-950'
                              }`}
                            >
                              Key Features
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setProjectMode((prev) => ({
                                  ...prev,
                                  [project.id]: 'architecture'
                                }))
                              }
                              className={`rounded-lg px-3 py-1.5 transition ${
                                currentMode === 'architecture'
                                  ? 'bg-blue-600 text-white'
                                  : isDark
                                  ? 'text-slate-400 hover:text-white'
                                  : 'text-slate-600 hover:text-slate-950'
                              }`}
                            >
                              System Architecture
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setProjectMode((prev) => ({
                                  ...prev,
                                  [project.id]: 'simulation'
                                }));
                                runProjectSimulation(
                                  project.id,
                                  project.architecture.simulationSteps.length
                                );
                              }}
                              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                                currentMode === 'simulation'
                                  ? 'bg-blue-600 text-white'
                                  : isDark
                                  ? 'text-slate-400 hover:text-white'
                                  : 'text-slate-600 hover:text-slate-950'
                              }`}
                            >
                              <Play className="h-3 w-3" />
                              <span>Flow Walkthrough</span>
                            </button>
                          </div>
                        </div>

                        {/* Mode 1: Key Features */}
                        {currentMode === 'impact' && (
                          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
                            <ul className="space-y-3 lg:col-span-7">
                              {project.highlights.map((item, i) => (
                                <li
                                  key={i}
                                  className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                                    isDark ? 'text-slate-300' : 'text-slate-700'
                                  }`}
                                >
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>

                            <div
                              className={`rounded-xl border p-4 font-mono text-xs lg:col-span-5 ${
                                isDark
                                  ? 'border-white/[0.08] bg-[#0D1017]'
                                  : 'border-slate-200 bg-white'
                              }`}
                            >
                              <div className="text-[10px] uppercase tracking-wider text-slate-500">
                                ARCHITECTURE OVERVIEW
                              </div>
                              <div className="mt-3 space-y-2.5">
                                <div>
                                  <span className="text-slate-500">PATTERN: </span>
                                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                                    {project.architecture.pattern}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-slate-500">DATABASE: </span>
                                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                                    {project.architecture.database}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-slate-500">SECURITY: </span>
                                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                                    {project.architecture.auth}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Mode 2: System Architecture (4-Node Pipeline + Illustrative Pattern) */}
                        {currentMode === 'architecture' && (
                          <div className="mt-5 space-y-5">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                              {project.architecture.flow.map((step, sIdx) => (
                                <div
                                  key={step.node}
                                  className={`relative overflow-hidden rounded-xl border p-3.5 ${
                                    isDark
                                      ? 'border-white/[0.08] bg-[#0D1017]'
                                      : 'border-slate-200 bg-white'
                                  }`}
                                >
                                  <div className="absolute inset-x-0 top-0 h-[2px] bg-blue-500/10">
                                    <div
                                      className="animate-packet h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-cyan-400"
                                      style={{ animationDelay: `${sIdx * 0.45}s` }}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between font-mono text-[10px]">
                                    <span className="text-blue-500">0{sIdx + 1}</span>
                                    <span className="text-emerald-400">{step.tag}</span>
                                  </div>
                                  <div
                                    className={`mt-1 text-sm font-bold ${
                                      isDark ? 'text-white' : 'text-slate-900'
                                    }`}
                                  >
                                    {step.node}
                                  </div>
                                  <div className="mt-0.5 text-xs text-slate-400">
                                    {step.detail}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <pre
                              className={`overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-relaxed ${
                                isDark
                                  ? 'border-white/[0.08] bg-[#050609] text-slate-300'
                                  : 'border-slate-200 bg-slate-900 text-slate-200'
                              }`}
                            >
                              <code>{project.architecture.codeSnippet}</code>
                            </pre>
                          </div>
                        )}

                        {/* Mode 3: Flow Walkthrough */}
                        {currentMode === 'simulation' && (
                          <div className="mt-5">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                              <span className="font-mono text-xs text-blue-400">
                                ILLUSTRATIVE STEP-BY-STEP REQUEST TRACE
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  runProjectSimulation(
                                    project.id,
                                    project.architecture.simulationSteps.length
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-400 transition hover:bg-blue-500/20"
                              >
                                <RotateCcw className="h-3 w-3" />
                                <span>Replay Flow</span>
                              </button>
                            </div>

                            <div className="space-y-2.5 font-mono text-xs">
                              {project.architecture.simulationSteps.map(
                                (sim, sIdx) => {
                                  const reached = activeSimIdx >= sIdx;
                                  return (
                                    <div
                                      key={sim.stage}
                                      className={`flex flex-col justify-between gap-2 rounded-xl border p-3.5 transition-all duration-300 sm:flex-row sm:items-center ${
                                        reached
                                          ? isDark
                                            ? 'border-blue-500/30 bg-[#0D1017] opacity-100'
                                            : 'border-blue-300 bg-white opacity-100'
                                          : 'border-transparent opacity-35'
                                      }`}
                                    >
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-blue-500">
                                            [{sIdx + 1}/4]
                                          </span>
                                          <span
                                            className={`font-semibold ${
                                              isDark ? 'text-white' : 'text-slate-900'
                                            }`}
                                          >
                                            {sim.stage}
                                          </span>
                                        </div>
                                        <p className="mt-1 text-[11px] text-slate-400">
                                          {sim.detail}
                                        </p>
                                      </div>
                                      <span className="w-fit rounded-md bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                                        {reached ? sim.status : 'PENDING'}
                                      </span>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. INTERACTIVE 3-COLUMN BACKEND PIPELINE SANDBOX (ILLUSTRATIVE)     */}
        {/* =================================================================== */}
        <section id="sandbox" className="mx-auto mt-10 max-w-6xl scroll-mt-24 px-4 sm:px-6">
          <RevealSection>
            <div className="flex flex-col justify-between gap-4 border-b border-blue-500/15 pb-6 lg:flex-row lg:items-end">
              <div>
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-500">
                  BACKEND ARCHITECTURE // ILLUSTRATIVE RBAC SANDBOX
                </div>
                <h2
                  className={`font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  Security wired for{' '}
                  <span className="font-serif-italic pr-2 text-blue-500">
                    actual work.
                  </span>
                </h2>
              </div>
              <p
                className={`max-w-md text-sm leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Illustrative simulation: toggle a user role and target endpoint
                to inspect how JWT claims, role scopes, and parameterized
                PostgreSQL checks permit or block requests.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={90}>
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* Column 1: Simulated Request & Role Selector */}
              <SpotlightCard isDark={isDark} className="p-6">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="rounded bg-blue-600/15 px-2 py-0.5 font-bold text-blue-500">
                    01
                  </span>
                  <span
                    className={`font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Role &amp; Endpoint Input
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-400">
                  Select a simulated caller role and the endpoint they request.
                </p>

                {/* Role Pills */}
                <div className="mt-5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    AUTHENTICATED SESSION ROLE
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {SANDBOX_ROLES.map((role) => {
                      const active = selectedRole === role.id;
                      return (
                        <button
                          type="button"
                          key={role.id}
                          onClick={() => {
                            setSelectedRole(role.id);
                            handleExecuteSandbox();
                          }}
                          className={`rounded-xl border py-2.5 font-mono text-xs font-semibold transition ${
                            active
                              ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-600/20'
                              : isDark
                              ? 'border-white/[0.09] bg-[#080A0F] text-slate-300 hover:border-blue-500/40'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400'
                          }`}
                        >
                          {role.id}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Endpoint Selector */}
                <div className="mt-5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    TARGET REST ENDPOINT
                  </div>
                  <div className="mt-2 space-y-2">
                    {SANDBOX_ENDPOINTS.map((ep) => {
                      const active = selectedEndpoint === ep.id;
                      return (
                        <button
                          type="button"
                          key={ep.id}
                          onClick={() => {
                            setSelectedEndpoint(ep.id);
                            handleExecuteSandbox();
                          }}
                          className={`w-full rounded-xl border p-3 text-left transition ${
                            active
                              ? isDark
                                ? 'border-blue-500/60 bg-blue-500/10'
                                : 'border-blue-500 bg-blue-50'
                              : isDark
                              ? 'border-white/[0.07] bg-[#080A0F] hover:border-white/[0.2]'
                              : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-mono text-xs font-semibold text-blue-400">
                            {ep.id}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            {ep.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SpotlightCard>

              {/* Column 2: Middleware & PostgreSQL Guard Inspection */}
              <SpotlightCard isDark={isDark} className="p-6">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="rounded bg-blue-600/15 px-2 py-0.5 font-bold text-blue-500">
                    02
                  </span>
                  <span
                    className={`font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    JWT + PostgreSQL Guard
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-400">
                  Claims checked against required route scope before SQL runs.
                </p>

                {/* Simulated JWT Claims JSON */}
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-slate-500">
                    <span>SIMULATED BEARER CLAIMS</span>
                    <span className="text-emerald-400">JWT VALID</span>
                  </div>
                  <pre
                    className={`overflow-x-auto rounded-xl border p-3 font-mono text-[11px] leading-relaxed ${
                      isDark
                        ? 'border-white/[0.08] bg-[#06070B] text-slate-300'
                        : 'border-slate-200 bg-slate-900 text-slate-200'
                    }`}
                  >
                    <code>
                      {JSON.stringify(
                        {
                          sub: activeRoleObj.userId,
                          role: activeRoleObj.id.toUpperCase(),
                          context: activeRoleObj.tenantId,
                          requiredScope: activeEndpointObj.requiredScope,
                          scopeGranted: isSandboxAuthorized
                        },
                        null,
                        2
                      )}
                    </code>
                  </pre>
                </div>

                {/* Illustrative SQL Query Guard */}
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-slate-500">
                    <span>ILLUSTRATIVE SQL PATTERN</span>
                    <span
                      className={
                        isSandboxAuthorized ? 'text-blue-400' : 'text-rose-400'
                      }
                    >
                      {isSandboxAuthorized ? 'PREPARED' : 'BLOCKED_PRE_SQL'}
                    </span>
                  </div>
                  <pre
                    className={`overflow-x-auto rounded-xl border p-3 font-mono text-[11px] leading-relaxed ${
                      isDark
                        ? 'border-white/[0.08] bg-[#06070B] text-cyan-300'
                        : 'border-slate-200 bg-slate-900 text-cyan-300'
                    }`}
                  >
                    <code>{activeEndpointObj.sqlGuard}</code>
                  </pre>
                </div>
              </SpotlightCard>

              {/* Column 3: Simulated Execution Output */}
              <SpotlightCard isDark={isDark} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="rounded bg-blue-600/15 px-2 py-0.5 font-bold text-blue-500">
                        03
                      </span>
                      <span
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Simulated Response
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleExecuteSandbox}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 font-mono text-[11px] font-semibold text-white transition hover:bg-blue-500"
                    >
                      <Play className="h-3 w-3" />
                      <span>Run Check</span>
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Deterministic HTTP status &amp; JSON payload returned to client.
                  </p>

                  {/* HTTP Status Banner */}
                  <div
                    className={`mt-5 rounded-xl border p-4 transition-opacity duration-200 ${
                      sandboxRunning ? 'opacity-40' : 'opacity-100'
                    } ${
                      isSandboxAuthorized
                        ? 'border-emerald-500/35 bg-emerald-500/[0.08]'
                        : 'border-rose-500/35 bg-rose-500/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold ${
                          isSandboxAuthorized ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isSandboxAuthorized ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <ShieldAlert className="h-4 w-4" />
                        )}
                        {isSandboxAuthorized
                          ? activeEndpointObj.successResponse.statusText
                          : activeEndpointObj.deniedResponse.statusText}
                      </span>
                      <span className="rounded bg-black/25 px-2 py-0.5 text-[11px] text-slate-300">
                        {isSandboxAuthorized
                          ? activeEndpointObj.successResponse.tag
                          : activeEndpointObj.deniedResponse.tag}
                      </span>
                    </div>

                    <pre
                      className={`mt-3 overflow-x-auto rounded-lg border p-3 font-mono text-[11px] leading-relaxed ${
                        isDark
                          ? 'border-white/[0.08] bg-[#06070B] text-slate-200'
                          : 'border-slate-200 bg-slate-900 text-slate-100'
                      }`}
                    >
                      <code>
                        {JSON.stringify(
                          isSandboxAuthorized
                            ? activeEndpointObj.successResponse.body
                            : activeEndpointObj.deniedResponse.body,
                          null,
                          2
                        )}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="mt-4 border-t border-blue-500/15 pt-3 font-mono text-[11px] text-slate-500">
                  {sandboxExecuted &&
                    (isSandboxAuthorized
                      ? `✓ Authorized ${selectedRole} → simulated SQL check passed.`
                      : `✕ Blocked ${selectedRole} at RBAC middleware before database touch.`)}
                </div>
              </SpotlightCard>
            </div>
          </RevealSection>
        </section>

        {/* =================================================================== */}
        {/* 6. CAPABILITIES & 4-STEP BUILD PROCESS                              */}
        {/* =================================================================== */}
        <section id="services" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-4 sm:px-6">
          <RevealSection>
            <div className="flex flex-col justify-between gap-4 border-b border-blue-500/15 pb-6 lg:flex-row lg:items-end">
              <div>
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-500">
                  CAPABILITIES &amp; APPROACH
                </div>
                <h2
                  className={`font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  What I can build{' '}
                  <span className="font-serif-italic pr-2 text-blue-500">
                    for you.
                  </span>
                </h2>
              </div>
              <p
                className={`max-w-md text-sm leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                From responsive React &amp; Next.js interfaces to Express APIs
                and PostgreSQL schemas, I learn by shipping complete vertical
                slices and iterating on clarity.
              </p>
            </div>
          </RevealSection>

          {/* 3-Card Capability Grid with Top-Edge Electric Blue Hover Glow */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {SERVICES_LIST.map((service, idx) => {
              const Icon = service.icon;
              return (
                <RevealSection key={service.title} delay={idx * 80}>
                  <SpotlightCard
                    isDark={isDark}
                    className="flex h-full flex-col justify-between p-6 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-blue-500 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
                  >
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-600/10 text-blue-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3
                        className={`font-display mt-5 text-xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-2 border-t border-blue-500/15 pt-4 text-xs">
                      {service.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-center gap-2 ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </RevealSection>
              );
            })}
          </div>

          {/* 4-Step Horizontal Build Process Strip */}
          <RevealSection delay={140}>
            <div
              className={`mt-6 grid grid-cols-1 divide-y rounded-2xl border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 ${
                isDark
                  ? 'divide-white/[0.08] border-white/[0.09] bg-[#0D1017]'
                  : 'divide-slate-200 border-slate-200 bg-white shadow-sm'
              }`}
            >
              {DELIVERY_STEPS.map((item) => (
                <div key={item.step} className="p-5 sm:p-6">
                  <div className="font-mono text-xs font-bold text-blue-500">
                    {item.step}
                  </div>
                  <div
                    className={`font-display mt-2 text-base font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* =================================================================== */}
        {/* 7. ABOUT SECTION WITH PORTRAIT                                      */}
        {/* =================================================================== */}
        <section id="about" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-4 sm:px-6">
          <RevealSection>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <SpotlightCard
                  isDark={isDark}
                  className="overflow-hidden rounded-3xl p-3 sm:p-4"
                >
                  <div
                    className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl border ${
                      isDark ? 'border-white/[0.08] bg-[#090B11]' : 'border-slate-200 bg-slate-100'
                    }`}
                  >
                    <Image
                      src={portrait}
                      alt="Portrait of Freedom Chukwudi"
                      fill
                      sizes="(max-width: 1024px) 90vw, 420px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between px-1">
                    <div>
                      <div
                        className={`font-display text-sm font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Freedom Chukwudi
                      </div>
                      <div
                        className={`font-mono text-xs ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Full-Stack Engineer
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium ${
                        isDark
                          ? 'border-blue-500/30 bg-blue-500/10 text-blue-300'
                          : 'border-blue-200 bg-blue-50 text-blue-700'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Builder
                    </span>
                  </div>
                </SpotlightCard>
              </div>

              <div className="lg:col-span-7">
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-500">
                  ABOUT
                </div>
                <h2
                  className={`font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  I like software that makes the next step{' '}
                  <span className="font-serif-italic pr-2 text-blue-500">
                    obvious.
                  </span>
                </h2>

                <div
                  className={`mt-6 space-y-4 text-base leading-relaxed sm:text-[17px] ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  <p>
                    I am a full-stack engineer focused on building real, working web
                    applications from database schema to user interface rather than stopping
                    at static prototypes.
                  </p>
                  <p>
                    On the frontend, I build with React, Next.js, TypeScript, and Tailwind CSS,
                    keeping components modular, readable, and resilient across mobile and
                    desktop viewports. On the backend, I design REST APIs, role-based access
                    controls, and transactional PostgreSQL models with Node.js, Express, and
                    Sequelize.
                  </p>
                  <p>
                    Across SwiftDrop, Northbridge Health, Nairova, and Aura Suites &amp; Apartments,
                    my focus stays on clear flows, honest error handling, and maintainable
                    architecture that improves through direct user feedback.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? 'border-white/[0.08] bg-[#0D1017]/90'
                        : 'border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-500">
                      Frontend Systems
                    </div>
                    <div
                      className={`mt-1.5 text-sm font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      React, Next.js, TypeScript &amp; Tailwind CSS
                    </div>
                  </div>
                  <div
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? 'border-white/[0.08] bg-[#0D1017]/90'
                        : 'border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-500">
                      Backend &amp; Data
                    </div>
                    <div
                      className={`mt-1.5 text-sm font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Node.js, Express, PostgreSQL &amp; Sequelize
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    Start a conversation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/Devfreedom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isDark
                        ? 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-blue-400/50 hover:text-white'
                        : 'border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:text-slate-950'
                    }`}
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub Profile
                    <ArrowUpRight className="h-4 w-4 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* =================================================================== */}
        {/* 8. HIGH-CONVERSION CONTACT SPLIT + OVERSIZED KINETIC FOOTER         */}
        {/* =================================================================== */}
        <section id="contact" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-4 sm:px-6">
          <RevealSection>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left Side: Headline + Animated Brush Underline + Copy Email + Links (6 Cols) */}
              <div className="lg:col-span-6">
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-500">
                  CONTACT
                </div>
                <h2
                  className={`font-display mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[54px] lg:leading-[1.04] ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  Got something worth building?
                </h2>
                <AnimatedBrushUnderline />

                {/* One-Click Copy Email Pill */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-blue-500/15 pb-5">
                  <div>
                    <a
                      href={`mailto:${email}`}
                      className={`font-display text-lg font-bold transition hover:text-blue-400 sm:text-2xl ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {email}
                    </a>
                    <div className="mt-0.5 font-mono text-xs text-slate-500">
                      Open to feedback, collaboration, and full-stack roles
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 font-mono text-xs font-semibold transition ${
                      isDark
                        ? 'border-white/[0.12] bg-[#0D1017] text-slate-200 hover:border-blue-500/50 hover:text-white'
                        : 'border-slate-300 bg-white text-slate-800 hover:border-blue-500'
                    }`}
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-blue-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Channel Rows */}
                <div className="divide-y divide-blue-500/15 font-mono text-sm">
                  <a
                    href="https://github.com/Devfreedom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between py-4 transition ${
                      isDark
                        ? 'text-slate-200 hover:text-blue-400'
                        : 'text-slate-800 hover:text-blue-600'
                    }`}
                  >
                    <span className="font-semibold">GitHub (@Devfreedom)</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                  </a>
                  <a
                    href="https://x.com/freedom_web2dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between py-4 transition ${
                      isDark
                        ? 'text-slate-200 hover:text-blue-400'
                        : 'text-slate-800 hover:text-blue-600'
                    }`}
                  >
                    <span className="font-semibold">X / Twitter (@freedom_web2dev)</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                  </a>
                  <a
                    href="https://hackmd.io/@freedomchukwudi01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between py-4 transition ${
                      isDark
                        ? 'text-slate-200 hover:text-blue-400'
                        : 'text-slate-800 hover:text-blue-600'
                    }`}
                  >
                    <span className="font-semibold">
                      HackMD Notes (@freedomchukwudi01)
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                  </a>
                </div>
              </div>

              {/* Right Side: Interactive Scope-Selector Contact Form (6 Cols) */}
              <div className="lg:col-span-6">
                <SpotlightCard isDark={isDark} className="p-6 sm:p-8">
                  {contactSubmitted ? (
                    <div className="py-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h3
                        className={`font-display mt-4 text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Project brief ready.
                      </h3>
                      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                        Thanks, <strong className="text-blue-400">{contactName}</strong>.
                        Your brief ({selectedScopes.join(' + ')} · {selectedTimeline}) is
                        formatted for your mail client below.
                      </p>

                      <div
                        className={`mx-auto mt-5 max-w-md rounded-xl border p-4 text-left font-mono text-xs ${
                          isDark
                            ? 'border-white/[0.08] bg-[#07090E] text-slate-300'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>FROM: {contactEmail}</div>
                        <div className="mt-1">
                          SCOPE: {selectedScopes.join(' + ')} · {selectedTimeline}
                        </div>
                        <div className="mt-2 whitespace-pre-line border-t border-blue-500/15 pt-2 text-slate-400">
                          {contactBrief}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <a
                          href={`mailto:${email}?subject=${encodeURIComponent(
                            `[${selectedScopes.join(' + ')} · ${selectedTimeline}] Inquiry from ${contactName}`
                          )}&body=${encodeURIComponent(contactBrief)}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Open in Mail App</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setContactSubmitted(false)}
                          className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                            isDark
                              ? 'border-white/[0.12] text-slate-300 hover:text-white'
                              : 'border-slate-300 text-slate-700 hover:text-slate-950'
                          }`}
                        >
                          Edit brief
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit}>
                      {/* 2-Minute Project Scoper: Scope Pills */}
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                          SCOPE
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {CONTACT_SCOPES.map((scope) => {
                            const active = selectedScopes.includes(scope);
                            return (
                              <button
                                type="button"
                                key={scope}
                                aria-pressed={active}
                                onClick={() => handleToggleScope(scope)}
                                className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] font-semibold transition ${
                                  active
                                    ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                                    : isDark
                                    ? 'border-white/[0.1] bg-[#07090E] text-slate-400 hover:border-blue-500/40 hover:text-slate-200'
                                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-400'
                                }`}
                              >
                                {scope}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2-Minute Project Scoper: Timeline Pills */}
                      <div className="mt-4">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                          TIMELINE
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {CONTACT_TIMELINES.map((timeline) => {
                            const active = selectedTimeline === timeline;
                            return (
                              <button
                                type="button"
                                key={timeline}
                                aria-pressed={active}
                                onClick={() => handleSelectTimeline(timeline)}
                                className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] font-semibold transition ${
                                  active
                                    ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                                    : isDark
                                    ? 'border-white/[0.1] bg-[#07090E] text-slate-400 hover:border-blue-500/40 hover:text-slate-200'
                                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-400'
                                }`}
                              >
                                {timeline}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Live Mini Sprint-Estimate Badge */}
                      <div
                        className={`mt-4 flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-[11px] ${
                          isDark
                            ? 'border-blue-500/25 bg-blue-500/[0.08] text-blue-300'
                            : 'border-blue-200 bg-blue-50 text-blue-700'
                        }`}
                      >
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                        <span>
                          {getSprintEstimateLabel(selectedScopes, selectedTimeline)}
                        </span>
                      </div>

                      {/* Name & Email Inputs */}
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block font-mono text-[10px] uppercase tracking-wider text-slate-500"
                          >
                            NAME
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Your name"
                            className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none ${
                              isDark
                                ? 'border-white/[0.1] bg-[#07090E] text-white placeholder-slate-600'
                                : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400'
                            }`}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block font-mono text-[10px] uppercase tracking-wider text-slate-500"
                          >
                            EMAIL
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="you@company.com"
                            className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none ${
                              isDark
                                ? 'border-white/[0.1] bg-[#07090E] text-white placeholder-slate-600'
                                : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Project Brief Textarea */}
                      <div className="mt-4">
                        <label
                          htmlFor="contact-brief"
                          className="block font-mono text-[10px] uppercase tracking-wider text-slate-500"
                        >
                          TELL ME ABOUT IT
                        </label>
                        <textarea
                          id="contact-brief"
                          rows={4}
                          value={contactBrief}
                          onChange={(e) => setContactBrief(e.target.value)}
                          placeholder="What are you building or looking to collaborate on?"
                          className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none ${
                            isDark
                              ? 'border-white/[0.1] bg-[#07090E] text-white placeholder-slate-600'
                              : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-xs text-slate-500">
                          Prepares a pre-filled email to {email}.
                        </span>
                        <MagneticElement strength={0.2}>
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
                          >
                            <span>Prepare message</span>
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </MagneticElement>
                      </div>
                    </form>
                  )}
                </SpotlightCard>
              </div>
            </div>
          </RevealSection>

          {/* Oversized Kinetic Footer Typography */}
          <RevealSection delay={100}>
            <div className="mt-24 border-t border-blue-500/15 pt-12">
              <div
                className={`font-display select-none text-3xl font-extrabold tracking-tight sm:text-6xl lg:text-[74px] lg:leading-[0.98] ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                LET&apos;S BUILD SOMETHING{' '}
                <span className="font-serif-italic inline-block bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 bg-clip-text pr-3 font-normal text-transparent">
                  resilient.
                </span>
              </div>

              <footer className="mt-8 flex flex-col items-center justify-between gap-3 font-mono text-xs text-slate-500 sm:flex-row">
                <span>
                  © {currentYear} Freedom Chukwudi. All rights reserved.
                </span>
                <div className="flex items-center gap-5">
                  <span>Press ⌘K for command palette</span>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-1 font-semibold text-blue-500 transition hover:text-blue-400"
                  >
                    <span>Back to top</span>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                </div>
              </footer>
            </div>
          </RevealSection>
        </section>
      </main>

      {/* ===================================================================== */}
      {/* INTERACTIVE ENGINEERING SUMMARY MODAL                                 */}
      {/* ===================================================================== */}
      {resumeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-md"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className={`max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:p-8 ${
              isDark
                ? 'border-white/[0.14] bg-[#0D1017] text-slate-100'
                : 'border-slate-200 bg-white text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-blue-500/15 pb-5">
              <div>
                <div className="font-mono text-xs font-semibold text-blue-500">
                  ENGINEERING SUMMARY // FULL-STACK DEVELOPER
                </div>
                <h3 id="resume-modal-title" className="font-display mt-1 text-2xl font-extrabold">
                  Freedom Chukwudi
                </h3>
                <p className="mt-1 font-mono text-xs text-slate-400">
                  Remote Friendly (WAT / UTC+1) • {email}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition ${
                    isDark
                      ? 'border-white/[0.12] bg-[#07090E] text-slate-300 hover:text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <Printer className="h-3.5 w-3.5 text-blue-500" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  aria-label="Close summary modal"
                  onClick={() => setResumeOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-5 text-sm">
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-500">
                  OVERVIEW
                </div>
                <p className="mt-1.5 leading-relaxed text-slate-400">
                  Full-Stack Developer building multi-role web applications and
                  REST APIs with React, Next.js, TypeScript, Node.js, Express,
                  and PostgreSQL. Focused on connecting responsive interfaces to
                  persistent relational databases, explicit role guards, and clear
                  error handling.
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-500">
                  TECHNOLOGIES USED
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-xs">
                  {TECH_MARQUEE_ITEMS.map((t) => (
                    <span
                      key={t}
                      className={`rounded-md border px-2.5 py-1 ${
                        isDark
                          ? 'border-white/[0.08] bg-[#07090E] text-slate-300'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-500">
                  SELECTED FULL-STACK PROJECTS
                </div>
                <div className="mt-2.5 space-y-3">
                  {PROJECTS.map((p) => (
                    <div
                      key={p.id}
                      className={`rounded-xl border p-3.5 ${
                        isDark
                          ? 'border-white/[0.08] bg-[#07090E]'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">
                          {p.title} —{' '}
                          <span className="font-normal text-slate-400">
                            {p.subtitle}
                          </span>
                        </span>
                        <a
                          href={p.liveUrl || p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 font-mono text-xs text-blue-500 hover:underline"
                        >
                          Inspect ↗
                        </a>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{p.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-blue-500/15 pt-4">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Email ({email})</span>
              </button>
              <a
                href="https://github.com/Devfreedom"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-blue-500 hover:underline"
              >
                github.com/Devfreedom ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* KEYBOARD-DRIVEN COMMAND PALETTE MODAL (⌘K / Ctrl+K)                   */}
      {/* ===================================================================== */}
      {cmdOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-20 backdrop-blur-md sm:pt-28"
          onClick={() => setCmdOpen(false)}
        >
          <div
            className={`w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${
              isDark
                ? 'border-white/[0.14] bg-[#0D1017]'
                : 'border-slate-200 bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`flex items-center gap-3 border-b px-4 py-3.5 ${
                isDark ? 'border-white/[0.08]' : 'border-slate-200'
              }`}
            >
              <Search className="h-4 w-4 text-blue-500" />
              <input
                type="text"
                autoFocus
                aria-label="Search commands"
                value={cmdQuery}
                onChange={(e) => {
                  setCmdQuery(e.target.value);
                  setCmdSelectedIndex(0);
                }}
                placeholder="Jump to section, toggle theme, open summary, or launch app..."
                className={`w-full bg-transparent text-sm focus:outline-none ${
                  isDark
                    ? 'text-white placeholder-slate-500'
                    : 'text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="button"
                aria-label="Close command palette"
                onClick={() => setCmdOpen(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {commandActions.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-slate-500">
                  No matching commands found.
                </div>
              ) : (
                commandActions.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === cmdSelectedIndex;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onMouseEnter={() => setCmdSelectedIndex(idx)}
                      onClick={item.action}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        isSelected
                          ? 'bg-blue-600/15 text-blue-400'
                          : isDark
                          ? 'text-slate-300 hover:bg-white/[0.04]'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 ${
                            isSelected ? 'text-blue-500' : 'text-slate-500'
                          }`}
                        />
                        <span>{item.label}</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        {item.hint}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div
              className={`flex items-center justify-between border-t px-4 py-2 font-mono text-[10px] text-slate-500 ${
                isDark
                  ? 'border-white/[0.08] bg-[#07090E]'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <span>↑↓ Navigate</span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> Execute
              </span>
              <span>ESC Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
