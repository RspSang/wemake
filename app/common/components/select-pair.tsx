import { useState } from 'react';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function SelectPair({
  name,
  required,
  label,
  description,
  placeholder,
  options,
}: {
  label: string;
  description: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="space-y-2 flex flex-col">
      <Label
        className="flex flex-col gap-1 items-start"
        onClick={() => setIsOpen(true)}
      >
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select
        open={isOpen}
        onOpenChange={setIsOpen}
        name={name}
        required={required}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
