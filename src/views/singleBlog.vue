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
                        <div v-for="element in testlist" class="">
                    <div v-for="tut in element.tutors" class="">
                        <div v-if="tut === id">
                          <h3>
                            {{ id }}
                          </h3>
                          <div>
                            <h6> {{ element.code}} </h6>
                            <body>
                              Hourly Rate: $  {{element.rates}}/hr <br />
                              Number of Past Tutees:  {{element.past}} students <br />
                              Currently tutoring:  {{element.current}} students <br />
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
                

                <div class="table-responsive">
                  <table class="table">
                      
                    <thead>
                     
                      <tr>
                        <th>Modules</th>                        
                        
                      </tr>
                      
                      
                    </thead>

                    <tbody v-for="element in testlist">
                      <!-- <div v-for="element in testlist" style="width:'inherit"> -->
                        
                            <div v-for="tut in element.tutors" style="width:'inherit">
                                <div v-if="tut === id" style="width:'inherit">
                                    <tr v-for="modz in element.modules" style="width:'inherit">
                                        <td>
                                        {{modz}}
                                        </td>
                                        
                                           
                          
                                    </tr>
                            
                                </div>
                          
                          </div>
                        

                        
                      <!-- </div> -->
                      
                    </tbody>
                  
                    
                  </table>
                </div>
              </div>
            </div>

            </v-card>

          
          <v-card class="skillset">
            <div class="container">
              <div class="skill-test">
                
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Skills</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="skill in skillset">
                        <td>
                        <h4>
                          {{ skill.name }}
                        </h4>

                        <p1>
                          {{ skill.para }}
                        </p1>

                        
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import db from '@/firebase/init.js'
import { VueEditor } from 'vue2-editor';
import StarRating from 'vue-star-rating';

export default {
    components: {
        StarRating
    },
    data () {
        return {
            id: this.$route.params.tut,
            test: "TEST",
            testlist: [],
            rating:4,
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
            
        }
    },
    methods: {
        
    },
    created() {
        db.collection('testmodule').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'code': doc.data().code,
                    'name': doc.data().name,
                    'tutors': doc.data().tutors,
                    'modules': doc.data().modules,
                    'rates': doc.data().rates,
                    'past':doc.data().past,
                    'current':doc.data().current,
                }
                console.log('Write succeeded!');
                console.log(data);
                this.testlist.push(data);
                


            })
        })
    },
    computed: {
       
        
    }
}
</script>

<style>


#show-blogs{
    max-width: 800px;
    margin: 0px auto;
    color:#19266e;
    
}
.single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}

.searchbox {
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #f07008;
    height: 40px;
    border-radius: 60px;
    padding:10px;
    padding-left: 30px;
    padding-right: 30px;
}

.modsearch {
    padding-top: 20px;
    padding-bottom: 20px

}
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