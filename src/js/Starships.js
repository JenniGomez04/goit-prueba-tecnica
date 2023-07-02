// Obtener referencias a elementos del DOM
const starshipsLink = document.getElementById('starships');
const resultsDiv = document.getElementById('results');

// Función para realizar la solicitud a la API de starships
const starshipsApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/starships/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "starships"
    starshipsLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';

      const starshipsList = document.createElement('ul');

      // Obtener la lista de nombres de las starships
      const names = data.results.map(starship => starship.name);

      // Crear elementos de lista con los nombres de las starships
      names.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name;
        starshipsList.appendChild(nameElement);
      });

      resultsDiv.appendChild(starshipsList);
    });
  } catch (error) {
    console.error(error);
  }
};

// Ejecutar la función para obtener los datos de la API de starships
starshipsApi();