SimpleJekyllSearch.init({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  dataSource: '/search.json',
  searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
})