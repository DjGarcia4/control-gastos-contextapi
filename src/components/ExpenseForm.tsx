import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { DraftExpense } from "../types";

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500">
        Nuevo Gasto
      </legend>
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
          <DatePicker className="bg-slate-100" value={expense.date} />
        </div>
      </div>
      <input
        type="submit"
        value="Registrar Gasto"
        className="bg-blue-600 w-full rounded-xl p-2 font-bold text-white cursor-pointer uppercase"
      />
    </form>
  );
};

export default ExpenseForm;
