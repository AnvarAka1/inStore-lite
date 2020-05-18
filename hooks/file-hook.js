import { useState } from "react";

const useFile = hasValidity => {
	const [ files, setFiles ] = useState([]);
	const [ isUploading, setIsUploading ] = useState(false);
	const [ isUploadDone, setIsUploadDone ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ progress, setProgress ] = useState(0);
	const [ isValid, setIsValid ] = useState(!hasValidity ? true : false);
	const fileDropped = files => {
		const newFiles = files.map(file =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
				formattedSize: formatBytes(file.size)
			})
		);
		checkValidity(files);
		setFiles(newFiles);
	};
	// Formats the size
	const formatBytes = (bytes, decimals = 2) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = [ "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	};
	const uploadProgressChangeHandler = percentage => {
		setProgress(percentage);
	};
	const uploadReset = () => {
		setIsUploading(false);
		setError(null);
		setProgress(0);
	};
	const clearFiles = () => {
		setFiles([]);
		setIsUploadDone(false);
		uploadReset();
	};
	const errorHandler = message => {
		setError(message);
	};
	const uploadStarted = () => {
		setIsUploading(true);
	};
	const uploadEnded = () => {
		setIsUploading(false);
		setIsUploadDone(true);
	};

	const checkValidity = files => {
		if (!hasValidity) return;
		if (!files.length) {
			setIsValid(false);
		}
	};
	return {
		files,
		isUploading,
		isUploadDone,
		progress,
		isValid,
		error,
		onFileDrop: fileDropped,
		onProgressChange: uploadProgressChangeHandler,
		onUploadReset: uploadReset,
		onClearFiles: clearFiles,
		onError: errorHandler,
		onUploadStart: uploadStarted,
		onUploadEnd: uploadEnded
	};
};

export default useFile;
