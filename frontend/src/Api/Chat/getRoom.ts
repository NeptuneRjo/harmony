export const getRoom = async (roomId: string) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/chat/${roomId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'same-origin',
		}
	)

	return response
}
