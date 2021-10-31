const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

// Class Methods

Task.clearCompleted = () => {
  return Task.destroy(
    { where: { complete: true} }
  ).catch(err => {
    console.log(err);
  })
}

Task.completeAll = () => {
  return Task.update(
    { complete: true },
    { where: { complete: false } }
  )
}

Owner.getOwnersAndTasks = async () => {
  const OwnersWithTasks = await Owner.findAll({ include: Task });
  return OwnersWithTasks;
};

// Instance Methods

Task.prototype.getTimeRemaining = function() {
  console.log(this.due);
  if (!this.due) {
    return Infinity;
  } else {
    const timeNow = new Date().getTime();
    return (this.due.getTime() - timeNow);
  }
}

Task.prototype.isOverdue = function() {
  /*
  if (this.getTimeRemaining < 0 && !this.complete) {
    return true;
  } else if (this.due.getTime() < new Date().getTime() && !this.complete) {
    return true;
  }
  */

  if (!this.complete && (this.getTimeRemaining < 0 || this.due.getTime() < new Date().getTime())) {
    return true;
  }

  return false;
}


Task.prototype.assignOwner = function(owner) {
  return this.setOwner(owner);
};

Owner.prototype.getIncompleteTasks = async function() {
  const userId = this.id;
  const tasks = await Task.findAll({where: {OwnerId: userId}});
  return tasks.filter(task => !task.complete);
}

// Lifecycle hooks

Owner.beforeDestroy((owner) => {
  if (owner.name === 'Grace Hopper') {
    throw new Error('Cannot be done');
  }
});


//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
