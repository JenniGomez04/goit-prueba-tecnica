//Consulta Unica

/*
const peopleApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/vehicles/');
    const data = await response.json();
    console.log('Datos de la Api:', data)
    console.log(data.results)
  } catch (error) {
    console.error(error);
  }
};

peopleApi();*/

// CONSULTAS A LA API STAR WARS LAS DIFERENTES CATEGORIAS

/*const conectarApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/');
    const data = await response.json();
  //console.log(data);

    // Acceder a las diferentes categorías de la API
    const filmsUrl = data.films;
    const peopleUrl = data.people;
    const planetsUrl = data.planets;
    const speciesUrl = data.species;
    const starshipsUrl = data.starships;
    const vehiclesUrl = data.vehicles;


    // Realizar solicitudes a las diferentes categorías
    const filmsResponse = await fetch(filmsUrl);
    const filmsData = await filmsResponse.json();
    const films = filmsData.results;

    const peopleResponse = await fetch(peopleUrl);
    const peopleData = await peopleResponse.json();

    const planetsResponse = await fetch(planetsUrl);
    const planetsData = await planetsResponse.json();

    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    const starshipsResponse = await fetch(starshipsUrl);
    const starshipsData = await starshipsResponse.json();

    const vehiclesResponse = await fetch(vehiclesUrl);
    const vehiclesData = await vehiclesResponse.json();
    

    // Imprimir los datos de las diferentes categorías
    console.log('Datos de films:', filmsData);
    console.log('Datos de people:', peopleData);
    console.log('Datos de planets:', planetsData);
    console.log('Datos de species:', speciesData);
    console.log('Datos de starships:', starshipsData);
    console.log('Datos de vehicles:', vehiclesData);

  } catch (error) {
    console.error(error);
  }
};

conectarApi();*/







