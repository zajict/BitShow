const dataModule = (function () {

    class TvShow {
        constructor(name, id, coverUrl, seasons, cast, summary, crew, akas, episodes) {
            this.name = name;
            this.id = id;
            this.coverUrl = coverUrl;
            this.seasons = seasons;
            this.cast = cast;
            this.summary = summary;
            this.crew = crew;
            this.akas = akas;
            this.episodes = episodes;
        };
    };

    class Season {
        constructor(startDate, endDate) {
            this.startDate = startDate;
            this.endDate = endDate;
        };
    };

    const getShows = () => {
        return $.ajax({url: 'http://api.tvmaze.com/shows', method: 'GET', dataType: 'json'}).then((showsRawObjects) => {
            const topRatedShows = showsRawObjects.filter(show => show.rating.average).sort((a, b) => b.rating.average - a.rating.average).slice(0, 50);
            return topRatedShows.map(({name, id, image}) => new TvShow(name, id, image.medium));
        });
    };

    const getSingleTvShow = id => {
        return $.ajax({url: `https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast&embed[]=crew&embed[]=akas&embed[]=episodes`, method: 'GET', dataType: 'json'}).then(rawTvShow => {
            const seasons = rawTvShow._embedded.seasons.map(season => new Season(season.premiereDate, season.endDate));

            const cast = rawTvShow._embedded.cast.map(actor => actor.person.name);

            const crew = rawTvShow._embedded.crew.map(crewMember => crewMember.type + ": " + crewMember.person.name);

            const akas = rawTvShow._embedded.akas.map(alias => alias.name);

            const episodes = rawTvShow._embedded.episodes.map((episode) => episode.name + " | Season " + episode.season + " | Episode " + episode.number);

            return new TvShow(rawTvShow.name, rawTvShow.id, rawTvShow.image.original, seasons, cast, rawTvShow.summary, crew, akas, episodes);
        });
    };

    const searchShow = term => {
        return $.ajax({url: `https://api.tvmaze.com/search/shows?q=${term}?`, method: 'GET', dataType: 'json'}).then(showsRawObjects => showsRawObjects.slice(0, 10).map(({show}) => {
            const {name, id, image} = show;
            const imageToUse = image ? image.medium : '';
            return new TvShow(name, id, imageToUse);
        }));
    };

    return {getShows, getSingleTvShow, searchShow};

})();
