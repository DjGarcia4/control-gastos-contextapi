import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | {
      type: "add-budget";
      payload: { budget: BudgetState["budget"] };
    }
  | {
      type: "show-modal";
    }
  | {
      type: "close-modal";
    }
  | {
      type: "add-expense";
      payload: { expense: DraftExpense };
    };

export type BudgetState = {
  budget: number;
  showModal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  showModal: false,
  expenses: [],
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return { ...draftExpense, id: uuidv4() };
};

export const BudgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return { ...state, budget: action.payload.budget };
  }
  if (action.type === "show-modal") {
    return { ...state, showModal: true };
  }
  if (action.type === "close-modal") {
    return { ...state, showModal: false };
  }
  if (action.type === "add-expense") {
    return {
      ...state,
      expenses: [...state.expenses, createExpense(action.payload.expense)],
      showModal: false,
    };
  }
  return state;
};
