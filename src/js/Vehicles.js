// Obtener referencias a elementos del DOM
const vehiclesLink = document.getElementById('vehicles');
const resultsDiv = document.getElementById('results');

// Función para realizar la solicitud a la API de vehicles
const vehiclesApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/vehicles/');
    const data = await response.json();
    console.log('Datos de la API:', data);

    // Agregar un evento click al enlace "vehicles"
    vehiclesLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evita la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = '';

      const vehiclesList = document.createElement('ul');

      // Obtener la lista de nombres de las vehicles
      const names = data.results.map(vehicle => vehicle.name);

      // Crear elementos de lista con los nombres de las vehicles
      names.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name;
        vehiclesList.appendChild(nameElement);
      });

      resultsDiv.appendChild(vehiclesList);
    });
  } catch (error) {
    console.error(error);
  }
};

// Ejecutar la función para obtener los datos de la API de vehicles
vehiclesApi();