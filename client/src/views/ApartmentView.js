import React from 'react';
import {fetchApartment} from "../actions/apartmentActions";
import {connect} from "react-redux";
import ApartmentAmentityView from "./ApartmentAmentityView";

export class ApartmentView extends React.Component {
  componentWillMount() {
    const { match: { params } } = this.props;
    const { apartmentId } = params;
    this.props.fetchApartment(apartmentId);
  }

  render() {
    const { apartment } = this.props;
    if (!Object.keys(apartment).length) {
      return <div>Loading...</div>
    }
    let image = 'http://localhost:5000/images/apartments/' + apartment.images[0];
    return (
      <div className='container-fl clearfix'>
        <div className='col-12'>
          <div className='view-apartment'>
            <div className="view-apartment-item">
              <div className="view-apartment-item-content">
                <div className="listing">
                  <div className="listing-image">
                    <div className="media-cover" style={{backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'contain'}}></div>
                    <div></div>
                    <div>
                      <span>{apartment.price} €</span>
                      <span className="_17Hci6D5EewOTY42eIXhPy">
                        <span className="_2GcdOjvYR400SpIsNOxzGK">/</span>
                        <span>Monat</span>
                      </span>
                    </div>
                  </div>
                  <div className="listing-details-container">
                    <div className="listing-details">
                      <div>
                      <span className="apartmentTitle text-truncate text-first-capitalize">{apartment.title}</span>
                    </div>
                    <div className="text-truncate">
                      <span className="apartmentDetails">{apartment.size} m²</span><br />
                      <span className="apartmentDetails">{apartment.owner['email']} </span>
                    </div>
                    <div className="amenities">
                      <div className=" text-truncate">
                        <ApartmentAmentityView apartment={apartment} limit="20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  apartment: state.apartmentItem.apartment
});

export default connect(mapStateToProps, {fetchApartment})(ApartmentView)
