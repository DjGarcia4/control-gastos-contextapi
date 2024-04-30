export type BudgetActions = {
  type: "add-budget";
  payload: { budget: BudgetState["budget"] };
};

export type BudgetState = {
  budget: number;
};

export const initialState: BudgetState = {
  budget: 0,
};

export const BudgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return { ...state, budget: action.payload.budget };
  }
  return state;
};
