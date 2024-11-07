import React from 'react';
import { Clock } from 'lucide-react';

export interface TimeSlot {
  start: string;
  end: string;
  selected: boolean;
}

interface TimeSlotSelectorProps {
  day: string;
  slots: TimeSlot[];
  onToggleSlot: (day: string, index: number) => void;
}

export function TimeSlotSelector({ day, slots, onToggleSlot }: TimeSlotSelectorProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center justify-between pt-2 pr-4 pb-2 pl-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">{day}</h3>
        </div>
        <span className="text-sm text-gray-500">
          {slots.filter(slot => slot.selected).length} Επιλεγμένες θέσεις
        </span>
      </div>
      <div className="p-2 grid grid-cols-2 gap-2">
        {slots.map((slot, index) => (
          <label
            key={index}
            className="relative flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={slot.selected}
              onChange={() => onToggleSlot(day, index)}
              className="peer sr-only"
            />
            <div className={`
              w-full p-2 text-sm rounded-md border transition-all
              peer-checked:bg-green-50 peer-checked:border-green-500 peer-checked:text-green-700
              
              €{slot.selected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}
            `}>
              {slot.start} - {slot.end}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}