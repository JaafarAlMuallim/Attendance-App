import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioButtonsAR({
  onClassChange,
}: {
  onClassChange: (value: string) => void;
}) {
  return (
    <RadioGroup
      defaultValue="Freshman"
      className="flex flex-row"
      onValueChange={(value) => onClassChange(value)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Freshman" id="freshman" />
        <Label htmlFor="freshman">اول ثانوي</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Junior" id="junior" />
        <Label htmlFor="junior">ثاني ثانوي</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Senior" id="senior" />
        <Label htmlFor="senior">ثالث ثانوي</Label>
      </div>
    </RadioGroup>
  );
}
