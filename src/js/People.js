// Obtener referencias a elementos del DOM
const peopleLink = document.getElementById('people');
const resultsDiv = document.getElementById('results');
const detailsDiv = document.getElementById('details');

// Función para realizar la solicitud a la API de personas
const peopleApis = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/people/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "People"
    peopleLink.addEventListener('click', async event => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';
      detailsDiv.innerHTML = '';

      const peopleList = document.createElement('ul');

      // Recorrer los resultados de personajes y crear elementos de lista con los nombres de las personas
      for (const person of data.results) {
        const nameElement = document.createElement('li');
        nameElement.textContent = person.name;

        // Agregar un evento click a cada nombre del personaje
        nameElement.addEventListener('click', async () => {
          const personDetails = await getPersonDetails(person.url);
          showPersonDetails(personDetails);
        });

        peopleList.appendChild(nameElement);
      }

      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(peopleList);
    });
  } catch (error) {
    console.error(error);
  }
};

// Función para obtener los detalles del personaje
const getPersonDetails = async personUrl => {
  try {
    const response = await fetch(personUrl);
    const personDetails = await response.json();
    return personDetails;
  } catch (error) {
    console.error(error);
  }
};

// Función para mostrar los detalles de un personaje en la interfaz
const showPersonDetails = person => {
  detailsDiv.innerHTML = '';

  // Crear elementos de personaje (name), altura, masa, color de cabello, color de piel
  const nameElement = document.createElement('h2');
  nameElement.textContent = person.name;
  detailsDiv.appendChild(nameElement);

  const heightElement = document.createElement('p');
  heightElement.textContent = `Height: ${person.height}`;
  detailsDiv.appendChild(heightElement);

  const massElement = document.createElement('p');
  massElement.textContent = `Mass: ${person.mass}`;
  detailsDiv.appendChild(massElement);

  const hairColorElement = document.createElement('p');
  hairColorElement.textContent = `Hair Color: ${person.hair_color}`;
  detailsDiv.appendChild(hairColorElement);

  const skinColorElement = document.createElement('p');
  skinColorElement.textContent = `Skin Color: ${person.skin_color}`;
  detailsDiv.appendChild(skinColorElement);

  backButtonContainer.style.display = 'block';
};

// Evento para volver a estar atras del clic
backButton.addEventListener('click', () => {
  resultsDiv.innerHTML = '';
  detailsDiv.innerHTML = ''; 
  backButtonContainer.style.display = 'none'; // Ocultar el contenedor del botón
});

// Ejecutar la función para obtener los datos de la API de personas
peopleApis();
