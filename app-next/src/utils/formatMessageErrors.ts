import { AxiosError } from "axios";

export function getAxiosErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;

  if (error instanceof Error) {
    if ((error as AxiosError).isAxiosError) {
      const axiosErr = error as AxiosError<{ detail?: string; message?: string }>;
      return (
        axiosErr.response?.data?.detail || axiosErr.response?.data?.message || axiosErr.message
      );
    }

    return error.message;
  }

  return "Server error";
}
