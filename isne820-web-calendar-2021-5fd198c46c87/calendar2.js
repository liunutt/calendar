const date = new Date();

async function useMonth(date) {
  let loading = true;
  const firstDate = getFirstDateOfMonth(date);
  const lastMonth = await getLastMonth(firstDate);
  const currentMonth = await getMonth(firstDate);
  const nextMonth = await getNextMonth(firstDate);
  loading = false;
  return [lastMonth, currentMonth, nextMonth,loading];
}

const getFirstDateOfMonth = (date) => {
  const first = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
  return first;
};

const getLastMonth = async (date) => {
  const lastMonth = [];
  const lastMonthDay = date.getDay();
  const dateRef = new Date(date);
  if (lastMonthDay > 0) {
    for (let i = 1; i <= lastMonthDay; i++) {
      dateRef.setDate(dateRef.getDate() - 1);
      await $.ajax({
      url: "./getAppointment.php",
      method: "post",
      data: {appdate: dateRef.toJSON().split("T")[0]},
      dataType: "json",
    }).then(res=> lastMonth.unshift({day:new Date(dateRef),app:res}));
    }
  }
  return lastMonth;
};

const getNextMonth = async(date) => {
  const nextMonth = [];
  const dateRef = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1));
  dateRef.setDate(dateRef.getDate() - 1);
  const days = 13 - dateRef.getDay();
  for (let i = 0; i < days; i++) {
    dateRef.setDate(dateRef.getDate() + 1);
     await $.ajax({
      url: "./getAppointment.php",
      method: "post",
      data: {appdate: dateRef.toJSON().split("T")[0]},
      dataType: "json",
    }).then(res=> nextMonth.push({day:new Date(dateRef),app:res}));
  }
  return nextMonth;
};

const getMonth = async(date) => {
  const currentMonth = [];
  const monthRef = date.getMonth();
  const dateRef = new Date(date);
  do {
    await $.ajax({
      url: "./getAppointment.php",
      method: "post",
      data: {appdate: dateRef.toJSON().split("T")[0]},
      dataType: "json",
    }).then(res=> currentMonth.push({day:new Date(dateRef),app:res}))
    dateRef.setDate(dateRef.getDate() + 1);
  } while (dateRef.getMonth() === monthRef);

  return currentMonth;
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
  const monthDays = document.querySelector(".days");
  const [lastMonth, currentMonth, nextMonth,loading] = await useMonth(date);
  //console.log(lastMonth, currentMonth, nextMonth,loading);

  if(!loading){
    let renderString = "";

  lastMonth.forEach((day) => {
    const x = day.app.map(doc => `<div><b>${doc.title}</b><br/><span>${doc.detail}</span></div>`);
    renderString += `<div class="prevDate" id="${day.day.toJSON().split("T")[0]}">${parseInt(day.day.toJSON().split("T")[0].split("-")[2])}${x}</div>`;
  });

  currentMonth.forEach((day,idx) => {
    //console.log(date.toJSON()
   const x = day.app.map(doc => `<div class="appointment" id="${doc.id}"><b id="${doc.id}">${doc.title}</b><br/><span>${doc.detail}</span></div>`);
   if(date.toJSON().split("T")[0] == day.day.toJSON().split("T")[0]) renderString += `<div class="today" id="${day.day.toJSON().split("T")[0]}">${parseInt(idx+1)}${x}</div>`;
   else renderString += `<div class="day" id="${day.day.toJSON().split("T")[0]}">${parseInt(idx+1)}${x}</div>`;
  });

  /*currentMonth.forEach((day,idx) => {
   const x = day.app.map(doc => `<div><b>${doc.title}</b><br /><span>${doc.detail}</span></div>`);
   renderString += `<div class="day" id="${day.day.toJSON().split("T")[0]}">${parseInt(idx+1)}${x}</div>`;
  });*/

  nextMonth.forEach((day) => {
    const x = day.app.map(doc => `<div><b>${doc.title}</b><br /><span>${doc.detail}</span></div>`);
    renderString += `<div class="nextDate" id="${day.day.toJSON().split("T")[0]}">${parseInt(day.day.toJSON().split("T")[0].split("-")[2])}${x}</div>`;
  });

  //console.log(renderString)
  document.querySelector(".date div h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date div h2").innerHTML = date.getFullYear();
  document.querySelector(".date p").innerHTML = new Date().toDateString();
  monthDays.innerHTML = renderString
  }
  

};


document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".realday").addEventListener("dblclick", () => {
  const current = new Date();
  date.setMonth(current.getMonth());
  date.setYear(current.getFullYear());
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

document.querySelector(".navMonth1").addEventListener("click", () => {
  date.setMonth(0);
  renderCalendar();
});

document.querySelector(".navMonth2").addEventListener("click", () => {
  date.setMonth(1);
  renderCalendar();
});

document.querySelector(".navMonth3").addEventListener("click", () => {
  date.setMonth(2);
  renderCalendar();
});

document.querySelector(".navMonth4").addEventListener("click", () => {
  date.setMonth(3);
  renderCalendar();
});

document.querySelector(".navMonth5").addEventListener("click", () => {
  date.setMonth(4);
  renderCalendar();
});

document.querySelector(".navMonth6").addEventListener("click", () => {
  date.setMonth(5);
  renderCalendar();
});

document.querySelector(".navMonth7").addEventListener("click", () => {
  date.setMonth(6);
  renderCalendar();
});

document.querySelector(".navMonth8").addEventListener("click", () => {
  date.setMonth(7);
  renderCalendar();
});

document.querySelector(".navMonth9").addEventListener("click", () => {
  date.setMonth(8);
  renderCalendar();
});

document.querySelector(".navMonth10").addEventListener("click", () => {
  date.setMonth(9);
  renderCalendar();
});

document.querySelector(".navMonth11").addEventListener("click", () => {
  date.setMonth(10);
  renderCalendar();
});

document.querySelector(".navMonth12").addEventListener("click", () => {
  date.setMonth(11);
  renderCalendar();
});

renderCalendar();


$(".days").click(function (e) {
  console.log(e.target.id);
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
      document.querySelector("#appointmentDetail").innerHTML = `<div><b>${res.title}</b>
      <br><span>${res.detail}</span><br /> statTime : ${res.start_date} time ${res.start_time} endTime :  ${res.end_date} time ${res.end_time} </div>
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


