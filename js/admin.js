
var BASE_URL_FIREBASE_DB = "https://roidev-7c586.firebaseio.com/";

$("#example").remove();
$("#example_wrapper").remove();
$(".admin-section").append('<table id="example" class="display" cellspacing="0" width="100%"></table> ');
var URL = BASE_URL_FIREBASE_DB+"EventLoginHistory.json";
var dataSet = [];
$.ajax({
  url : URL,
  type: "GET",
  success: function(data, textStatus, jqXHR)
  {
    dataSet = [];
    console.log(",......."+data);
    if(data!=null){
      if(data!=null){
        var i =0
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            dataSet.push(data[key])
            // var date =getDate(data[key].createdDate);
            // var time = formatAMPM(data[key].createdDate)
            // var htmlData = '<div><p>'+(i+1)+'</p><p>'+data[key].email+'</p><p>'+date+'</p><p>'+time+'</p><p>'+data[key].practiceName+'</p><div class="clear"></div></div>';
            // $("#adminData").append(htmlData);
          }
        }
      }
    }
    renderData(dataSet);
  },
  error: function (jqXHR, textStatus, errorThrown)
  {
    var myJSON = JSON.parse(jqXHR.responseText);
    alert(myJSON.error.message);
    console.log("data","data......."+myJSON.error.message);
  }
});

function getDate(date){
  var date = eval(date); //Note the value is in "" hence a string

  var today = new Date(date);
  var dd = today.getDate();

  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 

  if(mm<10) 
  {
      mm='0'+mm;
  } 
   today = mm+'-'+dd+'-'+yyyy;
  // console.log(today);
  // today = mm+'/'+dd+'/'+yyyy;
  // console.log(today);
  // today = dd+'-'+mm+'-'+yyyy;
  // console.log(today);
  // today = dd+'/'+mm+'/'+yyyy;
  // console.log(today);
  return today;
}
function formatAMPM(currentDate) {
  var currentDate = eval(currentDate); //Note the value is in "" hence a string

  var date = new Date(currentDate)
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function renderData(dataSet){
  var my_columns = [];

    $.each( dataSet[0], function( key, value ) {
        var my_item = {};
        my_item.data = key;
        my_item.title = key;
        my_columns.push(my_item);
    });
    
    $(document).ready(function() {
      $('#example').DataTable({
        data: dataSet,
        "columns": my_columns
      });
    });
}