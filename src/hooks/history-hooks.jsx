import { CallHistoryContext } from "../contexts/call-history-hook";
import { useContext } from "react";

export const useHistory = () => useContext(CallHistoryContext);

