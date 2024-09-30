import React from "react";
import {Booking, ResponseData} from "../app/application";
import jsonData from "../data/response.json";
import {Link} from "react-router-dom";

export function UnBookedItems() {
    const data: ResponseData = jsonData as ResponseData;

    const unBookedState = data.results.filter(
        res => res.bookingInfo.memberBookingInfo.bookingState === "NotBooked"
    );

    return <>
        <div>
            <ul>
                {unBookedState.map(appointment => (
                    <li key={appointment.id}>
                        <div>
                            <h2>{appointment.name}</h2>
                            <p><strong>Instruktør: </strong>{appointment.instructor}</p>
                            <p><strong>Dato: </strong>{appointment.zonedStartTime.dateTime}</p>
                            <p><strong>Sted: </strong>{appointment.clubName}</p>
                            <button>Meld deg på treningen!</button>
                        </div>
                    </li>
                ))}
            </ul>

            <Link to="/">Gå tilbake til dine bookinger!</Link>
        </div>
    </>
}