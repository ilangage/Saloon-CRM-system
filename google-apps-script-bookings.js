const SHEET_NAME = "Bookings";
const BOOKED_STATUS = "Booked";
const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;

const SERVICE_DURATIONS = {
  "Nail Art": 60,
  Facial: 60,
  Rebonding: 180
};

function doGet(event) {
  const action = event.parameter.action;

  if (action !== "availability") {
    return jsonResponse({
      ok: false,
      message: "Unsupported action."
    });
  }

  const date = event.parameter.date;
  const bookings = getBookingsForDate(date);

  return jsonResponse({
    ok: true,
    bookings
  });
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse(event.postData.contents);
    const booking = normalizeBooking(payload);

    if (!booking.date || !booking.time || !booking.service || !booking.name || !booking.phone) {
      return jsonResponse({
        ok: false,
        code: "INVALID_INPUT",
        message: "Missing booking details."
      });
    }

    if (!SERVICE_DURATIONS[booking.service]) {
      return jsonResponse({
        ok: false,
        code: "INVALID_SERVICE",
        message: "Invalid service."
      });
    }

    if (hasOverlap(booking, getBookingsForDate(booking.date))) {
      return jsonResponse({
        ok: false,
        code: "SLOT_TAKEN",
        message: "Sorry, this time was just booked. Please choose another time."
      });
    }

    const sheet = getSheet();
    sheet.appendRow([
      new Date(),
      booking.date,
      booking.time,
      booking.service,
      booking.name,
      booking.phone,
      BOOKED_STATUS
    ]);

    return jsonResponse({
      ok: true
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      code: "SERVER_ERROR",
      message: error.message
    });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "CreatedAt",
      "Date",
      "Time",
      "Service",
      "Name",
      "Phone",
      "Status"
    ]);
  }

  sheet.getRange("B:C").setNumberFormat("@");
  sheet.getRange("F:F").setNumberFormat("@");

  return sheet;
}

function getBookingsForDate(date) {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();

  return values.slice(1).reduce(function (bookings, row) {
    const status = String(row[6] || "");
    const rowDate = normalizeDateCell(row[1]);

    if (rowDate === date && status === BOOKED_STATUS) {
      bookings.push({
        date: rowDate,
        time: normalizeTimeCell(row[2]),
        service: String(row[3]),
        status: status
      });
    }

    return bookings;
  }, []);
}

function normalizeBooking(payload) {
  return {
    date: String(payload.date || "").trim(),
    time: String(payload.time || "").trim(),
    service: String(payload.service || "").trim(),
    name: String(payload.name || "").trim(),
    phone: String(payload.phone || "").trim()
  };
}

function hasOverlap(booking, existingBookings) {
  const start = timeToMinutes(booking.time);
  const end = start + SERVICE_DURATIONS[booking.service];

  if (start < OPEN_HOUR * 60 || end > CLOSE_HOUR * 60) {
    return true;
  }

  return existingBookings.some(function (existing) {
    const existingStart = timeToMinutes(existing.time);
    const existingEnd = existingStart + SERVICE_DURATIONS[existing.service];

    return start < existingEnd && existingStart < end;
  });
}

function timeToMinutes(time) {
  const parts = time.split(":").map(Number);

  return parts[0] * 60 + parts[1];
}

function normalizeDateCell(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }

  return String(value || "").trim();
}

function normalizeTimeCell(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "HH:mm");
  }

  return String(value || "").trim();
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
