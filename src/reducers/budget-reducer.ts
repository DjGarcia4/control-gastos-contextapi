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
    };

export type BudgetState = {
  budget: number;
  showModal: boolean;
};

export const initialState: BudgetState = {
  budget: 0,
  showModal: false,
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
  return state;
};
