var config = require('./config'),
    request = require('request'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser(),
    urlHelper = require('./util/url_helper_ncaaf');

function init(access_level, version, year, season, apikey) {
  config.ncaaf.access_level = access_level;
  config.ncaaf.version = version;
  config.ncaaf.year = year;
  config.ncaaf.season = season;
  config.ncaaf.apikey = apikey;
}

function getSeasonSchedule(callback) {
  var url = urlHelper.getSeasonScheduleUrl();
  createRequest(url, callback);
}

function getWeeklySchedule(week, callback) {
  var url = urlHelper.getWeeklyScheduleUrl(week);
  createRequest(url, callback);
}

function getGameStatistics(week, awayteam, hometeam, callback) {
  var url = urlHelper.getGameStatisticsUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getBoxscore(week, awayteam, hometeam, callback) {
  var url = urlHelper.getBoxscoreUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getExtendedBoxscore(week, awayteam, hometeam, callback) {
  var url = urlHelper.getExtendedBoxscoreUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getStandings(division, callback) {
  var url = urlHelper.getStandingsUrl(division);
  createRequest(url, callback);
}

function getTeamHierarchy(division, callback) {
  var url = urlHelper.getTeamHierarchyUrl(division);
  createRequest(url, callback);
}

function createRequest(url, callback) {
  var begin_url = 'http://api.sportsdatallc.org/ncaaf-' + config.ncaaf.access_level + config.ncaaf.version + '/';
  var end_url = '.' + config.ncaaf.format + '?api_key=' + config.ncaaf.apikey;
  url = begin_url + url + end_url
  
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Parse the XML to JSON
      parser.parseString(body, function (err, result) {
        callback(err, result);
      });
    } else {
      callback(error, body);
    }
  });
}

module.exports = {
  init: function(access_level, version, year, season, apikey) {
    return init(access_level, version, year, season, apikey);
  },
  setRequest: function(reqObj) {
    request = reqObj;
  },
  getSeasonSchedule: function(callback) {
    return getSeasonSchedule(callback);
  },
  getWeeklySchedule: function(week, callback) {
    return getWeeklySchedule(week, callback);
  },
  getGameStatistics: function(week, awayteam, hometeam, callback) {
    return getGameStatistics(week, awayteam, hometeam, callback);
  },
  getBoxscore: function(week, awayteam, hometeam, callback) {
    return getBoxscore(week, awayteam, hometeam, callback);
  },
  getExtendedBoxscore: function(week, awayteam, hometeam, callback) {
    return getExtendedBoxscore(week, awayteam, hometeam, callback);
  },
  getStandings: function(division, callback) {
    return getStandings(division, callback);
  },
  getTeamHierarchy: function(division, callback) {
    return getTeamHierarchy(division, callback);
  }
};