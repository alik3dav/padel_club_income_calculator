import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  icon: LucideIcon;
  value: number;
  onChange: (value: number) => void;
  min: number;
}

export function InputField({ label, icon: Icon, value, onChange, min }: InputFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-2">
        <Icon className="w-5 h-5" />
        {label}
      </label>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || min))}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      />
    </div>
  );
}