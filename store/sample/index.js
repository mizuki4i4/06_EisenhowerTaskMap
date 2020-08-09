import firebase from "../../plugins/firebase"

export const state = () => ({
    todos: [],
})

export const getters = {
    todos: state => {
        return state.todos
    },
}

export const actions = {
    googlesignIn() {
      console.log('login action')
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user;
        console.log('sucess : ' + user)
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
}