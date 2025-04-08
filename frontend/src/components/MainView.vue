<template>
  <div
    style="
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      background-color: #f5f5f5;
      height: 97vh;
      width: auto;
      display: flex;
      flex-direction: column;
    "
  >
    <div
      style="
        background-color: #2c3e50;
        color: white;
        padding: 16px;
        font-size: 24px;
      "
    >
      Lunista Task System
    </div>
    <div style="flex: 1; padding: 32px">
      <div style="text-align: right; margin-bottom: 24px">
        <button
          @click="openCreateForm = true"
          :style="{ background: obtenerGradient('Gray'), padding: '8px 16px', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }"
        >
          + Create Task
        </button>
      </div>

      <!-- Edit Form -->
      <div
        v-if="openEditForm"
        style="background-color: white; padding: 16px; margin-bottom: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
      >
        <input v-model="form.title" placeholder="Title" style="margin: 4px; padding: 4px" />
        <input v-model="form.description" placeholder="Description" style="margin: 4px; padding: 4px" />
        <select v-model="form.priority_level" style="margin: 4px; padding: 4px">
          <option disabled value="">Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
        <select v-model="form.status" style="margin: 4px; padding: 4px">
          <option disabled value="">Status</option>
          <option>Backlog</option>
          <option>Unstarted</option>
          <option>Started</option>
          <option>Completed</option>
          <option>Canceled</option>
        </select>
        <input v-model="form.estimate" type="number" min="0" placeholder="Estimate" style="margin: 4px; padding: 4px" />
        <button
          @click="submitEdit"
          :style="{ background: obtenerGradient('Blue'), margin: '4px', padding: '4px 8px', color: 'black', border: 'none', borderRadius: '4px' }"
        >
          Update
        </button>
        <button
          @click="openEditForm = false"
          :style="{ background: obtenerGradient('Red'), margin: '4px', padding: '4px 8px', color: 'black', border: 'none', borderRadius: '4px' }"
          
        >
          Cancel
        </button>
      </div>

      <!-- Create Form -->
      <div
        v-if="openCreateForm"
        style="background-color: white; padding: 16px; margin-bottom: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
      >
        <input v-model="form.title" placeholder="Title" style="margin: 4px; padding: 4px" />
        <input v-model="form.description" placeholder="Description" style="margin: 4px; padding: 4px" />
        <select v-model="form.priority_level" style="margin: 4px; padding: 4px">
          <option disabled value="">Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
        <select v-model="form.status" style="margin: 4px; padding: 4px">
          <option disabled value="">Status</option>
          <option>Backlog</option>
          <option>Unstarted</option>
          <option>Started</option>
          <option>Completed</option>
          <option>Canceled</option>
        </select>
        <input v-model="form.estimate" type="number" min="0" placeholder="Estimate" style="margin: 4px; padding: 4px" />
        <button
          @click="createTask"
          :style="{ background: obtenerGradient('Gray'), margin: '4px', padding: '4px 8px', color: 'black', border: 'none', borderRadius: '4px' }"
        >
          Save
        </button>
        <button
          @click="openCreateForm = false"
          style="margin: 4px; padding: 4px 8px; background-color: #e74c3c; color: white; border: none; border-radius: 4px;"
        >
          Cancel
        </button>
      </div>

      <!-- Task Table -->
      <div style="background-color: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <table style="width: 100%; border-collapse: collapse">
          <thead>
            <tr style="background-color: #ecf0f1">
              <th style="padding: 8px; text-align: left">ID</th>
              <th style="padding: 8px; text-align: left">Title</th>
              <th style="padding: 8px; text-align: left">Priority</th>
              <th style="padding: 8px; text-align: left">Status</th>
              <th style="padding: 8px; text-align: left">Estimate</th>
              <th style="padding: 8px; text-align: left">Created</th>
              <th style="padding: 8px; text-align: center">Description</th>
              <th style="padding: 8px; text-align: center">Delete</th>
              <th style="padding: 8px; text-align: center">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-top: 1px solid #ddd" v-for="task in tasksC" :key="task.id">
              <td style="padding: 8px">{{ task.id }}</td>
              <td style="padding: 8px">{{ task.title }}</td>
              <td style="padding: 8px">{{ task.priority_level }}</td>
              <td style="padding: 8px">{{ task.status }}</td>
              <td style="padding: 8px">{{ task.estimate }}</td>
              <td style="padding: 8px">{{ new Date(task.fecha_creacion).toLocaleDateString() }}</td>
              <td style="padding: 8px; text-align: center">
                <button
                  @click="turnOnDescription(task)"
                  :style="{ background: obtenerGradient('Green'), padding: '4px 8px', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }"
                >
                  Details
                </button>
              </td>
              <td style="padding: 8px; text-align: center">
                <button
                  @click="deleteTask(task.id)"
                  :style="{ background: obtenerGradient('Red'), padding: '4px 8px', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }"
                >
                  Delete
                </button>
              </td>
              <td style="padding: 8px; text-align: center">
                <button
                  @click="updateTask(task.id)"
                  :style="{ background: obtenerGradient('Blue'), padding: '4px 8px', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Description Modal -->
        <div
          v-if="openDescription"
          @click="openDescription = false"
          style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;"
        >
          <div
            style="background: white; padding: 24px 32px; border-radius: 12px; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25); max-width: 600px; width: 90%; display: flex; flex-direction: column; gap: 16px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; line-height: 1.5;"
          >
            <h2
              style="font-size: 28px; margin: 0; text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 12px; background-color: #2c3e50; color: white; padding: 16px; font-size: 24px;"
            >
              Task Description
              <div style="color: white; font-size: 11px">Toca para cerrar</div>
            </h2>
            <p style="font-size: 18px; color: #333; text-align: justify; white-space: pre-wrap;">
              {{ task.description || "No description available." }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tasksC: [],
      openCreateForm: false,
      openEditForm: false,
      openDescription: false,
      editingId: null,
      form: {
        title: "",
        description: "",
        priority_level: "",
        status: "",
        estimate: null,
        
      },
      gradientes: {
        Green: "linear-gradient(0deg, #c6fdb4 40%, #ecfee4 40%)",
        Red: "linear-gradient(0deg, #ff7d7a 40%, #fbaeb3 40%)",
        Blue: "linear-gradient(0deg, #c7b7fe 40%, #e4ddfd 40%)",
        Yellow: "linear-gradient(0deg, #fcfdb4 40%, #fdfdb1 40%)",
        Cyan: "linear-gradient(0deg, #b5e4fd 40%,  #e4f7ff 40%)",
        Gray: "linear-gradient(0deg, #dadada 40%, #f0f0f0 40%)",
      },
    };
  },

  name: "MainView",
  mounted() {
    this.getTasks();
  },
  methods: {
  
  obtenerGradient(color) {
      return (
        this.gradientes[color] ||
        "linear-gradient(0deg, #ffffff 40%, #f0f0f0 40%)"
      );
    },
    turnOnDescription(task) {
      this.openDescription = true;
      this.task = task;
    },
    getTasks() {
      fetch("/api/tasks")
        .then((res) => {
          if (!res.ok) throw new Error("Error getting tasks");
          return res.json();
        })
        .then((data) => (this.tasksC = data))
        .catch((err) => console.error(err));
    },
    deleteTask(taskId) {
      fetch(`/api/tasks/${taskId}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) throw new Error("Error deleting task");
          return res.json();
        })
        .then(() => this.getTasks())
        .catch(console.error);
    },
    updateTask(taskId) {
      const task = this.tasksC.find((t) => t.id === taskId);
      if (task) {
        this.form = { ...task };
        this.editingId = taskId;
        this.openEditForm = true;
        this.openCreateForm = false;
      }
    },
    submitEdit() {
      fetch(`/api/tasks/${this.editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error updating task");
          return res.json();
        })
        .then(() => {
          this.getTasks();
          this.openEditForm = false;
          this.form = {
            title: "",
            description: "",
            priority_level: "",
            status: "",
            estimate: null,
          };
        })
        .catch(console.error);
    },
    createTask() {
      fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error creating task");
          return res.json();
        })
        .then(() => {
          this.form = {
            title: "",
            description: "",
            priority_level: "",
            status: "",
            estimate: null,
          };
          this.openCreateForm = false;
          this.getTasks();
        })
        .catch(console.error);
    },
  },
};
</script>
<style scoped>
/* hover for buttons (off now) */
button {
  transition: background-color 0.3s ease;
}

button[style*="#3498db"]:hover {
  background-color: #2980b9;
}

button[style*="#27ae60"]:hover {
  background-color: #1e8449;
}

button[style*="#e74c3c"]:hover {
  background-color: #c0392b;
}

button[style*="#2ecc71"]:hover {
  background-color: #27ae60;
}

</style>