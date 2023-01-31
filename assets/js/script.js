$(document).ready(function() {
  var currentDay = moment().format("dddd, MMMM Do");
  $("#currentDay").text(currentDay);

  let currentHour = moment().hours();
  $(".time-block").each(function() {
    let blockHour = parseInt($(this).attr("id"));
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });


  // Retrieve saved events from local storage and populate text areas
  for (let i = 9; i < 18; i++) {
    let event = localStorage.getItem(i.toString());
    $("#" + i + " .calendar-item").val(event);
  }

  $(".saveBtn").on("click", function() {
    let timeSlot = $(this).siblings(".time-slot").find(".calendar-item");
    let event = timeSlot.val();
    let hour = $(this).siblings(".time-block").attr("id");
    localStorage.setItem(hour, event);
  });

  $(document).ready(function() {
    $(".saveBtn").on("click", function() {
      var timeBlockId = $(this)
        .parent()
        .attr("id");
      var calendarItem = $(this)
        .siblings(".calendar-item")
        .val();
      localStorage.setItem(timeBlockId, calendarItem);
    });
  
    $.each($(".time-block"), function(index, value) {
      var timeBlockId = $(value).attr("id");
      var savedCalendarItem = localStorage.getItem(timeBlockId);
      if (savedCalendarItem) {
        $(value)
          .find(".calendar-item")
          .val(savedCalendarItem);
      }
    });
  });
  
})