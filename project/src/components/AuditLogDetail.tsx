import React from 'react';
import { Clock, User, Box, Building, ArrowRight } from 'lucide-react';
import type { AuditLogEntry } from '../types/audit';

interface AuditLogDetailProps {
  entry: AuditLogEntry | null;
}

export function AuditLogDetail({ entry }: AuditLogDetailProps) {
  if (!entry) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select an audit log entry to view details
      </div>
    );
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-600';
      case 'update': return 'text-blue-600';
      case 'delete': return 'text-red-600';
      case 'assign': return 'text-purple-600';
      case 'unassign': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg shadow-sm space-y-6">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-lg font-medium ${getActionColor(entry.actionType)}`}>
            {entry.actionType.charAt(0).toUpperCase() + entry.actionType.slice(1)}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{entry.entityType}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{entry.entityName}</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Organization</label>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-400" />
              <span>{entry.organizationName}</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Timestamp</label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{new Date(entry.timestamp).toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">User</label>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              <span>{entry.userName}</span>
            </div>
          </div>
        </div>

        {entry.changes && entry.changes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Changes</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {entry.changes.map((change, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-gray-600 min-w-[120px]">{change.field}</span>
                  <span className="text-gray-800">{String(change.oldValue || '-')}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-800">{String(change.newValue || '-')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {entry.metadata && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(entry.metadata, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}