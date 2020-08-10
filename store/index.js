import firebase from "../plugins/firebase"

export const state = () => ({
    todos: [],
    userUid: '',
    userName: ''
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
    }
}

export const actions = {
    googlesignIn({ commit }) {
      console.log('login action')
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user;
        console.log('sucess : ' + user.uid + ' : ' + user.displayName )
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
      }).catch(function(error) {
        var errorCode = error.code;
        console.log('error : ' + errorCode)
      });
    }, 
    getTodos({commit}) {
      firebase.firestore().collection('todos').orderBy("todo", "asc").get()
        .then((res) => {
            const todos = []
            res.forEach(x =>{
                console.log(x.data())
                todos.push(x.data())
            })
            commit('getTodos', todos)
        })
    },
    submitTodo({ dispatch, commit}, todo) {
      firebase.firestore().collection('todos').add({})
        .then((res) => {
          firebase.firestore().collection('todos').doc(res.id)
            .set({
              todo: todo,
              id: res.id,
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
    }
}