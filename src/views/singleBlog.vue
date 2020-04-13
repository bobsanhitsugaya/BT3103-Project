<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex md3>
          <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex md>
                  <h2>Tutor Profile</h2>
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
                        <div v-for="element in testlist" style="text-align:center">
                          <h3>{{element.username}}   </h3>
  
                          <div>
                            <body>
                              {{element.course}}, Year {{element.year}}, School of {{element.faculty}}<br/>
                              Hourly Rate: $  {{element.rate}}/hr <br />
                              {{element.email}} <br/>
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
                

                <div class="table-responsive">
                  <table class="table">
                      
                    <thead id='testcss'>
                     
                      <tr>
                        <th>Modules</th>
                        <th>Skill Level</th>
                        
                      </tr>
                      
                      
                    </thead>

                    <tbody v-for="element in testlist">
                      
                      <!-- <div v-for="element in testlist" style="width:'inherit"> -->
                            <tr v-for="mods in element.experience" style="width:'inherit">
                                <td id='testcss'> 
                                  {{mods.module}}
                                  </td>

                                  <td id="testcss">
                                    {{mods.skill}}
                                    </td>

                          
                          </tr>
                          
                        

                        
                      <!-- </div> -->
                      
                    </tbody>
                  
                    
                  </table>
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
                
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Skills</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="element in testlist">
                        <div v-for="skill in element.skills" id="skillsbreaker">
                        <h3 id="skillsheader">
                          {{ skill.name.toUpperCase() }} 
                        </h3>

                        <p1 id = 'skillsdetail'>
                          {{ skill.detail }}
                        </p1>

                        
                          
                        </div>
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
            
            
        }
    },
    methods: {
        
    },
    created() {
        db.collection('users').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'docid': doc.id,
                    'username' : doc.data().username,
                    'course': doc.data().course,
                    'email': doc.data().email,
                    'experience': doc.data().experience,
                    'faculty': doc.data().faculty,
                    'rate': doc.data().rate,
                    'skills': doc.data().skills,
                    'tutor': doc.data().tutor,
                    'year': doc.data().year,


                }
                if (data.username == this.id) {
                  console.log("Success")
                  this.testlist.push(data)
                }
                


            })
        })
    },
    computed: {
       
        
    }
}
</script>

<style>
#skillsheader{
  color: #192666;
  margin: 10px;
}

#skillsdetail{
  margin: 20px
}

#skillsbreaker{
  text-align: left;
  border-bottom: 1.5px dashed #bbb;
  padding-bottom:10px;
}

#testcss {
  text-align: center;
}
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
  margin-top: 3rem;
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