// ? IPCs
import { RegisterWindowIpcHandlers } from "./window-handlers.ipc.ts";

export const RegisterAllIPCs = () => {
  RegisterWindowIpcHandlers();
};
