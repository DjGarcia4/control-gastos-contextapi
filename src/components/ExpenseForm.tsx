import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { useBudget } from "../hooks/useBudget";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";

const ExpenseForm = () => {
  const { state, dispatch, remainingBudget } = useBudget();
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");
  const [previousAmount, setPreviousAmount] = useState(0);

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (item) => item.id === state.editingId
      )[0];
      setExpense(editingExpense);
      setPreviousAmount(editingExpense.amount);
    }
  }, [state.editingId, state.expenses]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({ ...expense, [name]: isAmountField ? +value : value });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (expense.amount - previousAmount > remainingBudget) {
      setError("Ese gasto se sale del presupuesto.");
      return;
    }
    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }
    setError("");
    setPreviousAmount(0);
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500">
        {state.editingId ? " Actualizar Gasto" : "Agregar gasto"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className=" text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2 rounded-lg"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className=" text-xl">
          Cantidad:
        </label>
        <input
          type="text"
          id="amount"
          placeholder="Añade la cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2 rounded-lg"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className=" text-xl">
          Categorias:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2 rounded-lg"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">--Selecciona una Categoria--</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className=" text-xl">
            Fecha Gasto:
          </label>
          <DatePicker
            className="bg-slate-100"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>
      </div>
      <input
        type="submit"
        value={state.editingId ? " Guardar Cambios" : "Agregar gasto"}
        className="bg-blue-600 w-full rounded-xl p-2 font-bold text-white cursor-pointer uppercase"
      />
    </form>
  );
};

export default ExpenseForm;
