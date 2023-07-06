// Obtener referencias a elementos del DOM
const planetsLink = document.getElementById('planets');
const resultsDiv = document.getElementById('results');
const detailsDiv = document.getElementById('details');

// Función para realizar la solicitud a la API de planetas
const planetsApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    planetsLink.addEventListener('click', async event => {
      event.preventDefault();

      resultsDiv.innerHTML = '';
      detailsDiv.innerHTML = '';

      const planetsList = document.createElement('ul');

      for (const planet of data.results) {
        const nameElement = document.createElement('li');
        nameElement.textContent = planet.name;

        nameElement.addEventListener('click', async () => {
          const planetDetails = await getPlanetDetails(planet.url);
          showPlanetDetails(planetDetails);
        });

        planetsList.appendChild(nameElement);
      }

      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(planetsList);
    });
  } catch (error) {
    console.error(error);
  }
};


// Función para obtener los detalles de los planetas
const getPlanetDetails = async (planetUrl) => {
  try {
    const response = await fetch(planetUrl);
    const planetDetails = await response.json();
    return planetDetails;
  } catch (error) {
    console.error(error);
  }
};

// Función para mostrar los detalles de un planeta en la interfaz
const showPlanetDetails = planet => {
  detailsDiv.innerHTML = '';


  const nameElement = document.createElement('h2');
  nameElement.textContent = planet.name;
  detailsDiv.appendChild(nameElement);

  const diameterElement = document.createElement('p');
  diameterElement.textContent = `Diameter: ${planet.diameter}`;
  detailsDiv.appendChild(diameterElement);

  const climateElement = document.createElement('p');
  climateElement.textContent = `Climate: ${planet.climate}`;
  detailsDiv.appendChild(climateElement);

  const populationElement = document.createElement('p');
  populationElement.textContent = `Population: ${planet.population}`;
  detailsDiv.appendChild(populationElement);

  const terrainElement = document.createElement('p');
  terrainElement.textContent = `Terrain: ${planet.terrain}`;
  detailsDiv.appendChild(terrainElement);

  backButtonContainer.style.display = 'block';
};

// Evento para volver a estar atras del clic
backButton.addEventListener('click', () => {
  resultsDiv.innerHTML = ''; 
  detailsDiv.innerHTML = ''; 
  backButtonContainer.style.display = 'none'; // Ocultar el contenedor del botón
});

// Ejecutar la función para obtener los datos de la API de planetas
planetsApi();
