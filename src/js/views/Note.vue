<template>
  <div>
    <div v-if="isLoading">
      <div class="column">
        <div class="column is-half is-offset-one-quarter">
          <div class="has-text-centered">
            <i class="fa fa-spinner fa-spin"></i>&nbsp;Loading Notes. Please Wait!
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLoading">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="message is-success" v-if="showSuccessMessage">
            <div class="message-body">
              Note {{partialSuccessMessage}} Successfully.
            </div>
          </div>
          <div>
            <h3>{{partialTitleMessage}} Note</h3>
            <div class="add-form">
              <form @submit.prevent="addNote">
                <div class="control">
                  <textarea rows="6" class="textarea" placeholder="Note" v-model="newNoteTitle" @keyup="checkForErrorMessage"></textarea>
                  <span class="help is-danger" v-if="showTitleErrorMessage">Note is required</span>
                </div>
                <div>
                  <button class="button is-success" v-if="!isEdit" type="submit">Add</button>
                  <button class="button is-success" v-if="isEdit" type="submit">Update</button>
                  <button class="button is-danger" v-if="isEdit" type="button" @click="cancelUpdate">Cancel</button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <h3>Added Notes</h3>
            <div class="filter-notes">
            <a href="#" class="button" v-bind:class="{'is-primary': listType == -1}" @click.prevent="showAll">All</a>
            <a href="#" class="button" v-bind:class="{'is-primary': listType == 0}" @click.prevent="showActive">Active</a>
            <a href="#" class="button" v-bind:class="{'is-primary': listType == 1}" @click.prevent="showArchived">Archived</a>
            </div>
            <ul class="note-list" v-if="filterNotes.length > 0">
              <notes-list v-for="(note,index) in filterNotes" v-on:editNote="editNote" v-bind:index="index" v-on:archiveNote="archiveNote"  v-bind:note_id="note.id" v-bind:is_archived="note.is_archived" v-bind:title="note.title" :key="note.id"></notes-list>
            </ul>
            <div v-if="filterNotes.length == 0" class="no-notes">
              No Notes Found
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import axios from 'axios';

export default {
  created(){
    if(this.store.isLoggedin == false){
      this.$router.push('/');
    }
  },
  computed:{
    filterNotes(){
      if(this.listType == -1)return this.notes;
      else{
        let listType = this.listType;
        return _.filter(this.notes, function (note){
          return note.is_archived == listType;
        });
      }
    }
  },
  data () {
    return {
      isLoading: false,
      store: store.state,
      newNoteTitle:'',
      notes:[],
      showModal: false,
      showTitleErrorMessage: false,
      showSuccessMessage: false,
      isEdit: false,
      editNoteId: 0,
      partialSuccessMessage: 'Added',
      partialTitleMessage: 'Add New',
      listType: -1
    }
  },
  mounted(){
    if(this.store.isLoggedin == true){
      this.getLatestNotes();
    }
  },
  methods:{
    showAll(){
      this.listType = -1;
    },
    showActive(){
      this.listType = 0;
    },
    showArchived(){
      this.listType = 1;
    },
    checkForErrorMessage(){
      if(this.newNoteTitle.trim() == ''){
        this.showTitleErrorMessage = true;
      }else{
        this.showTitleErrorMessage = false;
      }
    },
    openModal(){
      this.showModal = true;
    },
    getLatestNotes(){
     if(this.notes.length == 0 && this.isLoading == false){
       this.isLoading = true;
       setTimeout(() => {
       axios.get('notes.json')
       .then((response) => {
          this.isLoading = false;
          this.notes = response.data;
       });
       },2000);
     } 
    },
    archiveNote(data){
      _.forEach(this.notes,function(value, key){
        if(value.id == data.id){
          value.is_archived = true;
        }
      });
    },
    editNote(data){
      this.isEdit = true;
      this.editNoteId = data.id;
      this.partialSuccessMessage = 'Updated';
      this.partialTitleMessage = 'Update';
      let title = '';
      _.forEach(this.notes,function(value, key){
        if(value.id == data.id){
          title = value.title;
        }
      });
      this.showTitleErrorMessage = false;
      this.newNoteTitle = title.replace(/<br \/>/g,'\n');
    },
    cancelUpdate(){
      this.isEdit = false;
      this.editNoteId = 0;
      this.newNoteTitle = "";
      this.partialSuccessMessage = 'Added';
      this.partialTitleMessage = 'Add New';
    },
    addNote(){
      let errorFound = false;
      if(this.newNoteTitle.trim() == ""){
        this.showTitleErrorMessage = true;
        errorFound = true;
      }
      if(errorFound == false && this.isEdit == false){
        let newNoteData = {
          "id":this.notes.length+1,
          "title":this.newNoteTitle.trim().replace(/(?:\r\n|\r|\n)/g, '<br />'),
          "is_archived":false
        }
        this.notes.push(newNoteData);
      }else if(errorFound == false && this.isEdit == true){
        let editNoteId = this.editNoteId;
        let newTitle = this.newNoteTitle;
        _.forEach(this.notes,function(value, key){
          if(value.id == editNoteId){
            value.title = newTitle.trim().replace(/(?:\r\n|\r|\n)/g, '<br />');
          }
        });
      }
      if(errorFound == false){
        this.newNoteTitle = "";
        this.showSuccessMessage = true;
        this.isEdit = false;
        this.partialTitleMessage = 'Add New';
        this.editNoteId = 0;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.partialSuccessMessage =  'Added';
        }, 2000);
      }
    }
  }
}
</script>