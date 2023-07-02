// Obtener referencias a elementos del DOM
const filmsLink = document.getElementById('films');
const resultsDiv = document.getElementById('results');

// Función para realizar la solicitud a la API de films
const filmsApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "Films"
    filmsLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';

      const filmsList = document.createElement('ul');

      // Recorrer los resultados de films y crear elementos de lista con los títulos de las películas
      for (const film of data.results) {
        const titleElement = document.createElement('li');
        titleElement.textContent = film.title;

        // Agregar un evento click a cada título de película
        titleElement.addEventListener('click', async () => {
          const filmDetails = await getFilmDetails(film.url);
          showFilmDetails(filmDetails);
        });

        filmsList.appendChild(titleElement);
      }

      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(filmsList);
    });
  } catch (error) {
    console.error(error);
  }
};

// Función para obtener los detalles de una película
const getFilmDetails = async (filmUrl) => {
  try {
    const response = await fetch(filmUrl);
    const filmDetails = await response.json();
    return filmDetails;
  } catch (error) {
    console.error(error);
  }
};

// Función para mostrar los detalles de una película en la interfaz
const showFilmDetails = (film) => {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = '';

  // Crear elementos de título, episodio, fecha de creación y director
  const titleElement = document.createElement('h2');
  titleElement.textContent = film.title;
  detailsDiv.appendChild(titleElement);

  const episodeIdElement = document.createElement('p');
  episodeIdElement.textContent = `Episode ID: ${film.episode_id}`;
  detailsDiv.appendChild(episodeIdElement);

  const createdElement = document.createElement('p');
  createdElement.textContent = `Created: ${film.created}`;
  detailsDiv.appendChild(createdElement);

  const directorElement = document.createElement('p');
  directorElement.textContent = `Director: ${film.director}`;
  detailsDiv.appendChild(directorElement);
};

// Ejecutar la función para obtener los datos de la API de films
filmsApi();
