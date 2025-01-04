


export const niveles = (nivel) => {
    const insignias = {
        1: "Principiante",
        2: "Aprendiz",
        3: "Estudiante Fiel",
        4: "Apasionado",
        5: "Dedicado",
        6: "Estudioso",
        7: "Entendedor",
        8: "Conocedor Bíblico",
        9: "Sabio",
        10: "Maestro",
      };
      return insignias[nivel] || 'Desconocido';
    

}