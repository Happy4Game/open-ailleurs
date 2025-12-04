import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <Link to="/fake-os">Fake OS</Link>
            <Link to="/complicated-form">Complicated form</Link>
        </>
    )
}

export default Home
