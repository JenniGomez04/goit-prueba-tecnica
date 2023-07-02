// Obtener referencias a elementos del DOM
const peopleLink = document.getElementById('people');
const resultsDiv = document.getElementById('results');

// Función para realizar la solicitud a la API de personas
const peopleApis = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/people/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "People"
    peopleLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';

      const peopleList = document.createElement('ul');

      // Obtener la lista de nombres de las personas
      const names = data.results.map(person => person.name);

      // Crear elementos de lista con los nombres de las personas
      names.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name;
        peopleList.appendChild(nameElement);
      });

      resultsDiv.appendChild(peopleList);
    });
  } catch (error) {
    console.error(error);
  }
};

// Ejecutar la función para obtener los datos de la API de personas
peopleApis();