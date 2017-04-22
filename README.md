# getmusiclive-database

## Build and Run
1. `docker build -t shinobi881/getmusiclive-db-middleware.`
2. `docker run -d -p 5010:5005 getmusiclive-db-middleware` - (basic run)
2. `docker run --name gml-middleware -p 5010:5005 -d --rm getmusiclive-db-middleware` - (preferred run)
3. `docker exec -it gml-middleware`

## Insert data
1. `npm run insertGenres` - (run when container is built)
2. `npm run insertVenues`
3. `npm run insertEvents`
4. `npm run serve` - (open query server)