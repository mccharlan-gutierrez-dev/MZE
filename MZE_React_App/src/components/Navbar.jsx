import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">

      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-primary">
          MZE App
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-end gap-2">

        <Link to="/" className="btn btn-ghost">
          Home
        </Link>

        <Link to="/about" className="btn btn-ghost">
          About
        </Link>

        <Link to="/contact" className="btn btn-ghost">
          Contact
        </Link>

      </div>

    </div>
  )
}

export default Navbar