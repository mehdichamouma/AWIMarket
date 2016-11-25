export const fetchPartnersProducts = () => {
  return fetch("https://igdiscount.eu-gb.mybluemix.net/product/available")
  .then(res => res.json())
}

export const fetchPartnersProductsReda = () => {
  return fetch("http://yourtask.mybluemix.net/Product/")
  .then(res => res.xml())
}
