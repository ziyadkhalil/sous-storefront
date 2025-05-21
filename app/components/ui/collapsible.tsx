import { cn } from "@/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
      className={cn(
        "data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden",
        props.className
      )}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
