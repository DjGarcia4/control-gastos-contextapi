import { useBudget } from "../hooks/useBudget";
import { useMemo } from "react";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);
  return (
    <div>
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos aun...</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos
          </p>
          <div className="flex flex-col gap-5">
            {state.expenses.map((expense) => (
              <ExpenseDetail key={expense.id} expense={expense} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
