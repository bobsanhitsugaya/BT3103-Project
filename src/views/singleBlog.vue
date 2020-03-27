<template>
<div id="show-blogs">

        <h1 class="modsearch"><center>Tutor: {{id}}</center></h1>
        <div class="">
                <div v-for="element in testlist" class="">
                    <div v-for="tut in element.tutors" class="">
                        <div v-if="tut === id">
                            <h1>Name: {{id}} </h1>
                            <h2>I am teaching {{element.code}} </h2>
                            <h2> The name of the course is {{element.name}} </h2>
                        </div>
                    </div>
                </div>

        </div>
    </div>

</template>

<script>
import db from '@/firebase/init.js'

export default {
    data () {
        return {
            id: this.$route.params.tut,
            test: "TEST",
            testlist: []
            
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
</style>