const cursor = new Date();
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


async function getDate(date){
  const [month,day,year]  =cursor.toLocaleString().split(",")[0].split("/");
  let moke ;
  await $.ajax({
        url: "./getAppointment.php",
        method: "post",
        data: {appdate: `${year}-${month}-${day}`},
        dataType: "json",
      }).then(res=>{
        //   console.log(res)
        moke = {day:new Date(cursor),app:res}
      } )
  return [moke];
}

async function render(){
  
  document.querySelector('.weekdays').innerHTML = cursor.toDateString();
  document.querySelector(".date div h1").innerHTML = months[cursor.getMonth()];
  document.querySelector(".date div h2").innerHTML = cursor.getFullYear();
  document.querySelector(".date p").innerHTML = new Date().toDateString();
    const pract = cursor.getMonth() +1;
    const targetMonth = pract < 10 ? `0${pract}` : pract
    const targetDay = cursor.getDate() > 10 ? cursor.getDate(): `0${cursor.getDate()}`
  let days =  `<div id="${cursor.getFullYear()}-${targetMonth}-${targetDay}">${cursor.getDate()}</div>`;
  const [moke2] = await getDate(cursor);
//   console.log(moke2);
  moke2.app.forEach(element => days += `<div  class="appointment" id="${element.id}">${element.title}
    <div class="task-detail">
      <p>${element.detail}</p>
      <p>${element.start_time.slice(0,5)} - ${element.end_time.slice(0,5)}</p>
    </div>
  </div>`
  )
  document.querySelector(".daysWeek").innerHTML = days;
}


let x = 0;
let y = 0;

document.querySelector(".prev").addEventListener("click", () => {
  cursor.setDate(cursor.getDate()-1);
  x++;
  render();
});

document.querySelector(".next").addEventListener("click", () => {
  cursor.setDate(cursor.getDate()+1);
  x--;
  render();
});

document.querySelector(".realday").addEventListener("dblclick", () => {
  cursor.setMonth(cursor.getMonth()+x);
  cursor.setYear(cursor.getFullYear()+y);
  x=0;
  y=0;
  render();
});

render();

$(".daysWeek").click(function (e) {
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
  
  


