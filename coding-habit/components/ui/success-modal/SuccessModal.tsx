interface SuccessModalProps {
    onGoToShare: () => void;
}

export default function SuccessModal({ onGoToShare }: SuccessModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Habit Created Successfully!</h2>
                    <p className="text-gray-600 mb-6">
                        Your habit has been created. Share the access code with your participants.
                    </p>
                    <button
                        onClick={onGoToShare}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
                    >
                        Go to Share Screen
                    </button>
                </div>
            </div>
        </div>
    );
}
