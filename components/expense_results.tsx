import { Card } from "@/components/ui/card";
import type { ForecastResult } from "./expense_forcase_system";

interface ForecastResultsProps {
  results: ForecastResult;
}

export default function ForecastResults({ results }: ForecastResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(results).map(([category, value]) => (
        <Card key={category} className="p-4 flex justify-between items-center">
          <div>
            <h3 className="font-medium">{category}</h3>
            <p className="text-sm text-gray-500">Forecasted Amount</p>
          </div>
          <div className="text-xl font-bold">${value.toFixed(2)}</div>
        </Card>
      ))}
    </div>
  );
}
