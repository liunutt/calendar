const date = new Date();

const useWeekCalendar = async(date) => {
    let loading = true;
      const firstDate = firstDateOfWeek(date);
      const currentWeek = await dateOfCurrentWeek(firstDate);
      loading = false;
      console.log(firstDate);
    return [currentWeek, loading];
  };
   
  async function dateOfCurrentWeek(date) {
    const cursor = new Date(date);
    const currentWeek = [];
    for (let i = 0; i < 7; i++) {
    const [month,day,year]  =cursor.toLocaleString().split(",")[0].split("/");
    //console.log(cursor.toLocaleString().split("-"));
      await $.ajax({
        url: "./getAppointment.php",
        method: "post",
        data: {appdate: `${year}-${month}-${day}`},
        dataType: "json",
      }).then(res=> currentWeek.push({day:new Date(cursor),app:res}));
      addDays(cursor, 1);
    }
    return currentWeek;
  }
   
  function firstDateOfWeek(date) {
    const firstDate = new Date(date);
    firstDate.setHours(0,0,0,0);
    while (firstDate.getDay() !== 0) addDays(firstDate, -1);
    return firstDate;
  }
   
  const addDays = (date, day) => {
    return date.setDate(date.getDate() + day);
  };



const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



const renderCalendar = async (calendar) => {
  const monthDays = document.querySelector(".daysWeek");
  const [currentWeek, loading] = await useWeekCalendar(date);
  console.log(currentWeek);
  //console.log(lastMonth, currentMonth, nextMonth,loading);
    const today = new Date();
  if(!loading){
    let renderString = "";

  currentWeek.forEach((day,idx) => {
    //console.log(date.toJSON()
   const x = day.app.map(doc => `<div class="appointment" id="${doc.id}"><b id="${doc.id}">${doc.title}</b><br/><span>${doc.detail}</span></div>`);
   if(today.toLocaleDateString() === day.day.toLocaleDateString()) renderString += `<div class="today" id="${day.day.toJSON().split("T")[0]}">${day.day.toLocaleDateString().split("/")[1]}${x}</div>`;
   else renderString += `<div class="day" id="${day.day.toJSON().split("T")[0]}">${day.day.toLocaleDateString().split("/")[1]}${x}</div>`;
//    console.log(day);
//    console.log(day.day.toLocaleDateString());
//    console.log(date.toLocaleDateString());
  });
  //console.log(renderString)
  document.querySelector(".date div h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date div h2").innerHTML = date.getFullYear();
  document.querySelector(".date p").innerHTML = new Date().toDateString();
  monthDays.innerHTML = renderString
  }
  

};

let x = 0;
let y = 0;

document.querySelector(".prev").addEventListener("click", () => {
  //date.setMonth(date.getMonth() - 1);
  date.setDate(date.getDate()-7);
  x++;
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setDate(date.getDate()+7);
  //date.setMonth(date.getMonth() + 1);
  x--;
  renderCalendar();
});

document.querySelector(".realday").addEventListener("dblclick", () => {
date.setMonth(date.getMonth()+x);
date.setYear(date.getFullYear()+y);
  x=0;
  y=0;
  renderCalendar();
});

document.querySelector(".yearL").addEventListener("click", () => {
  date.setYear(date.getFullYear() - 1);
  y++;
  renderCalendar();
});

document.querySelector(".yearR").addEventListener("click", () => {
  date.setYear(date.getFullYear() + 1);
  y--;
  renderCalendar();
});

renderCalendar();


$(".daysWeek").click(function (e) {
  //console.log(e.target.id);
  if(e.target.id.length > 5) {
    $(".addTaskBox").css({ display: "grid" });
  $("#startDate").val(e.target.id);
  }else{
    $(".showAll").css({ display: "grid" });
    $.ajax({
      url: "./getAppointmentDetail.php",
      method: "post",
      data: {id:e.target.id},  
      dataType: "json",
    }).then(res => {
      //console.log(res)
      $('.showAll > div > button').prop('name',`${res.id}`)
      document.querySelector("#appointmentDetail").innerHTML = `<div><b>${res.title}</b><br><span>${res.detail}</span><br /> statTime : ${res.start_date} time ${res.start_time} endTime :  ${res.end_date} time ${res.end_time} </div>
      <input type="text" value="${res.title}" id="editTitle"><br>
      <input type="date" value="${res.start_date}" id="editStartDate"><br>
      <input type="time" value="${res.start_time}" id="editStartTime"><br>
      <input type="date" value="${res.end_date}" id="editEndDate"><br>
      <input type="time" value="${res.end_time}" id="editEndTime"><br>
      <input type="text" value="${res.detail}" id="editDetail"><br>
      <input type="hidden" value="${res.id}" id="editId"><br>
      <button id="abcd">Edit</button>
      `;
      document.querySelector("#abcd").addEventListener("click",()=> {
        var title = $("#editTitle").val();
        var startDate = $("#editStartDate").val();
        var startTime = $("#editStartTime").val();
        var endDate = $("#editEndDate").val();
        var endTime = $("#editEndTime").val();
        var detail = $("#editDetail").val();
        const id = $("#editId").val();
        $.ajax({
        url: "./editapp.php",
        method: "post",
        data: { id,title, startDate, endDate, startTime, endTime, detail },
        dataType: "json",
        success: function () {
          location.reload();
        },
        });
      })
    })
  }
});

$("#save").click(() => {
  $(".addTaskBox").css({ display: "none" });
  var title = $("#title").val();
  var startDate = $("#startDate").val();
  var endDate = $("#endDate").val();
  var startTime = $("#startTime").val();
  var endTime = $("#endTime").val();
  var detail = $("#detail").val();

  //console.log({title,startDate,endDate,startTime,endTime,detail });

  $.ajax({
    url: "./appointment.php",
    method: "post",
    data: { title, startDate, endDate, startTime, endTime, detail },
    dataType: "json",
    success: function () {
      location.reload();
    },
  });
});

$("#close").click(function (e) {
  $(".addTaskBox").css({ display: "none" });
});

$("#showClose").click(function (e) {
  $(".showAll").css({ display: "none" });
});

$("#delete").click(function (e) {
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "./delete.php",
        method: "post",
        data: {id:e.target.name},
        dataType: "json",
        success: function () {
          renderCalendar();
          $(".showAll").css({ display: "none" });
    
        },
      });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

  
   //"DELETE FROM `apointment` WHERE `apointment`.`id` = 27"
});


// async function getData(appdate) {
// let data = []; 
// //console.log(appdate); 
// await 
// return data;
// }


