import React from 'react';
import { DollarSign, Trash2 } from 'lucide-react';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  frequency: 'Μηνιαίο' | 'Ετήσιο';
}

interface ExpensesManagerProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onRemoveExpense: (id: string) => void;
}

export function ExpensesManager({ expenses, onAddExpense, onRemoveExpense }: ExpensesManagerProps) {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [frequency, setFrequency] = React.useState<'Μηνιαίο' | 'Ετήσιο'>('Μηνιαίο');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount) {
      onAddExpense({
        name,
        amount: parseFloat(amount),
        frequency
      });
      setName('');
      setAmount('');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 pl-4 pr-4 pt-2 pb-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Έξωδα</h3>
      
      <form onSubmit={handleSubmit} className="mb-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Όνομα δαπάνης"
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ποσό"
            min="0"
            step="0.01"
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'Μηνιαίο' | 'Ετήσιο')}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Μηνιαίο">Μηνιαίο</option>
            <option value="Ετήσιο">Ετήσιο</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-black to-black text-white rounded-md hover:bg-grey-700 transition-colors"
          >
            Προσθήκη 
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div>
              <p className="font-medium text-gray-800">{expense.name}</p>
              <p className="text-sm text-gray-600">
              € {expense.amount.toLocaleString()} / {expense.frequency}
              </p>
            </div>
            <button
              onClick={() => onRemoveExpense(expense.id)}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-center text-gray-500 py-2">Δεν έχουν προστεθεί έξοδα ακόμη</p>
        )}
      </div>
    </div>
  );
}