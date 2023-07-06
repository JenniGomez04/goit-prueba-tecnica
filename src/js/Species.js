// Obtener referencias a elementos del DOM
const speciesLink = document.getElementById('species');
const resultsDiv = document.getElementById('results');
const detailsDiv = document.getElementById('details');

// Función para realizar la solicitud a la API de species
const speciesApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/species/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "species"
    speciesLink.addEventListener('click', async event => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';
      detailsDiv.innerHTML = '';

      const speciesList = document.createElement('ul');

      for (const species of data.results) {
        const nameElement = document.createElement('li');
        nameElement.textContent = species.name;

        nameElement.addEventListener('click', async () => {
          const speciesDetails = await getSpeciesDetails(species.url);
          showSpeciesDetails(speciesDetails);
        });

        speciesList.appendChild(nameElement);
      }

      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(speciesList);
    });
  } catch (error) {
    console.error(error);
  }
};

const getSpeciesDetails = async speciesUrl => {
  try {
    const response = await fetch(speciesUrl);
    const speciesDetails = await response.json();
    return speciesDetails;
  } catch (error) {
    console.error(error);
  }
};

const showSpeciesDetails = species => {
  detailsDiv.innerHTML = '';

  const nameElement = document.createElement('h2');
  nameElement.textContent = species.name;
  detailsDiv.appendChild(nameElement);

  const classificationElement = document.createElement('p');
  classificationElement.textContent = `Classification: ${species.classification}`;
  detailsDiv.appendChild(classificationElement);

  const designationElement = document.createElement('p');
  designationElement.textContent = `Designation: ${species.designation}`;
  detailsDiv.appendChild(designationElement);

  const languageElement = document.createElement('p');
  languageElement.textContent = `Language: ${species.language}`;
  detailsDiv.appendChild(languageElement);

  const averageHeightElement = document.createElement('p');
  averageHeightElement.textContent = `Average Height: ${species.average_height}`;
  detailsDiv.appendChild(averageHeightElement);

  backButtonContainer.style.display = 'block';
};

// Ejecutar la función para obtener los datos de la API de species
speciesApi();
