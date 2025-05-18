export const CardPost = ({title, category, content, author}) => {
    return (
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{author}</h6>
                <p className="card-text">{content}</p>
                <p className="card-text">{category}</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    )
}
