const Button = ({onSelectTrack, uri}) => {

    return <button onClick={() => onSelectTrack(uri)}>{toggle ? 'Deselect' : 'Select'}</button>;
}

export default Button;