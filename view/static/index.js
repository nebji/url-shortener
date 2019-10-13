function shortenUrlCall() {
    const urlToShorten = $("#url-to-shorten").val();
    const requestedPath = $("#requested-path").val();

    $.ajax({
        url: "/",
        type: "post",
        data: JSON.stringify({
            url: urlToShorten,
            requested_path: requestedPath
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (response) => {
            $("#shorten-url").val(response.new_url);
        },
        failure: (errMsg) => {
            console.error(errMsg);
        }
    })
}

function selectInput(input) {
    input.setSelectionRange(0, input.value.length);
}
