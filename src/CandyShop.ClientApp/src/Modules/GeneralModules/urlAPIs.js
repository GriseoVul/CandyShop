//!Ссылки эндпоинтов для API
//основной API
export const baseUrlApi = `/api` // /api // https://gdw3fstj-5063.euw.devtunnels.ms/api // https://fakestoreapi.com/

//get`sы

export const getProductUrlApi = `${baseUrlApi}/Product`

export const getCategorysUrlApi = `${baseUrlApi}/Category`

export const getBannersUrlApi = `${baseUrlApi}/Banners`

export const getImageUrlApi = `${baseUrlApi}/Image`

export const getUserUrlApi = `${baseUrlApi}/Users`

//post`sы
export const postProductUrlApi = `${baseUrlApi}/Product/create`

export const postOrderUrlApi = `${baseUrlApi}/Order/create`

export const postCategoryUrlApi = `${baseUrlApi}/Category/create`

export const postBannerUrlApi = `${baseUrlApi}/Banners/create`

//put`sы
export const putProductUrlApi = `${baseUrlApi}/Product/update?`

export const putCategoryUrlApi = `${baseUrlApi}/Category/update?`

export const putBannerUrlApi = `${baseUrlApi}/Banners/update?`

export const putOrderUrlApi = `${baseUrlApi}/Order/update?`