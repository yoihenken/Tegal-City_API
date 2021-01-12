
# Tegal-City_API
API for information about Tegal City, Central Java, Indonesia

## Tool
1. Node js
2. Text editor (ex : Visual Studio Code)


## How to install :
1. Clone this Repository
2. Open terminal and type `npm install`
3. To run the server, type `node index.js`

## Endpoint API
|Method | Endpoint | Description 
|--|--|--|
| get | /berita/:page |Get list of news about Tegal city
| get | /berita/detail/:page/:id | Get all property of news 
| get | /pariwisata | Get list of tourism in Tegal city
| get | /pariwisata/:id | Get all property of tourism
| get | /oleh | Get all the list of typical Tegal city souvenirs
| get | /oleh/:id | Get all property of souvenirs
| get | /event/:page | Get all list of event in Tegal city
| get | /event/detail/:page/:id | Get all property of event
| get | /kuliner | Get all list of culinary in Tegal City
| get | /kuliner/:id | Get all property of culinary
| get | /penginapan | Get all list of hotel in Tegal City 
| get | /penginapan/:id | Get all property of hotel

**Note :**

 - `:page` replace it with page number
 - `:id` replace it with id number of item
