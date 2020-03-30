<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex md3>
          <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex md>
                  <h2>Your Profile</h2>
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
                        <v-avatar size="100" class="avatar"
                          ><img
                            src="https://i.pinimg.com/originals/57/3e/9e/573e9e53ee78e2a88c32d53bd8a5bfd2.jpg"
                            alt="dog"
                        /></v-avatar>
                      </div>

                      <v-card-title primary-title>
                        <div>
                          <h3>
                            {{ name }}
                          </h3>
                          <div>
                            <h6>{{ course }}</h6>
                            <body>
                              Hourly Rate: $ {{ rate }}/hr <br />
                              Number of Past Tutees: {{ paststudents }}<br />
                              Currently tutoring: {{ currentstudents }}<br />
                              Rating:<br />
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

                      <v-card-actions> </v-card-actions>
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
                        class="orange white--text"
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

        <v-flex md6>
          <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex md8>
                  <h2>Experiences</h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <v-card class="modules">
            <div class="container">
              <div class="module-test">
                <v-btn
                  class="mx-2"
                  depressed
                  @click="addNew"
                  color="#F1BA79"
                  :style="{ float: 'right', color: '#FFFFFF' }"
                  >Add Experience</v-btn
                >

                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Module</th>
                        <th>Skill</th>
                        <th>Modify</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="module in modules" v-bind:key="module.id">
                        <td>
                          {{ module.name }}
                        </td>

                        <td>
                          {{ module.skill }}
                        </td>

                        <td>
                          <v-btn
                            class="mx-2"
                            color="primary"
                            @click="editModule(module)"
                          >
                            Edit
                          </v-btn>
                          <v-btn
                            class="mx-2"
                            color="error"
                            @click="deleteModule(module)"
                          >
                            Delete
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="module"
              tabindex="-1"
              role="dialog"
              aria-labelledby="editLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editLabel">Add Experience</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <!-- main module -->
                      <div class="col-md-8">
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Module Name"
                            v-model="module.name"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Module skill"
                            v-model="module.skill"
                            class="form-control"
                          />
                        </div>

                        <div class="form-group">
                          <input
                            type="text"
                            @keyup.188="addTag"
                            placeholder="Module tags"
                            v-model="tag"
                            class="form-control"
                          />

                          <div class="d-flex">
                            <p v-for="tag in module.tags" :key="tag">
                              <span class="p-1">{{ tag }}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      @click="addModule()"
                      type="button"
                      class="btn btn-primary"
                      v-if="modal == 'new'"
                    >
                      Save changes
                    </button>
                    <button
                      @click="updateModule()"
                      type="button"
                      class="btn btn-primary"
                      v-if="modal == 'edit'"
                    >
                      Apply changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </v-card>

          <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex md8>
                  <h2>Skills</h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <v-card class="skillset">
            <div class="container">
              <div class="skill-test">
                <v-btn
                  class="mx-2"
                  depressed
                  @click="addNew"
                  color="#F1BA79"
                  :style="{ float: 'right', color: '#FFFFFF' }"
                  >Add Skills</v-btn
                >

                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Skills</th>
                        <th>Modify</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="skill in skillset">
                        <h4>
                          {{ skill.name }}
                        </h4>

                        <p1>
                          {{ skill.para }}
                        </p1>

                        <td>
                          <v-btn
                            class="mx-2"
                            color="primary"
                            @click="editSkill(module)"
                          >
                            Edit
                          </v-btn>
                          <v-btn
                            class="mx-2"
                            color="error"
                            @click="deleteModule(module)"
                          >
                            Delete
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="module"
              tabindex="-1"
              role="dialog"
              aria-labelledby="editLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editLabel">Add Experience</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <!-- main module -->
                      <div class="col-md-8">
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Module Name"
                            v-model="module.name"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Module skill"
                            v-model="module.skill"
                            class="form-control"
                          />
                        </div>

                        <div class="form-group">
                          <input
                            type="text"
                            @keyup.188="addTag"
                            placeholder="Module tags"
                            v-model="tag"
                            class="form-control"
                          />

                          <div class="d-flex">
                            <p v-for="tag in module.tags" :key="tag">
                              <span class="p-1">{{ tag }}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      @click="addModule()"
                      type="button"
                      class="btn btn-primary"
                      v-if="modal == 'new'"
                    >
                      Save changes
                    </button>
                    <button
                      @click="updateModule()"
                      type="button"
                      class="btn btn-primary"
                      v-if="modal == 'edit'"
                    >
                      Apply changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import firebase from 'firebase';
import StarRating from 'vue-star-rating';
export default {
  name: 'Modules',
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
      modules: [],
      module: {
        name: null,
        skill: null,
        tags: []
      },
      activeItem: null,
      modal: null,
      tag: null,
            skillset: [
        {
          name: 'Python',
          para: '2 years of experience. Used Python to automate scripts for start-up.',
        },
        {
          name: 'Tableau',
          para: '1 year of experience. Built dashboard for data visualization.',
        },
        {
          name: 'Dart',
          para: '6 months of experience. Built and deployed a Flutter app on IOS.',
        },
      ],
    };
  },
  methods: {
    addTag() {
      this.module.tags.push(this.tag);
      this.tag = '';
    },
    reset() {
      this.module = {
        name: null,
        skill: null,
        tags: []
      };
    },
    addNew() {
      this.modal = 'new';
      this.reset();
      $('#module').modal('show');
    },
    updateModule() {
      db.collection('modules')
        .doc(module)
        .update({
          name: this.module.name,
          skill: this.module.skill,
          tags: this.tag
        });
      $('#module').modal('hide');
    },
    editModule(module) {
      this.modal = 'edit';
      this.module = module;
      $('#module').modal('show');
    },
    deleteModule(doc) {
      db.collection('modules')
        .doc(doc.id)
        .delete();
    },
    addModule() {
      if (this.module.name != null && this.module.skill != null) {
        db.collection('modules')
          .add({
            name: this.module.name,
            skill: this.module.skill,
            tags: this.tag
          })
          .then(() => {
            alert('Module created successfully');
          });
      } else {
        alert('Enter blank first');
      }
      $('#module').modal('hide');
    },
    fetchModules() {
      db.collection('modules')
        .orderBy('name')
        .onSnapshot(querySnapshot => {
          let allModules = [];
          querySnapshot.forEach(doc => {
            allModules.push(doc.data());
          });
          this.modules = allModules;
        });
    }
  },
  created() {
    this.fetchModules();
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
.card--flex-toolbar {
}
.review {
  text-decoration: underline;
  font-size: 0.8em;
  padding: 1em 0;
  color: gray;
  white-space: normal;
}
textarea {
  width: 100%;
}
.textwrapper {
  border: 1px solid #999999;
  margin: 5px 0;
  padding: 3px;
}
</style>
