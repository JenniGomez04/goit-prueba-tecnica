// Obtener referencias a elementos del DOM
const starshipsLink = document.getElementById('starships');
const resultsDiv = document.getElementById('results');
const detailsDiv = document.getElementById('details');

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
      detailsDiv.innerHTML = '';

      const starshipsList = document.createElement('ul');

      for (const starship of data.results) {
        const nameElement = document.createElement('li');
        nameElement.textContent = starship.name;

        nameElement.addEventListener('click', async () => {
          const starshipDetails = await getStarshipDetails(starship.url);
          showStarshipDetails(starshipDetails);
        });

        starshipsList.appendChild(nameElement);
      }

      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(starshipsList);
    });
  } catch (error) {
    console.error(error);
  }
};

const getStarshipDetails = async (starshipUrl) => {
  try {
    const response = await fetch(starshipUrl);
    const starshipDetails = await response.json();
    return starshipDetails;
  } catch (error) {
    console.error(error);
  }
};

const showStarshipDetails = (starship) => {
  detailsDiv.innerHTML = '';

  const nameElement = document.createElement('h2');
  nameElement.textContent = starship.name;
  detailsDiv.appendChild(nameElement);

  const modelElement = document.createElement('p');
  modelElement.textContent = `Model: ${starship.model}`;
  detailsDiv.appendChild(modelElement);

  const manufacturerElement = document.createElement('p');
  manufacturerElement.textContent = `Manufacturer: ${starship.manufacturer}`;
  detailsDiv.appendChild(manufacturerElement);

  const starshipClassElement = document.createElement('p');
  starshipClassElement.textContent = `Starship Class: ${starship.starship_class}`;
  detailsDiv.appendChild(starshipClassElement);

  const crewElement = document.createElement('p');
  crewElement.textContent = `Crew: ${starship.crew}`;
  detailsDiv.appendChild(crewElement);

  backButtonContainer.style.display = 'block';
};


// Ejecutar la función para obtener los datos de la API de starships
starshipsApi();