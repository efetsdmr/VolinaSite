import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';

interface Assistant {
  id: string;
  name: string;
  tags: string[];
}

interface AssistantSidebarProps {
  assistants: Assistant[];
  selectedId: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectAssistant: (id: string) => void;
  onCreateNew: () => void;
}

export function AssistantSidebar({
  assistants,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelectAssistant,
  onCreateNew
}: AssistantSidebarProps) {
  const { t } = useLanguage();

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-full flex flex-col">
      {/* Create Assistant Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Button
          onClick={onCreateNew}
          className="w-full bg-[#3366FF] hover:bg-[#3366FF]/90 text-white flex items-center justify-center gap-2 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">{t.adminDashboard.createAssistant}</span>
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.adminDashboard.searchAssistants}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
          />
        </div>
      </div>

      {/* Assistants List */}
      <div className="flex-1 overflow-y-auto">
        {assistants.map((assistant) => (
          <button
            key={assistant.id}
            onClick={() => onSelectAssistant(assistant.id)}
            className={`w-full px-4 py-3 text-left border-b border-gray-100 dark:border-gray-700 transition-colors ${
              selectedId === assistant.id
                ? 'bg-[#E6EFFF] dark:bg-blue-900/30 border-l-4 border-l-[#3366FF]'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-l-4 border-l-transparent'
            }`}
          >
            <div className="mb-1">
              <span className={`text-sm ${
                selectedId === assistant.id
                  ? 'text-[#3366FF]'
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {assistant.name}
              </span>
            </div>
          </button>
        ))}
        {assistants.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            {searchQuery ? 'Sonuç bulunamadı' : 'Henüz asistan yok'}
          </div>
        )}
      </div>
    </div>
  );
}