import React from 'react';
import { Info } from 'lucide-react';

export function Notes() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-4 h-4 text-gray-500" />
        <p className="font-medium">Σημαντικές Σημειώσεις:</p>
      </div>
      <ul className="list-disc list-inside space-y-1 ml-1">
        <li>Κάθε συνεδρία είναι 1 ώρα και 30 λεπτά</li>
        <li>Επιλέξτε χρονικές θέσεις ξεχωριστά για κάθε ημέρα</li>
        <li>Οι υπολογισμοί βασίζονται μόνο στις επιλεγμένες χρονικές θέσεις.</li>
        <li>Οι μηνιαίοι υπολογισμοί χρησιμοποιούν τον μέσο όρο των 4,33 εβδομάδων.</li>
        <li>Τα μηνιαία έξοδα από ετήσια αντικείμενα υπολογίζονται κατά μέσο όρο.</li>
        <li>Το πραγματικό εισόδημα μπορεί να διαφέρει ανάλογα με τα ποσοστά πληρότητας.</li>
      </ul>
    </div>
  );
}