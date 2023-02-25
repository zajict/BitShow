const uiModule = (() => {

    const mainContentWrapperEl = $("#main-content");
    let searchDropdownEl = $("#search-dropdown");
    let searchInputEl = $("#search-input");

    const renderHomePage = (shows) => {
        let html = `
      <h2 id="title">Popular Shows</h2>
      <div class="row text-center gy-5 show-list">
    `;

        shows.forEach((show) => {
            html += `
          <div class="col-sm-6 col-md-4 col-lg-4 show-item d-flex justify-content-center" id="${
                show.id
            }">
            <div class="card" style="width: 70%">
              <img src="${
                show.coverUrl
            }" class="card-img-top" alt="show cover image">
              <h5 class="card-text">${
                show.name
            }</h5>
            </div>
          </div>
        `;
        });

        html += `</div>`;
        mainContentWrapperEl.html(html);
    };

    const renderSingleTvShowPage = show => {
        let castListHtml = "";
        show.cast.forEach((string) => {
            castListHtml += `<li class="cast-item">${string}</li>`;
        });

        let seasonListHtml = "";
        let numberOfSeasons = 0;
        show.seasons.forEach(({startDate, endDate}) => {
            numberOfSeasons++;
            seasonListHtml += `<li class="season-item">${startDate} - ${endDate}</li>`
        });

        let crewListHtml = "";
        show.crew.forEach((string) => {
            crewListHtml += `<li class="crew-item">${string}</li>`;
        });

        let akasListHtml = "";
        show.akas.forEach((string) => {
            akasListHtml += `<li class="akas">${string}</li>`;
        });

        let episodeListHtml = "";
        show.episodes.forEach((string) => {
            episodeListHtml += `<li class="episodes">${string}</li>`
        });

        const finalHtml = `
      <div class="container">
        <div class="row text-center">
          <h2>${
            show.name
        }</h2>
        </div>
        <div class="d-flex flex-row flex-wrap justify-content-center">
          <div class="p-2 image-wrapper">
              <img src="${
            show.coverUrl
        }" alt="show-cover" class="img-responsive show-cover">
          </div>
          <div class="p-2 list-wrapper">
            <h4>Seasons (${numberOfSeasons})</h4>
            <ul>
            ${seasonListHtml}
            </ul>
            </br>
            <h4>Cast</h4>
            <ul>
            ${castListHtml}
            </ul>
          </div>
        </div>
        <div class="row justify-content-left">
          <h4 class="title">Show Details</h4>
          ${
            show.summary
        }
        </div>
        <div class="d-flex flex-row flex-wrap justify-content-center">
          <div class="p-2 list-wrapper">
            <h4>Crew</h4>
            <ul>
              ${crewListHtml}
            </ul>
          </div>
          <div class="p-2 list-wrapper">
            <h4>AKA's</h4>
            <ul>
              ${akasListHtml}
            </ul>
          </div>
          <div class="p-2 list-wrapper">
              <h4 class="title">Episode List</h4>
              <ul>
                ${episodeListHtml}
              </ul>
  
          </div>
      </div>
    `;
        mainContentWrapperEl.html(finalHtml);
    };

    const renderSearchDropdown = shows => {
        shows.forEach((show) => {
            const itemEl = $(`<div id="${
                show.id
            }" class="search-item">${
                show.name
            }</div>`);
            itemEl.attr("style", "cursor: pointer;");
            searchDropdownEl.append(itemEl);
        });
    };

    const clearDropdown = () => {
        searchDropdownEl.innerHtml = "";
    };

    return {renderHomePage, renderSingleTvShowPage, renderSearchDropdown, clearDropdown};

})();
