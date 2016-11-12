var $del = $(".delete")


//onclick delete service interval
$del.click( function () {
	//grab values from htlm to match in mongo-db
	var $svc = $(this).siblings("ul").find(".svc-value").html()
	var $miles = $(this).siblings("ul").find(".miles-value").html()
	var $months = $(this).siblings("ul").find(".months-value").html()
	var $firstlast = $(this).siblings("ul").find(".first-last-value").html()
	//first param is path, second options
  fetch('intervals', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "service": $svc,
			"intervalMiles": $miles,
			"intervalMonths": $months,
			"firstOrLast": $firstlast
    })
  }).then(function (response) {
    window.location.reload()
  })
})