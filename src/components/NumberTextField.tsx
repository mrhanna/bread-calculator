import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function NumberTextField(props: TextFieldProps) {
  const [value, setValue] = useState(`${props.value}`);
  const valueRef = useRef(props.value);

  useEffect(() => {
    valueRef.current = props.value;
  }, [props.value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);

      if (props.onChange && !isNaN(Number(e.target.value))) {
        props.onChange(e);
      }
    },
    [props.onChange]
  );

  const handleBlur = useCallback(() => {
    setValue(`${valueRef.current}`);
  }, []);

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      inputMode={props.inputMode ?? 'decimal'}
    />
  );
}
