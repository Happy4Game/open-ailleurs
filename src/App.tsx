import { Route, Routes } from 'react-router-dom'
import './App.css'
import {ComplicatedForm} from './components/complicated-form/ComplicatedForm'
import Home from './components/home/Home'
import FakeOS from './components/fake-os/FakeOS'
import Snake3D from './components/snake/Snake3D'

function App() {
    return (
        <div className='w-screen'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fake-os" element={<FakeOS />} />
                <Route path="/complicated-form" element={<ComplicatedForm />} />
                <Route path="/snake" element={<Snake3D />} />
            </Routes>
        </div>
    )
}

export default App
