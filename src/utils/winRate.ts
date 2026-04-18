

export const WinRate = (
  wins?: number,
  loses?: number
) => {
  const w = wins ?? 0;
  const l = loses ?? 0;

  const total = w + l;

  if (total === 0) return "0%";

  return ((w / total) * 100).toFixed(1) + "%";
};

export const Engangements = (
  wins?: number,
  loses?: number
) => {
  const w = wins ?? 0;
  const l = loses ?? 0;

  const total = w + l;


  return total
};




export const getStreetCredValue =(wins?: number ,loses?: number ,rank?:string )=>{
  const w = wins ?? 0;
  const l = loses ?? 0;
   switch(rank){
     case "D":
            return Math.max(0,w*10-l*5)
         case "C":
            return Math.max(0,w*20-l*10)
         case "B":
            return Math.max(0,w*30-l*15)
         case "A":
            return Math.max(0,w*40-l*15)
        case "S":
            return Math.max(0,w*50-l*15)
          default : return 0


   }

  


}


export const streetCred = (wins?: number, loses?: number, rank?: string) => {
  return getStreetCredValue(wins, loses, rank)?.toFixed(1)  + "K";
};