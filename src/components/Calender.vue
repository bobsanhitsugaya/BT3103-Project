<template>
  <v-container>
    <v-card flat color="transparent">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex md8>
            <h2>Calendar</h2>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-app id="dayspan">
      <ds-calendar-app :calendar="calendar"></ds-calendar-app>
    </v-app>
    <!-- <v-card md6>
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
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
            ></v-calendar>
          </v-sheet>
        </div>
    </v-card>-->
  </v-container>
</template>

<script>
import Vuetify from "vuetify";
import { Calendar } from "dayspan";
export default {
  data() {
    return {
      calendar: Calendar.months(),
      type: "month",
      types: ["month", "week", "day", "4day"],
      value: "",
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1"
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party"
      ]
    };
  },
  methods: {
    getEvents() {
      const events = [];
      const min = new Date();
      console.log("min", min);
      const max = new Date();
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);
      console.log(min, max, days, eventCount);
      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        const event = {
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        };
        events.push(event);
        console.log("event ", i, event);
      }

      this.events = events;
    },
    getEventColor(event) {
      console.log("geteventcolor");
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      console.log("format date: ", a);
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  },
  created() {
    console.log(new Date(2020, 4, 1).toDateString() + " 11:13:00");
    console.log(
      "new",
      new Date(new Date(2020, 4, 1).toDateString() + " 11:13:00")
    );
    console.log(new Date(2020, 5, 30));
    this.getEvents();
  }
};
</script>

<style>
#dayspan {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 100%;
  margin: 10%;
}
</style>
