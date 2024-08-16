import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BackToEventsButton.css";
import "./CreateEventPage.css";
import EventsNavbar from "./EventsNavbar";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    image_url: "",
    description: "",
    start_date: "",
    end_date: "",
    time: "",
    location: "",
  });
  const [tickets, setTickets] = useState([{ type_name: "", price: "", quantity: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    setTickets((prevTickets) => {
      const newTickets = [...prevTickets];
      newTickets[index][name] = value;
      return newTickets;
    });
  };

  const handleAddTicket = () => {
    setTickets((prevTickets) => [
      ...prevTickets,
      { type_name: "", price: "", quantity: "" },
    ]);
  };

  const handleRemoveTicket = (index) => {
    setTickets((prevTickets) => prevTickets.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dates
    if (new Date(event.end_date) <= new Date(event.start_date)) {
      toast.error("End date must be after start date.");
      return;
    }

    setIsSubmitting(true);

    // Retrieve session information
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;
    const userId = session?.user?.id;

    if (!token) {
      navigate("/"); // Redirect to login if no token
      setIsSubmitting(false);
      return;
    }

    try {
      // Create the event
      const eventResponse = await fetch("http://localhost:5555/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...event, user_id: userId }),
      });

      // Check if the response is okay
      if (!eventResponse.ok) {
        const responseData = await eventResponse.json();
        throw new Error(responseData.message || "Unknown error during event creation");
      }

      // Extract the event_id from the response
      const { event_id } = await eventResponse.json();

      if (!event_id) {
        throw new Error("Failed to retrieve event ID.");
      }

      // Create tickets
      const ticketPromises = tickets.map((ticket) =>
        fetch("http://localhost:5555/admin/tickets", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...ticket, event_id }),
        })
      );

      await Promise.all(ticketPromises);

      // Show success message
      toast.success("Event and tickets successfully created!");

      // Navigate to "my_events" page after successful creation
      navigate("/my-events");
    } catch (err) {
      toast.error(`Failed to create event or tickets. Please try again. Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-event-page">
      <EventsNavbar />
      <h1>Create Event</h1>
      <p>
        Complete the submission below. <br /> NB: “Only Met Gallery based events
        will be approved.”
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            value={event.image_url}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start Date:
          <input
            type="date"
            name="start_date"
            value={event.start_date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            name="end_date"
            value={event.end_date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            name="time"
            value={event.time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </label>

        <h3>Tickets</h3>
        {tickets.map((ticket, index) => (
          <div key={index}>
            <label>
              Ticket Type:
              <input
                type="text"
                name="type_name"
                value={ticket.type_name}
                onChange={(e) => handleTicketChange(index, e)}
                required
              />
            </label>

            <label>
              Price:
              <input
                type="number"
                name="price"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, e)}
                required
              />
            </label>

            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={ticket.quantity}
                onChange={(e) => handleTicketChange(index, e)}
                required
              />
            </label>

            <button type="button" onClick={() => handleRemoveTicket(index)}>
              Remove Ticket
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTicket}>
          Add Another Ticket
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Event"}
        </button>
        {/* Remove the error paragraph */}
      </form>
      <button
        className="back-to-events-button"
        onClick={() => navigate("/events")}
      >
        Back to Events
      </button>
      <ToastContainer />
    </div>
  );
};

export default CreateEventPage;
