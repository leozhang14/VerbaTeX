import { Oval } from "react-loader-spinner";

type SpinnerProps = {
  size?: string;
};

const Spinner = ({ size = "lg" }: SpinnerProps) => {
  return (
    <Oval
      height={size === "lg" ? "80" : "20"}
      width={size === "lg" ? "80" : "20"}
      color="green"
      ariaLabel="loading"
    />
  );
};

export default Spinner;
