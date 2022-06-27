import mqtt from 'async-mqtt'
import config from 'config'
import { generateFromOrderEvent } from './controllers/StatsController'

const client = mqtt.connect(config.get('mqtt.url'))

client.on('message', async function (topic, message) {
  try {
    const msg = JSON.parse(message.toString())
    console.log(msg)
    if (topic === 'shop/orders') await generateFromOrderEvent(msg)
  } catch (error) {
    console.error(error)
  }
})

export const connect = async function () {
  if (!client.connected) { await new Promise(resolve => client.once('connect', resolve)) }
  await client.subscribe('shop/orders')
}

export default client
