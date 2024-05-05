import Portal from '../../hoc/Portal';

const Backdrop = (props) => {
    return <Portal id="backdrop">
        <div className="backdrop" onClick={props.remove}></div>
    </Portal>

}

export default Backdrop;