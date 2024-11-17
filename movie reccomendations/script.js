const API_KEY = 'your_api_key'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const recommendations = document.getElementById('recommendations');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    alert('Please enter a movie name!');
  }
});

async function fetchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    if (data.results.length > 0) {
      displayMovies(data.results);
    } else {
      recommendations.innerHTML = '<p>No recommendations found.</p>';
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    recommendations.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}

function displayMovies(movies) {
  recommendations.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie');
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
    `;
    recommendations.appendChild(movieCard);
  });
}
