import React from 'react';
import { Clock, User } from 'lucide-react';
import type { AuditLogEntry } from '../types/audit';

interface AuditLogListProps {
  logs: AuditLogEntry[];
  selectedId: string | null;
  onSelectLog: (log: AuditLogEntry) => void;
}

export function AuditLogList({ logs, selectedId, onSelectLog }: AuditLogListProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-600 bg-green-50';
      case 'update': return 'text-blue-600 bg-blue-50';
      case 'delete': return 'text-red-600 bg-red-50';
      case 'assign': return 'text-purple-600 bg-purple-50';
      case 'unassign': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <button
          key={log.id}
          onClick={() => onSelectLog(log)}
          className={`w-full text-left p-4 rounded-lg transition-all ${
            selectedId === log.id
              ? 'bg-blue-50 border-blue-200 shadow-sm'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.actionType)}`}>
              {log.actionType}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1">{log.entityName}</h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {log.userName}
            </div>
            <span>•</span>
            <span className="capitalize">{log.entityType}</span>
          </div>
        </button>
      ))}
    </div>
  );
}