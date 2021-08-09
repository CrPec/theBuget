export const sampleData = [
  { id: 1, type: "Incomes", value: 500000, date: "2021-12-02", desc: "Salary" },
  { id: 2, type: "Incomes", value: 500000, date: "2021-11-02", desc: "Salary" },
  { id: 3, type: "Incomes", value: 500000, date: "2021-09-02", desc: "Salary" },
  { id: 4, type: "Incomes", value: 500000, date: "2021-10-02", desc: "Salary" },
  { id: 5, type: "Expenses", value: 50000, date: "2021-12-02", desc: "Rent" },
  { id: 6, type: "Expenses", value: 50000, date: "2021-11-02", desc: "Rent" },
  { id: 7, type: "Expenses", value: 50000, date: "2021-09-02", desc: "Rent" },
  { id: 8, type: "Expenses", value: 50000, date: "2021-10-02", desc: "Rent" },
];

export function formatValue(cents) {
  return (cents / 100).toLocaleString("ro-RO", {
    style: "currency",
    currency: "Lei",
  });
}
