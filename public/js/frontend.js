moment().format();

function getDate() {
  var weekday = moment().format("dddd");
  var date = moment().format("DD MMMM YYYY");
  $(".date").text(weekday + ". ");
  $(".time").text(date);
}
getDate();

//scrape new articles
$(".scrape").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "/scrape"
  }).then(function() {
    Swal.fire("You have been added 20 new articles!").then(function() {
      location.reload();
    });
  });
});

//save an article

$(".save").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  console.log(id);
  $.ajax({
    method: "POST",
    url: "/article/" + id
  }).then(function() {
    Swal.fire("Added to saved articles!").then(function() {
      location.reload();
    });
  });
});
