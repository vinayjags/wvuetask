<template>
    <li class="note-item">
        <div class="checkbox">
            <div class="is-not-completed">
                <div class="complete-note">
                    {{index+1}}
                </div>
            </div>
        </div>
        <div class="note-title">
            <div v-html="title"></div>
            
            <div class="note-status">
                <span class="help" v-bind:class="{'is-warning':is_archived}">{{noteStatus}}</span>
                <a href="" v-if="!is_archived" class="is-primary" @click.prevent="archiveNote">Archive</a>
                <a href="" v-if="!is_archived" class="is-success" @click.prevent="editNote">Edit</a>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
       props:['title','is_archived','note_id','index'],
       computed:{
           noteStatus(){
               if(this.is_archived == true){
                   return "Archived";
               }else{
                   return "";
               }
           }
       },
       methods:{
           archiveNote(){
               if(this.is_archived == false){
                    this.$emit('archiveNote',{id: this.note_id});
               }
           },
           editNote(){
               this.$emit('editNote', {id: this.note_id});
           }
       }
    }
</script>