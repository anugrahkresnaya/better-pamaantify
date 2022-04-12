// import Button from "../button";
const Music = ({image, title, artist, album, onSelectMusic, uri, isSelected}) => {
	return (
	<div className="music-box">		
		<div className="music-image">
			<img
			src={image}
			alt="album"
			/>
		</div>
		<div className="music-info">
			<h3>{title}</h3>
			<p>{artist}</p>
			<p>{album}</p>
			<button onClick={() => onSelectMusic(uri)}>{isSelected ? 'Deselect' : 'Select'}</button>
		</div>
	</div>
	);
}

export default Music;