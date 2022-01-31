const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners()
	const wagmiTeamsContractFactory = await hre.ethers.getContractFactory('WagmiTeamsPortal')
	const wagmiTeamsContract = await wagmiTeamsContractFactory.deploy()
	await wagmiTeamsContract.deployed()

	console.log('Contract deployed to:', wagmiTeamsContract.address)
	console.log('Contract deployed by:', owner.address)

	// quickTest
	let allHackathonPositions
	allHackathonPositions = await wagmiTeamsContract.getPaginatedPositions(0, 1, 10)
	console.log('allHackathonPositions:', allHackathonPositions)

	let allJobPositions
	allJobPositions = await wagmiTeamsContract.getPaginatedPositions(1, 1, 10)
	console.log('allJobPositions:', allJobPositions)

	await wagmiTeamsContract.sendPosition(0, {
		title: 'Title',
		projectOrCompanyName: 'Hackathon name',
		projectOrCompanyImageUrl: 'imgUrl',
		description: 'Hackathon description',
		positionOfferUrl: 'url1',
		contact: 'my twitter 1',
		createdAt: 123421341234,
	})
	allHackathonPositions = await wagmiTeamsContract.getPaginatedPositions(0, 1, 10)
	console.log('allHackathonPositions:', allHackathonPositions)

	await wagmiTeamsContract.sendPosition(1, {
		title: 'Title',
		projectOrCompanyName: 'Job name',
		projectOrCompanyImageUrl: 'imgUrl',
		description: 'Job description',
		positionOfferUrl: 'url2',
		contact: 'my twitter 2',
		createdAt: 123421341235,
	})
	await wagmiTeamsContract.sendPosition(1, {
		title: 'Title',
		projectOrCompanyName: 'Job name',
		projectOrCompanyImageUrl: 'imgUrl',
		description: 'Job description',
		positionOfferUrl: 'url2',
		contact: 'my twitter 2',
		createdAt: 123421341235,
	})
	await wagmiTeamsContract.sendPosition(1, {
		title: 'Title',
		projectOrCompanyName: 'Job name',
		projectOrCompanyImageUrl: 'imgUrl',
		description: 'Job description',
		positionOfferUrl: 'url2',
		contact: 'my twitter 2',
		createdAt: 123421341235,
	})
	allJobPositions = await wagmiTeamsContract.getPaginatedPositions(1, 1, 10)
	console.log('allJobPositions:', allJobPositions)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

runMain()
