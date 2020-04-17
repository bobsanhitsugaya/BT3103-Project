<template>
  <div id="app">
    <FullCalendar
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :weekends="true"
      :header="head"
      :events="events"
      @dateClick="handleDateClick"
    />
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import firebase from 'firebase';

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  // props: [length],
  data() {
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      head: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      calendarEvents: [
        { title: 'event 1', date: '2020-04-01T12:30:00-05:00' },
        { title: 'event 2', date: '2020-04-02' },
        { title: 'Event Now', start: new Date() },
      ],
      events: [],
    };
  },
  methods: {
    fetchEvents() {
      this.events = [];
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
                const event = {};
                if (
                  doc.data().recipient != null &&
                  doc.data().recipient.id == this.user &&
                  doc.data().accept
                ) {
                  let authorid = doc.data().author.id;
                  let module = doc.data().module;
                  let date = doc.data().date;
                  db.collection('users')
                    .doc(authorid)
                    .get()
                    .then((doc) => {
                      console.log('date', date.toDate());
                      const title = doc.data().username + ' ' + module;
                      console.log('title: ', title);
                      this.events.push({
                        title: title,
                        start: date.toDate(),
                      });
                    });
                }
              });
            });
        }
      });
    },
    handleDateClick(arg) {
      if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({
          // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay,
        });
      }
    },
  },
  created() {
    this.fetchEvents();
    // console.log('length', length);
    // console.log('fetched');
  },

  // watch: {
  //   length: function(val) {
  //     fetchEvents.reload();
  //     console.log('length changed');
  //   },
  // },
};
</script>
<style lang="scss">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
FullCalender {
  padding: 10%;
}
</style>
