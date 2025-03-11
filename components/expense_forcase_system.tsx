"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseDataInput from "./expense_data_inputs";
import ForecastResults from "@/components/expense_results";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type ExpenseData = {
  [category: string]: number[];
};

export type ForecastResult = {
  [category: string]: number;
};

export default function ExpenseForecastingSystem() {
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    "Office Supplies": [120, 110, 150, 130, 140],
    Marketing: [200, 240, 220, 210, 230],
    Utilities: [90, 95, 100, 85, 90],
    Rent: [1000, 1000, 1000, 1000, 1000],
  });

  const [forecastResults, setForecastResults] = useState<ForecastResult | null>(
    null
  );
  const [forecastMethod, setForecastMethod] = useState<"simple" | "weighted">(
    "simple"
  );
  const [error, setError] = useState<string | null>(null);

  const calculateForecast = () => {
    try {
      setError(null);

      // Validate data
      for (const category in expenseData) {
        if (expenseData[category].length < 3) {
          throw new Error(`Need at least 3 months of data for ${category}`);
        }
      }

      if (forecastMethod === "simple") {
        setForecastResults(simpleMovingAverage(expenseData));
      } else {
        setForecastResults(weightedMovingAverage(expenseData));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const simpleMovingAverage = (data: ExpenseData): ForecastResult => {
    const result: ForecastResult = {};

    for (const category in data) {
      const expenses = data[category];
      const lastThreeMonths = expenses.slice(-3);
      result[category] = Number(
        (lastThreeMonths.reduce((sum, val) => sum + val, 0) / 3).toFixed(2)
      );
    }

    return result;
  };

  const weightedMovingAverage = (data: ExpenseData): ForecastResult => {
    const result: ForecastResult = {};
    const weights = [0.2, 0.3, 0.5]; // 20%, 30%, 50% weights for last three months

    for (const category in data) {
      const expenses = data[category];
      const lastThreeMonths = expenses.slice(-3);

      let weightedSum = 0;
      for (let i = 0; i < lastThreeMonths.length; i++) {
        weightedSum += lastThreeMonths[i] * weights[i];
      }

      result[category] = Number(weightedSum.toFixed(2));
    }

    return result;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="input" className="w-full">
        <TabsContent value="input" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Data</CardTitle>
              <CardDescription>
                Enter your historical expense data for each category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseDataInput
                expenseData={expenseData}
                setExpenseData={setExpenseData}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forecast Settings</CardTitle>
              <CardDescription>Choose your forecasting method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">
                  Forecasting Method
                </label>
                <Tabs
                  value={forecastMethod}
                  onValueChange={(value) =>
                    setForecastMethod(value as "simple" | "weighted")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="simple">
                      Simple Moving Average
                    </TabsTrigger>
                    <TabsTrigger value="weighted">
                      Weighted Moving Average
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Button onClick={calculateForecast} className="w-full">
                Calculate Forecast
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {forecastResults && (
            <Card>
              <CardHeader>
                <CardTitle>Forecast Results</CardTitle>
                <CardDescription>
                  Predicted expenses for next month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ForecastResults results={forecastResults} />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
