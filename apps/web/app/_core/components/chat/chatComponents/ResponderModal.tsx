/* eslint-disable unicorn/filename-case -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- description */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- description */
/* eslint-disable @typescript-eslint/no-unsafe-call -- description */
import { useState } from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
export function ModalResponder({ show, onClose, onSend }) {
	const [message, setMessage] = useState('');

	if (!show) {
		return null;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		onSend(message);
		setMessage(''); // Clear the input field
		onClose(); // Close modal after sending message
	};

	return (
		<div className="fixed inset-0 bg-[#202123] bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#555759] p-6 rounded shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-[#404040] rounded bg-[#202123] text-white"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={3}
            value={message}
          />
          <div className="flex justify-end space-x-2 mt-4">
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
