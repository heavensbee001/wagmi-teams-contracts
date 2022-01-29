const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners()
	const wagmiTeamsContractFactory = await hre.ethers.getContractFactory('WagmiTeamsPortal')
	const wagmiTeamsContract = await wagmiTeamsContractFactory.deploy()
	await wagmiTeamsContract.deployed()

	console.log('Contract deployed to:', wagmiTeamsContract.address)
	console.log('Contract deployed by:', owner.address)
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
