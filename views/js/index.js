$(document).ready(function () {
    $('#add').on('click', function (event) {
        event.preventDefault();

        var newRow = {
            title: $('#title').val(),
            income: $('#income').val(),
            outcome: $('#outcome').val(),
            profit: $('#profit').val()
        }

        $.ajax({
            type: 'POST',
            data: newRow,
            url: '/add',
            dataType: 'JSON'
        }).done(function (response) {
            var row = response.data;
            if (response.msg === '') {
                $('td input').val('0');
                $('#title').val('');
                var row = '<tr><td>' +
                    row.title + '</td><td>' +
                    row.income + '</td><td>' +
                    row.outcome + '</td><td>' +
                    row.profit + '</td><td>' +
                    '<a id=\"' + row._id + '\" class="btn-remove btn btn-danger glyphicon glyphicon-remove"></a>' + '</td></tr>';
                $('table tbody').append(row);
                $('.btn-remove').on('click', remove);
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    });

    function remove(event) {
        event.preventDefault();
        $.ajax({
            type: 'DELETE',
            url: '/delete/' + $(this).attr('id')
        }).done(function (response) {
            if (response.msg === '') {
                $(this).parent().parent().remove();
            }
            else {
                alert('Error: ' + response.msg);
            }
        }.bind(this));
    }

    $('.btn-remove').on('click', remove);
});