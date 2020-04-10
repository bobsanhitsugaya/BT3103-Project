<template>
  <v-container>
    <v-layout col>
      <v-flex md3>
        <v-card flat color="transparent">
          <ProfileCard />
          <MessageCard />
        </v-card>
      </v-flex>

      <v-flex md9>
        <v-card flat color="transparent">
          <v-container fluid grid-list-lg>
            <h2>{{ title }}</h2>
            <ToggleButton
              @change="swapCards"
              :labels="{ unchecked: 'Student', checked: 'Tutor' }"
              style="float:right"
              width="80"
            />
          </v-container>
        </v-card>
        <vue-grid v-show="!tutor" align="stretch" justify="between">
          <vue-cell
            v-for="tutor in tutors"
            v-bind:key="tutor.name"
            width="4of12"
            ><TutorCard v-bind:tutor="tutor"
          /></vue-cell>
          <!-- <vue-cell width="4of12"><TopPicks /></vue-cell>
          <vue-cell width="4of12"><TopPicks /></vue-cell> -->
        </vue-grid>
        <!-- <v-card
          md12
          v-show="!tutor"
          flat
          color="transparent"
          style="margin:0px,max-width:20em"
        >
          <v-row nowrap>
            <v-col><TopPicks /></v-col>
            <v-col><TopPicks /></v-col>
            <v-col><TopPicks /></v-col>
          </v-row>
        </v-card> -->
        <v-card v-show="tutor">
          <div class="container">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Subject</th>
                    <!-- <th>Date</th> -->
                    <th>Timeslot</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="student in students" v-bind:key="student.name">
                    <td class="my-2">{{ student.name }}</td>

                    <td>{{ student.module }}</td>
                    <td>
                      {{
                        student.time.toDate().toDateString() +
                          ', ' +
                          student.time.toDate().getHours() +
                          ':' +
                          student.time.toDate().getMinutes() +
                          '0'
                      }}
                    </td>
                    <td>
                      <v-btn class="mx-2" depressed small color="primary"
                        >Accept</v-btn
                      >
                      <v-btn v-on:click="select(student.name) ; addContact()" class="mx-2" depressed small color="success"
                        >Send Message</v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </v-card>
        <Calender />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StarRating from 'vue-star-rating';
import { ToggleButton } from 'vue-js-toggle-button';
import ProfileCard from '../components/ProfileCard.vue';
import MessageCard from '../components/MessageCard.vue';
import Calender from '../components/Calender.vue';
import firebase from 'firebase';
import { VueGrid, VueCell } from 'vue-grd';
import TutorCard from '../components/TutorCard.vue';
export default {
  name: 'app',
  components: {
    StarRating,
    ToggleButton,
    ProfileCard,
    MessageCard,
    Calender,
    VueGrid,
    VueCell,
    TutorCard
  },

  data() {
    return {
      tutor: false,
      title: 'Top Picks for CS2030',
      student: null,
      students: [],
      tutors: [
        {
          name: 'Sam',
          course: 'Year 4 Computer Science',
          rate: 12,
          rating: 5
        },
        {
          name: 'Dylan',
          course: 'Year 2 Business Analytics',
          rate: 15,
          rating: 5
        },
        {
          name: 'Zen',
          course: 'Year 3 Computer Science',
          rate: 14,
          rating: 5
        }
      ]
    };
  },
  methods: {
    //fetching not working
    fetchRequests() {
      let request = {};
      db.collection('studentrequests')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            request = doc.data();
            request.id = doc.id;
            console.log(request);
            this.students.push(request);
          });
          console.log(this.students);
        });
    },
    swapCards() {
      this.tutor = !this.tutor;
      if (this.tutor) {
        this.title = 'New Student Requests';
      } else {
        this.title = 'Top Picks for CS2030';
      }
    },
    addContact(){
      //add if statement to check if student is already in contacts
      //student in student requests shud have their own unique IDs to read from fb
      db.collection('users').doc(firebase.auth().currentUser.uid)
        .collection('contacts').add({
          name: this.student
        }).then(this.$router.push({name: 'Chat'}));
    },
    select: function(e){
          this.student = e;
          console.log(this.student)
        }
  },
  created() {
    this.fetchRequests();
    console.log('fetched');
  }
};
</script>

<style scoped></style>
