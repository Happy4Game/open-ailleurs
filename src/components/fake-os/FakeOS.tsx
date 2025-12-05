import './FakeOs.css'
import linux from '../../assets/linux.png'
import libreoffice from '../../assets/appLogos/libreoffice.png'
import scratch from '../../assets/appLogos/scratch.png'
import qrprint from '../../assets/appLogos/QRPrint.png'
import Footer from '../Footer'
import Header from '../Header'

function FakeOS() {
    return (
        <>
        <Header></Header>
            <div className='fakeos-body'>
                <img className='linux-img' src={linux} alt="Image de fond" />
                <div className='list-app-row'>
                    <div>
                        <img src={libreoffice} alt="Libreoffice" />
                        <p>Libreoffice</p>
                    </div>
                    <div>
                        <img src={scratch} alt="Scratch" />
                        <p>Scratch</p>
                    </div>
                    <div>
                        <img src={qrprint} alt="QRPrint" />
                        <p>QRPrint</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default FakeOS
