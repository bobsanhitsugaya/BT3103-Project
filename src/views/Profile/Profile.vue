<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex md3>
         <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex>
                  <h2>Profile</h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
            <ProfileCard />
            <MessageCard />
        </v-flex>

        <v-flex md8>
          <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex md8>
                  <h2>Experiences</h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <v-card class="experiences">
            <div class="container">
              <div class="experience-test">
                <v-btn
                  class="mx-2"
                  depressed
                  @click="addNewExperience"
                  color="#F1BA79"
                  :style="{ float: 'right', color: '#FFFFFF' }"
                  >Add Experience</v-btn
                >

                <div class="table-responsive">
                  <table class="table">
                    <thead >
                      <tr>
                        <th>Module</th>
                        <th>Skill</th>
                        <th>Modify</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="experience in experiences" v-bind:key="experience">
                        <td>
                          {{ experience.code }}
                        </td>

                        <td>
                          {{ experience.skill }}
                        </td>

                        <td>
                          <v-btn
                            class="mx-2"
                            color="primary"
                            @click="editExperience(experience)"
                          >
                            Edit
                          </v-btn>
                          <v-btn
                            class="mx-2"
                            color="error"
                            @click="deleteExperience(experience)"
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

            <!-- Experience Modal -->
            <div
              class="modal fade"
              id="experience"
              tabindex="-1"
              role="dialog"
              aria-labelledby="editLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editLabel" v-if="modal == 'new'" >Add Experience</h5>
                    <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'" >Edit Experience</h5>
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
                            v-model="experience.code"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Module skill"
                            v-model="experience.skill"
                            class="form-control"
                          />
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
                      @click="addExperience()"
                      type="button"
                      class="btn btn-primary"
                      v-if="modal == 'new'"
                    >
                      Save changes
                    </button>
                    <button
                      @click="updateExperience()"
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
                  @click="newSkill"
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
                      <tr v-for="skill in skillset" v-bind:key="skill">
                        <h4>
                          {{ skill.name }}
                        </h4>

                        <p1>
                          {{ skill.detail }}
                        </p1>

                        <td>
                          <v-btn
                            class="mx-2"
                            color="primary"
                            @click="editSkill(skill)"
                          >
                            Edit
                          </v-btn>
                          <v-btn
                            class="mx-2"
                            color="error"
                            @click="deleteSkill(skill)"
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

            <!-- Skills Modal -->
            <div
              class="modal fade"
              id="skill"
              tabindex="-1"
              role="dialog"
              aria-labelledby="editLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editLabel">Add Skill</h5>
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
                            placeholder="Skill Name"
                            v-model="skill.name"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="A small write-up about your skill"
                            v-model="skill.detail"
                            class="form-control"
                          />
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
                      @click="addSkill()"
                      type="button"
                      class="btn btn-primary"
                      v-if="modal == 'new'"
                    >
                      Save changes
                    </button>
                    <button
                      @click="updateSkill()"
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
import ProfileCard from '../../components/ProfileCard';
import MessageCard from '../../components/MessageCard';
export default {
  name: 'Modules',
  components: {
    StarRating,
    ProfileCard,
    MessageCard
  },
  data() {
    return {
      experiences: [],
      experience: {
        code: null,
        skill: null,
        id: null
      },
      skillset: [],
      skill: {
        name: null,
        detail: null,
        id: null
      },
      activeItem: null,
      modal: null,
    };
  },
  methods: {
    resetExperience() {
      this.experience = {
        code: null,
        skill: null,
        id: null
      };
    },
    addNewExperience() {
      this.modal = 'new';
      this.resetExperience();
      $('#experience').modal('show');
    },
    updateExperience() {
      db.collection('users').doc(firebase.auth().currentUser.uid).collection("modules").where('id','==',this.experience.id)
      .get().then(querySnapshot => {
        return querySnapshot.docs[0].ref.update({
          code: this.experience.code,
          skill: this.experience.skill
        })
      }).then(() => {this.fetchEverything()});
      $('#experience').modal('hide');
    },
    editExperience(experience) {
      this.modal = 'edit';
      this.experience = experience;
      $('#experience').modal('show');
    },
    deleteExperience(experience) {
      db.collection('users').doc(firebase.auth().currentUser.uid).collection("modules").where('id','==',experience.id)
      .get().then(querySnapshot => {
      return querySnapshot.docs[0].ref.delete().then(() => {
      this.fetchEverything()
      })
  });
    }
    ,
    addExperience() {
      this.experience.id = new Date();
      if (this.experience.code != null && this.experience.skill != null) {
        db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('modules')
          .add(this.experience)
          .then(() => {
            alert('Module created successfully');
          });
      } else {
        alert('Enter blank first');
      }
      this.fetchEverything();
      $('#experience').modal('hide');
    },
    fetchEverything() {

        db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('modules')
        .get()
        .then(querySnapshot => {
          let allExperiences = [];
          querySnapshot.forEach(doc => {
            allExperiences.push(doc.data());
          });
          this.experiences = allExperiences;
        });

        db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('skills')
        .get()
        .then(querySnapshot => {
          let allSkills = [];
          querySnapshot.forEach(doc => {
            allSkills.push(doc.data());
          });
          this.skillset = allSkills;
        });

        console.log('fetched');

    },
      resetSkill() {
      this.skill = {
        name: null,
        detail: null,
        id: null
      };
    },
    newSkill() {
      this.modal = 'new';
      this.resetSkill();
      $('#skill').modal('show');
    },
    updateSkill() {
      db.collection('users').doc(firebase.auth().currentUser.uid).collection("skills").where('id','==',this.skill.id)
      .get().then(querySnapshot => {
        return querySnapshot.docs[0].ref.update({
          name: this.skill.name,
          detail: this.skill.detail
        })
      }).then(() => {this.fetchEverything()});
      $('#skill').modal('hide');
    },
    editSkill(skill) {
      this.modal = 'edit';
      this.skill = skill;
      $('#skill').modal('show');
    },
    deleteSkill(skill) {
      db.collection('users').doc(firebase.auth().currentUser.uid).collection("skills").where('id','==',skill.id)
      .get().then(querySnapshot => {
      return querySnapshot.docs[0].ref.delete().then(() => {
      this.fetchEverything()
      })
  });
    }
    ,
    addSkill() {
      this.skill.id = new Date();
      if (this.skill.name != null && this.skill.detail != null) {
        db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('skills')
          .add(this.skill)
          .then(() => {
            alert('Skill created successfully');
          });
      } else {
        alert('Enter blank first');
      }
      this.fetchEverything();
      $('#skill').modal('hide');
    },
  },
  created() {
    this.fetchEverything();
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
