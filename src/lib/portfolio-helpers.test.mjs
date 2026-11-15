import test from 'node:test';
import assert from 'node:assert/strict';
import { checkRoleAuthorized, mergeScopedBrief } from './portfolio-helpers.ts';

const TEST_ROLES = [
  {
    id: 'Customer',
    userId: 'usr_cust_8841',
    tenantId: 'role_customer',
    scopes: ['deliveries:create', 'appointments:book', 'transfers:pin-verify']
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

const TEST_ENDPOINTS = [
  { id: 'POST /api/orders/:id/cash-handoff', requiredScope: 'orders:cash-handoff' },
  { id: 'POST /api/appointments/book', requiredScope: 'appointments:book' },
  { id: 'PATCH /api/deliveries/:id/transit', requiredScope: 'deliveries:advance:transit' }
];

test('mergeScopedBrief initializes header when text is empty', () => {
  const result = mergeScopedBrief('', ['Full-Stack Web App'], '2–4 Weeks');
  assert.equal(
    result,
    'Scope: Full-Stack Web App\nTimeline: 2–4 Weeks\n\nProject Notes:\n'
  );
});

test('mergeScopedBrief updates Scope/Timeline while preserving custom user notes', () => {
  const initial =
    'Scope: Full-Stack Web App\nTimeline: 2–4 Weeks\n\nProject Notes:\nNeed Paystack webhooks and admin CSV export.';
  const updated = mergeScopedBrief(
    initial,
    ['Full-Stack Web App', 'Booking / E-Commerce'],
    '1–2 Months'
  );
  assert.equal(
    updated,
    'Scope: Full-Stack Web App + Booking / E-Commerce\nTimeline: 1–2 Months\n\nProject Notes:\nNeed Paystack webhooks and admin CSV export.'
  );
});

test('mergeScopedBrief preserves freeform notes typed before marker exists', () => {
  const updated = mergeScopedBrief(
    'Scope: Old Scope\nBuilding a multi-tenant portal.',
    ['SaaS MVP'],
    'Full-Time / Ongoing Role'
  );
  assert.equal(
    updated,
    'Scope: SaaS MVP\nTimeline: Full-Time / Ongoing Role\n\nProject Notes:\nBuilding a multi-tenant portal.'
  );
});

test('checkRoleAuthorized permits Admin wildcard and matching role scopes (200 OK)', () => {
  assert.equal(
    checkRoleAuthorized(TEST_ROLES, TEST_ENDPOINTS, 'Admin', 'POST /api/orders/:id/cash-handoff'),
    true
  );
  assert.equal(
    checkRoleAuthorized(TEST_ROLES, TEST_ENDPOINTS, 'Customer', 'POST /api/appointments/book'),
    true
  );
  assert.equal(
    checkRoleAuthorized(TEST_ROLES, TEST_ENDPOINTS, 'Rider', 'PATCH /api/deliveries/:id/transit'),
    true
  );
});

test('checkRoleAuthorized denies unauthorized roles (403 Forbidden)', () => {
  assert.equal(
    checkRoleAuthorized(TEST_ROLES, TEST_ENDPOINTS, 'Rider', 'POST /api/orders/:id/cash-handoff'),
    false
  );
  assert.equal(
    checkRoleAuthorized(TEST_ROLES, TEST_ENDPOINTS, 'Customer', 'PATCH /api/deliveries/:id/transit'),
    false
  );
});
