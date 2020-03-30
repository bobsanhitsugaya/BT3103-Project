<template>
  <v-container>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
      ]
    };
  }
};
</script>

<style>
calender {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 100%;
}
</style>
