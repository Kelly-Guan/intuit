import ExpenseForecastingSystem from "@/components/expense_forcase_system";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Expense Forecasting System
        </h1>
        <ExpenseForecastingSystem />
      </div>
    </main>
  );
}
