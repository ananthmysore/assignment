import React from 'react';
import {connect} from 'react-redux';
import {fetchApartmentsList} from './../actions/apartmentsListActions';
import ApartmentTileView from "./ApartmentTileView";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: props.apartmentsList.items,
      location: 'all',
      size:'',
      price:'',
    }
  }

  componentDidMount() {
    this.props.fetchApartmentsList().then((response) => {
      this.setState({
        apartments: response.payload.apartments.items,
        displayingApartments: response.payload.apartments.items
      })
    });
  }

  handleChange(e) {
    let {apartments} = this.state
    let displayingApartments = []
    let location = e.target.value
    console.log(this.state.displayingApartments)
    if (e.target.value !== 'all') {
      displayingApartments = apartments.filter((apt) => apt.location.title === location)
    } else {
      displayingApartments = apartments
    }

    this.setState({
      displayingApartments,
      location
    })
  }

  sizehandleChange(val){
    const {apartments,size} = this.state
    this.setState({size:val})
    let displayingApartments = apartments.filter(apt => (apt.size < parseInt(val.target.value)))
    this.setState({displayingApartments})
  }
  
  pricehandleChange(val){
    const {apartments,price} = this.state
    this.setState({price:val})
    let displayingApartments = apartments.filter(apt => (apt.price < parseInt(val.target.value)))
    this.setState({displayingApartments}) 
  }

  searchInputHandle(val){
    const {apartments} = this.state
    let displayingApartments = apartments.filter(apt => (apt.location.title.toLowerCase().search(val.toLowerCase()) !== -1))
    val ? this.setState({displayingApartments,showResults:true}):this.setState({displayingApartments,showResults:false})
  }

  render() {
    let {apartmentsList} = this.props;
    let {location, displayingApartments,size,price} = this.state

    if (!displayingApartments) {
        return <div>Loading...</div>
    }

    var LocationsOptions = ['Berlin','Cologne','Stuttgart'];
    return (
        <div className="container-list container-lg clearfix">
        <div className="panel">
        <div className="locationDD">
          <select id="locationOptions" className="dropdown" value={location} onChange={this.handleChange.bind(this)}>
            <option value="all">Location All</option>
            {
              LocationsOptions.map(function(opt){
            return(
              <option value={opt} >{opt}</option>
              )
          })}
        </select> 
        </div>
        <div className="search">
          
          <input 
            type="text"
            name="search"
            placeholder="Search.."
            onKeyUp={(e)=>this.searchInputHandle(e.target.value)}
             />   
        </div>
        <div className="filters"><select id="sizeOptions" className="dropdown" value={size} onChange={this.sizehandleChange.bind(this)}>
              <option value="all">Size</option>
              <option value='30'>below 30m </option>
              <option value='50'>below 50m</option>
              <option value='100'>above 100m</option>
          </select>
        </div>
        <div className="filters">
          <select id="sizeOptions" className="dropdown" value={price} onChange={this.pricehandleChange.bind(this)}>
              <option value="all">price</option>
              <option value='500'>less than 500€</option>
              <option value='800'>less than 800€</option>
              <option value='1000'>less than 1000€</option>
          </select>
        </div>
      </div>
        <div className="col-12">
          {displayingApartments.length === 0 ? <div>No Records Found</div>:<div className="view-apartment-list">
            {displayingApartments.map((item, index) => (
                <ApartmentTileView key={index} apartment={item}  />
            ))}
          </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  apartmentsList: state.apartmentsList.apartments
});

export default connect(mapStateToProps, {fetchApartmentsList})(HomeView)
