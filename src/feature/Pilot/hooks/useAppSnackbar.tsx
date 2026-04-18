import { useSnackbar } from "notistack";

export default function UseAppSnackbar() {
  const { enqueueSnackbar, } = useSnackbar();

  const showSuccess = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const showError = (message: string,) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const showInfo = (message: string) => {
    enqueueSnackbar(message, { variant: "info" });
  };

  

  return {
    showSuccess,
    showError,
    showInfo,
   
  };
}