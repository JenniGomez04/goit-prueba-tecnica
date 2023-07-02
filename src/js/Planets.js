// Obtener referencias a elementos del DOM
const planetsLink = document.getElementById('planets');
const resultsDiv = document.getElementById('results');

// Función para realizar la solicitud a la API de planetas
const planetsApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "planets"
    planetsLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';

      const planetsList = document.createElement('ul');

      // Obtener la lista de nombres de las planetas
      const names = data.results.map(planet => planet.name);

      // Crear elementos de lista con los nombres de las planetas
      names.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name;
        planetsList.appendChild(nameElement);
      });

      resultsDiv.appendChild(planetsList);
    });
  } catch (error) {
    console.error(error);
  }
};

// Ejecutar la función para obtener los datos de la API de planetas
planetsApi();
