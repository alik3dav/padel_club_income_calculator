import React from 'react';
import { DollarSign, Calendar, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { TimeSlot } from './TimeSlotSelector';
import { Expense } from './ExpensesManager';

interface IncomeDisplayProps {
  income: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  schedule: {
    [key: string]: TimeSlot[];
  };
  expenses: Expense[];
}

export function IncomeDisplay({ income, schedule, expenses }: IncomeDisplayProps) {
  const totalActiveSlots = Object.values(schedule).reduce(
    (sum, daySlots) => sum + daySlots.filter(slot => slot.selected).length,
    0
  );

  const totalActiveHours = totalActiveSlots * 1.5;

  const activeDays = Object.values(schedule).filter(
    daySlots => daySlots.some(slot => slot.selected)
  ).length;

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => {
      if (expense.frequency === 'monthly') {
        return total + (expense.amount * 12);
      }
      return total + expense.amount;
    }, 0);
  };

  const calculateMonthlyExpenses = () => {
    return expenses.reduce((total, expense) => {
      if (expense.frequency === 'yearly') {
        return total + (expense.amount / 12);
      }
      return total + expense.amount;
    }, 0);
  };

  const yearlyExpenses = calculateTotalExpenses();
  const monthlyExpenses = calculateMonthlyExpenses();
  const weeklyExpenses = monthlyExpenses / 4.33;
  const dailyExpenses = weeklyExpenses / 7;

  const netIncome = {
    daily: income.daily - dailyExpenses,
    weekly: income.weekly - weeklyExpenses,
    monthly: income.monthly - monthlyExpenses,
    yearly: income.yearly - yearlyExpenses
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Financial Overview</h2>
      
      <div className="space-y-3 mb-6 text-indigo-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{activeDays} active days per week</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{totalActiveSlots} slots ({totalActiveHours} hours) per week</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 p-4 bg-white/10 rounded-lg mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-sm">Gross Income</span>
            </div>
            <p className="text-2xl font-bold">${income.monthly.toLocaleString()}/mo</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-300" />
              <span className="text-sm">Expenses</span>
            </div>
            <p className="text-2xl font-bold">${monthlyExpenses.toLocaleString()}/mo</p>
          </div>
        </div>

        <div className="border-t border-indigo-500 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-lg">Net Profit</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Daily</span>
              <span className="text-xl font-bold">${netIncome.daily.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Weekly</span>
              <span className="text-xl font-bold">${netIncome.weekly.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Monthly</span>
              <span className="text-xl font-bold">${netIncome.monthly.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span>Yearly</span>
              <span className="text-2xl font-bold">${netIncome.yearly.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}