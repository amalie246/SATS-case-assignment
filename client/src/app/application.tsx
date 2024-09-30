import React, {useState} from "react";
import jsonData from "../data/response.json";
import {UnBookedItems} from "../components/unBookedItems";
import {Dialog} from "../components/dialog";
import { Route, Routes, Link } from "react-router-dom";

interface ZonedStartTime {
    timeZone: string;
    dateTime: string;
}

interface MemberBookingInfo {
    participationId: string;
    bookingState: "Booked" | "NotBooked";
}

export interface BookingInfo {
    capacity: number;
    bookedCount: number;
    waitingListCount: number;
    memberBookingInfo: MemberBookingInfo;
}

export interface Booking {
    id: string;
    durationInMinutes: number;
    instructor: string;
    clubName: string;
    name: string;
    bookingInfo: BookingInfo;
    zonedStartTime: ZonedStartTime;
    followingBookingCount: number;
    followingBookings: [];
}

export interface ResponseData {
    results: Booking[];
}
export function Application(){
    const [visibleBookings, setVisibleBookings] = useState<string[]>([]);
    const data: ResponseData = jsonData as ResponseData;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const bookedState = data.results.filter(res =>
        res.bookingInfo.memberBookingInfo.bookingState === "Booked"
    );

    const handleClickOnLink = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsDialogOpen(true); // Set the dialog to open
    };

    const closeDialog = () => {
        setIsDialogOpen(false); // Close the dialog
        setSelectedBooking(null); // Reset the selected booking
    };

    return (
        <>
            <Dialog isOpen={isDialogOpen} onClose={closeDialog} booking={selectedBooking} />
            <Routes>
                <Route path="/" element={
                    <>
                        <h2>Velkommen, atlet!</h2>
                        <div>
                            <h3>Dine kommende bookinger:</h3>
                            <div>
                                {bookedState.length > 0 ? (
                                    <ul>
                                        {bookedState.map(booking => (
                                            <li key={booking.id}>
                                                <div>
                                                    <p><strong>Navn: </strong>{booking.name}</p>
                                                    <p><strong>Instruktør: </strong>{booking.instructor}</p>
                                                    <p><strong>Dato: </strong>{booking.zonedStartTime.dateTime}</p>
                                                    <p><strong>Sted: </strong>{booking.clubName}</p>
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        handleClickOnLink(booking);
                                                    }}>
                                                        [Se flere detaljer]
                                                    </a>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <li>Du har ingen bookinger fremover! Meld deg på en time nedenfor.</li>
                                )}
                            </div>

                            <br />
                            <div>
                                <Link to="/unbooked-items">Ønsker du å booke flere?</Link>
                            </div>
                        </div>
                    </>
                } />
                <Route path="/unbooked-items" element={<UnBookedItems />} />
            </Routes>
        </>
    );
}