import * as type from '../constants';

export default function data(state = {}, action) {
  switch (action.type) {
    case type.SET_DATA:
      const data = action.payload.value
      return {
        ...state,
        post: {
          ...state.post,
          value: data.getOnePost || {}
        },
        news: {
          ...state.news,
          value: data.getNews || state.news.value
        },
        foodNews: {
          ...state.news,
          value: data.getFoodNews || state.foodNews.value
        },
        newsInCategory: {
          ...state.newsInCategory,
          value: data.getNewsInCategory || state.news.value
        },
        product: {
          ...state.product,
          value : data.getOneProduct || {}
        },
        products: {
          ...state.products,
          value : data.getProducts || []
        }
      };
    default:
      return state;
  }
}
