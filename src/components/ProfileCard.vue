<template>
  <v-container fluid grid-list-lg style="margin:0px, padding:0px">
    <v-layout row wrap>
      <v-flex md>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="profile"
          >
            <div class="top-card" style="height:6.5em">
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
                    Currently tutoring: {{ currentstudents }} <br />Rating:
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
                    click here to see reviews written by Tan's past tutees
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
</template>

<script>
import StarRating from 'vue-star-rating';
export default {
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
      rating: 3
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
  background-color: #f1ba79;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.review {
  text-decoration: underline;
  font-size: 0.8em;
  padding: 1em 0;
  color: gray;
  white-space: normal;
}
</style>
