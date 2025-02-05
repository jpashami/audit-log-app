export type EntityType = 
  | 'organization'
  | 'sub-organization'
  | 'site'
  | 'lab'
  | 'gateway'
  | 'instrument'
  | 'user';

export type ActionType = 'create' | 'update' | 'delete' | 'assign' | 'unassign';

export interface Organization {
  id: string;
  name: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  organizationId: string;
  organizationName: string;
  entityType: EntityType;
  entityId: string;
  entityName: string;
  actionType: ActionType;
  userId: string;
  userName: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  metadata?: Record<string, any>;
}