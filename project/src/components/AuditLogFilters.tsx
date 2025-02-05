import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { EntityType, ActionType } from '../types/audit';

interface AuditLogFiltersProps {
  entityType: EntityType | '';
  setEntityType: (type: EntityType | '') => void;
  actionType: ActionType | '';
  setActionType: (type: ActionType | '') => void;
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function AuditLogFilters({
  entityType,
  setEntityType,
  actionType,
  setActionType,
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery,
}: AuditLogFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by entity name or user..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <select
            className="border rounded-lg px-4 py-2 bg-white"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value as EntityType)}
          >
            <option value="">All Entity Types</option>
            <option value="organization">Organization</option>
            <option value="sub-organization">Sub-organization</option>
            <option value="site">Site</option>
            <option value="lab">Lab</option>
            <option value="gateway">Gateway</option>
            <option value="instrument">Instrument</option>
            <option value="user">User</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2 bg-white"
            value={actionType}
            onChange={(e) => setActionType(e.target.value as ActionType)}
          >
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="assign">Assign</option>
            <option value="unassign">Unassign</option>
          </select>

          <div className="flex gap-2 items-center">
            <input
              type="date"
              className="border rounded-lg px-4 py-2"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <span>to</span>
            <input
              type="date"
              className="border rounded-lg px-4 py-2"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}