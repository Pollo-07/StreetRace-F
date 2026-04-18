


export const RankConverter = (expresion:string | undefined)=>{
    switch(expresion){
        case "D":
            return "Novato"
         case "C":
            return "Intermedio"
         case "B":
            return "Avanzado"
         case "A":
            return "Élite"
        case "S":
            return "Leyenda"
}
}
