import {Link, Outlet} from "react-router-dom"
export default function About() {
    return (
        <div>
            <h2>About Page</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="team">Our Team</Link>
                    </li>
                    <li>
                        <Link to="company">Our Company</Link>
                    </li>
                </ul>
            </nav>
            <Link to="/teams">Our Team</Link>
            <Link to="company">Our Company</Link>
            <br />
            <Outlet />
        </div>
    )
}