/* eslint-disable @typescript-eslint/explicit-function-return-type -- N/A */
/* eslint-disable @typescript-eslint/no-empty-function -- N/A */
import React, { createContext, useReducer, useContext, useCallback } from "react";
import type { TAction } from "../utils/snackbar-reducer";
import reducer from "../utils/snackbar-reducer";
import Snackbar from "../components/snackbar/snackbar";
import type { SnackbarInterface } from "@/_domain/interfaces/snackbar";

const SnackbarContext = createContext<{
  queue: SnackbarInterface[];
  dispatch: React.Dispatch<TAction>;
}>({
  queue: [] as SnackbarInterface[],
  dispatch: () => {},
});

interface SnackbarProviderProps {
  children: React.ReactNode
}

export default function SnackbarProvider(props: SnackbarProviderProps): React.ReactElement {
  const { children } = props;
  const [{ queue }, dispatch] = useReducer(reducer, { queue: [] });

  return (
    <SnackbarContext.Provider value={{ queue, dispatch }}>
      {queue.map((snack, index) => (
        <Snackbar
          className={`-mt-${index + 1} left-${index + 4}`}
          handleClose={() =>
            { dispatch({ type: "REMOVE_SNACKBAR", payload: { key: snack.key } }); }
          }
          icon={snack.icon}
          key={snack.key}
          text={snack.text}
          variant={snack.variant}
        />
      ))}
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar was called outside SnackbarProvider");
  }
  const { dispatch } = context;

  return useCallback(
    (snack: SnackbarInterface) => {
      dispatch({ type: "ADD_SNACKBAR", payload: { current: snack } });
    },
    [dispatch]
  );
};