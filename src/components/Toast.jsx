const UIFeedback = ({state, message}) => {

    return (
    <div className="toast toast-top toast-center">
        <div className="alert alert-blue">
            <span>{message}</span>
        </div>
    </div>
    )
}

export default UIFeedback