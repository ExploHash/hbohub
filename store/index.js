export const state = () => ({
  favourites: [],
  filters: {},
  results: [],
})

export const mutations = {
  set_employers_items(state, items) {
    state.employers = items;
  }
}