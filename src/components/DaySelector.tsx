import React from 'react';
import { Calendar } from 'lucide-react';

interface DaySelectorProps {
  selectedDays: Record<string, boolean>;
  onToggleDay: (day: string) => void;
}

export function DaySelector({ selectedDays, onToggleDay }: DaySelectorProps) {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <Calendar className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium text-gray-700">Operating Days</h3>
      </div>
      <div className="p-4 space-y-2">
        {days.map((day) => (
          <label
            key={day}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedDays[day]}
              onChange={() => onToggleDay(day)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{day}</span>
          </label>
        ))}
      </div>
    </div>
  );
}