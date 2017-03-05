<template>
    <li class="task-item">
        <div class="checkbox">
        </div>
        <div class="task-title">
            {{title}}
            <div class="to-be-completed-by">
            </div>
        </div>
    </li>
</template>

<script>
    export default {
       props:['title']
    }
</script>