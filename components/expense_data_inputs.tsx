"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import type { ExpenseData } from "../../intuit_case_2/components/ui/expense_forcase_system";

interface ExpenseDataInputProps {
  expenseData: ExpenseData;
  setExpenseData: (data: ExpenseData) => void;
}

export default function ExpenseDataInput({
  expenseData,
  setExpenseData,
}: ExpenseDataInputProps) {
  const [newCategory, setNewCategory] = useState("");

  const handleExpenseChange = (
    category: string,
    index: number,
    value: string
  ) => {
    const numValue = Number.parseFloat(value) || 0;
    const updatedData = { ...expenseData };
    updatedData[category][index] = numValue;
    setExpenseData(updatedData);
  };

  const addMonth = (category: string) => {
    const updatedData = { ...expenseData };
    updatedData[category] = [...updatedData[category], 0];
    setExpenseData(updatedData);
  };

  const removeMonth = (category: string, index: number) => {
    const updatedData = { ...expenseData };
    updatedData[category] = updatedData[category].filter((_, i) => i !== index);
    setExpenseData(updatedData);
  };

  const addCategory = () => {
    if (newCategory.trim() === "") return;

    if (expenseData[newCategory]) {
      return; // Category already exists
    }

    const updatedData = { ...expenseData };
    updatedData[newCategory] = [0, 0, 0]; // Start with 3 months of data
    setExpenseData(updatedData);
    setNewCategory("");
  };

  const removeCategory = (category: string) => {
    const updatedData = { ...expenseData };
    delete updatedData[category];
    setExpenseData(updatedData);
  };

  return (
    <div className="space-y-6">
      {Object.entries(expenseData).map(([category, expenses]) => (
        <div key={category} className="space-y-2 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">{category}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeCategory(category)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {expenses.map((expense, index) => (
              <div key={index} className="flex items-center gap-2">
                <Label className="w-24">Month {index + 1}</Label>
                <Input
                  type="number"
                  value={expense}
                  onChange={(e) =>
                    handleExpenseChange(category, index, e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeMonth(category, index)}
                  disabled={expenses.length <= 3}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => addMonth(category)}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Month
          </Button>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <Input
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addCategory}>
          <Plus className="h-4 w-4 mr-1" /> Add Category
        </Button>
      </div>
    </div>
  );
}
