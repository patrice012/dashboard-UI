export const ConfirmAction = ({ checked, closeDeleteModal }) => {
    return (
        <>
            <input
                type="checkbox"
                readOnly
                checked={checked}
                id="my_modal_6"
                className="modal-toggle"
            />

            <div id="ConfirmDeletion" className="modal">
                <div className="modal-box">
                    <button id="confirmBtn">Confirm action</button>
                    <p className="py-4">
                        Press ESC key or click outside to close
                    </p>
                    <div
                        className="modal-action "
                        onClick={closeDeleteModal}
                    >
                        <label htmlFor="my_modal_6" className="btn">
                            Close!
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};
