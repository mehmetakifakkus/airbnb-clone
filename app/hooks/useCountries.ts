import countries from 'world-countries'

const filteredCountries = countries.map((country) => {
  return {
    value: country.cca2,
    label: country.name.common,
    capital: country.capital,
    flag: country.flag,
    region: country.region,
    latlng: country.latlng,
  }
});

const useCountries = () => {

  const getAll = () => filteredCountries;
  const getByValue = (value: string) => filteredCountries.find((country) => country.value === value);

  return { getAll, getByValue };
}

export default useCountries;