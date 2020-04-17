<template>
  <div id="app">
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
          <vue-grid v-show="!tutortoggle" align="stretch" justify="between">
            <vue-cell
              v-for="tutor in tutors"
              v-bind:key="tutor.name"
              width="4of12"
            >
              <TutorCard v-bind:tutor="tutor" />
            </vue-cell>
          </vue-grid>

          <v-card v-show="tutortoggle">
            <div class="container">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Timeslot</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="student in requests" v-bind:key="student.name">
                      <td class="my-2">{{ student.name }}</td>
                      <td>{{ student.module }}</td>
                      <td>
                        {{
                          student.date.toDate().toDateString() +
                            ', ' +
                            student.date.toDate().getHours() +
                            ':' +
                            student.date.toDate().getMinutes() +
                            '0'
                        }}
                      </td>
                      <td>
                        <v-btn
                          v-on:click="
                            select(student);
                            acceptRequest();
                          "

                          class="mx-2"
                          depressed
                          small
                          color="primary"
                          >Accept</v-btn
                        >
                        <v-btn
                          v-on:click="
                            select(student);
                            addContact();
                          "
                          class="mx-2"
                          depressed
                          small
                          color="success"
                          >Send Message</v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </v-card>
          <br />
          <!-- <Calender /> -->
          <TestCalender ref="calendar" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
import TestCalender from '../components/TestCalender.vue';
export default {
  name: 'app',
  components: {
    TestCalender,
    StarRating,
    ToggleButton,
    ProfileCard,
    MessageCard,
    Calender,
    VueGrid,
    VueCell,
    TutorCard,
  },

  data() {
    return {
      user: '',
      tutortoggle: false,
      name:"",
      title: 'Top Picks for CS2030',
      value: {},
      requests: [],
      tutors: [
        {
          name: 'Sam',
          course: 'Year 4 Computer Science',
          rate: 12,
          rating: 5,
        },
        {
          name: 'Dylan',
          course: 'Year 2 Business Analytics',
          rate: 15,
          rating: 5,
        },
        {
          name: 'Zen',
          course: 'Year 3 Computer Science',
          rate: 14,
          rating: 5,
        },
      ],
    };
  },
  methods: {
    fetchUser() {
      this.requests = [];
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          this.user = user.uid;
          // console.log(this.user, user.uid);
          const docRef = db.collection('users').doc(this.user);
          db.collection('studentrequests')
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let request = doc.data();

                if (
                  request.recipient != null &&
                  request.recipient.id == this.user &&
                  !request.accept
                ) {
                  console.log(this.user, request.recipient.id, docRef.id);
                  // console.log("success", request);
                  // console.log("author", request.author.id);
                  let authorid = request.author.id;

                  db.collection('users')
                    .doc(authorid)
                    .get()
                    .then((doc) => {
                      // console.log("authorname", doc.data().username);
                      request.name = doc.data().username;
                    });
                  // console.log('request', request);
                  this.requests.push(request);
                }
              });
            });
        }
        this.fetchEvents();
      });
    },
    fetchEvents() {
      this.$refs.calendar.fetchEvents();
    },
    swapCards() {
      this.tutortoggle = !this.tutortoggle;
      if (this.tutortoggle) {
        this.title = 'Appointment Requests';
      } else {
        this.title = 'Top Picks for CS2030';
      }
    },
    addContact() {
      console.log(this.student)
      db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('contacts')
        .doc(this.student.author).set({
          name:this.student.author,
          studentName: this.student.name
        }).then(this.$router.push({name:'Chat'}));

       
           /* db.collection('users').doc(firebase.auth().currentUser.uid)
            .collection('contacts').doc(this.student.email).set({
              name: this.student.email,
              studentName: this.student.name
            }).then(this.$router.push({ name: 'Chat' }));*/
          
    },
    acceptRequest() {
      db.collection('studentrequests')
        .doc(this.student.uid)
        .update({ accept: true });
      console.log('request accepted');
      this.fetchUser();
    },
    select: function(e) {
      this.student = e;
      // console.log(this.student);
    },
  },
  created() {
    this.fetchUser();
    // console.log("fetched");
  },
};
</script>

<style></style>
