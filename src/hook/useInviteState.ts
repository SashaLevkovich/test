import { useState, useEffect, useCallback } from "react";
import { INITIAL_STATE, type InviteState } from "../lib/types";

const STORAGE_KEY = "date_invite_state_v1";

export function useInviteState() {
  const [state, setState] = useState<InviteState>(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed && typeof parsed === "object" && "step" in parsed) {
          return parsed as InviteState;
        }
      }
    } catch (error) {
      console.error("Error reading localStorage", error);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = useCallback((updates: Partial<InviteState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { state, updateState, resetState };
}
