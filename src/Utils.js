const sampleData = [
  { id: 1, type: "Incomes", value: 500000, date: "2021-12-02", desc: "Salar" },
  { id: 2, type: "Incomes", value: 500000, date: "2021-11-02", desc: "Salar" },
  { id: 3, type: "Incomes", value: 500000, date: "2021-09-02", desc: "Salar" },
  { id: 4, type: "Incomes", value: 500000, date: "2021-10-02", desc: "Salar" },
  { id: 5, type: "Expenses", value: 50000, date: "2021-12-02", desc: "Chirie" },
  { id: 6, type: "Expenses", value: 50000, date: "2021-11-02", desc: "Chirie" },
  { id: 7, type: "Expenses", value: 50000, date: "2021-09-02", desc: "Chirie" },
  { id: 8, type: "Expenses", value: 50000, date: "2021-10-02", desc: "Chirie" },
];

export default sampleData;

export function formatValue(cents) {
  return (cents / 100).toLocaleString("ro-RO", {
    style: "currency",
    currency: "Lei",
  });
}
