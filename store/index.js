import firebase from "../plugins/firebase"

export const state = () => ({
    todos: [],
    userUid: '',
    userName: '',
    userPhotoURL: '',
    userProjects: [],
    userProjectdetails: [],
    userProjectsNum: '',
    userSelectindex: ''
})

export const getters = {
    todos: state => {
      return state.todos
    },
    getUserUid(state) {
      return state.userUid
    },
    getUserName(state) {
      return state.userName
    },
    getUserPhotoURL(state) {
      return state.userPhotoURL
    },
    getUserProjects(state) {
      return state.userProjects
    },
    getUserProjects(state) {
      return userProjectdetails
    },
    getUserProjectsNum(state) {
      return state.userProjectsNum
    },
    getUserSlectindex(state) {
      return state.userSelectindex
    }
}

export const actions = {
    googlesignIn({ commit }) {
      console.log('login action')
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user;
        console.log('success : ' + user.uid + ' : ' + user.displayName + ' : ' + user.photoURL)
        console.log(user.photoURL)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
        commit('setUserPhotoURL', user.photoURL)
        firebase.firestore().collection('projects').where("userUid", "==", user.uid).get()
          .then((res) => {
            let projects = []
            let projectdetails = []
            res.forEach(x =>{
              console.log(x.data())
              projects.push(x.data().projectname)
              projectdetails.push(x.data().projectdetail)
          })
          console.log(projects)
          let userProjectsNum = projects.length
          commit('setUserProjects', projects)
          commit('setUserProjectdetails', projectdetails)
          commit('setUserProjectsNum', userProjectsNum)
        })
      }).catch(function(error) {
        var errorCode = error.code;
        console.log('error : ' + errorCode)
      });
    }, 
    addProjects({ commit }) {
      commit('setUserProjects', '')
      commit('setUserProjectdetails', '')
      commit('setUserProjectsNum', '')
      console.log(this.state.userUid)
        firebase.firestore().collection('projects').where("userUid", "==", this.state.userUid).get()
          .then((res) => {
            let projects = []
            let projectdetails = []
            res.forEach(x =>{
              console.log(x.data())
              projects.push(x.data().projectname)
              projectdetails.push(x.data().projectdetail)
          })
          console.log(projects)
          let userProjectsNum = projects.length
          commit('setUserProjects', projects)
          commit('setUserProjectdetails', projectdetails)
          commit('setUserProjectsNum', userProjectsNum)
      })
    },
    selectProjects({ commit }, index) {
      commit('setUserSlectindex', index)
    },
    getTodos({ commit }) {
      firebase.firestore().collection('todos').where("projectname", "==", this.state.userProjects[this.state.userSelectindex]).get()
      .then((res) => {
          const todos = []
          res.forEach(x =>{
              console.log(x.data())
              todos.push(x.data())
          })
        commit('getTodos', todos)
      })
    },
    submitTodo({ commit, dispatch}, todo) {
      let projectname = this.state.userProjects[this.state.userSelectindex]
      firebase.firestore().collection('todos').add({})
        .then((res) => {
          firebase.firestore().collection('todos').doc(res.id)
            .set({
              todo: todo,
              id: res.id,
              projectname: projectname,
            }).then(() => {
              dispatch('getTodos')
              console.log(todo, res.id)
            })
        })
      },
      deleteTodo({commit, dispatch}, id) {
          firebase.firestore().collection('todos').doc(id).delete()
          dispatch('getTodos')
      },
   }

export const mutations = {
    getTodos (state, todos) {
        state.todos = todos
    },
    deleteTodo (state, index) {
        state.todos.splice(index, 1)
    },
    setUserUid (state,userUid) {
        state.userUid = userUid
    },
    setUserName (state,userName) {
        state.userName = userName
    },
    setUserPhotoURL (state,userPhotoURL) {
        state.userPhotoURL = userPhotoURL
    },
    setUserProjects (state,userProjects) {
        state.userProjects = userProjects
    },
    setUserProjectdetails (state,userProjectdetails) {
        state.userProjectdetails = userProjectdetails
    },
    setUserProjectsNum (state,userProjectsNum) {
        state.userProjectsNum = userProjectsNum
    },    
    setUserSlectindex (state,userSelectindex) {
        state.userSelectindex = userSelectindex
    }    
}