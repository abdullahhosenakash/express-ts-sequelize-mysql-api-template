export default function error_message(error: any) {
  const errorMessage =
    error?.response?.data?.error_description ||
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message ||
    (typeof error === 'string' ? error : 'Something went wrong');
  return errorMessage;
}
