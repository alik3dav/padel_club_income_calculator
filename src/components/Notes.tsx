import React from 'react';
import { Info } from 'lucide-react';

export function Notes() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-4 h-4 text-gray-500" />
        <p className="font-medium">Important Notes:</p>
      </div>
      <ul className="list-disc list-inside space-y-1 ml-1">
        <li>Each session is 1 hour and 30 minutes</li>
        <li>Select time slots individually for each day</li>
        <li>Calculations are based on selected time slots only</li>
        <li>Monthly calculations use 4.33 weeks average</li>
        <li>Monthly expenses from yearly items are averaged</li>
        <li>Actual income may vary based on occupancy rates</li>
      </ul>
    </div>
  );
}