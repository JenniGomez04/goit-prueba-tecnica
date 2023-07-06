// Obtener referencias a elementos del DOM
const vehiclesLink = document.getElementById('vehicles'); // Referencia al enlace "Vehicles"
const resultsDiv = document.getElementById('results'); // Referencia al contenedor de los resultados
const detailsDiv = document.getElementById('details'); // Referencia al contenedor de los detalles

// Función para realizar la solicitud a la API de vehículos
const vehiclesApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/vehicles/'); // Realizar la solicitud a la API de vehículos
    const data = await response.json(); // Convertir la respuesta en formato JSON
    console.log('Datos de la API:', data); // Imprimir los datos de la API en la consola

    // Agregar un evento click al enlace "Vehicles"
    vehiclesLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Evitar la acción predeterminada de redireccionamiento

      resultsDiv.innerHTML = ''; // Limpiar el contenedor de los resultados
      detailsDiv.innerHTML = ''; // Limpiar el contenedor de los detalles

      const vehiclesList = document.createElement('ul'); // Crear una lista para los vehículos

      // Recorrer los resultados de vehículos y crear elementos de lista con los nombres de los vehículos
      for (const vehicle of data.results) {
        const nameElement = document.createElement('li'); // Crear un elemento de lista
        nameElement.textContent = vehicle.name; // Establecer el nombre del vehículo como texto del elemento

        // Agregar un evento click a cada nombre de vehículo
        nameElement.addEventListener('click', async () => {
          const vehicleDetails = await getVehicleDetails(vehicle.url); // Obtener los detalles del vehículo
          showVehicleDetails(vehicleDetails); // Mostrar los detalles del vehículo en la interfaz
        });

        vehiclesList.appendChild(nameElement); // Agregar el elemento de lista a la lista de vehículos
      }

      resultsDiv.innerHTML = ''; // Limpiar el contenedor de los resultados
      resultsDiv.appendChild(vehiclesList); // Agregar la lista de vehículos al contenedor de los resultados
    });
  } catch (error) {
    console.error(error); // Manejar cualquier error y mostrarlo en la consola
  }
};

// Función para obtener los detalles de un vehículo
const getVehicleDetails = async (vehicleUrl) => {
  try {
    const response = await fetch(vehicleUrl); // Realizar la solicitud al URL del vehículo específico
    const vehicleDetails = await response.json(); // Convertir la respuesta en formato JSON
    return vehicleDetails; // Devolver los detalles del vehículo
  } catch (error) {
    console.error(error); // Manejar cualquier error y mostrarlo en la consola
  }
};

// Función para mostrar los detalles de un vehículo en la interfaz
const showVehicleDetails = (vehicle) => {
  detailsDiv.innerHTML = ''; // Limpiar el contenedor de los detalles

  const nameElement = document.createElement('h2'); // Crear un elemento de encabezado
  nameElement.textContent = vehicle.name; // Establecer el nombre del vehículo como texto del encabezado
  detailsDiv.appendChild(nameElement); // Agregar el encabezado al contenedor de los detalles

  const modelElement = document.createElement('p'); // Crear un elemento de párrafo
  modelElement.textContent = `Model: ${vehicle.model}`; // Establecer el modelo del vehículo como texto del párrafo
  detailsDiv.appendChild(modelElement); // Agregar el párrafo al contenedor de los detalles

  const manufacturerElement = document.createElement('p'); // Crear un elemento de párrafo
  manufacturerElement.textContent = `Manufacturer: ${vehicle.manufacturer}`; // Establecer el fabricante del vehículo como texto del párrafo
  detailsDiv.appendChild(manufacturerElement); // Agregar el párrafo al contenedor de los detalles

  const vehicleClassElement = document.createElement('p'); // Crear un elemento de párrafo
  vehicleClassElement.textContent = `Vehicle Class: ${vehicle.vehicle_class}`; // Establecer la clase del vehículo como texto del párrafo
  detailsDiv.appendChild(vehicleClassElement); // Agregar el párrafo al contenedor de los detalles

  const crewElement = document.createElement('p'); // Crear un elemento de párrafo
  crewElement.textContent = `Crew: ${vehicle.crew}`; // Establecer la tripulación del vehículo como texto del párrafo
  detailsDiv.appendChild(crewElement); // Agregar el párrafo al contenedor de los detalles

  backButtonContainer.style.display = 'block'; // Mostrar el botón de retroceso cuando se muestra los detalles del vehículo
};

// Evento para volver atrás al hacer clic en el botón de retroceso
backButton.addEventListener('click', () => {
  resultsDiv.innerHTML = ''; // Limpiar el contenedor de los resultados
  detailsDiv.innerHTML = ''; // Limpiar el contenedor de los detalles
  backButtonContainer.style.display = 'none'; // Ocultar el contenedor del botón de retroceso
});

// Ejecutar la función para obtener los datos de la API de vehículos
vehiclesApi();
