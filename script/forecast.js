const key = 'rwbkIxc6nyYu5VxftpNfQk7GBbkJw8j6';


//second API call for getting weather information
const getWeather = async(id)=>{
               
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';

    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);

    const data = await response.json();
    return data[0];
}

//first API call for getting the city information
const getCity = async (city) =>{
    
    
    //getting the base codition url from the accuweatherapi
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    
    //getting the other parameter like apikey and q
    const query = `?apikey=${key}&q=${city}`;
    
    const response = await fetch(base + query);

    const data = await response.json();

    return data[0];
};

