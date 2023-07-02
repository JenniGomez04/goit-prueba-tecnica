// Obtener referencias a elementos del DOM
const speciesLink = document.getElementById('species');
const resultsDiv = document.getElementById('results');

// Función para realizar la solicitud a la API de species
const speciesApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/species/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "species"
    speciesLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';

      const speciesList = document.createElement('ul');

      // Obtener la lista de nombres de las species
      const names = data.results.map(specie => specie.name);

      // Crear elementos de lista con los nombres de las species
      names.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name;
        speciesList.appendChild(nameElement);
      });

      resultsDiv.appendChild(speciesList);
    });
  } catch (error) {
    console.error(error);
  }
};

// Ejecutar la función para obtener los datos de la API de species
speciesApi();