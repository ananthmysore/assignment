# Homelike server for assignment

## Background information

###run
- edit /config/default.json
- provide mongodb connection path [mongodb://localhost:27017/assignment by default]
- npm install
- npm start

###current endpoints
- `/users`
- `/apartments`
- `/locations`
- `/graphql`
- `/graphiql`

##What to do - for backend engineers
1. add new endpoint /countries which should represent the data from the `countries` collection
1. add `countries` to /graphql endpoint
1. add `country` to `locations.graphql.schema` as a representative of `country` information
1. add functionality to use `limit` and `skip` as a parameters to fetch data through `/graphql` endpoint
1. If you run the following query, location will always be `null`. Please figure out why this is happening.

   - Because in apartmentsResolvers, In the return statement, we are trying to fetch the location title with an empty string as id.("apartment.location.title", which is not available at that point)

After you found out how this happens, please describe the reason and how you found the issue. 
```query RootQuery($owner: String) {  
      apartments(owner: $owner) {  
        items {  
          location {  
            title  
          }  
        }  
      }  
    }
```  

steps : 

1. figured out /apartments is the endpoint of the query
2. In apartment resolver, console logged the params and result. 
3. apartment.location.title was null as it is an id which is referenced to another collection.
4. Added a find function using the apartment.location as key and ran the query, which returned me the data.