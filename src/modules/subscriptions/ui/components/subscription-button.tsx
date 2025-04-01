import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionButtonProps extends ButtonProps {
  isSubscribed: boolean;
}

export const SubscriptionButton = ({
  isSubscribed,
  ...props
}: SubscriptionButtonProps) => {
  return (
    <Button
      {...props}
      variant={isSubscribed ? "secondary" : "default"}
      className={cn("rounded-full", props.className)}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};
