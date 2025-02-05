import React from 'react';
import { Clock, User, Box, ArrowRight } from 'lucide-react';
import { AuditLogEntry as AuditLogEntryType } from '../types/audit';

interface AuditLogEntryProps {
  entry: AuditLogEntryType;
}

export function AuditLogEntry({ entry }: AuditLogEntryProps) {
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
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${getActionColor(entry.actionType)}`}>
              {entry.actionType.charAt(0).toUpperCase() + entry.actionType.slice(1)}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">{entry.entityType}</span>
          </div>
          
          <h3 className="text-lg font-medium">{entry.entityName}</h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(entry.timestamp).toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {entry.userName}
            </div>
          </div>
        </div>
      </div>

      {entry.changes && entry.changes.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Changes</h4>
          <div className="space-y-1">
            {entry.changes.map((change, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">{change.field}:</span>
                <span className="text-gray-800">{String(change.oldValue)}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-800">{String(change.newValue)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}