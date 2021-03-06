import { merge } from 'lodash';
import addQueryResolvers from './graphql.resolvers.queries.js';

import usersResolvers from '../users/users.resolvers.js';
import locationsResolvers from '../locations/locations.resolvers.js';
import apartmentsResolvers from '../apartments/apartments.resolvers.js';

export default function () {
  const app = this;

  const Users = app.service('users');
  const Profiles = app.service('profiles');
  const Locations = app.service('locations');
  const Apartments = app.service('apartments');
  

  const rootResolvers = {
    Query: {

    },
  }

  addQueryResolvers(rootResolvers.Query, Users, 'user', 'users');
  addQueryResolvers(rootResolvers.Query, Apartments, 'apartment', 'apartments');
  addQueryResolvers(rootResolvers.Query, Locations, 'location', 'locations');

  return merge(
    rootResolvers,
    apartmentsResolvers(Users, Locations, Profiles),
    usersResolvers(Profiles),
    locationsResolvers(Locations),
  );
}
