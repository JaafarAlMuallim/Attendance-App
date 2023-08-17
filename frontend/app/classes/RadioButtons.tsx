import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioButtons({
  onClassChange,
  selectedClass,
}: {
  onClassChange: (value: string) => void;
  selectedClass: string;
}) {
  return (
    <RadioGroup
      defaultValue="Freshman"
      className="flex flex-row"
      onValueChange={(value) => onClassChange(value)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Freshman" id="freshman" />
        <Label htmlFor="freshman">Freshman</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Junior" id="junior" />
        <Label htmlFor="junior">Junior</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Senior" id="senior" />
        <Label htmlFor="senior">Senior</Label>
      </div>
    </RadioGroup>
  );
}
