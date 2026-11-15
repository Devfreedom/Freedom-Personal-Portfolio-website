export type RoleId = 'Customer' | 'Rider' | 'Admin';

export type ContactScope =
  | 'Full-Stack Web App'
  | 'SaaS MVP'
  | 'Booking / E-Commerce'
  | 'API & Database Architecture';

export type ContactTimeline =
  | '2–4 Weeks'
  | '1–2 Months'
  | 'Full-Time / Ongoing Role';

export interface SandboxRole {
  id: RoleId;
  userId: string;
  tenantId: string;
  scopes: string[];
}

export interface SandboxEndpoint {
  id: string;
  project: string;
  requiredScope: string;
  description: string;
  sqlGuard: string;
  getDeniedLog: (role: RoleId) => string;
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

const BRIEF_NOTES_MARKER = 'Project Notes:';

/** Updates structured Scope/Timeline headers while preserving custom user notes. */
export function mergeScopedBrief(
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

  const stripped = trimmed
    .replace(/^Scope:.*(\r?\nTimeline:.*)?(\r?\n)*/i, '')
    .trim();

  return stripped
    ? `${header}\n\n${BRIEF_NOTES_MARKER}\n${stripped}`
    : `${header}\n\n${BRIEF_NOTES_MARKER}\n`;
}

/** Evaluates whether a simulated role holds the scope required by an endpoint. */
export function checkRoleAuthorized(
  roles: readonly SandboxRole[],
  endpoints: readonly Pick<SandboxEndpoint, 'id' | 'requiredScope'>[],
  roleId: RoleId,
  endpointId: string
): boolean {
  const roleObj = roles.find((r) => r.id === roleId) || roles[0];
  const endpointObj = endpoints.find((e) => e.id === endpointId) || endpoints[0];
  if (!roleObj || !endpointObj) return false;
  if (roleObj.scopes.includes('*')) return true;
  return roleObj.scopes.includes(endpointObj.requiredScope);
}
