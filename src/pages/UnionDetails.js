import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/dataContext";

import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import EventInfo from "../ui/EventInfo";

import { useNavigate } from "react-router-dom";

function UnionDetails() {
  const navigate = useNavigate();
  const { currentUnion, getUnionName, inviteToUnion, events, createEvent } =
    useContext(DataContext);
  const [unionName, setUnionName] = useState("");
  const [invitee, setInvitee] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  function compare(a, b) {
    if (a.eventDate < b.eventDate) {
      return 1;
    } else if (a.eventDate > b.eventDate) {
      return -1;
    } else {
      if (a.eventTime < b.eventTime) {
        return 1;
      } else if (a.eventTime > b.eventTime) {
        return -1;
      }
    }
    return 0;
  }

  const uniqueEvents = events
    .filter(
      (obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id)
    )
    .sort(compare);

  useEffect(() => {
    const unionNameGettter = async (union_id) => {
      const union_name = await getUnionName(union_id);
      setUnionName(union_name);
    };

    unionNameGettter(currentUnion);
  });

  return (
    <div>
      <Navbar />
      <div className="bg-tPurple">
        <div class="flex h-screen antialiased text-tBlue">
          <div class="flex flex-row h-full w-full justify-center mt-1000">
            <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-transparent flex-shrink-0">
              <div class="flex flex-row items-center justify-center h-12 w-full mt-12">
                <div class="ml-2 font-bold text-2xl">{unionName}</div>
              </div>

              <div class="flex flex-col mt-8">
                <div class="flex flex-row items-center justify-center text-xs mb-2"></div>
                <div className="flex flex-row items-center justify-center">
                  <button
                    onClick={() => {
                      try {
                        inviteToUnion(currentUnion, invitee);
                        setInvitee("");
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Invite
                  </button>
                </div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="union_name"
                    id="union_name"
                    className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                    placeholder="Invitee"
                    value={invitee}
                    onChange={(e) => setInvitee(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-12 flex flex-row items-center justify-center">
                <button
                  onClick={() => {
                    try {
                      navigate("/chat");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go to Union Chat
                </button>
              </div>
              <br />
              <div>
                <h1>Events</h1>
                {uniqueEvents.map((event) => (
                  <EventInfo event={event} />
                ))}
              </div>
              <div class="flex flex-col space-y-4">
                <input
                  type="text"
                  className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                  name="event_name"
                  id="event_name"
                  value={eventName}
                  placeholder="Event Name"
                  onChange={(e) => setEventName(e.target.value)}
                />
                <input
                  type="date"
                  className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                  name="event_date"
                  id="event_date"
                  value={eventDate}
                  placeholder="Event Date"
                  onChange={(e) => setEventDate(e.target.value)}
                />
                <input
                  type="time"
                  className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                  name="event_time"
                  id="event_time"
                  value={eventTime}
                  placeholder="Event Time"
                  onChange={(e) => setEventTime(e.target.value)}
                />
                <input
                  type="text"
                  className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                  name="event_location"
                  id="event_location"
                  value={eventLocation}
                  placeholder="Event Location"
                  onChange={(e) => setEventLocation(e.target.value)}
                />
                <input
                  type="text"
                  className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
                  name="event_description"
                  id="event_description"
                  value={eventDescription}
                  placeholder="Event Description"
                  onChange={(e) => setEventDescription(e.target.value)}
                />
                <button
                  onClick={() => {
                    try {
                      createEvent(
                        eventName,
                        eventDescription,
                        eventDate,
                        eventTime,
                        eventLocation
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UnionDetails;
