import { INewTask, ITask } from './../types/ITask';
import tasks from '../api/tasks';
import { Reactive, reactive } from 'vue'
//: Reactive<Array<ITask>>

interface IStore {
  tasks: Array<ITask>,
  isLoading: boolean
  editableData: ITask | false,
  editId: string | null,
  NewCustomField: { key: string, value: string } | null,
  add: (task: INewTask) => void,
  edit: (id: string) => void,
  getAll: () => void,
  save: (id: string) => void,
  remove: (id: string) => void,
  addCustomField: () => void,
  saveCustomField: (id: string, custom_field: { key: string, value: string }) => void,
  CanceladdCustomField: () => void,
  removeCustomField: (id: string, indexOfField: number) => void,
}

export const store: Reactive<IStore> = reactive({
  tasks: [] as Array<ITask>,
  isLoading: false as boolean,
  editableData: false as IStore["editableData"],
  editId: null as IStore["editId"],
  NewCustomField: null as IStore["NewCustomField"],

  async getAll() {
    try {
      this.isLoading = true;
      const tasksRes = await tasks.getAll()
      if (typeof tasksRes !== "string") {
        this.tasks = tasksRes
      }
      this.isLoading = false;
    } catch (error) {
      console.log(error)
    }
  },
  async add(task: INewTask) {
    try {
      this.isLoading = true;
      const tasksRes = await tasks.add(task)
      if (typeof tasksRes !== "string") {
        this.tasks = tasksRes
      }
      this.isLoading = false;
    } catch (error) {
      console.log(error)
    }
},

  edit(id: string) {
  this.editId = id
    this.editableData = this.tasks.filter(item => id === item._id)[0];
  console.log(this.editableData)
},

  async save(id: string) {
  try {
    this.isLoading = true;

    if(this.editableData) {
      const tasksRes = await tasks.update(id, this.editableData)
        if (typeof tasksRes !== "string") {
  this.tasks = tasksRes
}
      }

this.isLoading = false;
    } catch (error) {
  console.log(error)
}
this.editableData = false
  },
  async remove(id: string) {
  try {
    this.isLoading = true;
    const tasksRes = await tasks.delete(id)
    if (typeof tasksRes !== "string") {
      this.tasks = tasksRes
    }
    this.isLoading = false;
  } catch (error) {
    console.log(error)
  }
},
addCustomField() {
  this.NewCustomField = { key: '', value: '' }
},
CanceladdCustomField() {
  this.NewCustomField = null
  this.editableData = false
},
saveCustomField(id: string, custom_field: { key: string, value: string }): void {
  this.editableData = this.tasks.filter(item => id === item._id)[0]
    this.editableData.custom_fields.push(custom_field)
    this.save(id)
    this.editableData = false
    this.NewCustomField = null
},
  removeCustomField(id: string, indexOfField: number) {
  this.editableData = this.tasks.filter(item => id === item._id)[0]
  this.editableData.custom_fields = this.editableData.custom_fields.filter((field, index) => indexOfField !== index)
  this.save(id)
  this.editableData = false
}
})