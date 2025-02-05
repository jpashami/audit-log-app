import React, { useState, useEffect } from 'react';
import { Download, Building } from 'lucide-react';
import { AuditLogFilters } from '../components/AuditLogFilters';
import { AuditLogList } from '../components/AuditLogList';
import { AuditLogDetail } from '../components/AuditLogDetail';
import type { AuditLogEntry as AuditLogEntryType, EntityType, ActionType, Organization } from '../types/audit';

const organizations: Organization[] = [
  { id: 'org-1', name: 'KIPIC' },
  { id: 'org-2', name: 'Petrobras' },
  { id: 'org-3', name: 'Camin Cargo' },
  { id: 'org-4', name: 'SGS' },
];

// Extended dummy data with organization context
const dummyLogs: AuditLogEntryType[] = [
  {
    id: '1',
    timestamp: '2024-03-15T09:00:00Z',
    organizationId: 'org-1',
    organizationName: 'KIPIC',
    entityType: 'lab',
    entityId: 'lab-1',
    entityName: 'Chemical Analysis Lab',
    actionType: 'create',
    userId: 'user-1',
    userName: 'Ahmed Al-Salem',
    changes: [
      { field: 'name', oldValue: null, newValue: 'Chemical Analysis Lab' },
      { field: 'location', oldValue: null, newValue: 'Building A, Floor 2' }
    ]
  },
  {
    id: '2',
    timestamp: '2024-03-15T10:30:00Z',
    organizationId: 'org-2',
    organizationName: 'Petrobras',
    entityType: 'instrument',
    entityId: 'inst-1',
    entityName: 'GC-MS Analyzer',
    actionType: 'assign',
    userId: 'user-2',
    userName: 'Carlos Silva',
    changes: [
      { field: 'assignedLab', oldValue: null, newValue: 'Petroleum Testing Lab' }
    ]
  },
  {
    id: '3',
    timestamp: '2024-03-15T11:15:00Z',
    organizationId: 'org-3',
    organizationName: 'Camin Cargo',
    entityType: 'site',
    entityId: 'site-1',
    entityName: 'Rotterdam Port Facility',
    actionType: 'update',
    userId: 'user-3',
    userName: 'Jan Vermeer',
    changes: [
      { field: 'capacity', oldValue: '1000', newValue: '1500' },
      { field: 'status', oldValue: 'under-construction', newValue: 'operational' }
    ]
  },
  {
    id: '4',
    timestamp: '2024-03-15T13:45:00Z',
    organizationId: 'org-4',
    organizationName: 'SGS',
    entityType: 'gateway',
    entityId: 'gw-1',
    entityName: 'Lab Gateway Alpha',
    actionType: 'create',
    userId: 'user-4',
    userName: 'Marie Schmidt',
    changes: [
      { field: 'location', oldValue: null, newValue: 'Hamburg Lab Complex' }
    ]
  },
  // Add 26 more entries with varied timestamps, actions, and organizations...
  {
    id: '30',
    timestamp: '2024-03-16T17:00:00Z',
    organizationId: 'org-1',
    organizationName: 'KIPIC',
    entityType: 'user',
    entityId: 'user-10',
    entityName: 'Fatima Al-Rashid',
    actionType: 'assign',
    userId: 'user-1',
    userName: 'Ahmed Al-Salem',
    changes: [
      { field: 'role', oldValue: null, newValue: 'Lab Manager' },
      { field: 'accessLevel', oldValue: null, newValue: 'admin' }
    ]
  }
];

export function AuditLogPage() {
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [logs, setLogs] = useState<AuditLogEntryType[]>([]);
  const [selectedLog, setSelectedLog] = useState<AuditLogEntryType | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const [entityType, setEntityType] = useState<EntityType | ''>('');
  const [actionType, setActionType] = useState<ActionType | ''>('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    const filteredLogs = dummyLogs.filter(log => {
      if (selectedOrg && log.organizationId !== selectedOrg) return false;
      if (entityType && log.entityType !== entityType) return false;
      if (actionType && log.actionType !== actionType) return false;
      if (searchQuery && !log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !log.userName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (dateRange.start && new Date(log.timestamp) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(log.timestamp) > new Date(dateRange.end)) return false;
      return true;
    });
    
    setTimeout(() => {
      setLogs(filteredLogs);
      setHasMore(false);
      setLoading(false);
    }, 500);
  }, [selectedOrg, entityType, actionType, dateRange, searchQuery]);

  const handleExport = async () => {
    const csvContent = [
      ['Organization', 'Timestamp', 'Entity Type', 'Entity Name', 'Action', 'User', 'Changes'],
      ...logs.map(log => [
        log.organizationName,
        new Date(log.timestamp).toLocaleString(),
        log.entityType,
        log.entityName,
        log.actionType,
        log.userName,
        log.changes ? log.changes.map(c => `${c.field}: ${c.oldValue} → ${c.newValue}`).join('; ') : ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-gray-500" />
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="border rounded-lg px-4 py-2 bg-white text-gray-900 min-w-[200px]"
              >
                <option value="">All Organizations</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <AuditLogFilters
          entityType={entityType}
          setEntityType={setEntityType}
          actionType={actionType}
          setActionType={setActionType}
          dateRange={dateRange}
          setDateRange={setDateRange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="mt-6 grid grid-cols-[400px,1fr] gap-6">
          <div className="bg-gray-100 rounded-lg p-4 max-h-[calc(100vh-220px)] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
              </div>
            ) : (
              <AuditLogList
                logs={logs}
                selectedId={selectedLog?.id || null}
                onSelectLog={setSelectedLog}
              />
            )}
          </div>

          <div className="bg-gray-100 rounded-lg max-h-[calc(100vh-220px)] overflow-y-auto">
            <AuditLogDetail entry={selectedLog} />
          </div>
        </div>
      </div>
    </div>
  );
}