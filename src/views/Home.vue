<template>
  <v-container>
    <v-layout row>
      <v-flex md3>
        <v-card flat color="transparent">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex md>
                <h2>NUSTutors</h2>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md>
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="profile"
                  >
                    <div class="top-card">
                      <v-avatar size="100" class="avatar">
                        <img
                          src="https://i.pinimg.com/originals/57/3e/9e/573e9e53ee78e2a88c32d53bd8a5bfd2.jpg"
                          alt="dog"
                        />
                      </v-avatar>
                    </div>

                    <v-card-title primary-title>
                      <div>
                        <h3>{{ name }}</h3>
                        <div>
                          <h6>{{ course }}</h6>
                          <body>
                            Hourly Rate: $ {{ rate }}/hr
                            <br />
                            Number of Past Tutees: {{ paststudents }}
                            <br />
                            Currently tutoring: {{ currentstudents }}
                            <br />Rating:
                            <br />
                            <star-rating
                              read-only
                              v-model="rating"
                              :show-rating="false"
                              rounded-corners
                              :star-size="30"
                              inline
                            ></star-rating>
                            <br />
                            <br />
                          </body>
                          <div class="review">
                            click here to see reviews written by Tan's past
                            tutees
                          </div>
                        </div>
                      </div>
                    </v-card-title>

                    <v-card-actions></v-card-actions>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex md>
                <h2>Message</h2>
                <br />
                <v-card md6>
                  <v-card-text>You have no new messages.</v-card-text>
                  <v-card-actions>
                    <v-btn
                      to="/chat"
                      :style="{ align: 'center', color: '#FFFFFF' }"
                      color="#F1BA79"
                      small
                      tile
                      outlined
                      >View past messages</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex md7>
        <v-card flat color="transparent">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex md8>
                <h2>New Student Requests</h2>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card>
          <div class="container">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Subject</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="student in students" v-bind:key="student.id">
                    <td class="my-2">{{ student.name }}</td>

                    <td>{{ student.module }}</td>

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
        <v-card flat color="transparent">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex md8>
                <h2>Calender</h2>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card md6>
          <div>
            <v-sheet tile height="54" color="#F1BA79" class="d-flex">
              <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>

              <v-select
                v-model="type"
                :items="types"
                outlined
                hide-details
                dense
                class="ma-2"
                label="View Type"
              ></v-select>

              <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-sheet>
            <v-sheet height="400">
              <v-calendar
                ref="calendar"
                v-model="value"
                :type="type"
                :events="events"
                :event-color="getEventColor"
                @change="getEvents"
              ></v-calendar>
            </v-sheet></div
        ></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StarRating from 'vue-star-rating';
export default {
  name: 'app',
  components: {
    StarRating
  },
  data() {
    return {
      name: 'Jon Tan',
      course: 'Year 4 Computer Science',
      rate: 10,
      paststudents: 25,
      currentstudents: 5,
      rating: 3,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] }
      ],
      value: '',
      events: [],
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1'
      ],
      names: [
        'Meeting',
        'Holiday',
        'PTO',
        'Travel',
        'Event',
        'Birthday',
        'Conference',
        'Party'
      ],

      links: [
        {
          id: '1',
          title: 'Dashboard',
          description:
            'Get detailed anlytics to measure and analyze how users engage with your app',
          color: '#F1BA79'
        },
        {
          id: '2',
          title: 'Storage',
          description:
            'Store and retrieve user-generated content, such as images, audio, and videos, without server-side code.',
          color: 'teal'
        },
        {
          id: '3',
          title: 'Notifications',
          description:
            'Manage your notification campaigns and send messages to reach the right users at the right time',
          color: 'blue'
        },
        {
          id: '4',
          title: 'Authentification',
          description:
            'Authenticate and manage users from a variety of providers without server-side-code',
          color: 'purple'
        }
      ],
      students: [
        {
          name: 'Sarah',
          module: 'CS2030'
        },
        {
          name: 'Sean',
          module: 'BT2102'
        }
      ],
      module: {
        name: null,
        skill: null,
        tags: []
      },
      activeItem: null,
      modal: null,
      tag: null
    };
  }
};
</script>

<style scoped>
h2 {
  color: #f1ba79;
  font-weight: bold;
}
h3 {
  margin-top: 2.5rem;
}
.avatar {
  margin: -3.5rem;
}
.top-card {
  height: 8rem;
  background-color: #f1ba79;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.outine-2 {
  border: 2px solid white;
}

.review {
  text-decoration: underline;
  font-size: 0.8em;
  padding: 1em 0;
  color: gray;
  white-space: normal;
}
calender {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 100%;
}
</style>
