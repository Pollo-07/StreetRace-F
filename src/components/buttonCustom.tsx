import { Button, type ButtonProps } from '@mui/material'


type Props = ButtonProps & {
  children: React.ReactNode
}
const ButtonCustom = ({children,sx,...props}:Props) => {
  return (
      <Button 
      {...props}     
      
         type="submit"
        fullWidth  size="large" 
         sx={{ height:54, mt:1, fontFamily:"'Orbitron',sans-serif", fontWeight:700,
         fontSize:"0.9rem", letterSpacing:"0.15em", color:"#00f0ff",
        border:"1px solid rgba(0,240,255,.5)", borderRadius:1.5,
        boxShadow:"0 0 18px rgba(0,240,255,0.1)",
        "&:hover":{ bgcolor:"rgba(0,240,255,0.06)", borderColor:"#00f0ff",
         boxShadow:"0 0 30px rgba(0,240,255,0.25)" },
          ...(props.variant === "contained" && {
          bgcolor: "#00f0ff",
          color: "#000",
          borderColor: "transparent",
          "&:hover": {
            bgcolor: "#00cfe0",
            boxShadow: "0 0 30px rgba(0,240,255,0.4)",
          },
          

          
        }),

        "&.Mui-disabled": {
      color: "#fff", // o el color que quieras
      opacity: 0.6, // opcional
    },
         ...sx
         
         }}>

            {children}
    </Button>

  )
}

export default ButtonCustom
