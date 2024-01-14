
function save_score(val_array) {
    console.log(JSON.stringify(val_array))
    $.ajax({
        type: "POST",
        url: "/save_score/",
        dataType: 'json',
        data: {
            "score": JSON.stringify(val_array),
            "csrfmiddlewaretoken": CSRF_TOKEN
        },
        success: function (newData) {
        }
    })
}