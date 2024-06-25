<template>
  <section>

    <a-table :dataSource="store.tasks" :columns="columns">

      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'tags'">
          <div class="tag_container">
            <a-input v-if="store.editableData && store.editId == record._id" v-model:value="store.editableData.tags"
              style="margin: -5px 0" />
            <span  v-for="tag in record.tags.split(', ')" class="tag">
              {{ tag }}
            </span>
          </div>
        </template>

        <template v-else-if="column.key === 'name'">
          <div>
            <a-input v-if="store.editableData && store.editId == record._id" v-model:value="store.editableData.name"
              style="margin: -5px 0" />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>

        <template v-else-if="column.key === 'description'">
          <div>
            <a-input v-if="store.editableData && store.editId == record._id" v-model:value="store.editableData.description"
              style="margin: -5px 0" />
            <template v-else>
              <div style="max-width: 200px; max-height: 100px; overflow: auto;">
                {{ text }}
              </div>
            </template>
          </div>
        </template>

        <template v-else-if="column.key === 'date_of_completion'">
          <div>
            <a-input v-if="store.editableData && store.editId == record._id" v-model:value="store.editableData.date_of_completion"
              style="margin: -5px 0" />
            <template v-else>
              <div style="max-width: 200px; max-height: 100px; overflow: auto;">
                {{ text }}
              </div>
            </template>
          </div>
        </template>

        <template v-else-if="column.key === 'operation'">
          <div class="editable-row-operations">
            <div v-if="store.editableData && store.editId == record._id" class="action_container">
              <a-typography-link @click="store.save(record._id)">Save</a-typography-link>
            </div>
            <div v-else class="action_container">
              <a @click="store.edit(record._id)">Edit</a>
              <a @click="store.remove(record._id)">remove</a>
            </div>
          </div>
        </template>

      </template>

      <template #expandedRowRender="{ record }">
        <div v-for="(field, index) in record.custom_fields">

          <div v-if="store.editableData && store.editId == record._id" class="custom_fields_container">
            <a-input v-model:value="store.editableData.custom_fields[index].key" />
            :
            <a-input v-model:value="store.editableData.custom_fields[index].value" />
          </div>

          <div v-else class="custom_fields_container">
            <span>{{ field.key }}:</span>
            <span>{{ field.value }}</span>
            <button @click="store.removeCustomField(record._id, index)" style="color: red">Удалить</button>
          </div>

        </div>

        <div v-if="store.NewCustomField" class="custom_fields_container">
          <a-input v-model:value="store.NewCustomField.key" />
          :
          <a-input v-model:value="store.NewCustomField.value" />
          <button v-if="store.NewCustomField" @click="store.NewCustomField && store.saveCustomField(record._id, store.NewCustomField)"
            style="color:green">Сохранить</button>
          <button @click="store.CanceladdCustomField()" style="color: red">Отмена</button>
        </div>

        <div class="custom_fields_buttons">
          <div>
            <button v-if="store.editableData && store.editId == record._id" @click="store.save(record._id)">Сохранить</button>
            <button v-else @click="store.edit(record._id)">Изменить</button>
          </div>
          <button @click="store.addCustomField()" style="color:green">Добавить</button>
        </div>
      </template>
      <template #expandColumnTitle>
        <span>Доп поля</span>
      </template>


    </a-table>
  </section>

</template>

<script setup lang="ts">
import { store } from '../store/store';
import { onMounted } from 'vue'



const columns: Array<{ title: string, dataIndex: string, key: string }> = [
  {
    title: 'Номер задачи',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Метки',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: 'Дата выполнения',
    dataIndex: 'date_of_completion',
    key: 'date_of_completion',
  },
  {
    title: 'Действия',
    dataIndex: 'operation',
    key: 'operation',
  },
]

onMounted(async () => {
  await store.getAll()
})

</script>

<style scoped>
.tag_container {
  display: flex;
  gap: 0.25rem
}

.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.12rem 0.25rem;
  border: 1px solid gray;
  border-radius: 8px;
  color: rgb(44, 44, 44);
  font-size: 12px;
}

.custom_fields_container {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.custom_fields_buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action_container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
