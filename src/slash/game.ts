import { ChatInputCommandInteraction, Client, GuildTextBasedChannel } from "discord.js"
import axios from "axios"

const Game: {[game: string]: string} = {
	"hkrpg_global": "Honkai: Star Rail",
	"hk4e_global": "Genshin Impact",
	"nap_global": "Zenless Zone Zero"
}

interface Package {
	version: string
	game_pkgs: {
		url: string
		md5: string
		size: string
		decompressed_size: string
	}[]
	audio_pkgs: {
		language: string
		url: string
		md5: string
		size: string
		decompressed_size: string
	}[]
	res_list_url: string
}

interface GamePackages {
	retcode: number
	message: string
	data: {
		game_packages: {
			game: {
				id: string
				biz: string
			}
			main: {
				major: Package
				patches: Package[]
			}
			predownload: {
				major?: Package[]
				patches?: Package[]
			}
		}[]
	}
}

function calculateSize(bytes: string): string {
	const size = parseInt(bytes);
	if (size < 1024) return `${size} Bytes`;
	else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
	else if (size < 1073741824) return `${(size / 1048576).toFixed(2)} MB`;
	else return `${(size / 1073741824).toFixed(2)} GB`;
  }
  
export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {
	const launcherId = interaction.options.getString("launcherid") || "VYTpXlbWo8"
	// i am not sure if the game ids change
	const fetch = await axios.get(`https://sg-hyp-api.hoyoverse.com/hyp/hyp-connect/api/getGamePackages?game_ids[]=4ziysqXOQ8&game_ids[]=gopR6Cufr3&game_ids[]=U5hbdsT9W7&launcher_id=${launcherId}`)
	const data: GamePackages = fetch.data
	interaction.followUp({ content: "Fetching... Response may be slow due to rate limits", ephemeral: true })
	const channel = interaction.channel as GuildTextBasedChannel
	if (data.message == "launcher not found") {
		channel.send("Invalid launcher id!")
		return
	}
	for (const gamePackage of data.data.game_packages) {
		let main = ""
		let major = ""
		let audio = ""

		const majorPackage = gamePackage.main.major
		const version = majorPackage.version

		main = `# ${Game[gamePackage.game.biz]} (${version})\n## Game Package\n`

		let s = 0
		for (const gamePkg of majorPackage.game_pkgs) {
			s += 1
			major += `[Part ${s}](${gamePkg.url}) (${calculateSize(gamePkg.size)})\n`
		}

		for (const audioPkg of majorPackage.audio_pkgs) {
			audio += `[${audioPkg.language}](${audioPkg.url}) (${calculateSize(audioPkg.size)})\n`
		}

		await channel.send(main+major)

		main = `## Audio Package\n`

		await channel.send(main+audio)

		let diff = ""

		for (const patch of gamePackage.main.patches) {
			const diffVer = `${patch.version} -> ${majorPackage.version}`

			for (const gameDiff of patch.game_pkgs) {
				diff += `[${diffVer}](${gameDiff.url}) (${calculateSize(gameDiff.size)})\n`
			}

			for (const audioDiff of patch.audio_pkgs) {
				diff += `[${diffVer} ${audioDiff.language}](${audioDiff.url}) (${calculateSize(audioDiff.size)})\n`
			}
		}

		main = `## Hdiff Package\n`
		await channel.send(main+diff)

		const preloadPkg = gamePackage.predownload

		let preload = "## Preload Packages (VERSION)\n"
		let preloadAudio = "## Preload Audio Packages (VERSION)\n"
		let preloadDiff = "## Preload Packages (VERSION)\n"
		let preloadAudioDiff = "## Preload Audio Packages (VERSION)\n"
		let ver = ""

		if (!preloadPkg || !preloadPkg.major) {
			preload = "No pre-download packages currently"
			await channel.send(preload)
		} else {
			for (const preloadFull of preloadPkg.major) {
				ver = preloadFull.version
				preload = preload.replace("VERSION", preloadFull.version)
				let s = 0
				for (const preloadGame of preloadFull.game_pkgs) {
					s += 1
					preload += `[Part ${s}](${preloadGame.url}) (${calculateSize(preloadGame.size)})\n`
				}
				await channel.send(preload)

				for (const preAudio of preloadFull.audio_pkgs) {
					preloadAudio += `[${preAudio.language}](${preAudio.url}) (${calculateSize(preAudio.size)})\n`
				}
				await channel.send(preloadAudio)
			}
		}
		if (!preloadPkg || !preloadPkg.patches) {
			preloadDiff = "No pre-download hdiffs currently"
			await channel.send(preloadDiff)
		} else {
			let ver_diff = ""
			for (const preloadDiffPkg of preloadPkg.patches) {
				ver_diff = `${preloadDiffPkg.version} -> ${ver}`
				preloadDiff = preloadDiff.replace("VERSION", ver_diff)
				for (const preloadDiffGame of preloadDiffPkg.game_pkgs) {
					preloadDiff += `[${ver_diff}](${preloadDiffGame.url}) (${preloadDiffGame.size})\n`
				}
				await channel.send(preloadDiff)

				for (const preloadDiffAudio of preloadDiffPkg.audio_pkgs) {
					preloadAudioDiff += `[${ver_diff} ${preloadDiffAudio.language}](${preloadDiffAudio.url}) (${preloadDiffAudio.size})\n`
				}
				await channel.send(preloadAudioDiff)
			}
		}
	}
}
