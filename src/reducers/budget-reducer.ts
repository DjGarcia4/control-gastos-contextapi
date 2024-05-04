import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types";

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
    }
  | {
      type: "remove-expense";
      payload: { id: Expense["id"] };
    }
  | {
      type: "get-expense-by-id";
      payload: { id: Expense["id"] };
    }
  | {
      type: "update-expense";
      payload: { expense: Expense };
    }
  | {
      type: "reset-app";
    }
  | {
      type: "add-filter-category";
      payload: { id: Category["id"] };
    };

export type BudgetState = {
  budget: number;
  showModal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};
const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  showModal: false,
  expenses: initialExpenses(),
  editingId: "",
  currentCategory: "",
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
    return { ...state, showModal: false, editingId: "" };
  }
  if (action.type === "add-expense") {
    return {
      ...state,
      expenses: [...state.expenses, createExpense(action.payload.expense)],
      showModal: false,
    };
  }
  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }
  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      showModal: true,
    };
  }
  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      editingId: "",
      showModal: false,
    };
  }
  if (action.type === "reset-app") {
    return {
      ...state,
      expenses: [],
      budget: 0,
    };
  }
  if (action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }
  return state;
};
