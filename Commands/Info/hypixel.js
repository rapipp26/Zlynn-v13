module.exports = {
    name: "hypixel",
    description: "Get hypixel player info",
    options: [
      {
        name: "player_name",
        description: "Provide a hypixel player name",
        type: "STRING",
        required: true
      },
    ],
    async execute(interaction, client) {
      const HypixelAPI = require('hypixel-api')
  
      const name = interaction.options.getString("player_name")
  
      const client = new HypixelAPI('c3b371ae-1d00-490b-964d-7cd24577947a')
  
  
      client.getPlayer(name, 'Ethanent').then((player) => {
      console.log(player)
  }).catch((err) => {
      console.error('Error! ' + err)
  })
    }
  }