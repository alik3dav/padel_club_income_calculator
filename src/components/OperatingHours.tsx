import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlot {
  start: string;
  end: string;
}

export function OperatingHours() {
  const timeSlots: TimeSlot[] = [
    { start: '09:00', end: '10:30' },
    { start: '10:30', end: '12:00' },
    { start: '12:00', end: '13:30' },
    { start: '13:30', end: '15:00' },
    { start: '15:00', end: '16:30' },
    { start: '16:30', end: '18:00' },
    { start: '18:00', end: '19:30' },
    { start: '19:30', end: '21:00' },
    { start: '21:00', end: '22:30' },
    { start: '22:30', end: '00:00' },
  ];

  return (
    <div className="bg-indigo-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 text-indigo-700 mb-3">
        <Clock className="w-5 h-5" />
        <span className="font-medium">Daily Schedule</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="bg-white/50 p-2 rounded text-sm text-indigo-700 text-center"
          >
            {slot.start} - {slot.end}
          </div>
        ))}
      </div>
      <p className="text-indigo-600 mt-3 text-sm">
        10 sessions of 1:30 hours each
      </p>
    </div>
  );
}