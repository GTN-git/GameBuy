// Query for searching games{
export const searchGames = query => {
    return fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_API_GATEWAY}/v4/games`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: `
            search "${query}";
            limit 500;
            offset 0;
            fields id,name,cover.url,category,status,rating,platforms,first_release_date;
            where category = (0,8,9);
            where rating != null;
            where cover.url != null;
        `
    });
}