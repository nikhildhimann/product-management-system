export default function Modal({ isOpen, onClose, onConfirm, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-secondary rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in">
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <div>{children}</div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded bg-danger hover:bg-red-700 text-white transition-colors">Confirm</button>
                </div>
            </div>
        </div>
    );
}