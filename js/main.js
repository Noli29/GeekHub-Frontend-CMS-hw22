(function ($) {
    init();
})(jQuery);

function buildTasks(response)
{
    $ul = $('.list-group').eq(0);
    $ul.html('');

    for (var i in response) {
        var task = response[i];

        var $li = $('<li>').addClass('list-group-item');

        if (task.status == '1') {
            $li.addClass('list-group-item-danger')
        } else {
            $li.addClass('list-group-item-info')
            $('<input type="checkbox">').attr('id', 'task' + i).attr('name', 'task' + i).attr('data-id', i).appendTo($li);
        }

        $('<label>').attr('for', 'task' + i).text(task.name).appendTo($li);
        $('<a href="#">').attr('data-id', i).addClass('btn btn-danger delete-task').text('Delete task').appendTo($li);

        $li.appendTo($ul);
    }
}

function init()
{
    var file = 'index.php';
    var $wrapper = $('#wrapper');

    $.get(file + '?action=get', {}, function (response) {
        buildTasks(response)
    });

    $wrapper.on('click', 'input[type=checkbox]', function () {
        var id = $(this).data('id');
        var self = $(this);

        $.post(file + '?action=complete', {task: id}, function () {
            $li = self.closest('li');
            $li.removeClass('list-group-item-info');
            $li.addClass('list-group-item-danger');
            $li.find('input[type=checkbox]').remove();
        });
    });

    $wrapper.on('click', 'a.delete-task', function () {
        var id = $(this).data('id');
        var $self = $(this);

        $.post(file + '?action=delete', {task: id}, function () {
            $self.closest('.list-group-item').fadeOut(1000);
        });
    });

    $wrapper.on('submit', '#create-task', function (e) {
        e.preventDefault();

        var name = $(this).find('input[name=name]').val();

        $.post(file + '?action=store', {name: name}, function (response) {
            buildTasks(response);
        });
    });
}