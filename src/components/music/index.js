// import Button from "../button";
const Music = ({image, title, artist, album, onSelectTrack, uri, isSelected}) => {
    return <div className="music-box">
            <img
            src={image}
            alt="album"
            />
            <h3>Title: {title}</h3>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
            <button onClick={() => onSelectTrack(uri)}>{isSelected ? 'Deselect' : 'Select'}</button>
        </div>;
}

export default Music;