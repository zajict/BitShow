(function (data, ui) {

    const searchInput = $("#search-input");
    const searchDropDownEl = $("#search-dropdown");
    const mainContentWrapper = $("#main-content");
    const homeButtonEl = $("#home-button");

    const onSearch = e => {
        const term = e.target.value;
        data.searchShow(term).then((shows) => {
            ui.clearDropdown();
            ui.renderSearchDropdown(shows);
        });
    };

    const onSearchDropdownClick = e => {
        if (!$(e.target).hasClass("search-item")) {
            return;
        };
        ui.clearDropdown();
        const id = $(e.target).attr("id");
        data.getSingleTvShow(id).then((show) => {
            ui.renderSingleTvShowPage(show);
        });
    };

    const onSingleTvShowClick = e => {
        const targetEl = $(e.target).parent().parent();
        if (! targetEl.hasClass("show-item")) {
            return;
        };
        const id = targetEl.attr("id");
        data.getSingleTvShow(id).then((show) => {
            ui.renderSingleTvShowPage(show)
        });
    };

    const onClickHomeButtonHandler = () => {
        data.getShows().then((shows) => {
            ui.renderHomePage(shows);
        });
    };

    onClickHomeButtonHandler();

    searchInput.keyup(onSearch);
    searchDropDownEl.click(onSearchDropdownClick);
    mainContentWrapper.click(onSingleTvShowClick);
    homeButtonEl.click(onClickHomeButtonHandler);

})(dataModule, uiModule);
