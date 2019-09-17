import firebase from 'firebase';

const devConfig = {
	apiKey: 'AIzaSyD0g1U-vlS6dYcWbogjbOtFzglFdgY14EY',
	authDomain: 'cooking-book-b938a.firebaseapp.com',
	databaseURL: 'https://cooking-book-b938a.firebaseio.com',
	projectId: 'cooking-book-b938a',
	storageBucket: 'cooking-book-b938a.appspot.com',
	messagingSenderId: '674061107100'
};

const prodConfig = {
	apiKey: 'AIzaSyCW74HHM_OQBsQz3KQ25f_nKRj2DoTFuoM',
	authDomain: 'cooking-book-prod.firebaseapp.com',
	databaseURL: 'https://cooking-book-prod.firebaseio.com',
	projectId: 'cooking-book-prod',
	storageBucket: '',
	messagingSenderId: '324223952565',
	appId: '1:324223952565:web:0e82a9bfecd0d04d07c0fc'
};

// eslint-disable-next-line no-undef
const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

export {
	auth,
	db,
	storage
};
