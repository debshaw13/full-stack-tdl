$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: function (response) {
      response.tasks.forEach(function (task) {
        var htmlString = ""
        var keyId = ""
        var checkCheckbox = ""
        var crossOut = ""

        for (var key in task) {
          if (key === 'content') {
            htmlString += task[key] + "<br/>";
          }
          else if (key === 'id') {
            keyId += task[key];
          }
          else if (key === 'completed' && task[key] === true) {
            checkCheckbox = 'checked';
            crossOut = 'strike-through';
          }
        }
        $('div #to-do-items').append("<div class='row taskRow " + crossOut + "' id=" + keyId + ">"
        + "<div class='col-1 px-auto'>" + " <input onclick='updateTask(this);' type='checkbox'" + checkCheckbox + " class='form-check-input' data-id=" + keyId + ">" + "</div>"
        + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
        + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
        + "</div>");
      });
    },
    error: function (request, errorMsg) {
      console.log(request, errorMsg);
    }
  }

  $.ajax(request);
};

var postTask = function (content, successCB, errorCB) {
  var inputValue = $("input#newTask").val();
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: inputValue
      }
    },
    success: function (response, textStatus) {
      console.log(response)
      var keyId = response.task.id;
      var htmlString = response.task.content;

      $('div #to-do-items').append("<div class='row taskRow' id=" + keyId + ">"
      + "<div class='col-1 px-auto'>" + "<input onclick='updateTask(this);' type='checkbox' class='form-check-input' data-id=" + keyId + ">" + "</div>"
      + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
      + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
      + "</div>");
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }

  $.ajax(request);
};

var deleteTask = function (idNumberDelete) {
  console.log(idNumberDelete);
  var taskId = $(idNumberDelete).data("id");
  var request = {
    type: 'DELETE',
    url: 'api/tasks/' + taskId + '?api_key=1',
    success: function (response, textStatus) {
      console.log(response);
      $(".taskRow#" + taskId).remove();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }

  $.ajax(request);
};

var updateTask = function (idNumberUpdate) {
  console.log(idNumberUpdate);
  var taskId = $(idNumberUpdate).data("id");
  var url;

  if (idNumberUpdate.checked) {
    url = 'api/tasks/' + taskId + '/mark_complete?api_key=1';
    $(".taskRow#" + taskId).addClass("strike-through");
  } else {
    url = 'api/tasks/' + taskId + '/mark_active?api_key=1';
    $(".taskRow#" + taskId).removeClass("strike-through");
  }

  var request = {
    type: 'PUT',
    url: url,
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }

  $.ajax(request);
};

var clickedActive = function () {
  $(".taskRow").remove();
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: function (response, textStatus) {
      console.log(response);
      response.tasks.forEach(function (task) {
        var htmlString = ""
        var keyId = ""

        for (var key in task) {
          if (key === 'completed' && task[key] === true) {
            return;
          }
          else if (key === 'content') {
            htmlString += task[key] + "<br/>";
          }
          else if (key === 'id') {
            keyId += task[key];
          }
        }
        $('div #to-do-items').append("<div class='row taskRow' id=" + keyId + ">"
        + "<div class='col-1 px-auto'>" + " <input onclick='updateTask(this);' type='checkbox' class='form-check-input' data-id=" + keyId + ">" + "</div>"
        + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
        + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
        + "</div>");
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }

  $.ajax(request);
};

var clickedCompleted = function () {
  $(".taskRow").remove();
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: function (response, textStatus) {
      console.log(response);
      response.tasks.forEach(function (task) {
        var htmlString = ""
        var keyId = ""
        var checkCheckbox = ""
        var crossOut = ""

        for (var key in task) {
          if (key === 'completed' && task[key] === true) {
            checkCheckbox = 'checked';
            crossOut = 'strike-through';
          }
          else if (key === 'completed' && task[key] === false) {
            return;
          }
          else if (key === 'content') {
            htmlString += task[key] + "<br/>";
          }
          else if (key === 'id') {
            keyId += task[key];
          }
        }
        $('div #to-do-items').append("<div class='row taskRow " + crossOut + "' id=" + keyId + ">"
        + "<div class='col-1 px-auto'>" + " <input onclick='updateTask(this);' type='checkbox'" + checkCheckbox + " class='form-check-input' data-id=" + keyId + ">" + "</div>"
        + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
        + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
        + "</div>");
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }

  $.ajax(request);
};

var clickedAll = function() {
  $(".taskRow").remove();
  indexTasks();
}
