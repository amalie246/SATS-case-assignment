import React from "react";
import {Booking} from "../app/application";
import {BookingInfo} from "../app/application";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

export const Dialog: React.FC<DialogProps> = ({isOpen, onClose, booking}) => {
    if(!isOpen || !booking) return null;

    return <>
        <dialog open>
            <h1>{booking.name}</h1>
            <p><strong>Instruktør:</strong> {booking.instructor}</p>
            <p><strong>Dato:</strong> {booking.zonedStartTime.dateTime}</p>
            <p><strong>Sted:</strong> {booking.clubName}</p>
            <p><strong>Varighet: </strong>{booking.durationInMinutes} minutter</p>
            <p><strong>Kapasitet: </strong>{booking.bookingInfo.capacity}</p>
            <p><strong>Venteliste: </strong>{booking.bookingInfo.waitingListCount}</p>
            <button onClick={onClose}>Lukk</button>
        </dialog>
    </>
}