/* eslint-disable @typescript-eslint/no-unused-vars -- N/A */
/* eslint-disable func-names -- N/A */

/* eslint-disable @typescript-eslint/no-confusing-void-expression -- description */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	faArrowDown,
	faFile,
	faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { Button } from './ButtonChat';

/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
export function ModalResponder({ show, onClose, onSend }) {
	const onDrop = useCallback((acceptedFiles: any) => {
		processImage(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	const [message, setMessage] = useState('');
	const [image, setImage] = useState<{ src: any; file: any } | undefined>({
		src: '',
		file: null,
	});
	const [isDeleted, setIsDeleted] = useState(false);

	const inputFileRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		console.log('image', image);
	}, [image]);

	const handleSetImage = (imagePayload: { src: ''; file: any }) => {
		setImage(imagePayload);
		setIsDeleted(false);
	};

	const onButtonClick = () => {
		inputFileRef.current?.click();
	};

	const processImage = (file: any) => {
		const reader = new FileReader();
		reader.onload = function (event) {
			setImage({
				file,
				src: event?.target?.result,
			});
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSend(message);
		setMessage('');
		onClose();
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	if (!show) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-[#202123] bg-opacity-70 flex items-center justify-center z-50">
			<div className="bg-[#555759] p-6 rounded shadow-lg w-[500px]">
				<form onSubmit={handleSubmit}>
					<textarea
						className="w-full p-2 border border-[#404040] rounded bg-[#202123] text-white"
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Escriba su mensaje..."
						rows={3}
						value={message}
					/>
					<div className="flex justify-end space-x-2 mt-4">
						{image ? (
							<Button
								backgroundColor="[#2b2c34]"
								hoverColor="#40414E"
								icon={faFile}
								onClick={() => {
									setImage(undefined);
								}}
								padding="3"
								text={image?.file?.path}
								textColor="white"
							/>
						) : (
							<div {...getRootProps()}>
								<Button
									backgroundColor="[#2b2c34]"
									hoverColor="#40414E"
									icon={faUpload}
									onClick={onButtonClick}
									padding="3"
									text="Adjuntar archivo"
									textColor="white"
								/>
								<input
									name="upload-file"
									ref={inputFileRef}
									style={{ display: 'none' }}
									type="file"
									{...getInputProps()}
								/>
							</div>
						)}

						<button
							className="py-2 px-4 bg-[#404040] text-white rounded hover:bg-[#555759]"
							onClick={onClose}
							type="button"
						>
							Cancelar
						</button>
						<button
							className="py-2 px-4 bg-[#F2EC4C] text-[#202123] rounded hover:bg-[#e2dc4c]"
							type="submit"
						>
							Enviar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
