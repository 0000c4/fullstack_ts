<script setup lang="ts">
import { store } from '../store/store';
import { Ref, ref } from 'vue';
import { INewTask } from '../types/ITask';

const task: Ref<INewTask> = ref({
    name: '',
    description: '',
    created_at: String(new Date()),
    tags: '',
    custom_fields: [],
}
)
</script>

<template>
    <form class="form_container" @click.prevent>
        <a-input placeholder="Название" v-model:value="task.name"></a-input>
        <a-input placeholder="Описание" v-model:value="task.description"></a-input>
        <a-input placeholder="Метки через запятую(опционально)" v-model:value="task.tags"></a-input>
        <a-input placeholder="Дата выполнения(опционально)" v-model:value="task.date_of_completion"></a-input>
        <button @click="store.add(task)">Добавить</button>
    </form>
</template>

<style scoped>
.form_container {
    margin-bottom: 3rem;
    display: flex;
    gap: 1rem;
}
</style>
