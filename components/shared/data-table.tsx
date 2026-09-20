'use client';

import { cn } from '@/lib/utils';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NoResults } from '@/components/shared/empty-states';
import React from 'react';

export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  width?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: { label: string; value: string; options: FilterOption[]; onChange: (value: string) => void }[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  getRowId: (row: T) => string;
}

export function DataTable<T>({
  columns, data, searchValue, onSearchChange, searchPlaceholder = 'Search...',
  filters, onSort, sortKey, sortDirection, page, pageSize, total, onPageChange,
  onRowClick, rowActions, emptyMessage, getRowId,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(page * pageSize, total);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>
        {filters && filters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filters.map((f) => (
              <Select key={f.label} value={f.value} onValueChange={f.onChange}>
                <SelectTrigger className="w-[140px] h-9 text-xs">
                  <SelectValue placeholder={f.label} />
                </SelectTrigger>
                <SelectContent>
                  {f.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <NoResults query={searchValue} />
      ) : (
        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      'text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap',
                      col.className
                    )}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.sortable && onSort ? (
                      <button
                        className="inline-flex items-center gap-1 hover:text-foreground transition-base"
                        onClick={() => onSort(col.key, sortKey === col.key && sortDirection === 'asc' ? 'desc' : 'asc')}
                      >
                        {col.label}
                        <ArrowUpDown className={cn(
                          'w-3 h-3',
                          sortKey === col.key && sortDirection === 'asc' && 'rotate-180',
                          sortKey === col.key ? 'text-primary' : 'text-muted-foreground/50'
                        )} />
                      </button>
                    ) : col.label}
                  </th>
                ))}
                {rowActions && <th className="w-10 px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={getRowId(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'border-b last:border-0 transition-base',
                    onRowClick && 'cursor-pointer hover:bg-muted/30'
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3', col.className)}>
                      {col.render(row)}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      {rowActions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {total > pageSize && (
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-muted-foreground">
            Showing {startIdx}–{endIdx} of {total}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Button>
            <span className="text-xs text-muted-foreground px-2">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
