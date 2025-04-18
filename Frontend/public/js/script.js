document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("event-form");
    const eventTitle = document.getElementById("event-title");
    const eventDate = document.getElementById("event-date");
    const eventTime = document.getElementById("event-time");
    const eventDescription = document.getElementById("event-description");
    const calendarTable = document.getElementById("calendarTable").querySelector("tbody");
    const monthAndYear = document.getElementById("monthAndYear");

    let events = JSON.parse(localStorage.getItem("events")) || [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const renderCalendar = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDaysInMonth = lastDayOfMonth.getDate();
        const firstDayIndex = firstDayOfMonth.getDay();

        calendarTable.innerHTML = ""; // Clear previous calendar
        monthAndYear.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        let row = calendarTable.insertRow();
        for (let i = 0; i < firstDayIndex; i++) {
            row.insertCell(); // Empty cells
        }

        for (let day = 1; day <= totalDaysInMonth; day++) {
            const cell = row.insertCell();
            cell.textContent = day;
            cell.classList.add("day-cell");

            const dayString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(event => event.date === dayString);

            if (dayEvents.length > 0) {
                cell.classList.add("event-day");
                dayEvents.forEach(event => {
                    const eventDiv = document.createElement("div");
                    eventDiv.textContent = event.title;
                    eventDiv.classList.add("event-label");

                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "X";
                    deleteButton.classList.add("delete-event");
                    deleteButton.onclick = () => deleteEvent(dayString, event.title);

                    eventDiv.appendChild(deleteButton);
                    cell.appendChild(eventDiv);
                });
            }

            if (row.cells.length === 7) row = calendarTable.insertRow(); // New row after 7 days
        }
    };

    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newEvent = {
            title: eventTitle.value,
            date: eventDate.value,
            time: eventTime.value,
            description: eventDescription.value,
        };
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));
        renderCalendar();
        eventForm.reset();
    });

    const deleteEvent = (date, title) => {
        events = events.filter(event => !(event.date === date && event.title === title));
        localStorage.setItem("events", JSON.stringify(events));
        renderCalendar();
    };

    document.getElementById("prevMonth").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    renderCalendar();
});
