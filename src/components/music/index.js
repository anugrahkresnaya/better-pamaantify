const Music = ({image, title, artist, album}) => {
    return <div className="music-desc">
            <img
            src={image}
            alt="album"
            />
            <h3>Title: {title}</h3>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
        </div>;
}

export default Music;