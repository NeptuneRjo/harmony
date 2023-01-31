import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { UserInterface } from '../../types'
import { logoutUser } from '../../Api'
import { getAndSet, defineSessionStorage } from '../../Global/utils'

type Props = {
	user: UserInterface | null
	setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}

const Menu: React.FC<Props> = ({ user, setUser }: Props) => {
	const logout = async () => {
		const { data, error } = await getAndSet(logoutUser)

		setUser(null)
		defineSessionStorage('', null)

		if (error) {
			console.log(error)
		}
	}

	return (
		<Navbar expand='lg' bg='primary' variant='dark'>
			<Container>
				<Navbar.Brand href={`${user ? '#/chat/room-1' : ''}`}>
					Harmony
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavDropdown title='Rooms' id='basic-nav-dropdown'>
							<NavDropdown.Item href='#/chat/room-1'>Room 1</NavDropdown.Item>
							<NavDropdown.Item href='#/chat/room-2'>Room 2</NavDropdown.Item>
							<NavDropdown.Item href='#/chat/room-3'>Room 3</NavDropdown.Item>
						</NavDropdown>
						{user === null ? (
							<Nav.Link href={`${process.env.REACT_APP_API_URL}/auth/google`}>
								Sign in
							</Nav.Link>
						) : (
							<Navbar.Collapse className='justify-content-end'>
								<Navbar.Text className='text-white'>
									Signed in as {user.user}
								</Navbar.Text>
								<Nav.Link onClick={() => logout()}>Sign Out</Nav.Link>
							</Navbar.Collapse>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Menu
