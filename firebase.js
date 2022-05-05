import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCiaxq3-PEQpEZ6ymOF5NDYzWNcTbQWX_k',
  authDomain: 'ubereat-bbb53.firebaseapp.com',
  projectId: 'ubereat-bbb53',
  storageBucket: 'ubereat-bbb53.appspot.com',
  messagingSenderId: '732532760532',
  appId: '1:732532760532:web:c4709c89b39f2f0c6c4041'
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
