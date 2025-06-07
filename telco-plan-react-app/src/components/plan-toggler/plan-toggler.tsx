import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface PlanTogglerProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function PlanToggler({
  value,
  onChange,
  options,
}: PlanTogglerProps) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      onChange(newAlignment); // Notify parent
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="PlanType"
    >
      {options.map((option) => (
        <ToggleButton
          key={option}
          value={option}
          sx={{ '&:focus': { outline: 'none' } }}
        >
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
