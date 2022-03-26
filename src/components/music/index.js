import Button from "../button";
const Music = ({image, title, artist, album}) => {
    return <div className="music-box">
            <img
            src={image}
            alt="album"
            />
            <h3>Title: {title}</h3>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
            <Button />
        </div>;
}

export default Music;