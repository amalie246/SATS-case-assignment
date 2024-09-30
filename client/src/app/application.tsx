import React, {useState} from "react";
import jsonData from "../data/response.json";
export function Application(){
    const [visibleBookings, setVisibleBookings] = useState([]);

    const bookedState = jsonData.results.filter(res =>
        res.bookingInfo.memberBookingInfo.bookingState === "Booked"
    );

    return <>
        <h2>Velkommen, atlet!</h2>
        <div>
            <h3>Dine kommende bookinger:</h3>
            <div>
                {bookedState.length > 0 ? (
                    <ul>
                        {bookedState.map(booking => (
                            <li>
                                <div>
                                    <p><strong>Navn: </strong>{booking.name}</p>
                                    <p><strong>Instruktør: </strong>{booking.instructor}</p>
                                    <p><strong>Dato: </strong>{booking.zonedStartTime.dateTime}</p>
                                    <p><strong>Sted: </strong>{booking.clubName}</p>
                                    <a href={"#"}>[Se flere detaljer]</a>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <li>Du har ingen bookinger fremover! Meld deg på en time nedenfor.</li>
                )}
            </div>

            <br/>
        </div>
    </>
}