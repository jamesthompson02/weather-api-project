// This following block of code relates to the openweathermap's standard API. The objective is that
// if a user types in a city name, a function will be executed which seeks to fetch the current weather
//data for that city. 



const card = document.getElementById('card');
const searchButton = document.getElementById('search-btn');
const searchField = document.getElementById('search-box');
const title = document.getElementById('title');
const temperature = document.getElementById('temperature');
const weatherSummary = document.getElementById('weather-summary');
const weatherSummaryContainer = document.getElementById('weather-summary-container');
const weatherIcon = document.getElementById('weather-icon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const advancedSearch = document.getElementById('advanced-search')


function weatherSearch() {
    let searchField1 = searchField.value;
    searchField1 = searchField1.toLowerCase();
    searchField1 = searchField1.replaceAll(' ', '');
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchField1 + openWeatherMapTokenAPI)
    .then(response => {
        return response.json();
    })
    .then (function(json) {
        title.innerText = 'Weather in ' + json.name + ',' + json.sys.country;
        temperature.innerText = 'Temperature: ' + Math.round(json.main.temp) + '°C';    
        weatherSummary.innerText = 'General Weather: ' + json.weather[0].description;
        weatherIcon.src = 'https://openweathermap.org/img/wn/'+ json.weather[0].icon + '@2x.png'; 
        humidity.innerText = 'Humidity: ' + json.main.humidity + '%';
        windSpeed.innerText = 'Wind: ' + Math.round(json.wind.speed) + 'km/h';
        title.style.display = 'block';
        temperature.style.display = 'block';
        weatherSummary.style.display = 'flex';
        weatherSummaryContainer.style.display = 'flex';
        humidity.style.display = 'block';
        windSpeed.style.display = 'block';
    })
}

searchButton.addEventListener('click', () => {
    weatherSearch();
})

searchField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        weatherSearch();
    }
})


//The following block of code relates to openweathermap's GeoCoding API. The GeoCoding API takes at least
// two parameters: the city name and the country that the city is located in. If looking for a city 
// in America, it is advisable to also add a state code too. All country and state codes (state codes
// just for the US) are done using ISO codes. In addition, the following code also contains both 
// a function and event listeners
// that allow the user to switch between normal weather search and advanced weather search.


const countryCodes = {
    "Afghanistan":"004",
    "Åland Islands":"248",
    "Albania":"008",
    "Algeria":"012",
    "American Samoa":"016",
    "Andorra":"020",
    "Angola":"024",
    "Anguilla":"660",
    "Antarctica":"010",
    "Antigua and Barbuda":"028",
    "Argentina":"032",
    "Armenia":"051",
    "Aruba":"533",
    "Australia":"036",
    "Austria":"040",
    "Azerbaijan":"031",
    "Bahamas":"044",
    "Bahrain":"048",
    "Bangladesh":"050",
    "Barbados":"052",
    "Belarus":"112",
    "Belgium":"056",
    "Belize":"084",
    "Benin":"204",
    "Bermuda":"060",
    "Bhutan":"064",
    "Bolivia":"068",
    "Bonaire, Sint Eustatius and SabaBonaire":"535",
    "Bosnia and Herzegovina":"070",
    "Botswana":"072",
    "Bouvet Island":"074",
    "Brazil":"076",
    "British Indian Ocean Territory":"086",
    "Brunei Darussalam":"096",
    "Bulgaria":"100",
    "Burkina Faso":"854",
    "Burundi":"108",
    "Cabo Verde":"132",
    "Cambodia":"116",
    "Cameroon":"120",
    "Canada":"124",
    "Cayman Islands":"136",
    "Central African Republic":"140",
    "Chad":"148",
    "Chile":"152",
    "China":"156",
    "Christmas Island":"162",
    "Cocos (Keeling) Islands":"166",
    "Colombia":"170",
    "Comoros":"174",
    "Congo (the Democratic Republic of)":"180",
    "Congo":"178",
    "Cook Islands":"184",
    "Costa Rica":"188",
    "Côte d'Ivoire":"384",
    "Croatia":"191",
    "Cuba":"192",
    "Curaçao":"531",
    "Cyprus":"196",
    "Czechia":"203",
    "Denmark":"208",
    "Djibouti":"262",
    "Dominica":"212",
    "Dominican Republic":"214",
    "Ecuador":"218",
    "Egypt":"818",
    "El Salvador":"222",
    "Equatorial Guinea":"226",
    "Eritrea":"232",
    "Estonia":"233",
    "Eswatini":"748",
    "Ethiopia":"231",
    "Falkland Islands":"238",
    "Faroe Islands":"234",
    "Fiji":"242",
    "Finland":"246",
    "France":"250",
    "French Guiana":"254",
    "French Polynesia":"258",
    "French Southern Territories":"260",
    "Gabon":"266",
    "Gambia":"270",
    "Georgia":"268",
    "Germany":"276",
    "Ghana":"288",
    "Gibraltar":"292",
    "Greece":"300",
    "Greenland":"304",
    "Grenada":"308",
    "Guadeloupe":"312",
    "Guam":"316",
    "Guatemala":"320",
    "Guernsey":"831",
    "Guinea":"324",
    "Guinea-Bissau":"624",
    "Guyana":"328",
    "Haiti":"332",
    "Heard Island and McDonald Islands":"334",
    "Holy See":"336",
    "Honduras":"340",
    "Hong Kong":"344",
    "Hungary":"348",
    "Iceland":"352",
    "India":"356",
    "Indonesia":"360",
    "Iran":"364",
    "Iraq":"368",
    "Ireland":"372",
    "Isle of Man":"833",
    "Israel":"376",
    "Italy":"380",
    "Jamaica":"388",
    "Japan":"392",
    "Jersey":"832",
    "Jordan":"400",
    "Kazakhstan":"398",
    "Kenya":"404",
    "Kiribati":"296",
    "Korea (the Democratic People's Republic of)":"408",
    "Korea (the Republic of)":"410",
    "Kuwait":"414",
    "Kyrgyzstan":"417",
    "Lao People's Democratic Republic":"418",
    "Latvia":"428",
    "Lebanon":"422",
    "Lesotho":"426",
    "Liberia":"430",
    "Libya":"434",
    "Liechtenstein":"438",
    "Lithuania":"440",
    "Luxembourg":"442",
    "Macao":"446",
    "Madagascar":"450",
    "Malawi":"454",
    "Malaysia":"458",
    "Maldives":"462",
    "Mali":"466",
    "Malta":"470",
    "Marshall Islands":"584",
    "Martinique":"474",
    "Mauritania":"478",
    "Mauritius":"480",
    "Mayotte":"175",
    "Mexico":"484",
    "Micronesia":"583",
    "Moldova":"498",
    "Monaco":"492",
    "Mongolia":"496",
    "Montenegro":"499",
    "Montserrat":"500",
    "Morocco":"504",
    "Mozambique":"508",
    "Myanmar":"104",
    "Namibia":"516",
    "Nauru":"520",
    "Nepal":"524",
    "Netherlands":"528",
    "New Caledonia":"540",
    "New Zealand":"554",
    "Nicaragua":"558",
    "Niger":"562",
    "Nigeria":"566",
    "Niue":"570",
    "Norfolk Island":"574",
    "North Macedonia":"807",
    "Northern Mariana Islands":"580",
    "Norway":"578",
    "Oman":"512",
    "Pakistan":"586",
    "Palau":"585",
    "Palestine":"275",
    "Panama":"591",
    "Papua New Guinea":"598",
    "Paraguay":"600",
    "Peru":"604",
    "Philippines":"608",
    "Pitcairn":"612",
    "Poland":"616",
    "Portugal":"620",
    "Puerto Rico":"630",
    "Qatar":"634",
    "Réunion":"638",
    "Romania":"642",
    "Russian Federation":"643",
    "Rwanda":"646",
    "Saint Barthélemy":"652",
    "Saint Helena, Ascension and Tristan da Cunha":"654",
    "Saint Kitts and Nevis":"659",
    "Saint Lucia":"662",
    "Saint Martin":"663",
    "Saint Pierre and Miquelon":"666",
    "Saint Vincent and the Grenadines":"670",
    "Samoa":"882",
    "San Marino":"674",
    "Sao Tome and Principe":"678",
    "Saudi Arabia":"682",
    "Senegal":"686",
    "Serbia":"688",
    "Seychelles":"690",
    "Sierra Leone":"694",
    "Singapore":"702",
    "Sint Maarten":"534",
    "Slovakia":"703",
    "Slovenia":"705",
    "Solomon Islands":"090",
    "Somalia":"706",
    "South Africa":"710",
    "South Georgia and the South Sandwich Islands":"239",
    "South Sudan":"728",
    "Spain":"724",
    "Sri Lanka":"144",
    "Sudan":"729",
    "Suriname":"740",
    "Svalbard and Jan Mayen":"744",
    "Sweden":"752",
    "Switzerland":"756",
    "Syrian Arab Republic":"760",
    "Taiwan":"158",
    "Tajikistan":"762",
    "Tanzania":"834",
    "Thailand":"764",
    "Timor-Leste":"626",
    "Togo":"768",
    "Tokelau":"772",
    "Tonga":"776",
    "Trinidad and Tobago":"780",
    "Tunisia":"788",
    "Turkey":"792",
    "Turkmenistan":"795",
    "Turks and Caicos Islands":"796",
    "Tuvalu":"798",
    "Uganda":"800",
    "Ukraine":"804",
    "United Arab Emirates":"784",
    "United Kingdom":"826",
    "United States Minor Outlying Islands":"581",
    "United States of America":"840",
    "Uruguay":"858",
    "Uzbekistan":"860",
    "Vanuatu":"548",
    "Venezuela":"862",
    "VietNam":"704",
    "Virgin Islands (British)":"092",
    "Virgin Islands (U.S.)":"850",
    "Wallis and Futuna":"876",
    "Western Sahara":"732",
    "Yemen":"887",
    "Zambia":"894",
    "Zimbabwe":"716",
}

const usStateCodes  = {
    "Alabama":"US-AL",
    "Alaska":"US-AK",
    "Arizona":"US-AZ",
    "Arkansas":"US-AR",
    "California":"US-CA",
    "Colorado":"US-CO",
    "Connecticut":"US-CT",
    "Delaware":"US-DE",
    "Florida":"US-FL",
    "Georgia":"US-GA",
    "Hawaii":"US-HI",
    "Idaho":"US-ID",
    "Illinois":"US-IL",
    "Indiana":"US-IN",
    "Iowa":"US-IA",
    "Kansas":"US-KS",
    "Kentucky":"US-KY",
    "Louisiana":"US-LA",
    "Maine":"US-ME",
    "Maryland":"US-MD",
    "Massachusetts":"US-MA",
    "Michigan":"US-MI",
    "Minnesota":"US-MN",
    "Mississippi":"US-MS",
    "Missouri":"US-MO",
    "Montana":"US-MT",
    "Nebraska":"US-NE",
    "Nevada":"US-NV",
    "New Hampshire":"US-NH",
    "New Jersey":"US-NJ",
    "New Mexico":"US-NM",
    "New York":"US-NY",
    "North Carolina":"US-NC",
    "North Dakota":"US-ND",
    "Ohio":"US-OH",
    "Oklahoma":"US-OK",
    "Oregon":"US-OR",
    "Pennsylvania":"US-PA",
    "Rhode Island":"US-RI",
    "South Carolina":"US-SC",
    "South Dakota":"US-SD",
    "Tennessee":"US-TN",
    "Texas":"US-TX",
    "Utah":"US-UT",
    "Vermont":"US-VT",
    "Virginia":"US-VA",
    "Washington":"US-WA",
    "West Virginia":"US-WV",
    "Wisconsin":"US-WI",
    "Wyoming":"US-WY",
    "District of Columbia":"US-DC",
}

const advancedCard = document.getElementById('advanced-card');
const advancedSearchField = document.getElementById('city-search-box');
const americanStates = document.getElementById('american-states');
const countries = document.getElementById('countries');
const advancedSearchButton = document.getElementById('advanced-search-btn');
const advancedTitle = document.getElementById('advanced-title');
const advancedTemperature = document.getElementById('advanced-temperature');
const advancedWeatherSummary = document.getElementById('advanced-weather-summary');
const advancedWeatherSummaryContainer = document.getElementById('advanced-weather-summary-container');
const advancedWeatherIcon = document.getElementById('advanced-weather-icon');
const advancedHumidity = document.getElementById('advanced-humidity');
const advancedWindSpeed = document.getElementById('advanced-wind-speed');
const basicSearch = document.getElementById('basic-search');
const basicSearchLink = document.getElementById('basic-search-link');
const advancedSearchLink = document.getElementById('advanced-search-link');

advancedSearchLink.addEventListener('click', () => {
    advancedSearchField.value = '';
    americanStates.value = 'N/A';
    countries.value = 'Afghanistan';
    advancedTitle.style.display = 'none';
    advancedTemperature.style.display = 'none';
    advancedWeatherSummaryContainer.style.display = 'none';
    advancedHumidity.style.display = 'none';
    advancedWindSpeed.style.display = 'none';
    card.style.display = 'none';
    advancedCard.style.display = 'flex';
})

basicSearchLink.addEventListener('click', () => {
    searchField.value = '';
    title.style.display = 'none';
    temperature.style.display = 'none';
    weatherSummaryContainer.style.display = 'none';
    humidity.style.display = 'none';
    windSpeed.style.display = 'none';
    advancedCard.style.display = 'none';
    card.style.display = 'flex';
})

function advancedWeatherSearch() {
    if (americanStates.value === 'N/A') {
        let advancedSearchField1 = advancedSearchField.value;
        advancedSearchField1 = advancedSearchField1.toLowerCase();
        advancedSearchField1 = advancedSearchField1.replaceAll(' ', '');
        let isoCode = countryCodes[countries.value];
        fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + advancedSearchField1 + ',' + isoCode + openWeatherMapTokenAPI2)
        .then(response => {
            return response.json();
        })
        .then(json => {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='+json[0].lat+'&lon='+json[0].lon+openWeatherMapTokenAPI)
            .then(response1 => {
                return response1.json();
            })
            .then(json => {
                advancedTitle.innerText = 'Weather in ' + json.name + ',' + json.sys.country;
                advancedTemperature.innerText = 'Temperature: ' + Math.round(json.main.temp) + '°C';    
                advancedWeatherSummary.innerText = 'General Weather: ' + json.weather[0].description;
                advancedWeatherIcon.src = 'https://openweathermap.org/img/wn/'+ json.weather[0].icon + '@2x.png'; 
                advancedHumidity.innerText = 'Humidity: ' + json.main.humidity + '%';
                advancedWindSpeed.innerText = 'Wind: ' + Math.round(json.wind.speed) + 'km/h';
                advancedTitle.style.display = 'block';
                advancedTemperature.style.display = 'block';
                advancedWeatherSummary.style.display = 'flex';
                advancedWeatherSummaryContainer.style.display = 'flex';
                advancedHumidity.style.display = 'block';
                advancedWindSpeed.style.display = 'block';
                
            })
        })   
    } else {
        let advancedSearchField1 = advancedSearchField.value;
        advancedSearchField1 = advancedSearchField1.toLowerCase();
        advancedSearchField1 = advancedSearchField1.replaceAll(' ', '');
        let stateCode = usStateCodes[americanStates.value];
        let isoCode = countryCodes[countries.value];
        fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + advancedSearchField1 + ',' + stateCode + ',' + isoCode + openWeatherMapTokenAPI2)
        .then(response => {
            return response.json();
        })
        .then(json => {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='+json[0].lat+'&lon='+json[0].lon+openWeatherMapTokenAPI)
            .then(response1 => {
                return response1.json();
            })
            .then(json => {
                advancedTitle.innerText = 'Weather in ' + json.name + ',' + json.sys.country;
                advancedTemperature.innerText = 'Temperature: ' + Math.round(json.main.temp) + '°C';    
                advancedWeatherSummary.innerText = 'General Weather: ' + json.weather[0].description;
                advancedWeatherIcon.src = 'https://openweathermap.org/img/wn/'+ json.weather[0].icon + '@2x.png'; 
                advancedHumidity.innerText = 'Humidity: ' + json.main.humidity + '%';
                advancedWindSpeed.innerText = 'Wind: ' + Math.round(json.wind.speed) + 'km/h';
                advancedTitle.style.display = 'block';
                advancedTemperature.style.display = 'block';
                advancedWeatherSummary.style.display = 'flex';
                advancedWeatherSummaryContainer.style.display = 'flex';
                advancedHumidity.style.display = 'block';
                advancedWindSpeed.style.display = 'block';
                
            })
        })   

        
    }
}

advancedSearchButton.addEventListener('click', () => {
    advancedWeatherSearch();
})
