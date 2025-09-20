import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MoodButtonProps {
  emoji: string;
  label: string;
  value: string;
  isSelected?: boolean;
  onClick: (value: string) => void;
}

export function MoodButton({ emoji, label, value, isSelected, onClick }: MoodButtonProps) {
  return (
    <Button
      variant="mood"
      size="xl"
      onClick={() => onClick(value)}
      className={cn(
        "flex-col gap-2 h-20 w-20 text-2xl relative overflow-hidden group",
        isSelected && "border-primary shadow-glow"
      )}
    >
      <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
        {emoji}
      </span>
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
        {label}
      </span>
      {isSelected && (
        <div className="absolute inset-0 bg-primary/5 rounded-xl" />
      )}
    </Button>
  );
}