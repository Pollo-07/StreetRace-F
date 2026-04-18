import { TextField } from "@mui/material";

export default function DarkField({
  sx, inputProps, onKeyDown, ...props
}: any) {
  return (
    <TextField
    autoComplete="off"
      {...props}
      inputProps={inputProps}
      onKeyDown={onKeyDown}
      sx={{
        ...sx,
        "& .MuiOutlinedInput-root": {
          bgcolor: "rgba(255,255,255,0.04)",
          borderRadius: "10px",
          color: "#fff",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600,
          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
          "&:hover fieldset": { borderColor: "#00f0ff" },
          "&.Mui-focused fieldset": { borderColor: "#00f0ff" },
        },
        
        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.35)", fontFamily: "'Barlow Condensed', sans-serif" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#00f0ff" },
        "& .MuiSelect-icon": { color: "rgba(255,255,255,0.3)" },
        "& input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1 },
              "& .MuiInputBase-input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #000 inset",
          WebkitTextFillColor: "#fff",
          transition: "background-color 5000s ease-in-out 0s",
        },
   

//// standart
 

     "& .MuiInputBase-input": {
  color: "#fff",

}
,
  "& .MuiInput-underline:before": {
    borderBottom: "1px solid #3b494b", 
  },

  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: "2px solid #00f0ff", 
  },

  "& .MuiInput-underline:after": {
    borderBottom: "2px solid #00f0ff", 
  },
      }}
    />
  );
}