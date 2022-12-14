import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyC66mziN8NIuoxUD_W-_kS8FRukpmQ4bcA',
  authDomain: 'twetdev.firebaseapp.com',
  projectId: 'twetdev',
  storageBucket: 'twetdev.appspot.com',
  messagingSenderId: '1052934596057',
  appId: '1:1052934596057:web:547679ffdb29314d7625c8',
  measurementId: 'G-MCMVCZB9SJ'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = user ?
      mapUserFromFirebaseAuth(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()

  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then(mapUserFromFirebaseAuth)
}

export const addTwet = ({ avatar, content, img, userId, username }) => {
  return db.collection('twits').add({
    avatar,
    content,
    img,
    userId,
    username,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

const mapTwitsFromFirebaseToTwitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    id,
    ...data,
    createdAt: +createdAt.toDate()
  }
}

export const listenLatestTwits = (callback) => {
  return db
    .collection('twits')
    .orderBy('createdAt', 'desc')
    .onSnapshot(({ docs }) => {
      const newTwits = docs.map(mapTwitsFromFirebaseToTwitObject)
      callback(newTwits)
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)

  return task
}