export const NEPAL_CITIES = {
  kathmandu: {
    slug: 'kathmandu',
    name: 'Kathmandu',
    state: 'Bagmati Province',
    country: 'Nepal',
    description: 'the capital city of Nepal and the largest metropolitan area',
    population: '1.4 million',
    coordinates: { lat: 27.7172, lng: 85.3240 },
    mapEmbed: 'https://maps.google.com/maps?q=Kathmandu,Nepal',
  },
  pokhara: {
    slug: 'pokhara',
    name: 'Pokhara',
    state: 'Gandaki Province',
    country: 'Nepal',
    description: 'the tourism capital of Nepal, famous for its lakes and mountain views',
    population: '500,000+',
    coordinates: { lat: 28.2096, lng: 83.9856 },
    mapEmbed: 'https://maps.google.com/maps?q=Pokhara,Nepal',
  },
  lalitpur: {
    slug: 'lalitpur',
    name: 'Lalitpur',
    state: 'Bagmati Province',
    country: 'Nepal',
    description: 'also known as Patan, a historic city known for its art and culture',
    population: '300,000+',
    coordinates: { lat: 27.6644, lng: 85.3188 },
    mapEmbed: 'https://maps.google.com/maps?q=Lalitpur,Nepal',
  },
  bhaktapur: {
    slug: 'bhaktapur',
    name: 'Bhaktapur',
    state: 'Bagmati Province',
    country: 'Nepal',
    description: 'a UNESCO World Heritage city known for its medieval architecture',
    population: '100,000+',
    coordinates: { lat: 27.6710, lng: 85.4298 },
    mapEmbed: 'https://maps.google.com/maps?q=Bhaktapur,Nepal',
  },
  biratnagar: {
    slug: 'biratnagar',
    name: 'Biratnagar',
    state: 'Koshi Province',
    country: 'Nepal',
    description: "Nepal's second-largest city and an important industrial hub",
    population: '250,000+',
    coordinates: { lat: 26.4525, lng: 87.2718 },
    mapEmbed: 'https://maps.google.com/maps?q=Biratnagar,Nepal',
  },
  chitwan: {
    slug: 'chitwan',
    name: 'Chitwan',
    state: 'Bagmati Province',
    country: 'Nepal',
    description: 'home to the famous Chitwan National Park and a growing business hub',
    population: '600,000+',
    coordinates: { lat: 27.5291, lng: 84.3542 },
    mapEmbed: 'https://maps.google.com/maps?q=Bharatpur,Chitwan,Nepal',
  },
  butwal: {
    slug: 'butwal',
    name: 'Butwal',
    state: 'Lumbini Province',
    country: 'Nepal',
    description: 'a major commercial center in western Nepal',
    population: '150,000+',
    coordinates: { lat: 27.7006, lng: 83.4483 },
    mapEmbed: 'https://maps.google.com/maps?q=Butwal,Nepal',
  },
  dharan: {
    slug: 'dharan',
    name: 'Dharan',
    state: 'Koshi Province',
    country: 'Nepal',
    description: 'an important commercial and educational city in eastern Nepal',
    population: '130,000+',
    coordinates: { lat: 26.8065, lng: 87.2846 },
    mapEmbed: 'https://maps.google.com/maps?q=Dharan,Nepal',
  },
};

export function getCityData(slug) {
  return NEPAL_CITIES[slug] || null;
}

export function getAllCities() {
  return Object.values(NEPAL_CITIES);
}
