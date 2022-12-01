export const state = () => ({
  page: {
    slug: '',
    title: '',
    meta_description: '',
    meta_title: '',
    content: ''
  }
})

export const mutations = {
  setPage(state, page) {
    state.page = {
      ...state.page,
      ...page
    }
  }
}
