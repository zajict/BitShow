const dataModule = (function () {

    class TvShow {
        constructor(name, id, coverUrl, season, cast, summary, crew, akas, episodes) {
            this.name = name;
            this.id = id;
            this.coverUrl = coverUrl;
            this.season = season;
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


});