"use client";

/**TO DO: pass color or variant as parameter  */
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({isOpen, onClose, children}: ModalProps) {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            <div className={` absolute inset-0 backdrop-blur-sm`}/> {/**this is the box that covers the whole screen when the popup appears */}
            <div onClick={(e) => e.stopPropagation()}>
                {children} {/**create the child, for this case its the pop up to log the expense a need or a want */}
            </div>
        </div>
    );
}