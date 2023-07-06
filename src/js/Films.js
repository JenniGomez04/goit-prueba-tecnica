// Obtener referencias a elementos del DOM
const filmsLink = document.getElementById('films'); // Realizar la solicitud a la API de films
const resultsDiv = document.getElementById('results'); // Referencia al contenedor de los resultados
const detailsDiv = document.getElementById('details');// Referencia al contenedor de los detalles

// Función para realizar la solicitud a la API de films
const filmsApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/films/'); // Realizar la solicitud a la API de films
    const data = await response.json(); 
    console.log('Datos de la API:', data); 

    // Agregar un evento click al enlace "Films"
    filmsLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = ''; // Limpiar el contenedor de los resultados
      detailsDiv.innerHTML = ''; // Limpiar el contenedor de los detalles

      const filmsList = document.createElement('ul'); // Crear una lista para las peliculas

      // Recorrer los resultados de films y crear elementos de lista con los títulos de las películas
      for (const film of data.results) {
        const titleElement = document.createElement('li'); // Crear un elemento de lista
        titleElement.textContent = film.title; // Establecer el nombre del vehículo como texto del elemento
 
        // Agregar un evento click a cada título de película
        titleElement.addEventListener('click', async () => {
          const filmDetails = await getFilmDetails(film.url);  // Obtener los detalles de film
          showFilmDetails(filmDetails); // Mostrar los detalles de la pelicula en la interfaz
        });

        filmsList.appendChild(titleElement); // Agg un elemento a un documento existente o mover un elemento de pag
      }

      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(filmsList); // Agregar la lista de peliculas al contenedor de los resultados
    });
  } catch (error) {
    console.error(error); // Manejar cualquier error y mostrarlo en la consola
  }
};

// Función para obtener los detalles de una película
const getFilmDetails = async (filmUrl) => {
  try {
    const response = await fetch(filmUrl); // Realizar la solicitud al URL de la pelicula específica
    const filmDetails = await response.json();  // Convertir la respuesta en formato JSON
    return filmDetails; // Devolver los detalles de la pelicula
  } catch (error) {
    console.error(error);
  }
};

// Función para mostrar los detalles de una película en la interfaz
const showFilmDetails = (film) => {
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

  backButtonContainer.style.display = 'block'; // mostrar el boton cuando damos clic en el titulo para detalles
};

// Evento para volver a estar atras del clic
backButton.addEventListener('click', () => {
  resultsDiv.innerHTML = ''; // Limpiar los detalles de la película
  detailsDiv.innerHTML = ''; // Limpiar los detalles de la película
  backButtonContainer.style.display = 'none'; // Ocultar el contenedor del botón
});



// Ejecutar la función para obtener los datos de la API de films
filmsApi();
