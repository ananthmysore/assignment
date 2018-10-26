import React from 'react';

export default class ApartmentAmentityView extends React.Component {
  render() {
    let {apartment, limit = 3} = this.props;
    let amentities = [];
    apartment.amenities.map((item, index) => {
      if (index < limit) {
        amentities.push(<span className="apartmentItems pad-right"><i></i><span>{item}</span></span>);
      }
    });
    return amentities
  }
}
