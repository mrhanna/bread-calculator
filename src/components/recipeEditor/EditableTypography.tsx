import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import type { TypographyVariant } from '@mui/material';
import Box from '@mui/system/Box';
import { visuallyHidden } from '@mui/utils';

export default function EditableTypography(props: {
  fontSize?: number | string;
  fontWeight?: number | string;
  label?: string;
  variant?: TypographyVariant;
  value: string;
  defaultValue: string;
  onChange: React.ChangeEventHandler;
}) {
  const [isEditing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyExit = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      setEditing(false);
    }
  };

  return (
    <Box height="8rem">
      {isEditing && (
        <Typography variant={props.variant} sx={visuallyHidden}>
          {props.value || props.defaultValue}
        </Typography>
      )}
      <Stack direction="row" spacing={2} sx={{ mb: 8 }} alignItems="baseline">
        {isEditing ? (
          <>
            <TextField
              autoFocus
              fullWidth
              variant="standard"
              placeholder={props.defaultValue}
              sx={{
                m: 0,
              }}
              slotProps={{
                htmlInput: {
                  sx: {
                    fontSize: props.fontSize,
                    fontWeight: props.fontWeight ?? 300,
                  },
                },
              }}
              value={props.value}
              onChange={props.onChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyExit}
            />
            <IconButton onClick={() => setEditing(false)}>
              <SaveIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography
              variant={props.variant}
              sx={{
                fontSize: props.fontSize,
                fontWeight: props.fontWeight,
                py: 1.5,
              }}
            >
              {props.value || props.defaultValue}
            </Typography>
            <IconButton onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </Box>
  );
}
