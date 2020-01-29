import React from 'react';
import '../css/ListOfReservations.css'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import ListOfReservations from "./ListOfReservations";
import {bookingsLoaded} from "../redux/actions/bookingsActions";

class AllReservations extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO change to id of logged user
        let id = 1;
        fetch(`http://localhost:8080/bookings?id=${id}`)
            .then((data) => data.json())
            .then((reservations) => {
                console.log(reservations)
                this.props.bookingsLoaded(reservations);
            });
    }

    render() {
        const bookings = this.props.bookings;
        return (
            <div>
                {bookings && <ListOfReservations reservations={bookings}
                                                 forCurrentFlat={0}
                                                 nameOfFlat={""}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bookings: state.bookings
    }
};

const mapDispatchToProps = (dispatch) => ({
    bookingsLoaded: bookings => dispatch(bookingsLoaded(bookings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllReservations))
