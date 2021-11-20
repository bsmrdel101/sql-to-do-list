let editTimesCliked = 0;


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
    // Add save and cancel changes button for editing title
    $('body').on('click', '#save-title-changes-btn', saveTitleChanges);
    $('body').on('click', '#cancel-title-changes-btn', cancelTitleChanges);
    // Add save and cancel changes button for editing description
    $('body').on('click', '#save-description-changes-btn', saveDescriptionChanges);
    $('body').on('click', '#cancel-description-changes-btn', cancelDescriptionChanges);
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
    editTimesCliked += 1;
    if (editTimesCliked <= 1) {
        let taskId = $(this).data('id');
        $('#edit-box').append(`
        <label for="title-edit-input">Enter New Title </label><input id="title-edit-input" type="text" placeholder="Enter new title">
        <button id="save-title-changes-btn" data-id="${taskId}">Save Changes?</button>
        <button id="cancel-title-changes-btn" data-id="${taskId}">Cancel</button>
        `);
    }
}

// Save changes button
function saveTitleChanges() {
    let newText = $('#title-edit-input').val();
    const taskId = $(this).data('id');

    console.log('taskId', taskId);
    $.ajax({
        type: 'PUT',
        url: `/titleEdit/${taskId}`,
        data: { newText: newText }
    }).then(function(response) {
        console.log(response);
        renderTasks();
        $('#edit-box').empty();
        editTimesCliked = 0;
    }).catch(function(error){
        console.log('error: ', error);
    });
}

// Cancel changes button
function cancelTitleChanges() {
    $('#edit-box').empty();
    editTimesCliked = 0;
}

// Allows user to change description of submited task.
    // Sends out a PUT request to update list
function handleEditDescription() {
    editTimesCliked += 1;
    if (editTimesCliked <= 1) {
        let taskId = $(this).data('id');
        $('#edit-box').append(`
        <label for="description-edit-input">Enter New Description </label><input id="description-edit-input" type="text" placeholder="Enter new description">
        <button id="save-description-changes-btn" data-id="${taskId}">Save Changes?</button>
        <button id="cancel-description-changes-btn" data-id="${taskId}">Cancel</button>
        `);
    }
}

// Save changes button
function saveDescriptionChanges() {
    let newText = $('#description-edit-input').val();
    const taskId = $(this).data('id');

    console.log('taskId', taskId);
    $.ajax({
        type: 'PUT',
        url: `/descEdit/${taskId}`,
        data: { newText: newText }
    }).then(function(response) {
        console.log(response);
        renderTasks();
        $('#edit-box').empty();
        editTimesCliked = 0;
    }).catch(function(error){
        console.log('error: ', error);
    });
}
// Cancel changes button
function cancelDescriptionChanges() {
    $('#edit-box').empty();
    editTimesCliked = 0;
}