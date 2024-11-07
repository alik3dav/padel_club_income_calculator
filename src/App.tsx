import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { InputField } from './components/InputField';
import { IncomeDisplay } from './components/IncomeDisplay';
import { Notes } from './components/Notes';
import { TimeSlotSelector, TimeSlot } from './components/TimeSlotSelector';
import { ExpensesManager, Expense } from './components/ExpensesManager';
import { DollarSign, LayoutGrid } from 'lucide-react';

interface CalculationResult {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

interface DaySchedule {
  [key: string]: TimeSlot[];
}

const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { start: '09:00', end: '10:30', selected: false },
  { start: '10:30', end: '12:00', selected: false },
  { start: '12:00', end: '13:30', selected: false },
  { start: '13:30', end: '15:00', selected: false },
  { start: '15:00', end: '16:30', selected: false },
  { start: '16:30', end: '18:00', selected: false },
  { start: '18:00', end: '19:30', selected: false },
  { start: '19:30', end: '21:00', selected: false },
  { start: '21:00', end: '22:30', selected: false },
  { start: '22:30', end: '00:00', selected: false },
];

const DAYS = [
  'Δευτέρα',
  'Τρίτη',
  'Τετάρτη',
  'Πέμπτη',
  'Παρασκευή',
  'Σάββατο',
  'Κυριακή',
];

function App() {
  const [courts, setCourts] = useState<number>(1);
  const [pricePerSession, setPricePerSession] = useState<number>(48);
  const [schedule, setSchedule] = useState<DaySchedule>(() => {
    const initialSchedule: DaySchedule = {};
    DAYS.forEach(day => {
      initialSchedule[day] = [...DEFAULT_TIME_SLOTS];
    });
    return initialSchedule;
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [income, setIncome] = useState<CalculationResult>({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  });

  const handleToggleSlot = (day: string, slotIndex: number) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].map((slot, index) =>
        index === slotIndex ? { ...slot, selected: !slot.selected } : slot
      )
    }));
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...newExpense, id: crypto.randomUUID() }]);
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  useEffect(() => {
    const calculateDailyIncome = (day: string) => {
      const activeSlots = schedule[day].filter(slot => slot.selected).length;
      return courts * pricePerSession * activeSlots;
    };

    const dailyIncomes = DAYS.map(day => calculateDailyIncome(day));
    const weeklyIncome = dailyIncomes.reduce((sum, daily) => sum + daily, 0);
    const monthlyIncome = weeklyIncome * 4.33;
    const yearlyIncome = monthlyIncome * 12;

    setIncome({
      daily: Math.max(...dailyIncomes),
      weekly: weeklyIncome,
      monthly: monthlyIncome,
      yearly: yearlyIncome
    });
  }, [courts, pricePerSession, schedule]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-900 to-blue-800 p-6">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Υπολογιστής Εισοδήματος Γηπέδου Πάντελ</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <InputField
                  label="Αριθμός Γηπέδων"
                  icon={LayoutGrid}
                  value={courts}
                  onChange={setCourts}
                  min={1}
                />
                <InputField
                  label="Τιμή ανά Συνεδρία (1:30 ώρες)"
                  icon={DollarSign}
                  value={pricePerSession}
                  onChange={setPricePerSession}
                  min={0}
                />
              </div>

              <ExpensesManager
                expenses={expenses}
                onAddExpense={handleAddExpense}
                onRemoveExpense={handleRemoveExpense}
              />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Διαμόρφωση Ωραρίου</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {DAYS.map(day => (
                    <TimeSlotSelector
                      key={day}
                      day={day}
                      slots={schedule[day]}
                      onToggleSlot={handleToggleSlot}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <IncomeDisplay 
                income={income}
                schedule={schedule}
                expenses={expenses}
              />
              <Notes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;