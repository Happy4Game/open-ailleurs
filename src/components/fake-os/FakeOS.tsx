import './FakeOs.css'
import linux from '../../assets/linux.png'

function FakeOS() {
    return (
        <>
            <div className='fakeos-body'>
                <img className='linux-img' src={linux} alt="Image de fond" />
            </div>
        </>
    )
}

export default FakeOS
