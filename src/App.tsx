import { Route, Routes } from 'react-router-dom'
import './App.css'
import {ComplicatedForm} from './components/complicated-form/ComplicatedForm'
import Home from './components/home/Home'
import FakeOS from './components/fake-os/FakeOS'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fake-os" element={<FakeOS />} />
                <Route path="/complicated-form" element={<ComplicatedForm />} />
            </Routes>
        </>
    )
}

export default App
