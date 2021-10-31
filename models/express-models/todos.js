let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {};
  },

  listPeople: function () {
    return Object.keys(tasks);
  },

  add: function (name, task) {
    if (!tasks[name]) {
      tasks[name] = [];
      task['complete'] ? task['complete'] : task['complete'] = false;
    } else {
      task['complete'] ? task['complete'] : task['complete'] = false;
    }
    tasks[name].push(task);
  },

  list: function (name) {
    return tasks[name];
  },

  complete: function (name, idx) {
    if (name !== undefined && idx !== undefined) {
      tasks[name][idx].complete = true;
    } else {
      return tasks[name][idx].complete;
    }
  },

  remove: function (name, idx) {
    tasks[name].splice(idx, 1);
  }

};
