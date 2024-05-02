import { Expense } from "../types";

type ExpenseDetailProps = {
  expense: Expense;
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  return <div>{expense.expenseName}</div>;
};

export default ExpenseDetail;
