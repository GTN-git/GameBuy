// Query for searching games{
export const searchGames = query => {
    return fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_API_GATEWAY}/v4/games/?search=${query}&fields=id,name,cover.url,category,status`)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    }).then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.log(err);
    });
}