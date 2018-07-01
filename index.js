const NASA_SEARCH_URL = 'https://api.nasa.gov/planetary/apod';

function getDataFromApi(searchTerm, callback) {
    const query = {
        date: `${searchTerm}`,
        api_key: `8BGfkFwhVTR9kh7iaDcddTL3lpVPo9oBBfZR20ZY`,
        per_page: 1
    }
    $.getJSON(NASA_SEARCH_URL, query, callback);
}

function renderResult(result) {
    return `
    <div>       
      <h3>${result.title}</h3>
      <img src="${result.url}" alt="Image not found">
    </div>
  `;
}

function displaySearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    console.log(results);
    $('.js-search-results').html(results);
}

function onSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault(); //click on specific area, else click doesn't works.
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        getDataFromApi(query, displaySearchData);
    });
}

$(onSubmit);