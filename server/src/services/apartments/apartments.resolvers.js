export default function (Users, Locations, Profiles) {
  const apartmentsResolvers = {
    Apartments: {
      owner: (apartment) => {
        return Users.find({ query: { _id: apartment.owner }}).then(result=>result[0]);
      },
      location: (apartment) => {
        return Locations.find().then(result => result.find( res => res._id === apartment.location ));
      },
      details: (apartment) => {
        return apartment.detail;
      }

    }
  };

  return apartmentsResolvers;
}
