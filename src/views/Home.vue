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
          <v-container>
            <h2>{{ title }}</h2>
            <ToggleButton
              @change="swapCards"
              :labels="{ unchecked: 'Student', checked: 'Tutor' }"
              style="float:right"
              width="80"
            />
          </v-container>
        </v-card>
        <v-card md12 v-show="!tutor">
          <TopPicks />
        </v-card>
        <v-card v-show="tutor">
          <div class="container">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Subject</th>
                    <th>Timeslot</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="student in students" v-bind:key="student.id">
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
                      <v-btn class="mx-2" depressed small color="success"
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
import TopPicks from '../components/TopPicks.vue';
import ProfileCard from '../components/ProfileCard.vue';
import MessageCard from '../components/MessageCard.vue';
import Calender from '../components/Calender.vue';
import firebase from 'firebase';
export default {
  name: 'app',
  components: {
    StarRating,
    ToggleButton,
    TopPicks,
    ProfileCard,
    MessageCard,
    Calender
  },

  data() {
    return {
      tutor: false,
      title: 'Top Picks for CS2030',
      student: null,
      students: []
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
    }
  },
  created() {
    this.fetchRequests();
    console.log('fetched');
  }
};
</script>

<style scoped></style>
