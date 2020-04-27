import hboData from "~/assets/data.json";
const filterNames = ["opleidingstype", "opleidingsvorm", "hoofdcategorie", "provincie", "opleidingsinstelling"];

export const state = () => ({
  favourites: [],
  filters: {},
  results: [],
  searchTerms: "",
  hboData
})

export const mutations = {
  setResults(state, results){
    state.results = results;
  },
  setSearchTerm(state, terms){
    state.searchTerms = terms;
  },
  toggleFavourite(state, id){
    if(state.favourites.includes(id)){
      state.favourites = state.favourites.filter(favourite => favourite !== id);
    }else{
      state.favourites.push(id);
    }
  },
  setFilter(state, {filterName, filterValue, bool}){
    state.filters[filterName][filterValue] = bool;
  },
  setFilters(state, filters){
    state.filters = filters;
  },
  setFavourites(state, favourites){
    state.favourites = favourites;
  }
}

export const actions = {
  nuxtServerInit({dispatch, commit}){
    dispatch("calculateFilters");
  },
  async setSearchTerm({dispatch, commit}, value){
    commit("setSearchTerm", value);
    dispatch("applyFilters");
  },
  async calculateFilters({ commit }) {
    let filters = {};
    hboData.forEach(row => {
      filterNames.forEach(filter => {
        if (!filters[filter]) filters[filter] = {};
        if (!filters[filter][row[filter]]) {
          filters[filter][row[filter]] = false;
        }
      });
    });

    commit("setFilters", filters);
    commit("setResults", hboData);
  },
  async applyFilters({state, commit}){
    //First find emptyfilters
    let emptyFilters = [];
    Object.entries(state.filters).forEach(([filterName]) => {
      if(Object.entries(state.filters[filterName]).every(([, value]) => !value)){
        emptyFilters.push(filterName);
      }
    });
    //Filter
    let calculatedResults = hboData.filter(row => {
      return Object.entries(state.filters).every(([filterName, filterValues]) => {
        return (emptyFilters.includes(filterName) || Object.entries(filterValues).find(([filterValue, state]) => {
          return state && row[filterName] === filterValue;
        })) && state.searchTerms.toLowerCase().split(" ").every(term => row.opleidingsnaam.toLowerCase().includes(term) || row.opleidingsinstelling.toLowerCase().includes(term))
      });
    });

    commit("setResults", calculatedResults);
  },
  async filterEvent({state, commit, dispatch}, {filterName, filterValue}){
    commit("setFilter", {filterName, filterValue, bool: state.filters[filterName][filterValue] !== true});
    dispatch("applyFilters");
  }
}