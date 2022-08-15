<?php
  session_start();
  if(!isset($_SESSION['id'])){
    header("Location:login.php");
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Calendar</title>
    <link rel="stylesheet" href="calendarDay.css">
    <link rel="stylesheet" type="text/css" defer href="clock.css">
    <link rel="stylesheet" defer href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <script defer src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous">
    </script>
    <script defer src="calendarDay.js"></script>
    <script defer src="clock.js"></script>
</head>

<body onload="initClock()">

    <div class="addTaskBox">
        <div>
            <input type="text" placeholder="Title" id="title">
            <button id="close">X</button>
            <div>
                <input type="date" id="startDate">
                <input type="time" id="startTime">
                <span>to</span>
                <input type="date" id="endDate">
                <input type="time" id="endTime">
            </div>
            <textarea id="detail" placeholder="Add Desription"></textarea>
            <div>
                <button id="save">SAVE</button>
            </div>
        </div>
    </div>

    <div class="showAll">
        <div>
            <button id="showClose">X</button>
            <div id="appointmentDetail" style="padding: 0.3rem;"></div>
            <button id="delete">Delete</button>
        </div>
    </div>

    <div class="container">
        <div class="navbar">

            <div class="clock">
                <div class="dateTime">
                    <span id="daynameTime">Day</span>
                    <span id="monthTime">Month</span>
                    <span id="daynumTime">00</span>
                    <span id="yearTime">Year</span>
                </div>
                <div class="time">
                    <span id="hour">00</span>:
                    <span id="minutes">00</span>:
                    <span id="seconds">00</span>
                    <span id="period">AM</span>
                </div>
            </div>

            <div class="calendarWeek">
                <div><a href="calendarWeek.php">Week</a></div>
            </div>

            <div class="calendarMonth">
                <div><a href="calendar2.php">MONTH</a></div>
            </div>

            <button class="logout"><a href="Logout.php">Logout</a></button>
        </div>
        <div class="calendar">

            <div class="month">
                <div class="date">
                    <div>
                        <i class="fas fa-angle-left prev"></i>
                        <h1></h1>
                        <i class="fas fa-angle-right next"></i>
                        <h2 class="year"></h2>
                    </div>
                    <p class="realday"></p>
                </div>
            </div>

            <div class="weekdays">
                <div>Sun</div>
            </div>

            <div class="daysWeek">
                <div>1</div>

            </div>

        </div>
    </div>
    </div>
</body>

</html>