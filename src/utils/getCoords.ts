export const getCoords = async (direccion: string) => {
    const key = 'pk.c1c852bb3a9a43e5ecada2d991849343';
     const url = `https://us1.locationiq.com/v1/search?key=${key}&q=${encodeURIComponent(direccion)}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

  if (!data.length) return null;

  return { 
    lon: parseFloat(data[0].lon),
    lat: parseFloat(data[0].lat),
    name: data[0].display_name
  };
};