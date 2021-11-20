$(document).ready(onReady);

function onReady() {
    // Add task button
    $('#submit-btn').on('click', handleAddTask);
    // Add remove button
    $('#list').on('click', '.remove-btn', handleRemoveTask);
    // Add toggle status button
    $('#list').on('click', '.toggle-status-btn', handleStatus);

    // Detect click on task title
    $('#list').on('click', '.task-title', handleEditTitle);
    // Detect click on task description
    $('#list').on('click', '.task-description', handleEditDescription);
    renderTasks();
}

// Appends all tasks to the DOM, uses ajax GET request.
function renderTasks() {
    // Clear text inputs
    $('#title').val('');
    $('#description').val('');
    // Get data from database
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then((response) => {
        $('#list').empty();
        console.log('response GET:', response);
        // Append tasks
        for (let task of response) {
            $('#list').append(`
            <tr>
                <td class="task-title" data-id="${task.id}">${task.title}</td>
                <td class="task-description" data-id="${task.id}">${task.description}</td>
                <td><button class="toggle-status-btn glow-btn" data-id="${task.id}" data-status="${task.status}">${task.status}</button></td>
                <td><button class="remove-btn glow-btn" data-id="${task.id}">Remove</button></td>
            </tr>
            `);
        }
    }).catch((error) => {
        console.log('error GET:', error);
    })
}


// Save's input values into "taskData" object.
    // Makes an ajax POST request, to put the data on the server.
function handleAddTask() {
    let taskData = {
        title: $('#title').val(),
        description: $('#description').val()
    }
    // POST route
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskData
    }).then((response) => {
        console.log('response POST:', response);
        // Reload list
        renderTasks();
    }).catch((error) => {
        console.log('error POST:', error);
    })
}

// Deletes task from DOM and database, using DELETE route.
function handleRemoveTask() {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to see this task again.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
            const taskId = $(this).data('id');
            $.ajax({
                type: 'DELETE',
                url: `/tasks/${taskId}`
            }).then(function(response) {
                console.log(response);
                renderTasks();
            }).catch(function(error){
                console.log('error: ', error);
            });
          swal("Poof!", {
            icon: "success",
          });
        } else {
          swal("Your task is safe!");
        }
    });
}

// Allows user to toggle status between complete and incomplete.
    // Sends out a PUT request to update list
function handleStatus() {
    const taskId = $(this).data('id');
    const status = $(this).data('status');

    console.log('taskId', taskId);
    console.log('status', status);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
        data: { status: status }
    }).then(function(response) {
        console.log(response);
        renderTasks();
    }).catch(function(error){
        console.log('error: ', error);
    });
}

// Allows user to change title of submited task.
    // Sends out a PUT request to update list
function handleEditTitle() {
    const taskId = $(this).data('id');
    swal({
        text: 'Enter new title',
        content: "input",
        button: {
            text: "Save Changes",
            closeModal: false
        },
        })
        .then(name => {
            swal('Title changed to: ', name);
            window.scrollTo(300, 500);
            saveTitleChanges(taskId, name);
        });
}


// Save changes button
function saveTitleChanges(taskId, name) {
    console.log('taskId', taskId);
    $.ajax({
        type: 'PUT',
        url: `/titleEdit/${taskId}`,
        data: { newText: name }
    }).then(function(response) {
        console.log(response);
        renderTasks();
    }).catch(function(error){
        console.log('error: ', error);
    });
}

// Allows user to change description of submited task.
    // Sends out a PUT request to update list
function handleEditDescription() {
    const taskId = $(this).data('id');
    swal({
        text: 'Enter new description',
        content: "input",
        button: {
            text: "Save Changes",
            closeModal: false
        },
        })
        .then(name => {
            swal('Description changed to: ', name);
            window.scrollTo(300, 500);
            saveDescriptionChanges(taskId, name);
        });
}

// Save changes button
function saveDescriptionChanges(taskId, name) {
    console.log('taskId', taskId);
    $.ajax({
        type: 'PUT',
        url: `/descEdit/${taskId}`,
        data: { newText: name }
    }).then(function(response) {
        console.log(response);
        renderTasks();
    }).catch(function(error){
        console.log('error: ', error);
    });
}