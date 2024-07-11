import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      title="Error"
      headerLabel="oops! something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
