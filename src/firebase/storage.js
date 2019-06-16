import { storage } from './firebase';

export const uploadImage = (file, { progress = () => {}, error = () => {}, complete = () => {} }) => {
	const fileRef = storage.ref(`images/${file.name}`);

	const task = fileRef.put(file);

	task.on('state_changed', progress, error, () => {
		task.snapshot.ref.getDownloadURL().then(downloadURL => complete(downloadURL));
	});
};
